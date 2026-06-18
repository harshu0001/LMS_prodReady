"use client";

import React, { useState } from "react";

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState("general"); // general, branding, payments, notifications
  
  // Site identity states
  const [siteName, setSiteName] = useState("Crashup Learning");
  const [supportEmail, setSupportEmail] = useState("support@crashuplearning.edu");
  const [language, setLanguage] = useState("English (US)");
  const [timezone, setTimezone] = useState("(GMT-05:00) Eastern Time");

  // Platform toggles states
  const [gamification, setGamification] = useState(true);
  const [communities, setCommunities] = useState(true);
  const [aiGenerator, setAiGenerator] = useState(false);

  // Success message feedback
  const handleSave = () => {
    alert("System settings saved successfully!");
  };

  return (
    <main className="p-gutter max-w-container-max mx-auto pb-32 space-y-gutter">
      {/* Header Section */}
      <section className="mb-lg">
        <div className="flex items-center gap-2 mb-2 text-on-surface-variant">
          <span className="font-semibold text-[11px] uppercase tracking-wider">Admin</span>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="font-semibold text-[11px] uppercase tracking-wider text-primary">Settings</span>
        </div>
        <h2 className="font-heading text-display-lg-mobile md:text-headline-md text-on-surface tracking-tight font-extrabold leading-tight">
          System Settings
        </h2>
        <p className="text-body-md text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
          Configure your platform's core identity, visual language, financial integrations, and communication protocols.
        </p>
      </section>

      {/* Tab Navigation */}
      <section className="flex items-center gap-6 border-b border-outline-variant/30 mb-8 overflow-x-auto scrollbar-hide">
        {[
          { id: "general", name: "General" },
          { id: "branding", name: "Branding" },
          { id: "payments", name: "Payments" },
          { id: "notifications", name: "Notifications" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 font-bold text-xs transition-colors relative cursor-pointer ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </section>

      {/* Settings Grid (Bento Style with Toggles on the Right Side) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Side: Dynamic Tab Forms */}
        <div className="lg:col-span-8 space-y-gutter">
          {activeTab === "general" && (
            <div className="space-y-gutter">
              {/* Site Identity */}
              <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <h3 className="font-heading text-headline-sm font-bold text-on-surface">Site Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-xs bg-slate-50/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-xs bg-slate-50/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                    Platform Logo
                  </label>
                  <div className="flex items-center gap-6 p-4 border-2 border-dashed border-outline-variant/60 rounded-2xl bg-surface-container-low/40">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        auto_awesome
                      </span>
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-xs text-on-surface">Upload a new logo</p>
                      <p className="text-[10px] text-on-surface-variant mt-0.5 mb-3">
                        SVG, PNG, or JPG (min. 512x512px)
                      </p>
                      <button
                        type="button"
                        onClick={() => alert("Upload file selector wizard.")}
                        className="bg-surface border border-outline-variant/60 text-on-surface font-bold px-4 py-2 rounded-xl text-[10px] hover:bg-surface-container-high transition-colors cursor-pointer"
                      >
                        Replace Logo
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regional Settings */}
              <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <h3 className="font-heading text-headline-sm font-bold text-on-surface">Regional Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Default Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-xs bg-slate-50/30 cursor-pointer"
                    >
                      <option>English (US)</option>
                      <option>Spanish (LatAm)</option>
                      <option>French (France)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                      Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-xs bg-slate-50/30 cursor-pointer"
                    >
                      <option>(GMT-05:00) Eastern Time</option>
                      <option>(GMT-08:00) Pacific Time</option>
                      <option>(GMT+00:00) London</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "branding" && (
            <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm space-y-6">
              <div>
                <h3 className="font-heading text-headline-sm font-bold text-on-surface">Color Palette</h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Preview current design system tokens applied to UI elements.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <div className="h-16 w-full rounded-xl bg-primary shadow-inner"></div>
                  <label className="text-[10px] font-bold text-on-surface text-center block">Primary (Indigo)</label>
                </div>
                <div className="space-y-1.5">
                  <div className="h-16 w-full rounded-xl bg-secondary shadow-inner"></div>
                  <label className="text-[10px] font-bold text-on-surface text-center block">Secondary (Slate)</label>
                </div>
                <div className="space-y-1.5">
                  <div className="h-16 w-full rounded-xl bg-emerald-500 shadow-inner"></div>
                  <label className="text-[10px] font-bold text-on-surface text-center block">Accent (Emerald)</label>
                </div>
                <div
                  onClick={() => alert("Palette customization requires design upgrade.")}
                  className="border-2 border-dashed border-outline-variant rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-50 min-h-[90px] text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">add</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-heading text-headline-sm font-bold text-on-surface">Payment Gateways</h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Connect and configure accounts to process student tuition fees.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Gateway setup onboarding...")}
                  className="bg-primary text-on-primary font-bold px-4 py-2 rounded-xl text-xs hover:opacity-90 cursor-pointer shadow-sm"
                >
                  Add New
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-outline-variant/40 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600">
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        payments
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-xs text-on-surface">Stripe Checkout</p>
                      <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span>Connected</span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Configuring Stripe keys...")}
                    className="font-bold text-xs text-primary px-3 py-1.5 hover:bg-primary/5 rounded-lg cursor-pointer"
                  >
                    Configure
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-outline-variant/40 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-4 opacity-50">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-800">
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        account_balance_wallet
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-xs text-on-surface">PayPal Pro</p>
                      <p className="text-[10px] text-on-surface-variant font-semibold mt-0.5">Not connected</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Connecting to PayPal...")}
                    className="bg-surface border border-outline-variant/60 text-on-surface font-bold px-4 py-2 rounded-xl text-xs hover:bg-surface-container-high cursor-pointer"
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm space-y-6">
              <div>
                <h3 className="font-heading text-headline-sm font-bold text-on-surface">Email Templates</h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Manage trigger templates for student communications.
                </p>
              </div>

              <div className="space-y-1 divide-y divide-outline-variant/10">
                {[
                  { title: "Welcome Onboarding", desc: "Sent when a new student joins a cohort.", icon: "mail" },
                  { title: "Payment Success Invoice", desc: "Automated invoice receipt and seat verification confirmation.", icon: "receipt_long" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => alert(`Editing template: ${item.title}`)}
                    className="group cursor-pointer py-4 flex justify-between items-center hover:px-2 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-primary bg-primary/10 p-2.5 rounded-xl text-xl shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <p className="font-bold text-xs text-on-surface">{item.title}</p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">
                      chevron_right
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Global Switches & System Health */}
        <div className="lg:col-span-4 space-y-gutter">
          {/* Platform switches */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div>
              <h4 className="font-heading text-sm font-bold text-on-surface">Platform Features</h4>
              <p className="text-[10px] text-on-surface-variant mt-1 leading-normal">
                Enable or disable core modules globally across the system.
              </p>
            </div>

            <div className="space-y-5 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <p className="font-bold text-xs text-on-surface">Gamification Engine</p>
                  <p className="text-[9px] text-on-surface-variant">Badges, points, and leaderboards.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setGamification(!gamification)}
                  className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${
                    gamification ? "bg-primary" : "bg-outline-variant"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                      gamification ? "right-0.5" : "left-0.5"
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <p className="font-bold text-xs text-on-surface">Course Communities</p>
                  <p className="text-[9px] text-on-surface-variant">Private forums and peer chat.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCommunities(!communities)}
                  className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${
                    communities ? "bg-primary" : "bg-outline-variant"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                      communities ? "right-0.5" : "left-0.5"
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <p className="font-bold text-xs text-on-surface">AI Lesson Generator</p>
                  <p className="text-[9px] text-on-surface-variant">Automated content drafting tool.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAiGenerator(!aiGenerator)}
                  className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${
                    aiGenerator ? "bg-primary" : "bg-outline-variant"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                      aiGenerator ? "right-0.5" : "left-0.5"
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-primary-container/10 border border-primary/20 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">info</span>
              <div>
                <h4 className="font-bold text-xs text-on-surface leading-tight">System Health</h4>
                <p className="text-[10px] text-on-surface-variant mt-1.5 leading-relaxed">
                  Last backup performed 12 hours ago. Automatic platform updates are enabled for current version 2.4.1.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => alert("Triggering manual database backup to S3...")}
              className="w-full border border-primary text-primary hover:bg-primary hover:text-on-primary font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Manual Backup
            </button>
          </div>

          {/* Global Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 bg-primary text-on-primary font-bold py-3 rounded-xl shadow-lg shadow-primary/20 hover:opacity-95 active:scale-95 transition-all text-xs cursor-pointer text-center"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm("Discard unsaved configuration modifications?")) {
                  window.location.reload();
                }
              }}
              className="bg-surface border border-outline-variant/60 text-on-surface-variant font-bold px-5 py-3 rounded-xl text-xs hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              Discard
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
