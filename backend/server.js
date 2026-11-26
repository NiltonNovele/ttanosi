
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import crypto from "node:crypto";
import PDFDocument from "pdfkit";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 5009);

const FRONTEND_URL = process.env.FRONTEND_URL;

const API_URL = (
  process.env.PAYSUITE_API_URL || "https://paysuite.tech/api/v1"
).replace(/\/$/, "");

const BACKEND_PUBLIC_URL = (
  process.env.BACKEND_PUBLIC_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  ""
).replace(/\/$/, "");

const CURRENCY = process.env.CURRENCY || "MZN";

const ALLOWED_PAYMENT_METHODS = [
  "mpesa",
  "emola",
  "mkesh",
  "credit_card",
  "reference",
];

const DEFAULT_PAYMENT_METHODS = [...ALLOWED_PAYMENT_METHODS];

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI não configurado.");
}

if (!process.env.PAYSUITE_API_KEY) {
  throw new Error("PAYSUITE_API_KEY não configurado.");
}

if (!process.env.PAYSUITE_WEBHOOK_SECRET) {
  throw new Error("PAYSUITE_WEBHOOK_SECRET não configurado.");
}

if (!FRONTEND_URL) {
  throw new Error("FRONTEND_URL não configurado.");
}

if (!BACKEND_PUBLIC_URL) {
  throw new Error("BACKEND_PUBLIC_URL não configurado.");
}

app.disable("x-powered-by");
app.set("trust proxy", 1);

/* ============================================================
   MIDDLEWARE
============================================================ */

/*
 * O rawBody é necessário para validar a assinatura do webhook.
 * Mantém esta configuração antes das rotas.
 */


/* ============================================================
   CORS CONFIGURATION
============================================================ */

const ALLOWED_ORIGINS = new Set(
  [
    // Local development
    "http://localhost:3000",

    // Tanosi production domains
    "https://www.tanosi.store",
    "https://tanosi.store",

    // Vercel deployment domains
    "https://ttanosi.vercel.app",
    "https://www.ttanosi.vercel.app",

    // Primary frontend URL from Render environment
    ...FRONTEND_URL.split(","),

    // Additional origins from Render environment
    ...(process.env.CORS_ORIGINS || "").split(","),
  ]
    .map((url) => url.trim().replace(/\/+$/, ""))
    .filter(Boolean)
);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an Origin header (e.g. server-to-server).
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/+$/, "");

    if (ALLOWED_ORIGINS.has(normalizedOrigin)) {
      return callback(null, true);
    }

    console.warn("CORS blocked origin:", origin);
    return callback(null, false);
  },

  methods: ["GET", "POST", "PATCH", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Admin-Key",
  ],

  optionsSuccessStatus: 204,
  maxAge: 86400,
};

// CORS must run before the routes and JSON parser.
app.use(cors(corsOptions));

app.use(
  express.json({
    limit: "100kb",
    verify: (req, res, buffer) => {
      req.rawBody = Buffer.from(buffer);
    },
  })
);


app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

/* ============================================================
   DATABASE MODELS
============================================================ */

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: null,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    lineTotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    receiptNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    customer: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "MZN",
    },

    /*
     * Os métodos disponibilizados pelo checkout.
     * A PaySuite apresenta as opções que estiverem
     * efectivamente activadas na conta do comerciante.
     */

    paymentMethods: {
      type: [String],
      enum: ALLOWED_PAYMENT_METHODS,
      default: DEFAULT_PAYMENT_METHODS,
    },

    /*
     * "automatic" significa que não estamos a forçar
     * um método específico na PaySuite.
     */

    paymentMethod: {
      type: String,
      default: "automatic",
    },

    paymentId: {
      type: String,
      default: null,
      index: true,
    },

    transactionId: {
      type: String,
      default: null,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
      index: true,
    },

    checkoutUrl: {
      type: String,
      default: null,
    },

    receiptTokenHash: {
      type: String,
      required: true,
    },

    webhookEvents: {
      type: [String],
      default: [],
    },

    failureReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const webhookEventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
    },

    event: {
      type: String,
      required: true,
    },

    processedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

