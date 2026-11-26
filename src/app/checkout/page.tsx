"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ShieldCheck,
  MapPin,
  Lock,
  ShoppingBag,
  ArrowLeft,
  User,
  Home,
  PackageCheck,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Phone,
  Smartphone,
  CreditCard,
  Receipt,
  CheckCircle2,
  Truck,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { Footer } from "@/components/footer";

/* ============================================================
   TYPES
============================================================ */

type MobileStep = "dados" | "resumo";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
};

type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
};

/* ============================================================
   PAYMENT METHODS
============================================================ */

const AVAILABLE_PAYMENT_METHODS = [
  {
    id: "mpesa",
    name: "M-Pesa",
    description: "Pagamento através da carteira móvel M-Pesa.",
    image: "/items/mpesa.jpeg",
    type: "image",
  },
  {
    id: "emola",
    name: "E-Mola",
    description: "Pague de forma simples através da E-Mola.",
    image: "/items/emola.png",
    type: "image",
  },
  {
    id: "mkesh",
    name: "mKesh",
    description: "Utilize a sua carteira móvel mKesh.",
    image: "/items/mkesh.png",
    type: "image",
  },
  {
    id: "credit_card",
    name: "Cartão bancário",
    description: "Pagamento com cartão bancário, quando disponível.",
    type: "icon",
    icon: CreditCard,
  },
  {
    id: "reference",
    name: "Pagamento por referência",
    description: "Pague através dos dados de referência apresentados.",
    type: "icon",
    icon: Receipt,
  },
] as const;

/* ============================================================
   STYLES
============================================================ */

const inputClassName =
  "w-full min-h-[54px] rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-black outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-black focus:ring-4 focus:ring-black/[0.04] disabled:cursor-not-allowed disabled:bg-zinc-50";

const labelClassName =
  "flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500";

const sectionClassName =
  "overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_35px_rgba(0,0,0,0.035)]";

/* ============================================================
   FORMATTERS
============================================================ */

