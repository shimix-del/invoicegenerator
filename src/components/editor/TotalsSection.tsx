import React, { useState } from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { CURRENCIES, getCurrency } from '../../constants/currencies';
import { formatCurrency } from '../../utils/formatters';
import { Calculator, Globe, DollarSign, Percent, ShieldCheck } from 'lucide-react';

export const TotalsSection: React.FC = () => {
  const { invoice, updateInvoice } = useInvoice();
  const [currencySearch, setCurrencySearch] = useState('');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const activeCurrency = getCurrency(invoice.currency);

  const filteredCurrencies = CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(currencySearch.toLowerCase()) ||
      c.name.toLowerCase().includes(currencySearch.toLowerCase()) ||
      c.symbol.includes(currencySearch)
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Calculations & Currency</h3>
            <p className="text-xs text-slate-500">Auto-calculated totals and fees</p>
          </div>
        </div>

        {/* Currency Selector (30+ Currencies) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {activeCurrency.code} ({activeCurrency.symbol})
            </span>
          </button>

          {showCurrencyDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-30 p-2 space-y-2">
              <input
                type="text"
                placeholder="Search 30+ currencies..."
                value={currencySearch}
                onChange={(e) => setCurrencySearch(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <div className="max-h-56 overflow-y-auto space-y-0.5">
                {filteredCurrencies.map((curr) => (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => {
                      updateInvoice({ currency: curr.code });
                      setShowCurrencyDropdown(false);
                      setCurrencySearch('');
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      curr.code === invoice.currency
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>
                      <span className="font-mono font-bold mr-1.5">{curr.code}</span>
                      <span className="text-slate-500">({curr.name})</span>
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{curr.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Discount Setting */}
        <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Discount</label>
            <div className="flex items-center space-x-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-0.5 rounded">
              <button
                type="button"
                onClick={() => updateInvoice({ discountType: 'percentage' })}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  invoice.discountType === 'percentage'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                %
              </button>
              <button
                type="button"
                onClick={() => updateInvoice({ discountType: 'fixed' })}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  invoice.discountType === 'fixed'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {activeCurrency.symbol}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="0"
              step="any"
              value={invoice.discountValue}
              onChange={(e) => updateInvoice({ discountValue: parseFloat(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-800 dark:text-white"
            />
            <span className="text-[11px] font-mono text-emerald-600 shrink-0 font-medium">
              -{formatCurrency(invoice.discountAmount, invoice.currency)}
            </span>
          </div>
        </div>

        {/* Tax Setting */}
        <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Tax / VAT / GST</label>
            <div className="flex items-center space-x-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-0.5 rounded">
              <button
                type="button"
                onClick={() => updateInvoice({ taxType: 'percentage' })}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  invoice.taxType === 'percentage'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                %
              </button>
              <button
                type="button"
                onClick={() => updateInvoice({ taxType: 'fixed' })}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  invoice.taxType === 'fixed'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {activeCurrency.symbol}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="0"
              step="any"
              value={invoice.taxRate}
              onChange={(e) => updateInvoice({ taxRate: parseFloat(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-800 dark:text-white"
            />
            <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 shrink-0 font-medium">
              +{formatCurrency(invoice.taxAmount, invoice.currency)}
            </span>
          </div>
        </div>

        {/* Shipping / Extra Fees */}
        <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          <label className="block font-semibold text-slate-700 dark:text-slate-300">
            Shipping / Handling / Extra Fees ({activeCurrency.symbol})
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={invoice.shipping}
            onChange={(e) => updateInvoice({ shipping: parseFloat(e.target.value) || 0 })}
            className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-800 dark:text-white"
          />
        </div>

        {/* Amount Paid */}
        <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          <label className="block font-semibold text-slate-700 dark:text-slate-300">
            Amount Already Paid ({activeCurrency.symbol})
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={invoice.amountPaid}
            onChange={(e) => updateInvoice({ amountPaid: parseFloat(e.target.value) || 0 })}
            className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Totals Summary Bar */}
      <div className="p-3.5 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">Subtotal</span>
          <span className="font-mono text-sm font-semibold">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Total Billable</span>
          <span className="font-mono text-sm font-semibold">{formatCurrency(invoice.total, invoice.currency)}</span>
        </div>
        <div className="text-right">
          <span className="text-amber-400 block text-[11px] font-bold uppercase tracking-wider">Net Amount Due</span>
          <span className="font-mono text-xl font-extrabold text-white">
            {formatCurrency(invoice.amountDue, invoice.currency)}
          </span>
        </div>
      </div>
    </div>
  );
};
