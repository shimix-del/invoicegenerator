import React from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { generateNextInvoiceNumber } from '../../utils/calculations';
import { Calendar, Hash, RefreshCw, ArrowRightLeft } from 'lucide-react';
import { DocumentType, InvoiceStatus } from '../../types/invoice';

export const MetaSection: React.FC = () => {
  const { invoice, updateInvoice, convertEstimateToInvoice } = useInvoice();

  const handleNextNumber = () => {
    const next = generateNextInvoiceNumber(invoice.invoiceNumber);
    updateInvoice({ invoiceNumber: next });
  };

  const isEstimate = invoice.documentType === 'estimate' || invoice.documentType === 'quote';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
        {/* Document Type Selector Tabs */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          {(['invoice', 'estimate', 'quote', 'receipt'] as DocumentType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => updateInvoice({ documentType: type })}
              className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all ${
                invoice.documentType === type
                  ? 'bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Convert to Invoice button if Estimate/Quote */}
        {isEstimate && (
          <button
            type="button"
            onClick={convertEstimateToInvoice}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Convert to Invoice</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 pt-4 text-xs">
        {/* Invoice Number */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
            <span>{invoice.documentType.toUpperCase()} #</span>
            <button
              type="button"
              onClick={handleNextNumber}
              title="Auto-increment invoice number"
              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-0.5"
            >
              <RefreshCw className="w-2.5 h-2.5 mr-0.5" />
              <span>Next</span>
            </button>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <Hash className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* PO Number */}
        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
            P.O. Number (Optional)
          </label>
          <input
            type="text"
            value={invoice.poNumber || ''}
            onChange={(e) => updateInvoice({ poNumber: e.target.value })}
            placeholder="e.g. PO-8419"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Issue Date */}
        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Issue Date</span>
          </label>
          <input
            type="date"
            value={invoice.issueDate}
            onChange={(e) => updateInvoice({ issueDate: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Due Date</span>
          </label>
          <input
            type="date"
            value={invoice.dueDate}
            onChange={(e) => updateInvoice({ dueDate: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Status tracking row */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2 text-xs">
        <span className="font-semibold text-slate-600 dark:text-slate-400">Payment Status:</span>
        <div className="flex items-center space-x-1.5 flex-wrap gap-1">
          {(['draft', 'sent', 'viewed', 'paid', 'overdue'] as InvoiceStatus[]).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => updateInvoice({ status: st })}
              className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase transition-all ${
                invoice.status === st
                  ? st === 'paid'
                    ? 'bg-emerald-600 text-white'
                    : st === 'overdue'
                    ? 'bg-rose-600 text-white'
                    : 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