const WebhookEvent = mongoose.model(
  "WebhookEvent",
  webhookEventSchema
);

/* ============================================================
   HELPERS
============================================================ */

const roundMoney = (value) =>
  Math.round((Number(value) + Number.EPSILON) * 100) / 100;

const formatReference = () =>
  `TNS${Date.now()}${crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase()}`;

const makeReceiptNumber = () =>
  `TNS-REC-${Date.now()}-${crypto
    .randomBytes(2)
    .toString("hex")
    .toUpperCase()}`;

const sha256 = (value) =>
  crypto.createHash("sha256").update(value).digest("hex");

const safeTokenCompare = (providedToken, storedHash) => {
  if (typeof providedToken !== "string" || !storedHash) {
    return false;
  }

  const candidate = Buffer.from(sha256(providedToken), "hex");
  const stored = Buffer.from(storedHash, "hex");

  return (
    candidate.length === stored.length &&
    crypto.timingSafeEqual(candidate, stored)
  );
};

/*
 * Não enviamos um método específico à PaySuite.
 * A plataforma apresenta os métodos activos na conta.
 */

const getPaymentMethod = () => null;

/*
 * Valida os métodos enviados pelo frontend.
 *
 * Se o frontend não enviar a lista, utilizamos
 * os cinco métodos suportados pelo checkout.
 */

const preparePaymentMethods = (methods) => {
  if (methods === undefined || methods === null) {
    return DEFAULT_PAYMENT_METHODS;
  }

  if (
    !Array.isArray(methods) ||
    methods.length === 0 ||
    methods.length > ALLOWED_PAYMENT_METHODS.length
  ) {
    throw new Error("Lista de métodos de pagamento inválida.");
  }

  const normalized = [
    ...new Set(
      methods.map((method) =>
        String(method).trim().toLowerCase()
      )
    ),
  ];

  const invalidMethods = normalized.filter(
    (method) => !ALLOWED_PAYMENT_METHODS.includes(method)
  );

  if (invalidMethods.length > 0) {
    throw new Error(
      `Método de pagamento não suportado: ${invalidMethods.join(", ")}.`
    );
  }

  return normalized;
};

const publicOrder = (order) => ({
  reference: order.reference,
  status: order.status,
  subtotal: order.subtotal,
  total: order.total,
  currency: order.currency,
  paymentMethods: order.paymentMethods,
});

const verifyWebhookSignature = (req) => {
  const signature = req.headers["x-webhook-signature"];

  if (!signature || !req.rawBody) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", process.env.PAYSUITE_WEBHOOK_SECRET)
    .update(req.rawBody)
    .digest("hex");

  const receivedBuffer = Buffer.from(
    String(signature).trim(),
    "hex"
  );

  const expectedBuffer = Buffer.from(expected, "hex");

  return (
    receivedBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
  );
};

