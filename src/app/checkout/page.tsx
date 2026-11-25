
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Lock,
  ShoppingBag,
  ArrowLeft,
  User,
  Home,
  Check,
  PackageCheck,
  Sparkles,
  ArrowRight,
  X,
  ChevronLeft,
  Phone,
  Minus,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { Footer } from "@/components/footer";

/* ============================================================
   TYPES
============================================================ */

type PaymentMethodId = "cartao" | "carteiras-moveis";

type MobileStep = "dados" | "resumo";

type PaymentMethod = {
  id: PaymentMethodId;
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  details: string;
  images?: string[];
};

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
};

/* ============================================================
   PAYMENT METHODS
============================================================ */

const paymentMethods: PaymentMethod[] = [
  {
    id: "cartao",
    title: "Cartão bancário",
    description: "Visa, Mastercard e outros cartões",
    icon: CreditCard,
    badge: "Online",
    details:
      "Será redirecionado para uma página segura para concluir o pagamento com cartão.",
    images: [
      "/items/visa.png",
      "/items/mcard.png",
    ],
  },
  {
    id: "carteiras-moveis",
    title: "Carteiras móveis",
    description: "M-Pesa, E-Mola ou mKesh",
    icon: Smartphone,
    badge: "Moçambique",
    details:
      "Será redirecionado para uma página segura onde poderá selecionar uma das opções de pagamento móvel disponíveis.",
    images: [
      "/items/mpesa.jpeg",
      "/items/emola.png",
      "/items/mkesh.png",
    ],
  },
];

/* ============================================================
   STYLES
============================================================ */

