import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useInvoice } from '../../context/InvoiceContext';
import {
  X,
  Sparkles,
  Check,
  CreditCard,
  ShieldCheck,
  Lock,
  ArrowRight,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const UpgradeModal: React.FC = () => {
  const { isUpgradeModalOpen, setIsUpgradeModalOpen, upgradeModalReason } = useInvoice();
  const { startFreeTrial, upgradeToPlan } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isUpgradeModalOpen) return null;

  const reasonTitles: Record<string, { title: string; desc: string }> = {
    template: {
      title: 'Unlock 16+ Designer Templates',
      desc: 'Upgrade to Pro to access this template and 15 others, complete with custom styling.',
    },
    templates_all: {
      title: 'Full Template Collection',
      desc: 'Get access to every minimal, modern, dark, and tech layout tailored for professionals.',
    },
    watermark: {
      title: 'Remove InvoiceFlow Watermark',
      desc: 'Deliver 100% white-label invoices to your clients with zero InvoiceFlow branding.',
    },
    monthly_limit: {
      title: 'You reached your free monthly limit',
      desc: 'Free accounts include 5 invoices per month. Upgrade to Pro for unlimited generation.',
    },
    recurring: {
      title: 'Automate Recurring Invoices',
      desc: 'Schedule weekly, monthly, or quarterly invoices that generate and send automatically.',
    },
    dashboard: {
      title: 'Unlock Full Financial Dashboard',
      desc: 'Gain instant insights into your paid revenue, pending invoices, and client history.',
    },
    pro_badge: {
      title: 'Upgrade to InvoiceFlow Pro',
      desc: 'Unlimited invoices, all templates, client book, and zero watermark branding.',
    },
  };

  const currentInfo = reasonTitles[upgradeModalReason] || reasonTitles.pro_badge;

  const handleStartTrial = () => {
    startFreeTrial();
    setIsUpgradeModalOpen(false);
  };

  const handleStripeCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      upgradeToPlan('pro', billingCycle);
      setIsProcessing(false);
      setIsUpgradeModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-800 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={() => setIsUpgradeModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>InvoiceFlow Pro</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {currentInfo.title}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">{currentInfo.desc}</p>
        </div>

        {/* Feature Checkmarks */}
        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-blue-600 font-bold shrink-0" />
            <span><strong>Unlimited monthly invoices</strong> & downloads</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-blue-600 font-bold shrink-0" />
            <span>All 16+ Premium Templates (Dark Header, Tech, Swiss)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-blue-600 font-bold shrink-0" />
            <span>Remove "Made with InvoiceFlow" branding watermark</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-blue-600 font-bold shrink-0" />
            <span>Recurring auto-billing schedules</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-blue-600 font-bold shrink-0" />
            <span>Client directory CRM & Item Catalog</span>
          </div>
        </div>

        {/* Billing Switch */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">
              {billingCycle === 'yearly' ? '$60 / year ($5/mo)' : '$7 / month'}
            </span>
            <span className="text-[11px] text-slate-500">
              {billingCycle === 'yearly' ? 'Save 28% with annual plan' : 'Billed monthly, cancel anytime'}
            </span>
          </div>

          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                billingCycle === 'monthly' ? 'bg-white dark:bg-slate-900 shadow-xs text-blue-600' : 'text-slate-500'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                billingCycle === 'yearly' ? 'bg-white dark:bg-slate-900 shadow-xs text-blue-600' : 'text-slate-500'
              }`}
            >
              Yearly (-28%)
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleStartTrial}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Start 7-Day Free Trial (No Card Required)</span>
          </button>

          <button
            type="button"
            disabled={isProcessing}
            onClick={handleStripeCheckout}
            className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-xs font-semibold text-slate-800 dark:text-white transition-colors flex items-center justify-center space-x-2"
          >
            <CreditCard className="w-4 h-4 text-slate-500" />
            <span>{isProcessing ? 'Processing Stripe Checkout...' : 'Subscribe Instantly with Card / Apple Pay'}</span>
          </button>
        </div>

        <div className="text-center text-[11px] text-slate-400 flex items-center justify-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Encrypted Stripe 256-bit payment checkout. Cancel anytime.</span>
        </div>
      </div>
    </div>
  );
};
