"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  Wallet,
  Building2,
  Truck,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Lock,
  ShoppingBag,
  ArrowLeft,
  Mail,
  User,
  Home,
  AlertCircle,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { Footer } from "@/components/footer";

const paymentMethods = [
  {
    id: "card",
    title: "Cards",
    description: "Visa, Mastercard & more",
    icon: CreditCard,
  },
  {
    id: "mpesa",
    title: "M-Pesa",
    description: "Pay securely with M-Pesa",
    icon: Smartphone,
  },
  {
    id: "emola",
    title: "E-Mola",
    description: "Pay securely with E-Mola",
    icon: Wallet,
  },
  {
    id: "mkesh",
    title: "mKesh",
    description: "Pay securely with mKesh",
    icon: Building2,
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Truck,
  },
];

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/30 focus:bg-black/60 focus:ring-1 focus:ring-white/10";

export default function CheckoutPage() {
  const [mounted, setMounted] = React.useState(false);

  const { items, clearCart } = useCartStore();

  const [selectedPayment, setSelectedPayment] = React.useState("card");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [cardData, setCardData] = React.useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = React.useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    [items]
  );

  const shipping = items.length > 0 ? 99 : 0;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + taxes;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.address,
      formData.city,
      formData.state,
      formData.pinCode,
    ];

    if (requiredFields.some((field) => !field.trim())) {
      toast.error("Missing Information", {
        description:
          "Please complete all shipping details before continuing.",
      });

      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Invalid Email", {
        description:
          "Please enter a valid email address.",
      });

      return false;
    }

    if (formData.pinCode.length < 4) {
      toast.error("Invalid Postal Code", {
        description:
          "Please enter a valid postal code.",
      });

      return false;
    }

    if (selectedPayment === "card") {
      if (
        !cardData.number.trim() ||
        !cardData.expiry.trim() ||
        !cardData.cvc.trim() ||
        !cardData.name.trim()
      ) {
        toast.error("Card Details Required", {
          description:
            "Please complete your card information.",
        });

        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your Cart Is Empty", {
        description:
          "Add something to your cart before checking out.",
      });

      return;
    }

    if (!validateForm()) return;

    setIsProcessing(true);

    /*
     * Replace this simulation with your real payment
     * provider / checkout API.
     */
    await new Promise((resolve) =>
      setTimeout(resolve, 2200)
    );

    const generatedOrderId = `TT-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    setOrderId(generatedOrderId);
    setIsProcessing(false);
    setIsSuccess(true);

    clearCart();

    toast.success("Order confirmed", {
      description:
        "Your Ttanosi order has been placed successfully.",
    });
  };

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

  /*
   * ============================================================
   * EMPTY CART
   * ============================================================
   */

  if (items.length === 0 && !isSuccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg text-center"
        >
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
            <ShoppingBag
              size={40}
              className="text-white/30"
              strokeWidth={1.5}
            />
          </div>

          <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
            Checkout / Empty
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl">
            Nothing here.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
            Your bag is currently empty. Explore the latest
            Ttanosi pieces and find something that feels like
            you.
          </p>

          <Link
            href="/collections"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-black transition-all hover:scale-[1.03] hover:bg-zinc-200"
          >
            Start Shopping
            <ChevronRight size={16} />
          </Link>
        </motion.div>
      </main>
    );
  }

  /*
   * ============================================================
   * SUCCESS
   * ============================================================
   */

  if (isSuccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />

            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 180,
                  damping: 14,
                }}
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
              >
                <CheckCircle2
                  size={46}
                  strokeWidth={1.5}
                />
              </motion.div>

              <p className="mt-8 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
                Order / Confirmed
              </p>

              <h1 className="mt-3 text-4xl font-black uppercase tracking-tighter text-white">
                You&apos;re in.
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                Thanks for choosing Ttanosi. Your order has
                been successfully received.
              </p>

              <div className="my-8 h-px bg-white/10" />

              <div className="space-y-4 rounded-2xl border border-white/5 bg-black/30 p-5 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-zinc-500">
                    Order
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    #{orderId}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-zinc-500">
                    Amount
                  </span>
                  <span className="font-bold text-white">
                    MZN {total.toLocaleString("en-MZ")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-zinc-500">
                    Payment
                  </span>
                  <span className="text-sm font-medium text-zinc-300">
                    {paymentMethods.find(
                      (method) =>
                        method.id === selectedPayment
                    )?.title || selectedPayment}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-zinc-600">
                <PackageCheck size={14} />
                Your confirmation has been received.
              </div>

              <Link
                href="/"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 text-xs font-black uppercase tracking-[0.18em] text-black transition-all hover:bg-zinc-200"
              >
                Continue Shopping
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  /*
   * ============================================================
   * CHECKOUT
   * ============================================================
   */

  return (
    <main className="min-h-screen bg-black px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            TOP BAR
            ===================================================== */}

        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/collections"
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to shopping
          </Link>

          <div className="hidden items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 sm:flex">
            <Lock size={12} />
            Secure Checkout
          </div>
        </div>

        {/* =====================================================
            STEPS
            ===================================================== */}

        <div className="mb-10 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em]">
          <span className="text-white">Cart</span>
          <ChevronRight
            size={13}
            className="text-white/20"
          />
          <span className="text-white">Checkout</span>
          <ChevronRight
            size={13}
            className="text-white/20"
          />
          <span className="text-white/25">
            Confirmation
          </span>
        </div>

        <div className="mb-12">
          <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
            Ttanosi / Checkout
          </p>

          <h1 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:text-6xl">
            Complete your order.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Securely enter your details and choose your
            preferred payment method.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            {/* =================================================
                LEFT
                ================================================= */}

            <div className="space-y-6 lg:col-span-7">
              {/* SHIPPING */}

              <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
                <div className="border-b border-white/10 p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white">
                      <MapPin
                        size={20}
                        strokeWidth={1.6}
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-black uppercase tracking-tight text-white">
                        Shipping Details
                      </h2>
                      <p className="mt-1 text-xs text-zinc-600">
                        Where should we send your order?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-6 sm:p-8">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        <User size={12} />
                        First Name
                      </label>

                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        autoComplete="given-name"
                        className={inputClassName}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Last Name
                      </label>

                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        autoComplete="family-name"
                        className={inputClassName}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      <Mail size={12} />
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      autoComplete="email"
                      className={inputClassName}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      <Home size={12} />
                      Street Address
                    </label>

                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street, Apt 4B"
                      autoComplete="street-address"
                      className={inputClassName}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        City
                      </label>

                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Maputo"
                        autoComplete="address-level2"
                        className={inputClassName}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Province
                      </label>

                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Maputo"
                        autoComplete="address-level1"
                        className={inputClassName}
                      />
                    </div>

                    <div className="col-span-2 space-y-2 md:col-span-1">
                      <label className="px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        Postal Code
                      </label>

                      <input
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleInputChange}
                        placeholder="1100"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        className={inputClassName}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* PAYMENT */}

              <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
                <div className="flex items-center justify-between border-b border-white/10 p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white">
                      <ShieldCheck
                        size={20}
                        strokeWidth={1.6}
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-black uppercase tracking-tight text-white">
                        Payment
                      </h2>
                      <p className="mt-1 text-xs text-zinc-600">
                        Choose how you want to pay.
                      </p>
                    </div>
                  </div>

                  <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest text-zinc-500 sm:flex">
                    <Lock size={11} />
                    SSL Secure
                  </div>
                </div>

                <div className="space-y-3 p-6 sm:p-8">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected =
                      selectedPayment === method.id;

                    return (
                      <div
                        key={method.id}
                        className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                          isSelected
                            ? "border-white/25 bg-white/[0.055]"
                            : "border-white/5 bg-black/20 hover:border-white/10"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPayment(method.id)
                          }
                          className="flex w-full items-center justify-between p-4 text-left sm:p-5"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all ${
                                isSelected
                                  ? "bg-white text-black"
                                  : "bg-white/[0.05] text-zinc-500"
                              }`}
                            >
                              <Icon size={18} />
                            </div>

                            <div>
                              <p
                                className={`text-sm font-bold transition-colors ${
                                  isSelected
                                    ? "text-white"
                                    : "text-zinc-400"
                                }`}
                              >
                                {method.title}
                              </p>

                              <p className="mt-1 text-[10px] text-zinc-600">
                                {method.description}
                              </p>
                            </div>
                          </div>

                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                              isSelected
                                ? "border-white"
                                : "border-white/20"
                            }`}
                          >
                            {isSelected && (
                              <div className="h-2.5 w-2.5 rounded-full bg-white" />
                            )}
                          </div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isSelected && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.25,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-white/5 px-4 pb-5 pt-4 sm:px-5">
                                {/* CARD */}

                                {method.id === "card" && (
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <label className="px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                        Card Number
                                      </label>

                                      <div className="relative">
                                        <CreditCard
                                          size={17}
                                          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                                        />

                                        <input
                                          type="text"
                                          name="number"
                                          value={cardData.number}
                                          onChange={
                                            handleCardChange
                                          }
                                          placeholder="0000 0000 0000 0000"
                                          inputMode="numeric"
                                          autoComplete="cc-number"
                                          className={`${inputClassName} pl-11`}
                                        />
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <label className="px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                          Expiry
                                        </label>

                                        <input
                                          type="text"
                                          name="expiry"
                                          value={cardData.expiry}
                                          onChange={
                                            handleCardChange
                                          }
                                          placeholder="MM / YY"
                                          autoComplete="cc-exp"
                                          className={inputClassName}
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <label className="px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                          CVC
                                        </label>

                                        <input
                                          type="password"
                                          name="cvc"
                                          value={cardData.cvc}
                                          onChange={
                                            handleCardChange
                                          }
                                          placeholder="•••"
                                          maxLength={4}
                                          inputMode="numeric"
                                          autoComplete="cc-csc"
                                          className={inputClassName}
                                        />
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <label className="px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                        Cardholder Name
                                      </label>

                                      <input
                                        type="text"
                                        name="name"
                                        value={cardData.name}
                                        onChange={
                                          handleCardChange
                                        }
                                        placeholder="John Doe"
                                        autoComplete="cc-name"
                                        className={inputClassName}
                                      />
                                    </div>
                                  </div>
                                )}

                                {/* M-PESA */}

                                {method.id === "mpesa" && (
                                  <div className="py-4 text-center">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                                      <Smartphone
                                        size={23}
                                        className="text-white/50"
                                      />
                                    </div>

                                    <p className="text-sm text-zinc-400">
                                      You&apos;ll be securely
                                      redirected to M-Pesa to
                                      complete your payment.
                                    </p>
                                  </div>
                                )}

                                {/* E-MOLA */}

                                {method.id === "emola" && (
                                  <div className="py-4 text-center">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                                      <Wallet
                                        size={23}
                                        className="text-white/50"
                                      />
                                    </div>

                                    <p className="text-sm text-zinc-400">
                                      You&apos;ll be securely
                                      redirected to E-Mola to
                                      complete your payment.
                                    </p>
                                  </div>
                                )}

                                {/* MKESH */}

                                {method.id === "mkesh" && (
                                  <div className="py-4 text-center">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                                      <Building2
                                        size={23}
                                        className="text-white/50"
                                      />
                                    </div>

                                    <p className="text-sm text-zinc-400">
                                      You&apos;ll be securely
                                      redirected to mKesh to
                                      complete your payment.
                                    </p>
                                  </div>
                                )}

                                {/* COD */}

                                {method.id === "cod" && (
                                  <div className="flex gap-4 rounded-xl border border-amber-500/10 bg-amber-500/[0.05] p-4">
                                    <AlertCircle
                                      size={19}
                                      className="mt-0.5 shrink-0 text-amber-500"
                                    />

                                    <div>
                                      <p className="text-sm font-bold text-amber-400">
                                        Pay when it arrives
                                      </p>

                                      <p className="mt-1 text-xs leading-relaxed text-amber-500/60">
                                        Cash on delivery may
                                        include an additional
                                        handling fee. Payment can
                                        be made using supported
                                        methods upon delivery.
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* TRUST */}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Secure",
                    text: "Protected checkout",
                  },
                  {
                    icon: PackageCheck,
                    title: "Tracked",
                    text: "Order tracking",
                  },
                  {
                    icon: Sparkles,
                    title: "Ttanosi",
                    text: "Made for the movement",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                    >
                      <Icon
                        size={17}
                        className="text-white/30"
                      />

                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/60">
                          {item.title}
                        </p>

                        <p className="mt-1 text-[9px] text-zinc-700">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                RIGHT — ORDER SUMMARY
                ================================================= */}

            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl">
                  <div className="border-b border-white/10 p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-white/25">
                          Order
                        </p>

                        <h2 className="mt-1 text-xl font-black uppercase tracking-tight text-white">
                          Summary
                        </h2>
                      </div>

                      <div className="flex h-9 min-w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-2 text-[9px] font-black text-white/50">
                        {items.reduce(
                          (acc, item) =>
                            acc + item.quantity,
                          0
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="max-h-[420px] space-y-5 overflow-y-auto p-6 custom-scrollbar sm:p-8">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="group flex gap-4"
                      >
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-white/[0.04]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={
                              item.image ||
                              "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80"
                            }
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          <div className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black/70 px-1 text-[8px] font-bold text-white backdrop-blur">
                            {item.quantity}
                          </div>
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                          <div>
                            <h3 className="line-clamp-2 text-sm font-bold leading-tight text-white">
                              {item.name}
                            </h3>

                            <p className="mt-1 text-[10px] uppercase tracking-widest text-zinc-600">
                              Qty / {item.quantity}
                            </p>
                          </div>

                          <p className="text-sm font-bold text-white">
                            MZN{" "}
                            {(
                              item.price *
                              item.quantity
                            ).toLocaleString("en-MZ")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 p-6 sm:p-8">
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-600">
                          Subtotal
                        </span>

                        <span className="font-medium text-zinc-300">
                          MZN{" "}
                          {subtotal.toLocaleString("en-MZ")}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-600">
                          Shipping
                        </span>

                        <span className="font-medium text-zinc-300">
                          MZN{" "}
                          {shipping.toLocaleString("en-MZ")}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-600">
                          Taxes
                        </span>

                        <span className="font-medium text-zinc-300">
                          MZN{" "}
                          {taxes.toLocaleString("en-MZ")}
                        </span>
                      </div>
                    </div>

                    <div className="my-6 h-px bg-white/10" />

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                          Total
                        </p>

                        <p className="mt-1 text-3xl font-black tracking-tighter text-white">
                          MZN {total.toLocaleString("en-MZ")}
                        </p>
                      </div>

                      <span className="mb-1 rounded-full border border-white/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-zinc-600">
                        MZN
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="group mt-7 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-black transition-all hover:bg-zinc-200 hover:shadow-[0_10px_40px_rgba(255,255,255,0.08)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 sm:py-4"
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
                            className="h-4 w-4 rounded-full border-2 border-black/20 border-t-black"
                          />

                          Processing Order
                        </>
                      ) : (
                        <>
                          Pay MZN{" "}
                          {total.toLocaleString("en-MZ")}

                          <Lock
                            size={15}
                            className="text-black/40 transition-colors group-hover:text-black"
                          />
                        </>
                      )}
                    </button>

                    <div className="mt-5 flex items-start gap-2 text-[9px] leading-relaxed text-zinc-700">
                      <Lock
                        size={12}
                        className="mt-0.5 shrink-0"
                      />

                      <p>
                        Your payment information is encrypted
                        and securely processed. By placing your
                        order, you agree to our Terms of Service
                        and Privacy Policy.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </form>
      </div>
      

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255,255,255,0.12);
              border-radius: 999px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255,255,255,0.2);
            }
          `,
        }}
      />
    </main>

    
  );
}