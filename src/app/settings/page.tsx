"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Bell, User, Monitor, Globe, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-4xl min-h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation (Mock visually) */}
          <aside className="col-span-1 flex flex-col space-y-2">
            <button className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium transition-colors">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
            <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
              <Monitor className="w-5 h-5" />
              <span>Appearance</span>
            </button>
            <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </button>
            <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
              <Globe className="w-5 h-5" />
              <span>Regional</span>
            </button>
            <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
              <CreditCard className="w-5 h-5" />
              <span>Billing</span>
            </button>
          </aside>

          {/* Main Content Area */}
          <div className="col-span-1 md:col-span-3 space-y-12">
            
            {/* Theme Section */}
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-1">Appearance</h2>
                <p className="text-muted-foreground text-sm">Customize how Hyper looks on your device.</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex flex-col items-center justify-center space-y-3 p-4 rounded-xl border-2 transition-all ${
                    theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shadow-inner">
                    <div className="w-6 h-6 rounded-full bg-white shadow-sm" />
                  </div>
                  <span className="font-semibold text-sm">Light</span>
                </button>

                <button
                  onClick={() => setTheme("dark")}
                  className={`flex flex-col items-center justify-center space-y-3 p-4 rounded-xl border-2 transition-all ${
                    theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center shadow-inner">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 shadow-sm" />
                  </div>
                  <span className="font-semibold text-sm">Dark</span>
                </button>

                <button
                  onClick={() => setTheme("system")}
                  className={`flex flex-col items-center justify-center space-y-3 p-4 rounded-xl border-2 transition-all ${
                    theme === "system" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-zinc-900 flex items-center justify-center shadow-inner p-1">
                     <div className="w-full h-full rounded-full bg-background overflow-hidden relative">
                       <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-white" />
                       <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-zinc-900" />
                     </div>
                  </div>
                  <span className="font-semibold text-sm">System</span>
                </button>
              </div>
            </section>

            <div className="h-px bg-border/60" />

            {/* Profile Section (Mock) */}
            <section className="space-y-6">
               <div>
                <h2 className="text-2xl font-bold tracking-tight mb-1">Profile Information</h2>
                <p className="text-muted-foreground text-sm">Update your account details and public persona.</p>
              </div>
              
              <div className="space-y-4 max-w-md">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground uppercase overflow-hidden ring-2 ring-background ring-offset-2 ring-offset-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-md hover:bg-secondary/80 transition-colors">
                    Change Avatar
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    defaultValue="Jane Doe"
                    disabled
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    defaultValue="jane.doe@example.com"
                    disabled
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <p className="text-[0.8rem] text-muted-foreground">Your email address is managed by your sign-in provider.</p>
                </div>
              </div>
            </section>

             <div className="h-px bg-border/60" />

            {/* Notification Section (Mock) */}
            <section className="space-y-6">
               <div>
                <h2 className="text-2xl font-bold tracking-tight mb-1">Notifications</h2>
                <p className="text-muted-foreground text-sm">Configure how you receive alerts and updates.</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Order Updates", desc: "Get notified when your order status changes." },
                  { title: "Promotions & Offers", desc: "Receive emails about exclusive deals and new drops." },
                  { title: "SMS Alerts", desc: "Get text messages for delivery tracking." },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm leading-none">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    {/* Mock Toggle Switch */}
                    <div className={`w-11 h-6 rounded-full p-1 transition-colors ${i === 2 ? 'bg-muted' : 'bg-primary'}`}>
                       <div className={`w-4 h-4 rounded-full bg-background transition-transform ${i === 2 ? 'translate-x-0' : 'translate-x-5'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
          </div>
        </div>
      </motion.div>
    </div>
  );
}