const getPaySuitePayment = async (paymentId) => {
  const response = await fetch(
    `${API_URL}/payments/${encodeURIComponent(paymentId)}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${process.env.PAYSUITE_API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      signal: AbortSignal.timeout(15000),
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.status !== "success" || !data.data) {
    throw new Error(
      data.message ||
        "Não foi possível verificar o pagamento no PaySuite."
    );
  }

  return data.data;
};

/* ============================================================
   ORDER ITEMS
============================================================ */

/*
 * Formato esperado pelo endpoint:
 *
 * {
 *   id: "product-123",
 *   name: "Produto",
 *   price: 1500,
 *   image: "https://example.com/image.jpg",
 *   quantity: 2
 * }
 */

const prepareOrderItems = (items) => {
  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    items.length > 50
  ) {
    throw new Error("Carrinho inválido.");
  }

  const requestedItems = new Map();

  for (const item of items) {
    if (!item || typeof item !== "object") {
      throw new Error("Dados de produto inválidos.");
    }

    const id = String(item.id || "").trim();
    const name = String(item.name || "").trim();
    const price = Number(item.price);
    const quantity = Number(item.quantity);

    const image =
      typeof item.image === "string" && item.image.trim()
        ? item.image.trim()
        : null;

    if (!id || id.length > 150) {
      throw new Error("Identificador de produto inválido.");
    }

    if (!name || name.length > 250) {
      throw new Error("Nome de produto inválido.");
    }

    if (
      !Number.isFinite(price) ||
      price < 0 ||
      price > 100000000
    ) {
      throw new Error(`Preço inválido para o produto ${name}.`);
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 100
    ) {
      throw new Error(
        `Quantidade inválida para o produto ${name}.`
      );
    }

    if (image && image.length > 2048) {
      throw new Error("URL da imagem demasiado longa.");
    }

    const normalizedItem = {
      productId: id,
      name,
      image,
      quantity,
      unitPrice: roundMoney(price),
    };

    const existing = requestedItems.get(id);

    if (existing) {
      if (
        existing.name !== normalizedItem.name ||
        existing.unitPrice !== normalizedItem.unitPrice ||
        existing.image !== normalizedItem.image
      ) {
        throw new Error(
          `Os dados do produto ${name} são inconsistentes.`
        );
      }

      existing.quantity += quantity;

      if (existing.quantity > 100) {
        throw new Error(
          `Quantidade máxima excedida para ${name}.`
        );
      }
    } else {
      requestedItems.set(id, normalizedItem);
    }
  }

  return [...requestedItems.values()].map((item) => ({
    ...item,
    lineTotal: roundMoney(item.unitPrice * item.quantity),
  }));
};

/* ============================================================
   PAYMENT CONFIRMATION
============================================================ */

const markOrderAsPaid = async (
  order,
  paymentData,
  eventId = null
) => {
  if (order.status === "paid") {
    return order;
  }

  const paidAmount = Number(paymentData.amount);
  const paymentReference = paymentData.reference;

  if (paymentReference !== order.reference) {
    throw new Error(
      "A referência do pagamento não corresponde à encomenda."
    );
  }

  if (
    !Number.isFinite(paidAmount) ||
    roundMoney(paidAmount) !== roundMoney(order.total)
  ) {
    throw new Error(
      "O montante confirmado não corresponde ao total da encomenda."
    );
  }

  const transaction = paymentData.transaction || {};

  order.status = "paid";

  order.paidAt = transaction.paid_at
    ? new Date(transaction.paid_at)
    : new Date();

  order.transactionId =
    transaction.transaction_id || transaction.id || null;

  order.receiptNumber =
    order.receiptNumber || makeReceiptNumber();

  if (eventId && !order.webhookEvents.includes(eventId)) {
    order.webhookEvents.push(eventId);
  }

  await order.save();

  return order;
};

/* ============================================================
   HEALTH CHECK
============================================================ */

app.get("/", (req, res) => {
  res.json({
    service: "Tanosi API",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

/* ============================================================
   CREATE CHECKOUT
============================================================ */

app.post("/api/checkout", async (req, res) => {
  let createdOrder = null;

  try {
    const {
      customer,
      paymentMethod,
      paymentMethods,
      items,
    } = req.body || {};

    /* -------------------------
       Validate customer
    ------------------------- */

    if (
      !customer ||
      !customer.firstName ||
      !customer.lastName ||
      !customer.phone ||
      !customer.address
    ) {
      return res.status(400).json({
        error: "Preencha todos os dados do cliente.",
      });
    }

    const firstName = String(customer.firstName).trim();
    const lastName = String(customer.lastName).trim();
    const phone = String(customer.phone).trim();
    const address = String(customer.address).trim();

    const normalizedPhone = phone.replace(/[\s()-]/g, "");

    if (!/^\+?\d{9,15}$/.test(normalizedPhone)) {
      return res.status(400).json({
        error: "Número de telefone inválido.",
      });
    }

    if (
      firstName.length < 2 ||
      lastName.length < 2 ||
      address.length < 5 ||
      firstName.length > 100 ||
      lastName.length > 100 ||
      address.length > 500
    ) {
      return res.status(400).json({
        error: "Os dados do cliente são inválidos.",
      });
    }

    /* -------------------------
       Validate payment methods
    ------------------------- */

    let availablePaymentMethods;

    try {
      availablePaymentMethods =
        preparePaymentMethods(paymentMethods);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    /*
     * O checkout actual envia "carteiras-moveis".
     * Este valor é aceite para manter compatibilidade
     * com o frontend, mas não força um método na PaySuite.
     */

    const acceptedPaymentSelections = [
      undefined,
      null,
      "",
      "automatic",
      "carteiras-moveis",
    ];

    if (!acceptedPaymentSelections.includes(paymentMethod)) {
      return res.status(400).json({
        error: "Selecção de pagamento inválida.",
      });
    }

    const method = getPaymentMethod(paymentMethod);

    /* -------------------------
       Validate products
    ------------------------- */

    let orderItems;

    try {
      orderItems = prepareOrderItems(items);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    /*
     * Os produtos são recebidos directamente do frontend.
     * Não existe consulta a uma colecção Products.
     */

    /* -------------------------
       Calculate totals
    ------------------------- */

    const subtotal = roundMoney(
      orderItems.reduce(
        (sum, item) => sum + item.lineTotal,
        0
      )
    );

    /*
     * Não existe taxa de 6%.
     * O total é exactamente igual ao subtotal.
     */

    const total = subtotal;

    if (!Number.isFinite(total) || total <= 0) {
      return res.status(400).json({
        error: "O total da encomenda é inválido.",
      });
    }

    /* -------------------------
       Prepare order
    ------------------------- */

    const reference = formatReference();

    const receiptToken = crypto.randomBytes(32).toString("hex");

    const frontendBase = FRONTEND_URL
      .split(",")[0]
      .trim()
      .replace(/\/$/, "");

    const returnUrl =
      `${frontendBase}/sucesso?ref=${encodeURIComponent(reference)}` +
      `&token=${encodeURIComponent(receiptToken)}`;

    const callbackUrl =
      `${BACKEND_PUBLIC_URL}/api/webhooks/paysuite`;

    /* -------------------------
       Save order in MongoDB
    ------------------------- */

    createdOrder = await Order.create({
      reference,

      customer: {
        name: `${firstName} ${lastName}`,
        phone,
        address,
      },

      items: orderItems,

      subtotal,
      total,

      currency: CURRENCY,

      paymentMethods: availablePaymentMethods,

      paymentMethod: "automatic",

      receiptTokenHash: sha256(receiptToken),

      status: "pending",
    });

    /* -------------------------
       Create PaySuite payment
    ------------------------- */

    const paymentPayload = {
      amount: total, //total
      reference,

      description: `Encomenda Tanosi ${reference}`,

      return_url: returnUrl,

      callback_url: callbackUrl,
    };

    /*
     * Não enviamos paymentPayload.method.
     *
     * A PaySuite deverá apresentar os métodos activos
     * e configurados na conta do comerciante.
     */

    if (method) {
      paymentPayload.method = method;
    }

    const paymentResponse = await fetch(
      `${API_URL}/payments`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.PAYSUITE_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(paymentPayload),

        signal: AbortSignal.timeout(20000),
      }
    );

    const paymentResult = await paymentResponse
      .json()
      .catch(() => ({}));

    if (
      !paymentResponse.ok ||
      paymentResult.status !== "success" ||
      !paymentResult.data?.checkout_url ||
      !paymentResult.data?.id
    ) {
      console.error(
        "PaySuite create payment error:",
        paymentResult
      );

      createdOrder.status = "failed";

      createdOrder.failureReason =
        paymentResult.message ||
        "PaySuite não conseguiu criar o pagamento.";

      await createdOrder.save();

      return res.status(502).json({
        error:
          paymentResult.message ||
          "Não foi possível iniciar o pagamento.",
      });
    }

    /* -------------------------
       Save payment information
    ------------------------- */

    createdOrder.paymentId = String(paymentResult.data.id);

    createdOrder.checkoutUrl =
      paymentResult.data.checkout_url;

    await createdOrder.save();

    /* -------------------------
       Return checkout URL
    ------------------------- */

    return res.status(201).json({
      success: true,

      reference,

      checkoutUrl: paymentResult.data.checkout_url,

      subtotal,

      total,

      currency: createdOrder.currency,

      paymentMethods: createdOrder.paymentMethods,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    console.error("Cause:", error.cause);

    if (
      createdOrder &&
      createdOrder.status === "pending" &&
      !createdOrder.paymentId
    ) {
      createdOrder.status = "failed";

      createdOrder.failureReason =
        "Erro ao iniciar pagamento.";

      await createdOrder.save().catch(() => {});
    }

    return res.status(500).json({
      error:
        error.message ||
        "Erro interno ao processar a encomenda.",
    });
  }
});

/* ============================================================
   PAYSUITE WEBHOOK
============================================================ */

app.post("/api/webhooks/paysuite", async (req, res) => {
  try {
    if (!verifyWebhookSignature(req)) {
      console.warn(
        "Webhook PaySuite rejeitado: assinatura inválida."
      );

      return res.status(401).json({
        error: "Invalid signature.",
      });
    }

    const payload = req.body || {};

    const eventName = payload.event;

    const data = payload.data || {};

    const eventId = String(
      payload.request_id || data.id || ""
    );

    if (!eventId || !eventName || !data.reference) {
      return res.status(400).json({
        error: "Invalid webhook payload.",
      });
    }

    /* -------------------------
       Find order
    ------------------------- */

    const order = await Order.findOne({
      reference: data.reference,
    });

    if (!order) {
      console.error(
        "Webhook recebido para referência desconhecida:",
        data.reference
      );

      return res.status(404).json({
        error: "Order not found.",
      });
    }

    /* -------------------------
       Check duplicate event
    ------------------------- */

    const existingEvent = await WebhookEvent.findOne({
      eventId,
    });

    if (existingEvent) {
      return res.status(200).json({
        received: true,
        duplicate: true,
      });
    }

    /* -------------------------
       Successful payment
    ------------------------- */

    if (eventName === "payment.success") {
      if (
        order.paymentId &&
        String(data.id) !== String(order.paymentId)
      ) {
        return res.status(400).json({
          error: "Payment ID mismatch.",
        });
      }

      await markOrderAsPaid(order, data, eventId);
    }

    /* -------------------------
       Failed payment
    ------------------------- */

    else if (eventName === "payment.failed") {
      if (order.status !== "paid") {
        order.status = "failed";

        order.failureReason = String(
          data.error || "Pagamento não concluído."
        );

        await order.save();
      }
    }

    /* -------------------------
       Register processed event
    ------------------------- */

    await WebhookEvent.create({
      eventId,
      event: eventName,
    });

    return res.status(200).json({
      received: true,
    });
  } catch (error) {
    console.error("PaySuite webhook error:", error);

    return res.status(500).json({
      error: "Webhook processing failed.",
    });
  }
});

/* ============================================================
   GET RECEIPT / ORDER STATUS
============================================================ */

app.get(
  "/api/orders/:reference/receipt",
  async (req, res) => {
    try {
      const { reference } = req.params;
      const { token } = req.query;

      const order = await Order.findOne({
        reference,
      });

      if (
        !order ||
        !safeTokenCompare(token, order.receiptTokenHash)
      ) {
        return res.status(404).json({
          error: "Encomenda não encontrada.",
        });
      }

      /*
       * Se o webhook ainda não tiver chegado, consultamos
       * a PaySuite. O regresso à página de sucesso não
       * é suficiente para confirmar um pagamento.
       */

      if (order.status === "pending" && order.paymentId) {
        try {
          const payment = await getPaySuitePayment(
            order.paymentId
          );

          if (
            payment.status === "paid" ||
            payment.status === "completed"
          ) {
            await markOrderAsPaid(order, payment);
          } else if (
            payment.status === "failed" ||
            payment.status === "cancelled"
          ) {
            order.status = "failed";

            order.failureReason =
              `PaySuite: ${payment.status}`;

            await order.save();
          }
        } catch (verificationError) {
          console.warn(
            "Payment verification pending:",
            verificationError.message
          );

          // Mantém pending: o webhook pode chegar posteriormente.
        }
      }

      if (order.status === "failed") {
        return res.json({
          status: "failed",
        });
      }

      if (order.status !== "paid") {
        return res.json({
          status: "pending",
        });
      }

      return res.json({
        status: "paid",

        reference: order.reference,

        receiptNumber: order.receiptNumber,

        paidAt: order.paidAt,

        customer: order.customer,

        items: order.items,

        subtotal: order.subtotal,

        total: order.total,

        currency: order.currency,

        paymentMethods: order.paymentMethods,

        paymentMethod: order.paymentMethod,

        transactionId: order.transactionId,
      });
    } catch (error) {
      console.error("Receipt error:", error);

      return res.status(500).json({
        error: "Não foi possível carregar o recibo.",
      });
    }
  }
);

/* ============================================================
   DOWNLOAD PDF RECEIPT
============================================================ */

app.get(
  "/api/orders/:reference/receipt.pdf",
  async (req, res) => {
    try {
      const order = await Order.findOne({
        reference: req.params.reference,
      });

      const token = req.query.token;

      if (
        !order ||
        !safeTokenCompare(token, order.receiptTokenHash)
      ) {
        return res.status(404).json({
          error: "Recibo não encontrado.",
        });
      }

      if (order.status !== "paid") {
        return res.status(409).json({
          error: "O pagamento ainda não foi confirmado.",
        });
      }

      res.setHeader("Content-Type", "application/pdf");

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="Tanosi-${order.receiptNumber}.pdf"`
      );

      const doc = new PDFDocument({
        size: "A4",
        margin: 52,
      });

      doc.pipe(res);

      doc.fontSize(22)
        .font("Helvetica-Bold")
        .text("TANOSI");

      doc.moveDown(0.3);

      doc.fontSize(9)
        .font("Helvetica")
        .fillColor("#666666")
        .text("RECIBO DE PAGAMENTO");

      doc.moveDown();

      doc.fillColor("#000000")
        .fontSize(13)
        .font("Helvetica-Bold")
        .text(order.receiptNumber);

      doc.fontSize(9)
        .font("Helvetica")
        .text(`Referência: ${order.reference}`)
        .text(
          `Data: ${new Date(order.paidAt).toLocaleString(
            "pt-PT",
            {
              timeZone: "Africa/Maputo",
            }
          )}`
        );

      doc.moveDown();

      doc.moveTo(52, doc.y)
        .lineTo(543, doc.y)
        .strokeColor("#dddddd")
        .stroke();

      doc.moveDown();

      doc.font("Helvetica-Bold")
        .fontSize(10)
        .text("DADOS DO CLIENTE");

      doc.moveDown(0.4);

      doc.font("Helvetica")
        .fontSize(9)
        .text(`Nome: ${order.customer.name}`)
        .text(`Telefone: ${order.customer.phone}`)
        .text(`Morada: ${order.customer.address}`);

      doc.moveDown();

      doc.font("Helvetica-Bold")
        .fontSize(10)
        .text("ARTIGOS");

      doc.moveDown(0.5);

      for (const item of order.items) {
        doc.font("Helvetica-Bold")
          .fontSize(9)
          .text(item.name);

        doc.font("Helvetica")
          .fontSize(9)
          .text(
            `${item.quantity} x ${item.unitPrice.toFixed(2)} ${order.currency}`,
            {
              continued: true,
            }
          )
          .text(
            `     ${item.lineTotal.toFixed(2)} ${order.currency}`,
            {
              align: "right",
            }
          );

        doc.moveDown(0.5);
      }

      doc.moveDown();

      doc.moveTo(52, doc.y)
        .lineTo(543, doc.y)
        .strokeColor("#dddddd")
        .stroke();

      doc.moveDown();

      const money = (value) =>
        `${Number(value).toLocaleString("pt-PT", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} ${order.currency}`;

      doc.font("Helvetica")
        .fontSize(10);

      doc.text(`Subtotal: ${money(order.subtotal)}`);

      doc.moveDown(0.5);

      doc.font("Helvetica-Bold")
        .fontSize(16)
        .text(`TOTAL PAGO: ${money(order.total)}`);

      doc.moveDown();

      doc.font("Helvetica")
        .fontSize(9)
        .text(
          `Método de pagamento: ${order.paymentMethod || "PaySuite"}`
        )
        .text(
          `Transacção: ${order.transactionId || "N/A"}`
        );

      doc.moveDown(2);

      doc.fillColor("#777777")
        .fontSize(8)
        .text(
          "Obrigado por comprar na Tanosi.",
          {
            align: "center",
          }
        );

      doc.end();
    } catch (error) {
      console.error("PDF receipt error:", error);

      if (!res.headersSent) {
        res.status(500).json({
          error: "Não foi possível gerar o PDF.",
        });
      }
    }
  }
);

