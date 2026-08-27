"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  Truck,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Lock,
  ShoppingBag,
  ArrowLeft,
  Mail,
  User,
  Home,
  Check,
  PackageCheck,
  Sparkles,
  ArrowRight,
  X,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { Footer } from "@/components/footer";

/* ============================================================
   TIPOS
   ============================================================ */

type PaymentMethodId =
  | "cartao"
  | "carteiras-moveis"
  | "contra-entrega";

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
  email: string;
  address: string;
};

/* ============================================================
   MÉTODOS DE PAGAMENTO
   ============================================================ */

const paymentMethods: PaymentMethod[] = [
  {
    id: "cartao",
    title: "Cartão",
    description: "Visa, Mastercard e outros cartões",
    icon: CreditCard,
    badge: "Online",
    details:
      "Será redirecionado para uma página segura para concluir o pagamento com cartão.",
    images: [
      "/items/visa.png",
      "/items/mcard.png",
      "/items/paypal.webp",
    ],
  },
  {
    id: "carteiras-moveis",
    title: "Carteiras móveis",
    description: "M-Pesa, E-Mola ou mKesh",
    icon: Smartphone,
    badge: "Moçambique",
    details:
      "O pagamento será concluído numa página segura, onde poderá escolher entre M-Pesa, E-Mola ou mKesh.",
    images: [
      "/items/mpesa.jpeg",
      "/items/emola.png",
      "/items/mkesh.png",
    ],
  },
  {
    id: "contra-entrega",
    title: "Pagamento na entrega",
    description: "Pague quando receber a encomenda",
    icon: Truck,
    badge: "Disponível",
    details:
      "O pagamento será efetuado no momento da entrega, de acordo com as opções disponíveis.",
  },
];

/* ============================================================
   ESTILOS
   ============================================================ */

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-[14px] text-white outline-none transition-all duration-200 placeholder:text-zinc-700 hover:border-white/[0.16] focus:border-white/30 focus:bg-white/[0.055] focus:ring-4 focus:ring-white/[0.035]";

const labelClassName =
  "flex items-center gap-2 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500";

/* ============================================================
   FORMATADORES
   ============================================================ */