const inputClassName =
  "w-full min-h-[52px] rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-black outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-black focus:ring-4 focus:ring-black/[0.04] disabled:cursor-not-allowed disabled:bg-zinc-50";

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
    maximumFractionDigits: 0,
  })}`;

const getPaymentLabel = (id: PaymentMethodId) =>
  paymentMethods.find((method) => method.id === id)?.title ?? id;

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
   PAYMENT OPTIONS
============================================================ */

function PaymentOptions({
  selectedPayment,
  onSelect,
  disabled = false,
}: {
  selectedPayment: PaymentMethodId;
  onSelect: (id: PaymentMethodId) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => {
        const Icon = method.icon;
        const isSelected = selectedPayment === method.id;

        return (
          <button
            type="button"
            key={method.id}
            disabled={disabled}
            onClick={() => onSelect(method.id)}
            aria-pressed={isSelected}
            className={`w-full rounded-xl border p-4 text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
              isSelected
                ? "border-black bg-zinc-50 shadow-sm"
                : "border-zinc-200 bg-white hover:border-zinc-400 hover:bg-zinc-50/70"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isSelected
                    ? "bg-black text-white"
                    : "border border-zinc-200 bg-white text-zinc-500"
                }`}
              >
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={`text-[11px] font-black uppercase tracking-tight sm:text-xs ${
                      isSelected ? "text-black" : "text-zinc-700"
                    }`}
                  >
                    {method.title}
                  </h3>

                  {method.badge && (
                    <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider text-zinc-500">
                      {method.badge}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-[10px] leading-5 text-zinc-500">
                  {method.description}
                </p>
              </div>

              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  isSelected
                    ? "border-black bg-black"
                    : "border-zinc-300 bg-white"
                }`}
              >
                {isSelected && (
                  <Check
                    size={11}
                    strokeWidth={3}
                    className="text-white"
                  />
                )}
              </div>
            </div>

            {method.images && (
              <div className="ml-[58px] mt-3 flex flex-wrap items-center gap-2">
                {method.images.map((image, index) => (
                  <div
                    key={`${method.id}-${index}`}
                    className="flex h-8 min-w-11 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-white px-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt=""
                      className="max-h-5 max-w-10 object-contain"
                    />
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence initial={false}>
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 border-t border-zinc-200 pt-3">
                    <div className="flex gap-2.5 rounded-lg bg-white p-3">
                      <Lock
                        size={12}
                        className="mt-0.5 shrink-0 text-zinc-400"
                      />
                      <p className="text-[9px] leading-5 text-zinc-500">
                        {method.details}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   ORDER ITEMS
============================================================ */

function OrderItems({
  items,
  compact = false,
}: {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
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
   ORDER TOTALS
============================================================ */

function OrderTotals({
  subtotal,
  taxes,
  total,
  compact = false,
}: {
  subtotal: number;
  taxes: number;
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
      <div className={`space-y-3 text-[11px] ${compact ? "" : "sm:text-sm"}`}>
        <div className="flex justify-between">
          <span className="text-zinc-500">Subtotal</span>
          <span className="text-zinc-800">{formatMZN(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <div>
            <span className="text-zinc-500">Taxa</span>
            <span className="ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-[8px] font-bold text-zinc-500">
              6%
            </span>
          </div>

          <span className="text-zinc-800">{formatMZN(taxes)}</span>
        </div>
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
          Utilize um número válido para podermos contactá-lo sobre a sua encomenda.
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

  const [paymentModalOpen, setPaymentModalOpen] =
    React.useState(false);

  const [selectedPayment, setSelectedPayment] =
    React.useState<PaymentMethodId>("cartao");

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

  React.useEffect(() => {
    document.body.style.overflow = paymentModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [paymentModalOpen]);

  /* ============================================================
     TOTALS
  ============================================================ */

  const subtotal = React.useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [items]
  );

  // Taxa de 6% calculada sobre o subtotal dos produtos.
  const taxes = Math.round(subtotal * 0.06);

  // Não existe qualquer custo de entrega.
  const total = subtotal + taxes;

  const totalItems = React.useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
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
     PAYMENT MODAL
  ============================================================ */

  const openPaymentModal = () => {
    if (!validateCustomerDetails()) {
      setMobileStep("dados");
      return;
    }

    setPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    if (isProcessing) return;
    setPaymentModalOpen(false);
  };

  /* ============================================================
     PAYMENT
  ============================================================ */

  const continueToPayment = async () => {
    if (!validateCustomerDetails() || !items.length) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

    if (!apiUrl) {
      toast.error("Configuração em falta", {
        description:
          "O serviço de pagamentos não está configurado. Contacte o suporte.",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch(`${apiUrl}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            phone: formData.phone.trim(),
            address: formData.address.trim(),
          },
          paymentMethod: selectedPayment,
          items: items.map((item) => ({
            id: String(item.id),
            quantity: Number(item.quantity),
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Não foi possível iniciar o pagamento."
        );
      }

      if (!result.checkoutUrl) {
        throw new Error(
          "O serviço de pagamentos não devolveu um endereço válido."
        );
      }

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
              href="/collections"
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
     PAYMENT MODAL
  ============================================================ */

  const renderPaymentModal = () => (
    <AnimatePresence>
      {paymentModalOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Fechar seleção de pagamento"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePaymentModal}
            className="fixed inset-0 z-[90] cursor-default bg-black/45 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-x-0 bottom-0 z-[100] flex max-h-[94dvh] flex-col overflow-hidden rounded-t-[26px] border-t border-zinc-200 bg-white shadow-[0_-25px_80px_rgba(0,0,0,0.15)] sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(580px,calc(100%-32px))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[26px] sm:border"
          >
            <div className="shrink-0 pt-3 sm:hidden">
              <div className="mx-auto h-1 w-10 rounded-full bg-zinc-200" />
            </div>

            <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 px-5 py-5 sm:px-7">
              <div className="min-w-0">
                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                  Checkout / Pagamento
                </p>

                <h2
                  id="payment-modal-title"
                  className="mt-1 text-xl font-black uppercase tracking-tight text-black"
                >
                  Método de pagamento
                </h2>

                <p className="mt-1 text-[10px] text-zinc-500">
                  Escolha como pretende pagar.
                </p>
              </div>

              <button
                type="button"
                onClick={closePaymentModal}
                disabled={isProcessing}
                className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Fechar"
              >
                <X size={17} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
              <PaymentOptions
                selectedPayment={selectedPayment}
                onSelect={setSelectedPayment}
                disabled={isProcessing}
              />
            </div>

            <div className="shrink-0 border-t border-zinc-200 bg-zinc-50 p-5 pb-[calc(20px+env(safe-area-inset-bottom))] sm:p-7">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                  Total
                </span>

                <span className="text-lg font-black text-black">
                  {formatMZN(total)}
                </span>
              </div>

              <button
                type="button"
                disabled={isProcessing}
                onClick={continueToPayment}
                className="group flex min-h-[56px] w-full items-center justify-center gap-3 rounded-xl bg-black px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-zinc-800 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-50"
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

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
              : "Confira os artigos e os valores antes de avançar para o pagamento."}
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
                  taxes={taxes}
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

              <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-50">
                    <Receipt size={16} />
                  </div>

                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-wide text-black">
                      Resumo de pagamento
                    </h3>
                    <p className="mt-1 text-[9px] text-zinc-500">
                      Escolha o método no próximo passo.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-zinc-500">Total a pagar</span>
                  <span className="text-sm font-black text-black">
                    {formatMZN(total)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={openPaymentModal}
                disabled={isProcessing}
                className="group mt-4 flex min-h-[60px] w-full items-center justify-center gap-3 rounded-xl bg-black px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-zinc-800 active:scale-[0.985] disabled:opacity-50"
              >
                Pagar agora
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={handleMobileBack}
                className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-black"
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

        {renderPaymentModal()}
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
          Preencha os seus dados de entrega, escolha o método de pagamento
          e continue para concluir a sua compra.
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

          <section className={sectionClassName}>
            <SectionHeading
              icon={ShieldCheck}
              title="Pagamento"
              description="Selecione como pretende pagar."
              number="02"
            />

            <div className="p-5 sm:p-7">
              <PaymentOptions
                selectedPayment={selectedPayment}
                onSelect={setSelectedPayment}
                disabled={isProcessing}
              />
            </div>
          </section>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              {
                icon: ShieldCheck,
                title: "Seguro",
                text: "Checkout protegido",
              },
              {
                icon: PackageCheck,
                title: "Acompanhado",
                text: "Acompanhe a encomenda",
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

              <OrderTotals
                subtotal={subtotal}
                taxes={taxes}
                total={total}
              />

              <div className="px-7 pb-7">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                        Método de pagamento
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-black">
                        {getPaymentLabel(selectedPayment)}
                      </p>
                    </div>

                    <Check size={14} className="text-zinc-500" />
                  </div>
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
