import React, { useState } from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { useAuth } from '../../context/AuthContext';
import { X, Repeat, Sparkles, Check, Calendar } from 'lucide-react';

export const RecurringModal: React.FC = () => {
  const { invoice, updateInvoice, isRecurringModalOpen, setIsRecurringModalOpen, openUpgradeModal } =
    useInvoice();
  const { isPro } = useAuth();

  const [enabled, setEnabled] = useState(invoice.recurring?.enabled ?? true);
  const [frequency, setFrequency] = useState(invoice.recurring?.frequency ?? 'monthly');
  const [nextRunDate, setNextRunDate] = useState(
    invoice.recurring?.nextRunDate ??
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [autoSend, setAutoSend] = useState(invoice.recurring?.autoSendEmail ?? true);

  if (!isRecurringModalOpen) return null;

  const handleSaveSchedule = () => {
    if (!isPro) {
      setIsRecurringModalOpen(false);
      openUpgradeModal('recurring');
      return;
    }

    updateInvoice({
      recurring: {
        enabled,
        frequency,
        nextRunDate,
        autoSendEmail: autoSend,
      },
    });

    setIsRecurringModalOpen(false);
    alert('Recurring invoice schedule saved!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5 text-slate-800 dark:text-slate-100 text-xs">
        <button
          onClick={() => setIsRecurringModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
            <Repeat className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recurring Invoice Schedule</h2>
            <p className="text-slate-500">Automatically reissue this invoice on a schedule</p>
          </div>
        </div>

        {!isPro && (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center space-x-2 text-amber-800 dark:text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Recurring auto-invoices is a Pro feature.</span>
          </div>
        )}

        <div className="space-y-4">
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Enable Recurring Billing
            </span>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Billing Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-medium"
            >
              <option value="weekly">Weekly (Every 7 days)</option>
              <option value="biweekly">Bi-weekly (Every 14 days)</option>
              <option value="monthly">Monthly (Every month)</option>
              <option value="quarterly">Quarterly (Every 3 months)</option>
              <option value="yearly">Yearly (Every 12 months)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Next Generation Date</span>
            </label>
            <input
              type="date"
              value={nextRunDate}
              onChange={(e) => setNextRunDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={autoSend}
              onChange={(e) => setAutoSend(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Auto-send PDF to client's email upon creation</span>
          </label>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleSaveSchedule}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Save Recurring Schedule</span>
          </button>
        </div>
      </div>
    </div>
  );
};