const formatMZN = (value: number) =>
  `MZN ${value.toLocaleString("pt-PT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

/* ============================================================
   REUSABLE COMPONENTS
============================================================ */

function SectionHeading({
  icon: Icon,
  title,
  description,
  number,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  number?: string;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-zinc-100 px-5 py-5 sm:px-7 sm:py-6">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50">
        <Icon size={18} className="text-black" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-black uppercase tracking-tight text-black sm:text-base">
            {title}
          </h2>

          {number && (
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[8px] font-bold text-zinc-500">
              {number}
            </span>
          )}
        </div>

        <p className="mt-1 text-[11px] leading-5 text-zinc-500">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   PAYMENT INFORMATION
============================================================ */

function PaymentInformation({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <section
      className={`rounded-2xl border border-zinc-200 bg-white ${
        compact ? "p-5" : "p-6 sm:p-7"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50">
          <ShieldCheck size={18} className="text-black" />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-black uppercase tracking-tight text-black">
            Métodos de pagamento
          </h3>

          <p className="mt-1 text-[11px] leading-5 text-zinc-500">
            Escolha a opção mais conveniente na página segura de pagamento.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {AVAILABLE_PAYMENT_METHODS.map((method) => {
          const Icon =
            "icon" in method && method.icon
              ? method.icon
              : null;

          return (
            <div
              key={method.id}
              className="flex min-h-[94px] flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50/70 p-3 transition-all duration-200 hover:border-zinc-400 hover:bg-white"
            >
              <div className="flex h-9 items-center">
                {"image" in method && method.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={method.image}
                    alt={method.name}
                    className="max-h-8 max-w-[82px] object-contain object-left"
                  />
                ) : Icon ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white">
                    <Icon size={17} className="text-zinc-700" />
                  </div>
                ) : null}
              </div>

              <div className="mt-3">
                <p className="text-[10px] font-black text-black">
                  {method.name}
                </p>
                {!compact && (
                  <p className="mt-1 text-[8px] leading-4 text-zinc-500">
                    {method.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-zinc-200 bg-zinc-50 p-3.5">
        <Lock size={13} className="mt-0.5 shrink-0 text-zinc-500" />

        <p className="text-[9px] leading-5 text-zinc-500">
          O pagamento será efectuado numa página segura da PaySuite. Os
          métodos apresentados dependem da disponibilidade e configuração
          da conta de pagamento.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   ORDER ITEMS
============================================================ */

function OrderItems({
  items,
  compact = false,
}: {
  items: CheckoutItem[];
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "space-y-4 p-5"
          : "max-h-[440px] space-y-5 overflow-y-auto p-7"
      }
    >
      {items.map((item) => (
        <div key={item.id} className="flex gap-3.5 sm:gap-4">
          <div
            className={`relative shrink-0 overflow-hidden rounded-xl bg-zinc-100 ${
              compact ? "h-20 w-16" : "h-24 w-20"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80"
              }
              alt={item.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[8px] font-bold text-white">
              {item.quantity}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div>
              <h3 className="line-clamp-2 text-[12px] font-bold leading-[1.3] text-black sm:text-sm">
                {item.name}
              </h3>

              <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-zinc-400">
                Quantidade / {item.quantity}
              </p>
            </div>

            <p className="text-[12px] font-bold text-black sm:text-sm">
              {formatMZN(item.price * item.quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   ORDER TOTALS — WITHOUT TAXES
============================================================ */

function OrderTotals({
  subtotal,
  total,
  compact = false,
}: {
  subtotal: number;
  total: number;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "border-t border-zinc-200 p-5"
          : "border-t border-zinc-200 px-7 py-7"
      }
    >
      <div className="flex items-center justify-between text-[11px] sm:text-sm">
        <span className="text-zinc-500">Subtotal</span>
        <span className="font-medium text-zinc-800">
          {formatMZN(subtotal)}
        </span>
      </div>

      <div className="my-5 h-px bg-zinc-200" />

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Total da encomenda
          </p>

          <p
            className={`mt-1 font-black leading-none tracking-[-0.05em] text-black ${
              compact ? "text-[29px]" : "text-3xl"
            }`}
          >
            {formatMZN(total)}
          </p>

          <p className="mt-2 text-[9px] text-zinc-400">
            Sem custos adicionais.
          </p>
        </div>

        <span className="rounded-full border border-zinc-200 px-2.5 py-1 text-[7px] font-bold uppercase tracking-widest text-zinc-500">
          MZN
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   CUSTOMER DETAILS FORM
============================================================ */

function CustomerFields({
  formData,
  onChange,
  prefix,
}: {
  formData: FormData;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  prefix: string;
}) {
  return (
    <div className="space-y-5 p-5 sm:p-7">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor={`${prefix}-firstName`} className={labelClassName}>
            <User size={11} />
            Nome
          </label>

          <input
            id={`${prefix}-firstName`}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            placeholder="O seu nome"
            autoComplete="given-name"
            className={inputClassName}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor={`${prefix}-lastName`} className={labelClassName}>
            Apelido
          </label>

          <input
            id={`${prefix}-lastName`}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            placeholder="O seu apelido"
            autoComplete="family-name"
            className={inputClassName}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor={`${prefix}-phone`} className={labelClassName}>
          <Phone size={11} />
          Número de telefone
        </label>

        <input
          id={`${prefix}-phone`}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="+258 84 000 0000"
          autoComplete="tel"
          inputMode="tel"
          className={inputClassName}
        />

        <p className="px-1 text-[9px] leading-5 text-zinc-400">
          Utilize um número válido para podermos contactá-lo sobre a sua
          encomenda.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor={`${prefix}-address`} className={labelClassName}>
          <Home size={11} />
          Morada de entrega
        </label>

        <input
          id={`${prefix}-address`}
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Rua, avenida, número e bairro..."
          autoComplete="street-address"
          className={inputClassName}
        />

        <p className="px-1 text-[9px] leading-5 text-zinc-400">
          Indique uma morada completa para facilitar a entrega.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function CheckoutPage() {
  const { items } = useCartStore();

  const [mounted, setMounted] = React.useState(false);
  const [mobileStep, setMobileStep] =
    React.useState<MobileStep>("dados");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const [formData, setFormData] = React.useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  /* ============================================================
     TOTALS — ORIGINAL PRODUCT PRICES ONLY
  ============================================================ */

  const subtotal = React.useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      ),
    [items]
  );

  // Não existe taxa, imposto adicional ou custo de entrega no checkout.
  const total = subtotal;

  const totalItems = React.useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
      ),
    [items]
  );

  /* ============================================================
     FORM
  ============================================================ */

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const validateCustomerDetails = () => {
    const requiredFields = [
      formData.firstName,
      formData.lastName,
      formData.phone,
      formData.address,
    ];

    if (requiredFields.some((field) => !field.trim())) {
      toast.error("Informação em falta", {
        description:
          "Preencha todos os dados necessários para continuar.",
      });

      return false;
    }

    const normalizedPhone = formData.phone.replace(/[\s()-]/g, "");

    if (!/^\+?\d{9,15}$/.test(normalizedPhone)) {
      toast.error("Número de telefone inválido", {
        description:
          "Introduza um número de telefone válido, incluindo o indicativo se necessário.",
      });

      return false;
    }

    if (formData.firstName.trim().length < 2) {
      toast.error("Nome inválido", {
        description: "Introduza um nome válido.",
      });

      return false;
    }

    if (formData.lastName.trim().length < 2) {
      toast.error("Apelido inválido", {
        description: "Introduza um apelido válido.",
      });

      return false;
    }

    if (formData.address.trim().length < 5) {
      toast.error("Morada inválida", {
        description: "Introduza uma morada de entrega completa.",
      });

      return false;
    }

    return true;
  };

  const handleMobileContinue = () => {
    if (!validateCustomerDetails()) return;

    setMobileStep("resumo");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMobileBack = () => {
    setMobileStep("dados");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ============================================================
     PAYMENT
  ============================================================ */

  
const continueToPayment = async () => {
  if (isProcessing) return;

  if (!validateCustomerDetails() || !items.length) return;

  const API_URL ="https://5d79-41-220-200-101.ngrok-free.app";

  if (!API_URL) {
    toast.error("Configuração em falta", {
      description:
        "O serviço de pagamentos não está configurado. Contacte o suporte.",
    });
    return;
  }

  const checkoutItems: CheckoutItem[] = items.map((item: any) => ({
    id: String(
      item.id ??
      item._id ??
      item.productId ??
      ""
    ).trim(),

    name: String(item.name ?? "").trim(),
    price: Number(item.price),
    image: item.image ? String(item.image) : null,
    quantity: Number(item.quantity ?? item.qty),
  }));

  const invalidItem = checkoutItems.find(
    (item) =>
      !item.id ||
      !item.name ||
      !Number.isFinite(item.price) ||
      item.price < 0 ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
  );

  if (invalidItem) {
    console.error("========== TANOSI CHECKOUT DEBUG ==========");
    console.log("Artigos originais do carrinho:", items);
    console.error("Artigos preparados para checkout:", checkoutItems);
    console.error("Artigo inválido:", invalidItem);
    console.error("===========================================");

    toast.error("Dados dos produtos inválidos", {
      description:
        "Um ou mais artigos não têm informação válida. Consulte a consola para identificar o problema.",
    });

    return;
  }

  const customer = {
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    phone: formData.phone.trim(),
    address: formData.address.trim(),
  };

  const checkoutPayload = {
    customer,
    paymentMethod: "carteiras-moveis",
    paymentMethods: [
      "mpesa",
      "emola",
      "mkesh",
      "credit_card",
      "reference",
    ],
    currency: "MZN",
    items: checkoutItems,
  };

  setIsProcessing(true);

  try {
    const response = await fetch(`https://5d79-41-220-200-101.ngrok-free.app/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(checkoutPayload),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        result.error || "Não foi possível iniciar o pagamento."
      );
    }

    if (!result.checkoutUrl) {
      throw new Error(
        "O backend não devolveu um endereço de pagamento válido."
      );
    }

    // Generate the receipt information from the actual checkout form.
    const subtotal = checkoutItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const reference =
      result.reference ||
      result.orderReference ||
      result.order?.reference ||
      `TNS-${Date.now()}`;

    const pendingReceipt = {
      status: "paid",
      reference: String(reference),
      receiptNumber:
        result.receiptNumber ||
        result.order?.receiptNumber ||
        `TNS-${String(reference)}`,
      createdAt: new Date().toISOString(),

      customer: {
        name: `${customer.firstName} ${customer.lastName}`,
        phone: customer.phone,
        address: customer.address,
      },

      items: checkoutItems.map((item) => ({
        productId: item.id,
        name: item.name,
        image: item.image || null,
        quantity: item.quantity,
        unitPrice: item.price,
        lineTotal: item.price * item.quantity,
      })),

      subtotal,
      tax: 0,
      taxRate: 0,
      total: subtotal,

      paymentMethod: "PaySuite",
      transactionId:
        result.transactionId ||
        result.transaction?.id ||
        null,
    };

    // Save the receipt before redirecting to the payment provider.
    sessionStorage.setItem(
      "tanosi_pending_receipt",
      JSON.stringify(pendingReceipt)
    );

    // Redirect only after the receipt information has been saved.
    window.location.assign(result.checkoutUrl);

  } catch (error) {
    console.error("Checkout error:", error);

    toast.error("Não foi possível iniciar o pagamento", {
      description:
        error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado. Tente novamente.",
    });

    setIsProcessing(false);
  }
};

  /* ============================================================
     LOADING
  ============================================================ */

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-8 w-8 rounded-full border-2 border-zinc-200 border-t-black"
        />
      </div>
    );
  }

  /* ============================================================
     EMPTY CART
  ============================================================ */

  if (items.length === 0) {
    return (
      <>
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-5 py-24 text-black sm:px-6">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/4 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-zinc-100 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-xl text-center"
          >
            <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50">
              <ShoppingBag
                size={38}
                strokeWidth={1.4}
                className="text-zinc-400"
              />
            </div>

            <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-400">
              Checkout / Carrinho vazio
            </p>

            <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-black">
              Nada por aqui.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-zinc-500">
              O seu carrinho está vazio. Explore as últimas peças da Tanosi
              e encontre algo que represente o seu movimento.
            </p>

            <Link
              href="/collections/all"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-800 active:scale-[0.98]"
            >
              Começar a comprar
              <ChevronRight size={15} />
            </Link>
          </motion.div>
        </main>

        <Footer />
      </>
    );
  }

  /* ============================================================
     MOBILE CHECKOUT
  ============================================================ */

  const renderMobileCheckout = () => {
    const isDetailsStep = mobileStep === "dados";

    return (
      <div className="block lg:hidden">
        <div className="mb-7 flex items-center justify-between">
          <Link
            href="/collections"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-600 transition-colors hover:border-black hover:text-black"
          >
            <ArrowLeft size={14} />
            Voltar
          </Link>

          <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-wider text-zinc-400">
            <Lock size={11} />
            Checkout seguro
          </div>
        </div>

        <div className="mb-7">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-7 bg-black/30" />

            <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Tanosi / Checkout
            </p>
          </div>

          <h1 className="text-[clamp(2.7rem,13vw,4.4rem)] font-black uppercase leading-[0.86] tracking-[-0.065em] text-black">
            {isDetailsStep ? (
              <>
                Os seus
                <br />
                dados.
              </>
            ) : (
              <>
                A sua
                <br />
                encomenda.
              </>
            )}
          </h1>

          <p className="mt-4 max-w-sm text-[12px] leading-6 text-zinc-500">
            {isDetailsStep
              ? "Introduza os seus dados para prepararmos a sua encomenda."
              : "Confira os artigos e o valor final antes de avançar para o pagamento."}
          </p>
        </div>

        <div className="mb-7">
          <div className="grid grid-cols-2 gap-1.5">
            <div
              className={`h-1 rounded-full transition-colors duration-300 ${
                isDetailsStep ? "bg-black" : "bg-zinc-200"
              }`}
            />

            <div
              className={`h-1 rounded-full transition-colors duration-300 ${
                !isDetailsStep ? "bg-black" : "bg-zinc-200"
              }`}
            />
          </div>

          <div className="mt-2 flex justify-between">
            <span
              className={`text-[7px] font-bold uppercase tracking-[0.18em] ${
                isDetailsStep ? "text-black" : "text-zinc-400"
              }`}
            >
              01 / Dados
            </span>

            <span
              className={`text-[7px] font-bold uppercase tracking-[0.18em] ${
                !isDetailsStep ? "text-black" : "text-zinc-400"
              }`}
            >
              02 / Resumo
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {isDetailsStep ? (
            <motion.div
              key="mobile-dados"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <section className={sectionClassName}>
                <SectionHeading
                  icon={MapPin}
                  title="Dados de entrega"
                  description="Onde devemos entregar?"
                  number="01"
                />

                <CustomerFields
                  formData={formData}
                  onChange={handleInputChange}
                  prefix="mobile"
                />
              </section>

              <button
                type="button"
                onClick={handleMobileContinue}
                className="group mt-4 flex min-h-[58px] w-full items-center justify-center gap-3 rounded-xl bg-black px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-zinc-800 active:scale-[0.985]"
              >
                Ver resumo
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="mobile-resumo"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <section className={sectionClassName}>
                <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-5">
                  <div>
                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                      Encomenda
                    </p>

                    <h2 className="mt-1 text-xl font-black uppercase tracking-tight text-black">
                      Resumo
                    </h2>
                  </div>

                  <div className="flex h-9 min-w-9 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-2 text-[9px] font-black text-zinc-600">
                    {totalItems}
                  </div>
                </div>

                <OrderItems items={items} compact />

                <OrderTotals
                  subtotal={subtotal}
                  total={total}
                  compact
                />
              </section>

              <section className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Dados de entrega
                    </p>

                    <h3 className="mt-1 truncate text-[12px] font-black uppercase text-black">
                      {formData.firstName} {formData.lastName}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleMobileBack}
                    className="shrink-0 text-[8px] font-bold uppercase tracking-wider text-zinc-500 underline underline-offset-4 transition-colors hover:text-black"
                  >
                    Alterar
                  </button>
                </div>

                <div className="space-y-2 text-[10px] leading-5 text-zinc-500">
                  <p className="flex items-start gap-2">
                    <Phone size={12} className="mt-1 shrink-0" />
                    {formData.phone}
                  </p>

                  <p className="flex items-start gap-2">
                    <Home size={12} className="mt-1 shrink-0" />
                    <span>{formData.address}</span>
                  </p>
                </div>
              </section>

              <div className="mt-4">
                <PaymentInformation compact />
              </div>

              <button
                type="button"
                onClick={continueToPayment}
                disabled={isProcessing}
                className="group mt-4 flex min-h-[60px] w-full items-center justify-center gap-3 rounded-xl bg-black px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-zinc-800 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white"
                    />
                    A preparar pagamento...
                  </>
                ) : (
                  <>
                    Pagar agora
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleMobileBack}
                disabled={isProcessing}
                className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-black disabled:opacity-40"
              >
                <ChevronLeft size={13} />
                Voltar aos dados
              </button>

              <div className="mt-4 flex items-start gap-2.5 text-[8px] leading-5 text-zinc-400">
                <Lock size={11} className="mt-0.5 shrink-0" />

                <p>
                  Os seus dados são utilizados para processar a encomenda.
                  O pagamento será realizado numa página segura.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { icon: ShieldCheck, title: "Seguro" },
            { icon: PackageCheck, title: "Acompanhado" },
            { icon: Sparkles, title: "Tanosi" },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-zinc-200 bg-white p-3"
              >
                <Icon size={14} className="text-zinc-500" />

                <p className="mt-2 text-[7px] font-black uppercase tracking-[0.14em] text-zinc-600">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* ============================================================
     DESKTOP CHECKOUT
  ============================================================ */

  const renderDesktopCheckout = () => (
    <div className="hidden lg:block">
      <div className="mb-10 flex items-center justify-between">
        <Link
          href="/collections"
          className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-500 transition-all hover:border-black hover:text-black"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          Voltar às compras
        </Link>

        <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-[8px] font-bold uppercase tracking-[0.18em] text-zinc-500">
          <Lock size={11} />
          Checkout seguro
        </div>
      </div>

      <div className="mb-12 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.15em]">
        <span className="text-black">Carrinho</span>
        <ChevronRight size={12} className="text-zinc-300" />
        <span className="text-black">Checkout</span>
        <ChevronRight size={12} className="text-zinc-300" />
        <span className="text-zinc-400">Pagamento</span>
      </div>

      <div className="mb-12 max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-black/30" />

          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-400">
            Tanosi / Checkout
          </p>
        </div>

        <h1 className="text-[clamp(3rem,6vw,5.75rem)] font-black uppercase leading-[0.88] tracking-[-0.065em] text-black">
          Finalize a sua
          <br />
          encomenda.
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500">
          Preencha os seus dados de entrega e avance para concluir a sua
          compra através de um dos nossos métodos de pagamento disponíveis.
        </p>
      </div>

      <div className="grid grid-cols-12 items-start gap-8 xl:gap-10">
        <div className="col-span-7 space-y-5">
          <section className={sectionClassName}>
            <SectionHeading
              icon={MapPin}
              title="Dados de entrega"
              description="Para onde devemos enviar a sua encomenda?"
              number="01"
            />

            <CustomerFields
              formData={formData}
              onChange={handleInputChange}
              prefix="desktop"
            />
          </section>

          {/* <PaymentInformation /> */}

          <div className="grid grid-cols-3 gap-2.5">
            {[
              {
                icon: ShieldCheck,
                title: "Seguro",
                text: "Checkout protegido",
              },
              {
                icon: Truck,
                title: "Entrega",
                text: "Dados para entrega",
              },
              {
                icon: Sparkles,
                title: "Tanosi",
                text: "Feito para o movimento",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-zinc-200 bg-white p-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
                    <Icon size={15} className="text-zinc-600" />
                  </div>

                  <p className="mt-3 text-[8px] font-black uppercase tracking-[0.16em] text-zinc-700">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[9px] text-zinc-400">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-5">
          <div className="sticky top-24">
            <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_15px_55px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between border-b border-zinc-200 px-7 py-6">
                <div>
                  <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                    Encomenda
                  </p>

                  <h2 className="mt-1 text-xl font-black uppercase tracking-tight text-black">
                    Resumo
                  </h2>
                </div>

                <div className="flex h-9 min-w-9 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-2 text-[9px] font-black text-zinc-600">
                  {totalItems}
                </div>
              </div>

              <OrderItems items={items} />

              <OrderTotals subtotal={subtotal} total={total} />

              <div className="px-7 pb-7">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white">
                      <Smartphone size={16} className="text-zinc-600" />
                    </div>

                    <div>
                      <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                        Pagamento
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-black">
                        Várias opções disponíveis
                      </p>
                    </div>

                    <CheckCircle2 size={15} className="ml-auto text-zinc-500" />
                  </div>

                  <p className="mt-3 text-[9px] leading-5 text-zinc-500">
                    M-Pesa, E-Mola, mKesh, cartões bancários ou pagamento
                    por referência.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={continueToPayment}
                  disabled={isProcessing}
                  className="group mt-5 flex min-h-[58px] w-full items-center justify-center gap-3 rounded-xl bg-black px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-zinc-800 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white"
                      />
                      A preparar pagamento...
                    </>
                  ) : (
                    <>
                      Continuar para pagamento
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <div className="mt-5 flex items-start gap-2.5 text-[9px] leading-5 text-zinc-400">
                  <Lock size={11} className="mt-0.5 shrink-0" />

                  <p>
                    Os seus dados são utilizados para processar a encomenda.
                    O pagamento será concluído numa página segura.
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-3 flex items-center justify-center gap-2 text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-400">
              <ShieldCheck size={12} />
              Checkout seguro
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ============================================================
     PAGE
  ============================================================ */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fafafa] text-black">
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />

        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-zinc-100/80 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-16 pt-24 sm:px-6 sm:pb-24 lg:px-10 xl:px-12">
        {renderMobileCheckout()}
        {renderDesktopCheckout()}
      </div>

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            input:-webkit-autofill:active {
              -webkit-text-fill-color: #09090b;
              box-shadow: 0 0 0px 1000px white inset;
              transition: background-color 9999s ease-in-out 0s;
            }

            html {
              background: #fafafa;
            }

            body {
              background: #fafafa;
            }
          `,
        }}
      />
    </main>
  );
}