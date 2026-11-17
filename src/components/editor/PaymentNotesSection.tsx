import React from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { FileText, Clock } from 'lucide-react';

export const PaymentNotesSection: React.FC = () => {
  const { invoice, updateInvoice } = useInvoice();

  const commonTerms = [
    'Due on receipt',
    'Net 7 calendar days',
    'Net 14 calendar days',
    'Net 30 calendar days',
    '50% upfront deposit, 50% upon project handover',
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
      <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          <FileText className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Notes & Payment Terms</h3>
          <p className="text-xs text-slate-500">Provide payment instructions and thank you remarks</p>
        </div>
      </div>

      <div className="space-y-3.5 text-xs">
        {/* Notes */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Notes & Comments for Client
          </label>
          <textarea
            rows={2}
            value={invoice.notes}
            onChange={(e) => updateInvoice({ notes: e.target.value })}
            placeholder="Thank you for your business! Please remit payment via bank transfer or credit card."
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Payment Terms */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Payment Terms</span>
            </label>
            <div className="flex items-center space-x-1 overflow-x-auto">
              {commonTerms.slice(0, 3).map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => updateInvoice({ paymentTerms: term })}
                  className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-1.5 py-0.5 rounded transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          <input
            type="text"
            value={invoice.paymentTerms}
            onChange={(e) => updateInvoice({ paymentTerms: e.target.value })}
            placeholder="Payment due within 14 calendar days"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Footer Message */}
        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
            Footer / Support Message
          </label>
          <input
            type="text"
            value={invoice.footerMessage}
            onChange={(e) => updateInvoice({ footerMessage: e.target.value })}
            placeholder="Questions? Contact us at support@yourbrand.com"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
