import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useInvoice } from '../../context/InvoiceContext';
import { CURRENCIES } from '../../constants/currencies';
import {
  Building2,
  CreditCard,
  Sliders,
  Check,
  Sparkles,
  RotateCcw,
  Shield,
  ExternalLink,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { user, isPro, startFreeTrial, upgradeToPlan, cancelSubscription } = useAuth();
  const { invoice, updateBusiness, updateInvoice, openUpgradeModal } = useInvoice();

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveDefaults = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset your local draft and reload demo data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Settings & Account
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your business defaults, payment details, and billing subscription.
        </p>
      </div>

      {/* Subscription Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Subscription & Plan</h3>
              <p className="text-xs text-slate-500">
                Current tier: <span className="font-bold text-blue-600 uppercase">{user.subscription.plan}</span>
                {user.subscription.status === 'trialing' && ' (7-Day Free Trial)'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isPro ? (
              <button
                type="button"
                onClick={() => openUpgradeModal('settings')}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Upgrade to Pro</span>
              </button>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
                ACTIVE
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block mb-1">Billing Cycle</span>
            <span className="font-bold text-slate-800 dark:text-white capitalize">
              {user.subscription.billingCycle}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block mb-1">Monthly Invoices</span>
            <span className="font-bold text-slate-800 dark:text-white">
              {isPro ? 'Unlimited' : `${user.invoicesCreatedThisMonth} of 5 used`}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block mb-1">Stripe Customer Portal</span>
            <button
              type="button"
              onClick={() =>
                alert('Stripe Customer Portal: Here users can update payment cards or download tax receipts.')
              }
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center space-x-1"
            >
              <span>Manage Billing</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Business Defaults Form */}
      <form
        onSubmit={handleSaveDefaults}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6 text-xs"
      >
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Default Business Profile</h3>
              <p className="text-xs text-slate-500">Automatically populated when creating new invoices</p>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-xs hover:opacity-90 transition-opacity"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Saved</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Company / Freelance Name
            </label>
            <input
              type="text"
              value={invoice.business.name}
              onChange={(e) => updateBusiness({ name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Business Email
            </label>
            <input
              type="email"
              value={invoice.business.email}
              onChange={(e) => updateBusiness({ email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Default Currency
            </label>
            <select
              value={invoice.currency}
              onChange={(e) => updateInvoice({ currency: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-medium"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.symbol}) — {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Default Tax Rate (%)
            </label>
            <input
              type="number"
              value={invoice.taxRate}
              onChange={(e) => updateInvoice({ taxRate: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="bg-rose-50/40 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/40 p-6 flex items-center justify-between text-xs">
        <div>
          <h4 className="font-bold text-rose-800 dark:text-rose-300">Reset Local Demo Data</h4>
          <p className="text-slate-500 mt-0.5">Clears cached invoices, client contacts, and restored defaults.</p>
        </div>
        <button
          type="button"
          onClick={handleResetData}
          className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Data</span>
        </button>
      </div>
    </div>
  );
};