/* ============================================================
   ADMIN ROUTES
============================================================ */

const requireAdmin = (req, res, next) => {
  const provided = req.headers["x-admin-key"];
  const expected = process.env.ADMIN_API_KEY;

  if (!expected || typeof provided !== "string") {
    return res.status(401).json({
      error: "Unauthorized.",
    });
  }

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);

  if (
    a.length !== b.length ||
    !crypto.timingSafeEqual(a, b)
  ) {
    return res.status(401).json({
      error: "Unauthorized.",
    });
  }

  next();
};

app.get(
  "/api/admin/orders",
  requireAdmin,
  async (req, res) => {
    try {
      const orders = await Order.find()
        .select("-receiptTokenHash -webhookEvents")
        .sort({
          createdAt: -1,
        })
        .limit(200)
        .lean();

      return res.json(orders);
    } catch (error) {
      console.error("Admin orders error:", error);

      return res.status(500).json({
        error: "Não foi possível carregar as encomendas.",
      });
    }
  }
);

/*
 * Não permitimos que o painel administrativo marque
 * manualmente uma encomenda como paga.
 *
 * O estado paid só pode ser confirmado pela PaySuite.
 */

app.patch(
  "/api/admin/orders/:id/status",
  requireAdmin,
  async (req, res) => {
    try {
      const { status } = req.body || {};

      if (!["pending", "failed"].includes(status)) {
        return res.status(400).json({
          error:
            "Estado inválido. O estado paid só pode ser confirmado pelo PaySuite.",
        });
      }

      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({
          error: "Encomenda não encontrada.",
        });
      }

      if (order.status === "paid") {
        return res.status(409).json({
          error:
            "Uma encomenda paga não pode ser alterada.",
        });
      }

      order.status = status;

      await order.save();

      return res.json({
        success: true,
        order: publicOrder(order),
      });
    } catch (error) {
      console.error("Admin update error:", error);

      return res.status(500).json({
        error: "Não foi possível actualizar a encomenda.",
      });
    }
  }
);

/* ============================================================
   ERROR HANDLER
============================================================ */

app.use((err, req, res, next) => {
  console.error("Unhandled API error:", err);

  res.status(500).json({
    error: "Erro interno do servidor.",
  });
});

/* ============================================================
   START SERVER
============================================================ */

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `Tanosi API running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error("Could not start backend:", error);

    process.exit(1);
  }
};

startServer();
