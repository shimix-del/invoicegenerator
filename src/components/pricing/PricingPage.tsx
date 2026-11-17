import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useInvoice } from '../../context/InvoiceContext';
import { Check, Sparkles, Zap, Shield, ArrowRight, Star } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { isPro, user, startFreeTrial, upgradeToPlan } = useAuth();
  const { openUpgradeModal, setActiveView } = useInvoice();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const proPrice = billingCycle === 'yearly' ? '$5' : '$7';
  const proSub = billingCycle === 'yearly' ? '$60 billed annually (Save 28%)' : '$7 billed monthly';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Flexible Pricing for Independent Pros
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Supercharge your business with InvoiceFlow Pro
        </h1>
        <p className="text-base text-slate-500">
          Start free forever, or upgrade to Pro for unlimited invoices, 16+ high-converting templates, client CRM, and automatic recurring billing.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="flex items-center justify-center pt-4">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center space-x-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
                Save 28%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Free Plan */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Free Plan</h3>
            <div className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</div>
            <p className="text-xs text-slate-500">Fast, basic invoicing with zero commitment.</p>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>5 invoices per month</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>3 basic core templates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Auto-saved business info</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Client-side PDF generation</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <span className="w-4 h-4 text-center">—</span>
                <span>Small "Made with InvoiceFlow" footer</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('editor')}
            className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Start For Free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-b from-blue-600/5 to-indigo-600/10 dark:from-blue-950/40 dark:to-indigo-950/40 p-8 rounded-3xl border-2 border-blue-600 shadow-2xl relative flex flex-col justify-between space-y-6">
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
            Recommended
          </span>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">Pro Freelancer</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                {proPrice}
              </span>
              <span className="text-xs text-slate-500">/ month</span>
            </div>
            <p className="text-xs font-medium text-emerald-600">{proSub}</p>
            <p className="text-xs text-slate-500">Everything you need to bill like an enterprise.</p>

            <div className="pt-4 border-t border-blue-200 dark:border-blue-900/60 space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-600 font-bold" />
                <span><strong>Unlimited invoices & downloads</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span><strong>Remove branding footer</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span>16+ Designer Templates (Dark, Modern, Swiss)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span>Recurring invoices (weekly, monthly, quarterly)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span>Send invoices directly with payment link</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span>Financial revenue chart & CSV export</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                startFreeTrial();
                setActiveView('editor');
              }}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
            >
              Start 7-Day Free Trial (No Card Needed)
            </button>
            <button
              onClick={() => openUpgradeModal('pricing_checkout')}
              className="w-full py-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              Or upgrade immediately via Stripe
            </button>
          </div>
        </div>

        {/* Business Plan */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Business / Agency</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$15</span>
              <span className="text-xs text-slate-500">/ month</span>
            </div>
            <p className="text-xs text-slate-500">For agencies managing multiple brands and client teams.</p>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Everything in Pro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Multiple business profiles & brands</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Unlimited team member seats</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Dedicated account manager & SLA</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openUpgradeModal('business')}
            className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Select Business
          </button>
        </div>
      </div>

      {/* ONE-TIME TEMPLATE PACKS OPTION */}
      <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Prefer a one-time purchase instead?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Buy individual premium template packs for a one-off fee ($5 – $9) with lifetime usage and no subscription.
            </p>
          </div>
          <button
            onClick={() => openUpgradeModal('template_pack')}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white hover:bg-slate-50 transition-colors shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Browse Template Packs ($5-$9)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
