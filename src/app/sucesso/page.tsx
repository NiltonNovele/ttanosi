"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Clock, Download, Printer, XCircle, ChevronRight } from "lucide-react";
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
  items: { productId: string; name: string; image?: string | null; quantity: number; unitPrice: number; lineTotal: number }[];
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
  paymentMethod: string;
  transactionId?: string | null;
};

type ViewState = "loading" | "pending" | "paid" | "failed" | "error";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

const formatMZN = (value: number) =>
  `MZN ${value.toLocaleString("pt-PT", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("pt-PT", { timeZone: "Africa/Maputo", dateStyle: "long", timeStyle: "short" });

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-6 py-2 text-[12px]">
      <span className="text-zinc-500">{label}</span>
      <span className="text-right font-bold text-black">{value}</span>
    </div>
  );
}

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
    <div className="mx-auto max-w-md py-10 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-200 bg-white">
        {icon}
      </div>
      <h1 className="text-3xl font-black uppercase tracking-tight text-black">{title}</h1>
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
        const res = await fetch(
          `${API_URL}/api/orders/${encodeURIComponent(ref)}/receipt?token=${encodeURIComponent(token)}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("not-found");
        const data = await res.json();
        if (cancelled) return;

        if (data.status === "paid") {
          setReceipt(data);
          setState("paid");

          // Limpa o carrinho depois do pagamento confirmado
          const store = useCartStore.getState() as unknown as { clearCart?: () => void; clear?: () => void };
          (store.clearCart ?? store.clear)?.();
          return;
        }

        if (data.status === "failed") {
          setState("failed");
          return;
        }

        setState("pending");
        attempts += 1;
        if (attempts < 40) timer = setTimeout(load, 3000);
        else setGaveUp(true);
      } catch {
        if (!cancelled) setState("error");
      }
    };

    load();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [ref, token]);

  const pdfUrl = ref && token ? `${API_URL}/api/orders/${encodeURIComponent(ref)}/receipt.pdf?token=${encodeURIComponent(token)}` : "#";

  if (state === "loading" || state === "pending") {
    return (
      <StatusScreen
        icon={<Clock size={30} strokeWidth={1.5} className="text-zinc-400" />}
        title={gaveUp ? "Ainda a confirmar" : "A confirmar pagamento"}
        text={
          gaveUp
            ? "A confirmação está a demorar mais do que o normal. Se já pagou, guarde esta página — o recibo ficará disponível aqui assim que o pagamento for confirmado."
            : "Estamos a aguardar a confirmação do seu pagamento. Não feche esta página."
        }
      />
    );
  }

  if (state === "failed") {
    return (
      <StatusScreen
        icon={<XCircle size={32} strokeWidth={1.5} className="text-zinc-500" />}
        title="Pagamento não concluído"
        text="O pagamento não foi concluído e não foi cobrado qualquer valor. Pode tentar novamente."
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
        icon={<XCircle size={32} strokeWidth={1.5} className="text-zinc-500" />}
        title="Recibo indisponível"
        text="Não foi possível carregar o recibo. Verifique a ligação do link ou contacte o suporte com o número da encomenda."
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-2xl"
    >
      <div className="mb-8 text-center print:hidden">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black">
          <Check size={28} strokeWidth={3} className="text-white" />
        </div>
        <h1 className="text-4xl font-black uppercase leading-none tracking-[-0.05em] text-black">Pagamento confirmado</h1>
        <p className="mt-3 text-sm text-zinc-500">Obrigado pela sua compra, {receipt.customer.name.split(" ")[0]}.</p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_35px_rgba(0,0,0,0.035)]">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-6 py-6 sm:px-8">
          <div>
            <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-400">Tanosi / Recibo</p>
            <h2 className="mt-1 text-xl font-black uppercase tracking-tight text-black">{receipt.receiptNumber}</h2>
          </div>
          <div className="text-right text-[10px] leading-5 text-zinc-500">
            <p>Encomenda {receipt.reference}</p>
            <p>{formatDate(receipt.paidAt)}</p>
          </div>
        </div>

        <div className="divide-y divide-zinc-100 px-6 py-2 sm:px-8">
          <Row label="Cliente" value={receipt.customer.name} />
          <Row label="Telefone" value={receipt.customer.phone} />
          <Row label="Morada de entrega" value={receipt.customer.address} />
          <Row label="Método de pagamento" value={receipt.paymentMethod} />
          {receipt.transactionId && <Row label="ID da transação" value={receipt.transactionId} />}
        </div>

        <div className="space-y-4 border-t border-zinc-200 px-6 py-6 sm:px-8">
          {receipt.items.map((item, i) => (
            <div key={`${item.productId}-${i}`} className="flex justify-between gap-4 text-[12px]">
              <div className="min-w-0">
                <p className="font-bold text-black">{item.name}</p>
                <p className="mt-0.5 text-[10px] text-zinc-400">
                  {item.quantity} × {formatMZN(item.unitPrice)}
                </p>
              </div>
              <p className="shrink-0 font-bold text-black">{formatMZN(item.lineTotal)}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-6 sm:px-8">
          <div className="space-y-2 text-[12px]">
            <div className="flex justify-between">
              <span className="text-zinc-500">Subtotal</span>
              <span className="text-zinc-800">{formatMZN(receipt.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Taxa ({ratePct}%)</span>
              <span className="text-zinc-800">{formatMZN(receipt.tax)}</span>
            </div>
          </div>
          <div className="my-4 h-px bg-zinc-200" />
          <div className="flex items-end justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">Total pago</span>
            <span className="text-3xl font-black leading-none tracking-[-0.05em] text-black">{formatMZN(receipt.total)}</span>
          </div>
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row print:hidden">
        <a
          href={pdfUrl}
          className="flex min-h-[54px] flex-1 items-center justify-center gap-2 rounded-xl bg-black px-5 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-zinc-800"
        >
          <Download size={15} />
          Descarregar recibo (PDF)
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex min-h-[54px] items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-700 transition-colors hover:border-black"
        >
          <Printer size={15} />
          Imprimir
        </button>
      </div>

      <div className="mt-6 text-center print:hidden">
        <Link href="/collections" className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 underline underline-offset-4 hover:text-black">
          Continuar a comprar
        </Link>
      </div>
    </motion.div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-black">
      <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-28 sm:px-6">
        <React.Suspense fallback={null}>
          <SuccessContent />
        </React.Suspense>
      </div>
      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  );
}
