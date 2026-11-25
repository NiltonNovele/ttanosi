
"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Check,
  Clock,
  Download,
  Printer,
  XCircle,
  ChevronRight,
  MessageCircle,
  Camera,
  ShieldCheck,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Footer } from "@/components/footer";

type Receipt = {
  status: "paid";
  reference: string;
  receiptNumber: string;
  paidAt: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: {
    productId: string;
    name: string;
    image?: string | null;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
  paymentMethod: string;
  transactionId?: string | null;
};

type ViewState = "loading" | "pending" | "paid" | "failed" | "error";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

const WHATSAPP_NUMBER = "258845558193";

const formatMZN = (value: number) =>
  `MZN ${Number(value).toLocaleString("pt-PT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("pt-PT", {
    timeZone: "Africa/Maputo",
    dateStyle: "medium",
    timeStyle: "short",
  });

function StatusScreen({
  icon,
  title,
  text,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-200 bg-white">
        {icon}
      </div>

      <h1 className="text-3xl font-black uppercase tracking-tight text-black">
        {title}
      </h1>

      <p className="mt-3 text-sm leading-6 text-zinc-500">{text}</p>

      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const ref = params.get("ref");
  const token = params.get("token");

  const [state, setState] = React.useState<ViewState>("loading");
  const [receipt, setReceipt] = React.useState<Receipt | null>(null);
  const [gaveUp, setGaveUp] = React.useState(false);

  React.useEffect(() => {
    if (!ref || !token) {
      setState("error");
      return;
    }

    let cancelled = false;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const load = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/orders/${encodeURIComponent(ref)}/receipt?token=${encodeURIComponent(token)}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Receipt request failed");
        }

        const data = await response.json();

        if (cancelled) return;

        if (data.status === "paid") {
          setReceipt(data);
          setState("paid");

          // Limpar o carrinho apenas após confirmação do pagamento.
          const store = useCartStore.getState() as unknown as {
            clearCart?: () => void;
            clear?: () => void;
          };

          (store.clearCart ?? store.clear)?.();
          return;
        }

        if (data.status === "failed") {
          setState("failed");
          return;
        }

        attempts += 1;
        setState("pending");

        if (attempts < 40) {
          timer = setTimeout(load, 3000);
        } else {
          setGaveUp(true);
        }
      } catch {
        if (cancelled) return;

        // Tentar novamente em caso de falha temporária de ligação.
        attempts += 1;

        if (attempts < 40) {
          setState("pending");
          timer = setTimeout(load, 3000);
        } else {
          setState("error");
        }
      }
    };

    load();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [ref, token]);

  const pdfUrl =
    ref && token
      ? `${API_URL}/api/orders/${encodeURIComponent(ref)}/receipt.pdf?token=${encodeURIComponent(token)}`
      : "#";

  const whatsappMessage = receipt
    ? [
        "Olá, Tanosi!",
        "",
        "Envio o comprovativo da minha encomenda.",
        `Referência: ${receipt.reference}`,
        `Recibo: ${receipt.receiptNumber}`,
        `Nome: ${receipt.customer.name}`,
        `Telefone: ${receipt.customer.phone}`,
        `Total: ${formatMZN(receipt.total)}`,
        "",
        "Segue em anexo a captura do recibo.",
      ].join("\n")
    : "";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  if (state === "loading" || state === "pending") {
    return (
      <StatusScreen
        icon={<Clock size={30} strokeWidth={1.5} className="text-zinc-400" />}
        title={gaveUp ? "Ainda a confirmar" : "A confirmar pagamento"}
        text={
          gaveUp
            ? "A confirmação está a demorar mais do que o normal. Guarde esta página e volte a consultar o estado da encomenda."
            : "Estamos a aguardar a confirmação do pagamento. Por favor, não feche esta página."
        }
      />
    );
  }

  if (state === "failed") {
    return (
      <StatusScreen
        icon={<XCircle size={32} className="text-zinc-500" />}
        title="Pagamento não concluído"
        text="O pagamento não foi confirmado. Pode voltar ao checkout e tentar novamente."
        action={
          <Link
            href="/checkout"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-black px-7 text-[10px] font-black uppercase tracking-[0.18em] text-white"
          >
            Tentar novamente <ChevronRight size={15} />
          </Link>
        }
      />
    );
  }

  if (state === "error" || !receipt) {
    return (
      <StatusScreen
        icon={<XCircle size={32} className="text-zinc-500" />}
        title="Recibo indisponível"
        text="Não foi possível carregar o recibo. Verifique a ligação ou contacte a nossa equipa com a referência da encomenda."
        action={
          <Link
            href="/collections"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-black px-7 text-[10px] font-black uppercase tracking-[0.18em] text-white"
          >
            Voltar à loja <ChevronRight size={15} />
          </Link>
        }
      />
    );
  }

  const ratePct = Number((receipt.taxRate * 100).toFixed(2));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-xl"
    >
      {/* Success heading */}
      <div className="mb-7 text-center print:hidden">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-black">
          <Check size={25} strokeWidth={3} className="text-white" />
        </div>

        <p className="mb-2 text-[9px] font-black uppercase tracking-[0.28em] text-zinc-400">
          Tanosi · Confirmação de encomenda
        </p>

        <h1 className="text-3xl font-black uppercase leading-none tracking-[-0.05em] text-black sm:text-4xl">
          Pagamento confirmado
        </h1>

        <p className="mt-3 text-sm text-zinc-500">
          Obrigado pela sua compra, {receipt.customer.name.split(" ")[0]}.
        </p>
      </div>

      {/* Printable receipt */}
      <section className="receipt-print-area overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_35px_rgba(0,0,0,0.035)]">
        {/* Receipt header */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-5 sm:px-7">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
              TANOSI
            </p>

            <h2 className="mt-1 text-xl font-black uppercase tracking-tight text-black">
              Recibo
            </h2>

            <p className="mt-1 font-mono text-[10px] text-zinc-500">
              {receipt.receiptNumber}
            </p>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-700">
              <Check size={11} /> Pago confirmado
            </span>

            <p className="mt-2 text-[10px] text-zinc-500">
              {formatDate(receipt.paidAt)}
            </p>
          </div>
        </div>

        {/* Customer and order details */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-4 px-5 py-5 sm:px-7">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-zinc-400">
              Referência
            </p>
            <p className="mt-1 break-all text-xs font-bold text-black">
              {receipt.reference}
            </p>
          </div>

          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-zinc-400">
              Método de pagamento
            </p>
            <p className="mt-1 text-xs font-bold text-black">
              {receipt.paymentMethod}
            </p>
          </div>

          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-zinc-400">
              Cliente
            </p>
            <p className="mt-1 text-xs font-bold text-black">
              {receipt.customer.name}
            </p>
          </div>

          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-zinc-400">
              Telefone
            </p>
            <p className="mt-1 text-xs font-bold text-black">
              {receipt.customer.phone}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-zinc-400">
              Morada de entrega
            </p>
            <p className="mt-1 text-xs font-medium text-zinc-700">
              {receipt.customer.address}
            </p>
          </div>
        </div>

        {/* Purchased items */}
        <div className="border-t border-zinc-200 px-5 py-5 sm:px-7">
          <p className="mb-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
            Resumo da encomenda
          </p>

          <div className="space-y-3">
            {receipt.items.map((item, index) => (
              <div
                key={`${item.productId}-${index}`}
                className="flex items-start justify-between gap-4 text-xs"
              >
                <div className="min-w-0">
                  <p className="font-bold text-black">{item.name}</p>
                  <p className="mt-1 text-[10px] text-zinc-500">
                    {item.quantity} × {formatMZN(item.unitPrice)}
                  </p>
                </div>

                <p className="shrink-0 font-bold text-black">
                  {formatMZN(item.lineTotal)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="border-t border-zinc-200 bg-zinc-50 px-5 py-5 sm:px-7">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-medium text-zinc-800">
                {formatMZN(receipt.subtotal)}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">Taxa ({ratePct}%)</span>
              <span className="font-medium text-zinc-800">
                {formatMZN(receipt.tax)}
              </span>
            </div>
          </div>

          <div className="my-4 h-px bg-zinc-200" />

          <div className="flex items-end justify-between gap-4">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Total pago
            </span>

            <span className="text-2xl font-black leading-none tracking-tight text-black">
              {formatMZN(receipt.total)}
            </span>
          </div>
        </div>

        {/* Receipt footer */}
        <div className="border-t border-zinc-200 px-5 py-4 text-center sm:px-7">
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-500">
            Obrigado por escolher a Tanosi.
          </p>
          <p className="mt-1 text-[9px] text-zinc-400">
            Guarde este recibo como comprovativo da sua compra.
          </p>
        </div>
      </section>

      {/* WhatsApp proof instructions */}
      <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-5 print:hidden sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
            <ShieldCheck size={19} className="text-black" />
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.12em] text-black">
              Último passo: enviar o comprovativo
            </h3>

            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Para concluir a validação da sua encomenda, tire uma captura
              de ecrã deste recibo ou imprima-o e envie uma fotografia
              pelo WhatsApp.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-zinc-50 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-700">
            Envie para
          </p>

          <p className="mt-1 text-lg font-black text-black">
            +258 84 555 8193
          </p>

          <p className="mt-2 text-[11px] leading-5 text-zinc-500">
            A encomenda só será considerada validada após o envio e a
            verificação do comprovativo pela equipa Tanosi.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-[10px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#20bd5a]"
        >
          <MessageCircle size={17} />
          Enviar pelo WhatsApp
        </a>

        <div className="mt-4 flex items-start gap-2">
          <Camera size={15} className="mt-0.5 shrink-0 text-zinc-400" />

          <p className="text-[10px] leading-5 text-zinc-500">
            Ao abrir o WhatsApp, anexe uma captura de ecrã deste recibo
            antes de enviar a mensagem. No computador, pode usar
            Windows + Shift + S. No telemóvel, utilize a combinação
            habitual de captura de ecrã.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-col gap-3 print:hidden sm:flex-row">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-xl bg-black px-5 text-[10px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-zinc-800"
        >
          <Download size={15} />
          Descarregar PDF
        </a>

        <button
          type="button"
          onClick={() => window.print()}
          className="flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-[10px] font-black uppercase tracking-[0.14em] text-zinc-700 transition-colors hover:border-black"
        >
          <Printer size={15} />
          Imprimir recibo
        </button>
      </div>

      <div className="mt-6 text-center print:hidden">
        <Link
          href="/collections"
          className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 underline underline-offset-4 hover:text-black"
        >
          Continuar a comprar
        </Link>
      </div>
    </motion.div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-black">
      <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-24 sm:px-6 sm:pt-28 print:m-0 print:p-0">
        <React.Suspense
          fallback={
            <div className="py-20 text-center text-sm text-zinc-500">
              A carregar recibo...
            </div>
          }
        >
          <SuccessContent />
        </React.Suspense>
      </div>

      <div className="print:hidden">
        <Footer />
      </div>

      <style jsx global>{`
        @page {
          size: A4;
          margin: 12mm;
        }

        @media print {
          html,
          body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body * {
            visibility: hidden !important;
          }

          .receipt-print-area,
          .receipt-print-area * {
            visibility: visible !important;
          }

          .receipt-print-area {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            border: 1px solid #dedede !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            overflow: visible !important;
            break-inside: avoid !important;
          }

          .receipt-print-area * {
            break-inside: avoid;
          }

          .receipt-print-area .bg-zinc-50 {
            background: #f5f5f5 !important;
          }

          a {
            text-decoration: none !important;
          }
        }
      `}</style>
    </main>
  );
}
