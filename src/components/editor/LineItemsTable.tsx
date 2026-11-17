import React, { useState } from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { formatCurrency } from '../../utils/formatters';
import {
  ListPlus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Plus,
  BookOpen,
} from 'lucide-react';
import { ItemPreset } from '../../types/invoice';

export const LineItemsTable: React.FC = () => {
  const {
    invoice,
    addLineItem,
    updateLineItem,
    removeLineItem,
    reorderLineItems,
    itemPresets,
    insertPresetToInvoice,
    saveItemPreset,
  } = useInvoice();

  const [showPresetPicker, setShowPresetPicker] = useState(false);

  const handleSaveToLibrary = (desc: string, rate: number) => {
    if (!desc) return;
    const newPreset: ItemPreset = {
      id: `item-${Date.now()}`,
      description: desc,
      rate,
    };
    saveItemPreset(newPreset);
    alert('Item saved to your library!');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <ListPlus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Line Items</h3>
            <p className="text-xs text-slate-500">Add services, hours, or products</p>
          </div>
        </div>

        {/* Item Presets Library Action */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPresetPicker(!showPresetPicker)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Item Library ({itemPresets.length})</span>
          </button>

          {showPresetPicker && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-20 p-2 space-y-1">
              <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                Insert Saved Preset
              </div>
              <div className="max-h-56 overflow-y-auto space-y-1">
                {itemPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      insertPresetToInvoice(preset);
                      setShowPresetPicker(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex justify-between items-center group"
                  >
                    <div className="truncate mr-2">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {preset.description}
                      </div>
                      {preset.category && (
                        <span className="text-[10px] text-slate-400">{preset.category}</span>
                      )}
                    </div>
                    <span className="font-mono font-bold text-slate-900 dark:text-white shrink-0">
                      {formatCurrency(preset.rate, invoice.currency)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Line Items List */}
      <div className="space-y-3 pt-4">
        {invoice.items.map((item, index) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-slate-300 transition-all space-y-2.5"
          >
            <div className="flex items-start gap-2">
              {/* Reorder Buttons */}
              <div className="flex flex-col space-y-1 pt-1.5 shrink-0">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => reorderLineItems(index, index - 1)}
                  className="p-0.5 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none"
                  title="Move Up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={index === invoice.items.length - 1}
                  onClick={() => reorderLineItems(index, index + 1)}
                  className="p-0.5 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none"
                  title="Move Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Item Description */}
              <div className="flex-1">
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => updateLineItem(item.id, { description: e.target.value })}
                  placeholder="Describe the service, product, deliverable or milestone..."
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Delete Button */}
              {invoice.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLineItem(item.id)}
                  title="Delete Item"
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Qty, Rate, Amount Row */}
            <div className="grid grid-cols-12 gap-2.5 items-center pl-6">
              <div className="col-span-4 sm:col-span-3">
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                  Quantity / Hours
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="any"
                  value={item.quantity}
                  onChange={(e) => updateLineItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-slate-800 dark:text-white"
                />
              </div>

              <div className="col-span-4 sm:col-span-4">
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                  Rate / Unit Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={item.rate}
                    onChange={(e) => updateLineItem(item.id, { rate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="col-span-4 sm:col-span-3 text-right">
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                  Amount
                </label>
                <div className="py-1.5 text-xs font-mono font-bold text-slate-900 dark:text-white">
                  {formatCurrency(item.amount, invoice.currency)}
                </div>
              </div>

              <div className="col-span-12 sm:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveToLibrary(item.description, item.rate)}
                  title="Save item to library for future invoices"
                  className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Line Item Button */}
        <button
          type="button"
          onClick={() => addLineItem()}
          className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:border-blue-400 transition-colors flex items-center justify-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Another Line Item</span>
        </button>
      </div>
    </div>
  );
};