const formatMZN = (value: number) =>
  `MZN ${value.toLocaleString("pt-PT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

const getPaymentLabel = (id: PaymentMethodId) =>
  paymentMethods.find((method) => method.id === id)?.title ?? id;

/* ============================================================
   COMPONENTE PRINCIPAL
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

  const [isProcessing, setIsProcessing] =
    React.useState(false);

  const [formData, setFormData] = React.useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  /* ============================================================
     MOUNT
     ============================================================ */

  React.useEffect(() => {
    setMounted(true);
  }, []);

  /* ============================================================
     BODY SCROLL — MODAL
     ============================================================ */

  React.useEffect(() => {
    if (paymentModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [paymentModalOpen]);

  /* ============================================================
     TOTAIS
     ============================================================ */

  const subtotal = React.useMemo(() => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [items]);

  const shipping = items.length > 0 ? 99 : 0;

  const taxes = Math.round(subtotal * 0.05);

  const total = subtotal + shipping + taxes;

  const totalItems = React.useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [items]);

  /* ============================================================
     INPUTS
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

  /* ============================================================
     VALIDAÇÃO
     ============================================================ */

  const validateCustomerDetails = () => {
    const fields = [
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.address,
    ];

    if (fields.some((field) => !field.trim())) {
      toast.error("Informação em falta", {
        description:
          "Preencha todos os dados de entrega antes de continuar.",
      });

      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      toast.error("E-mail inválido", {
        description:
          "Introduza um endereço de e-mail válido.",
      });

      return false;
    }

    return true;
  };

  /* ============================================================
     MOBILE — DADOS → RESUMO
     ============================================================ */

  const handleMobileContinue = () => {
    if (!validateCustomerDetails()) return;

    setMobileStep("resumo");
  };

  /* ============================================================
     MOBILE — VOLTAR AOS DADOS
     ============================================================ */

  const handleMobileBack = () => {
    setMobileStep("dados");
  };

  /* ============================================================
     MODAL
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
     PAGAMENTO
     ============================================================ */

  const continueToPayment = () => {
    if (!selectedPayment) {
      toast.error("Selecione um método de pagamento", {
        description:
          "Escolha uma opção para continuar.",
      });

      return;
    }

    if (!validateCustomerDetails()) {
      setPaymentModalOpen(false);
      setMobileStep("dados");
      return;
    }

    setIsProcessing(true);

    try {
      const checkoutData = {
        customer: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
        },

        paymentMethod: selectedPayment,

        paymentLabel:
          getPaymentLabel(selectedPayment),

        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),

        totals: {
          subtotal,
          shipping,
          taxes,
          total,
        },

        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem(
        "ttanosi_checkout",
        JSON.stringify(checkoutData)
      );

      window.setTimeout(() => {
        window.location.assign(
          `/pagamento?metodo=${encodeURIComponent(
            selectedPayment
          )}`
        );
      }, 150);
    } catch (error) {
      console.error(
        "Erro ao preparar checkout:",
        error
      );

      toast.error("Não foi possível continuar", {
        description:
          "Ocorreu um problema ao preparar o pagamento. Tente novamente.",
      });

      setIsProcessing(false);
    }
  };

  /* ============================================================
     LOADING
     ============================================================ */

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-8 w-8 rounded-full border-2 border-white/10 border-t-white"
        />
      </div>
    );
  }

  /* ============================================================
     CARRINHO VAZIO
     ============================================================ */

  if (items.length === 0) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 py-24 text-white sm:px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl" />

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative w-full max-w-xl text-center"
        >
          <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] shadow-2xl">
            <ShoppingBag
              size={38}
              strokeWidth={1.4}
              className="text-white/30"
            />
          </div>

          <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
            Checkout / Carrinho vazio
          </p>

          <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-white">
            Nada por aqui.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-zinc-500">
            O seu carrinho está vazio. Explore as últimas
            peças da Tanosi e encontre algo que represente o
            seu movimento.
          </p>

          <Link
            href="/collections"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.18em] text-black transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-200 active:scale-[0.98]"
          >
            Começar a comprar
            <ChevronRight size={15} />
          </Link>
        </motion.div>
      </main>
    );
  }

  /* ============================================================
     PAYMENT METHOD MODAL

     IMPORTANT:
     This is a render function, NOT a React component.
     Defining it this way prevents the modal/input tree from
     being remounted every time formData changes.
     ============================================================ */

  const renderPaymentModal = () => {
    return (
      <AnimatePresence>
        {paymentModalOpen && (
          <>
            {/* BACKDROP */}
            <motion.button
              type="button"
              aria-label="Fechar seleção de pagamento"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePaymentModal}
              className="fixed inset-0 z-[90] cursor-default bg-black/80 backdrop-blur-md"
            />

            {/* MODAL */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="payment-modal-title"
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 24,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed inset-x-0 bottom-0 z-[100] flex max-h-[94dvh] flex-col overflow-hidden rounded-t-[28px] border-t border-white/10 bg-[#080808] shadow-[0_-30px_100px_rgba(0,0,0,0.7)] sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(580px,calc(100%-32px))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[28px] sm:border"
            >
              {/* MOBILE HANDLE */}
              <div className="shrink-0 pt-3 sm:hidden">
                <div className="mx-auto h-1 w-10 rounded-full bg-white/10" />
              </div>

              {/* HEADER */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-5 sm:px-7">
                <div className="min-w-0">
                  <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-white/25">
                    Checkout / Pagamento
                  </p>

                  <h2
                    id="payment-modal-title"
                    className="mt-1 text-xl font-black uppercase tracking-tight text-white"
                  >
                    Método de pagamento
                  </h2>

                  <p className="mt-1 text-[10px] text-zinc-600">
                    Escolha como pretende pagar.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closePaymentModal}
                  disabled={isProcessing}
                  className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-500 transition-colors hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Fechar"
                >
                  <X size={17} />
                </button>
              </div>

              {/* METHODS */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected =
                      selectedPayment === method.id;

                    return (
                      <button
                        type="button"
                        key={method.id}
                        disabled={isProcessing}
                        onClick={() =>
                          setSelectedPayment(method.id)
                        }
                        className={`group w-full rounded-2xl border p-4 text-left transition-all duration-200 disabled:cursor-not-allowed ${
                          isSelected
                            ? "border-white/25 bg-white/[0.06]"
                            : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.035]"
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          {/* ICON */}
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all ${
                              isSelected
                                ? "bg-white text-black"
                                : "bg-white/[0.05] text-zinc-500"
                            }`}
                          >
                            <Icon size={18} />
                          </div>

                          {/* CONTENT */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3
                                    className={`text-[12px] font-black uppercase tracking-tight ${
                                      isSelected
                                        ? "text-white"
                                        : "text-zinc-300"
                                    }`}
                                  >
                                    {method.title}
                                  </h3>

                                  {method.badge && (
                                    <span className="rounded-full border border-white/8 px-2 py-0.5 text-[6px] font-bold uppercase tracking-wider text-zinc-600">
                                      {method.badge}
                                    </span>
                                  )}
                                </div>

                                <p className="mt-1 text-[9px] leading-5 text-zinc-600">
                                  {method.description}
                                </p>
                              </div>

                              {/* RADIO */}
                              <div
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                  isSelected
                                    ? "border-white bg-white"
                                    : "border-white/20"
                                }`}
                              >
                                {isSelected && (
                                  <Check
                                    size={11}
                                    strokeWidth={3}
                                    className="text-black"
                                  />
                                )}
                              </div>
                            </div>

                            {/* PAYMENT IMAGES */}
                            {method.images &&
                              method.images.length > 0 && (
                                <div className="mt-3 flex items-center gap-2">
                                  {method.images
                                    .slice(0, 3)
                                    .map(
                                      (
                                        image,
                                        imageIndex
                                      ) => (
                                        <div
                                          key={`${method.id}-${imageIndex}`}
                                          className="flex h-9 min-w-12 items-center justify-center overflow-hidden rounded-lg border border-white/8 bg-black/40 px-2"
                                        >
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img
                                            src={image}
                                            alt=""
                                            className="max-h-5 max-w-10 object-contain opacity-70"
                                          />
                                        </div>
                                      )
                                    )}
                                </div>
                              )}
                          </div>
                        </div>

                        {/* DETAILS */}
                        <AnimatePresence initial={false}>
                          {isSelected && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                height: 0,
                              }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                              }}
                              exit={{
                                opacity: 0,
                                height: 0,
                              }}
                              transition={{
                                duration: 0.2,
                              }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 border-t border-white/5 pt-3">
                                <div className="flex gap-2.5 rounded-xl bg-black/30 p-3">
                                  <Lock
                                    size={13}
                                    className="mt-0.5 shrink-0 text-white/30"
                                  />

                                  <p className="text-[9px] leading-5 text-zinc-600">
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
              </div>

              {/* FOOTER */}
              <div className="shrink-0 border-t border-white/10 bg-black/50 p-5 pb-[calc(20px+env(safe-area-inset-bottom))] sm:p-7">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-zinc-700">
                    Total
                  </span>

                  <span className="text-lg font-black text-white">
                    {formatMZN(total)}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={continueToPayment}
                  className="group flex min-h-[56px] w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-black transition-all hover:bg-zinc-200 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-4 w-4 rounded-full border-2 border-black/20 border-t-black"
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
  };

  /* ============================================================
     MOBILE

     IMPORTANT:
     Render function instead of nested component.
     This prevents inputs from being remounted on every keystroke.
     ============================================================ */

  const renderMobileCheckout = () => {
    const isDetailsStep = mobileStep === "dados";

    return (
      <div className="block lg:hidden">
        {/* TOP BAR */}
        <div className="mb-7 flex items-center justify-between">
          <Link
            href="/collections"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/45"
          >
            <ArrowLeft size={14} />
            Voltar
          </Link>

          <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-wider text-white/25">
            <Lock size={11} />
            Seguro
          </div>
        </div>

        {/* HERO */}
        <div className="mb-7">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-7 bg-white/20" />

            <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-white/30">
              Tanosi / Checkout
            </p>
          </div>

          <h1 className="text-[clamp(2.7rem,13vw,4.4rem)] font-black uppercase leading-[0.86] tracking-[-0.065em]">
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

          <p className="mt-4 max-w-sm text-[12px] leading-6 text-zinc-600">
            {isDetailsStep
              ? "Introduza os seus dados para prepararmos a entrega."
              : "Confirme a sua encomenda antes de escolher o método de pagamento."}
          </p>
        </div>

        {/* PROGRESSO */}
        <div className="mb-7">
          <div className="grid grid-cols-2 gap-1.5">
            <div
              className={`h-1 rounded-full transition-colors duration-300 ${
                isDetailsStep
                  ? "bg-white"
                  : "bg-white/20"
              }`}
            />

            <div
              className={`h-1 rounded-full transition-colors duration-300 ${
                !isDetailsStep
                  ? "bg-white"
                  : "bg-white/10"
              }`}
            />
          </div>

          <div className="mt-2 flex justify-between">
            <span
              className={`text-[7px] font-bold uppercase tracking-[0.18em] ${
                isDetailsStep
                  ? "text-white"
                  : "text-white/30"
              }`}
            >
              01 / Dados
            </span>

            <span
              className={`text-[7px] font-bold uppercase tracking-[0.18em] ${
                !isDetailsStep
                  ? "text-white"
                  : "text-white/30"
              }`}
            >
              02 / Resumo
            </span>
          </div>
        </div>

        {/* STEP CONTENT */}
        <AnimatePresence
          mode="wait"
          initial={false}
        >
          {isDetailsStep ? (
            <motion.div
              key="mobile-dados"
              initial={{
                opacity: 0,
                x: -12,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -12,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              {/* DADOS */}
              <section className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.025]">
                <div className="border-b border-white/10 px-5 py-5">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <MapPin
                        size={18}
                        className="text-white"
                      />
                    </div>

                    <div>
                      <h2 className="text-[14px] font-black uppercase tracking-tight">
                        Dados de entrega
                      </h2>

                      <p className="mt-1 text-[10px] text-zinc-600">
                        Onde devemos entregar?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-5">
                  {/* NOME */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="mobile-firstName"
                        className={labelClassName}
                      >
                        <User size={11} />
                        Nome
                      </label>

                      <input
                        id="mobile-firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="João"
                        autoComplete="given-name"
                        className={inputClassName}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="mobile-lastName"
                        className={labelClassName}
                      >
                        Apelido
                      </label>

                      <input
                        id="mobile-lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Manuel"
                        autoComplete="family-name"
                        className={inputClassName}
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-2">
                    <label
                      htmlFor="mobile-email"
                      className={labelClassName}
                    >
                      <Mail size={11} />
                      E-mail
                    </label>

                    <input
                      id="mobile-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="joao@exemplo.com"
                      autoComplete="email"
                      className={inputClassName}
                    />
                  </div>

                  {/* MORADA */}
                  <div className="space-y-2">
                    <label
                      htmlFor="mobile-address"
                      className={labelClassName}
                    >
                      <Home size={11} />
                      Morada
                    </label>

                    <input
                      id="mobile-address"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Rua, avenida, número..."
                      autoComplete="street-address"
                      className={inputClassName}
                    />
                  </div>
                </div>
              </section>

              {/* CONTINUAR */}
              <button
                type="button"
                onClick={handleMobileContinue}
                className="group mt-4 flex min-h-[58px] w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-black transition-all active:scale-[0.985]"
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
              initial={{
                opacity: 0,
                x: 12,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: 12,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              {/* RESUMO */}
              <section className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.025]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                  <div>
                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-white/25">
                      Encomenda
                    </p>

                    <h2 className="mt-1 text-xl font-black uppercase tracking-tight">
                      Resumo
                    </h2>
                  </div>

                  <div className="flex h-9 min-w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-2 text-[9px] font-black text-white/50">
                    {totalItems}
                  </div>
                </div>

                {/* PRODUTOS */}
                <div className="space-y-4 p-5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3.5"
                    >
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-white/[0.04]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            item.image ||
                            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80"
                          }
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black/75 px-1 text-[8px] font-bold text-white">
                          {item.quantity}
                        </div>
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <h3 className="line-clamp-2 text-[12px] font-bold leading-[1.3] text-white">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-zinc-700">
                            Quantidade / {item.quantity}
                          </p>
                        </div>

                        <p className="text-[12px] font-bold text-white">
                          {formatMZN(
                            item.price * item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* TOTAIS */}
                <div className="border-t border-white/10 p-5">
                  <div className="space-y-3 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">
                        Subtotal
                      </span>

                      <span className="text-zinc-300">
                        {formatMZN(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-zinc-600">
                        Entrega
                      </span>

                      <span className="text-zinc-300">
                        {formatMZN(shipping)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-zinc-600">
                        Impostos
                      </span>

                      <span className="text-zinc-300">
                        {formatMZN(taxes)}
                      </span>
                    </div>
                  </div>

                  <div className="my-5 h-px bg-white/10" />

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                        Total
                      </p>

                      <p className="mt-1 text-[29px] font-black leading-none tracking-[-0.05em]">
                        {formatMZN(total)}
                      </p>
                    </div>

                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[7px] font-bold uppercase tracking-widest text-zinc-600">
                      MZN
                    </span>
                  </div>
                </div>
              </section>

              {/* DADOS DO CLIENTE */}
              <section className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-700">
                      Entrega
                    </p>

                    <h3 className="mt-1 truncate text-[12px] font-black uppercase">
                      {formData.firstName}{" "}
                      {formData.lastName}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleMobileBack}
                    className="shrink-0 text-[8px] font-bold uppercase tracking-wider text-white/40 underline underline-offset-4"
                  >
                    Alterar
                  </button>
                </div>

                <div className="space-y-1 text-[10px] leading-5 text-zinc-600">
                  <p>{formData.address}</p>

                  <p className="break-all">
                    {formData.email}
                  </p>
                </div>
              </section>

              {/* PAGAR AGORA */}
              <button
                type="button"
                onClick={openPaymentModal}
                className="group mt-4 flex min-h-[60px] w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-black transition-all active:scale-[0.985]"
              >
                Pagar agora

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              {/* VOLTAR */}
              <button
                type="button"
                onClick={handleMobileBack}
                className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-600"
              >
                <ChevronLeft size={13} />
                Voltar aos dados
              </button>

              <div className="mt-4 flex items-start gap-2.5 text-[8px] leading-5 text-zinc-700">
                <Lock
                  size={11}
                  className="mt-0.5 shrink-0"
                />

                <p>
                  Os seus dados são utilizados apenas para
                  processar a encomenda. Depois de escolher o
                  método, será redirecionado para a página de
                  pagamento.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BENEFÍCIOS */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            {
              icon: ShieldCheck,
              title: "Seguro",
            },
            {
              icon: PackageCheck,
              title: "Acompanhado",
            },
            {
              icon: Sparkles,
              title: "Tanosi",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/5 bg-white/[0.018] p-3"
              >
                <Icon
                  size={14}
                  className="text-white/25"
                />

                <p className="mt-2 text-[7px] font-black uppercase tracking-[0.14em] text-white/40">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* MODAL */}
        {renderPaymentModal()}
      </div>
    );
  };

  /* ============================================================
     DESKTOP

     Render function instead of nested component.
     ============================================================ */

  const renderDesktopCheckout = () => (
    <div className="hidden lg:block">
      {/* TOP BAR */}
      <div className="mb-10 flex items-center justify-between">
        <Link
          href="/collections"
          className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 text-[9px] font-bold uppercase tracking-[0.16em] text-white/45 transition-all hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          Voltar às compras
        </Link>

        <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3.5 py-2 text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
          <Lock size={11} />
          Checkout seguro
        </div>
      </div>

      {/* STEPS */}
      <div className="mb-12 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.15em]">
        <span className="text-white">
          Carrinho
        </span>

        <ChevronRight
          size={12}
          className="text-white/20"
        />

        <span className="text-white">
          Checkout
        </span>

        <ChevronRight
          size={12}
          className="text-white/20"
        />

        <span className="text-white/20">
          Pagamento
        </span>
      </div>

      {/* HERO */}
      <div className="mb-12 max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-white/20" />

          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
            Tanosi / Checkout
          </p>
        </div>

        <h1 className="text-[clamp(3rem,6vw,5.75rem)] font-black uppercase leading-[0.88] tracking-[-0.065em]">
          Finalize a sua
          <br />
          encomenda.
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500">
          Preencha os seus dados de entrega, escolha o
          método de pagamento e continue para concluir a
          sua compra de forma segura.
        </p>
      </div>

      <div className="grid grid-cols-12 items-start gap-8 xl:gap-10">
        {/* LEFT */}
        <div className="col-span-7 space-y-5">
          {/* DADOS */}
          <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <div className="border-b border-white/10 px-7 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <MapPin
                    size={18}
                    className="text-white"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black uppercase tracking-tight">
                      Dados de entrega
                    </h2>

                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[7px] font-bold uppercase tracking-wider text-white/30">
                      01
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-zinc-600">
                    Para onde devemos enviar a sua encomenda?
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="desktop-firstName"
                    className={labelClassName}
                  >
                    <User size={11} />
                    Nome
                  </label>

                  <input
                    id="desktop-firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="João"
                    autoComplete="given-name"
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="desktop-lastName"
                    className={labelClassName}
                  >
                    Apelido
                  </label>

                  <input
                    id="desktop-lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Manuel"
                    autoComplete="family-name"
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="desktop-email"
                  className={labelClassName}
                >
                  <Mail size={11} />
                  Endereço de e-mail
                </label>

                <input
                  id="desktop-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="joao@exemplo.com"
                  autoComplete="email"
                  className={inputClassName}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="desktop-address"
                  className={labelClassName}
                >
                  <Home size={11} />
                  Morada
                </label>

                <input
                  id="desktop-address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Rua, avenida, número e complemento"
                  autoComplete="street-address"
                  className={inputClassName}
                />
              </div>
            </div>
          </section>

          {/* PAGAMENTO */}
          <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between border-b border-white/10 px-7 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <ShieldCheck
                    size={19}
                    className="text-white"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black uppercase tracking-tight">
                      Pagamento
                    </h2>

                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[7px] font-bold uppercase tracking-wider text-white/30">
                      02
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-zinc-600">
                    Selecione como pretende pagar.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[7px] font-bold uppercase tracking-widest text-zinc-500">
                <Lock size={10} />
                Seguro
              </div>
            </div>

            <div className="space-y-3 p-7">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isSelected =
                  selectedPayment === method.id;

                return (
                  <button
                    type="button"
                    key={method.id}
                    onClick={() =>
                      setSelectedPayment(method.id)
                    }
                    className={`w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-white/25 bg-white/[0.055]"
                        : "border-white/7 bg-black/20 hover:border-white/15 hover:bg-white/[0.025]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          isSelected
                            ? "bg-white text-black"
                            : "bg-white/[0.045] text-zinc-500"
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p
                            className={`text-sm font-black uppercase tracking-tight ${
                              isSelected
                                ? "text-white"
                                : "text-zinc-300"
                            }`}
                          >
                            {method.title}
                          </p>

                          {method.badge && (
                            <span className="rounded-full border border-white/8 px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider text-zinc-600">
                              {method.badge}
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-[11px] text-zinc-600">
                          {method.description}
                        </p>

                        {method.images &&
                          method.images.length > 0 && (
                            <div className="mt-3 flex gap-2">
                              {method.images
                                .slice(0, 3)
                                .map(
                                  (
                                    image,
                                    index
                                  ) => (
                                    <div
                                      key={`${method.id}-${index}`}
                                      className="flex h-8 min-w-11 items-center justify-center rounded-lg border border-white/8 bg-black/30 px-2"
                                    >
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={image}
                                        alt=""
                                        className="max-h-4 max-w-9 object-contain opacity-60"
                                      />
                                    </div>
                                  )
                                )}
                            </div>
                          )}
                      </div>

                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-white bg-white"
                            : "border-white/20"
                        }`}
                      >
                        {isSelected && (
                          <Check
                            size={11}
                            strokeWidth={3}
                            className="text-black"
                          />
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="mt-4 border-t border-white/5 pt-4">
                        <p className="text-[10px] leading-5 text-zinc-600">
                          {method.details}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* BENEFÍCIOS */}
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
                  className="rounded-2xl border border-white/5 bg-white/[0.018] p-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.035]">
                    <Icon
                      size={15}
                      className="text-white/30"
                    />
                  </div>

                  <p className="mt-3 text-[8px] font-black uppercase tracking-[0.16em] text-white/50">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[9px] text-zinc-700">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — RESUMO */}
        <div className="col-span-5">
          <div className="sticky top-24">
            <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
              <div className="border-b border-white/10 px-7 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-white/25">
                      Encomenda
                    </p>

                    <h2 className="mt-1 text-xl font-black uppercase tracking-tight">
                      Resumo
                    </h2>
                  </div>

                  <div className="flex h-9 min-w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-2 text-[9px] font-black text-white/50">
                    {totalItems}
                  </div>
                </div>
              </div>

              <div className="max-h-[440px] space-y-5 overflow-y-auto p-7">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                  >
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-white/[0.04]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          item.image ||
                          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80"
                        }
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black/75 px-1 text-[8px] font-bold text-white">
                        {item.quantity}
                      </div>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <h3 className="line-clamp-2 text-sm font-bold leading-[1.3] text-white">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-zinc-700">
                          Quantidade / {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-bold text-white">
                        {formatMZN(
                          item.price * item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 px-7 py-7">
                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">
                      Subtotal
                    </span>

                    <span className="text-zinc-300">
                      {formatMZN(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-600">
                      Entrega
                    </span>

                    <span className="text-zinc-300">
                      {formatMZN(shipping)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-600">
                      Impostos
                    </span>

                    <span className="text-zinc-300">
                      {formatMZN(taxes)}
                    </span>
                  </div>
                </div>

                <div className="my-6 h-px bg-white/10" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                      Total da encomenda
                    </p>

                    <p className="mt-1 text-3xl font-black tracking-[-0.05em]">
                      {formatMZN(total)}
                    </p>
                  </div>

                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[7px] font-bold uppercase tracking-widest text-zinc-600">
                    MZN
                  </span>
                </div>

                <div className="mt-6 rounded-2xl border border-white/5 bg-black/25 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-zinc-700">
                        Pagamento
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-zinc-300">
                        {getPaymentLabel(
                          selectedPayment
                        )}
                      </p>
                    </div>

                    <Check
                      size={14}
                      className="text-white/40"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={continueToPayment}
                  disabled={isProcessing}
                  className="group mt-5 flex min-h-[58px] w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-black transition-all hover:bg-zinc-200 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-4 w-4 rounded-full border-2 border-black/20 border-t-black"
                      />

                      A preparar pagamento...
                    </>
                  ) : (
                    <>
                      Selecionar método

                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <div className="mt-5 flex items-start gap-2.5 text-[9px] leading-5 text-zinc-700">
                  <Lock
                    size={11}
                    className="mt-0.5 shrink-0"
                  />

                  <p>
                    Os seus dados são utilizados apenas para
                    processar a encomenda. O pagamento será
                    concluído numa página segura.
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-3 flex items-center justify-center gap-2 text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-700">
              <ShieldCheck size={12} />
              Pagamento seguro
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ============================================================
     PÁGINA
     ============================================================ */

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.018] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-16 pt-24 sm:px-6 sm:pb-24 lg:px-10 xl:px-12">
        {renderMobileCheckout()}
        {renderDesktopCheckout()}
      </div>

      <Footer />

      {/* AUTOFILL */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            input:-webkit-autofill:active {
              -webkit-text-fill-color: white;
              transition: background-color 9999s ease-in-out 0s;
            }

            html {
              background: #000;
            }

            body {
              background: #000;
            }
          `,
        }}
      />
    </main>
  );
}