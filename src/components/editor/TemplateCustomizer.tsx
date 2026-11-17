import React from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { useAuth } from '../../context/AuthContext';
import { ACCENT_COLORS, FONT_OPTIONS, TEMPLATES } from '../../constants/templates';
import { LANGUAGES } from '../../constants/languages';
import { Palette, Lock, Sparkles, Check, FileType, Layout, Globe } from 'lucide-react';
import { PaperSize, LogoPlacement } from '../../types/invoice';

export const TemplateCustomizer: React.FC = () => {
  const { invoice, updateInvoice, openUpgradeModal } = useInvoice();
  const { isPro } = useAuth();

  const handleSelectTemplate = (templateId: string, isProTemplate: boolean) => {
    if (isProTemplate && !isPro) {
      openUpgradeModal('template');
      return;
    }
    const target = TEMPLATES.find((t) => t.id === templateId);
    updateInvoice({
      templateId,
      accentColor: target?.defaultAccent || invoice.accentColor,
    });
  };

  const handleToggleWatermark = () => {
    if (!isPro) {
      openUpgradeModal('watermark');
      return;
    }
    updateInvoice({ showWatermark: !invoice.showWatermark });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Design & Templates</h3>
            <p className="text-xs text-slate-500">16 templates, colors, fonts, and languages</p>
          </div>
        </div>

        {!isPro && (
          <button
            type="button"
            onClick={() => openUpgradeModal('templates_all')}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800 hover:bg-amber-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Unlock All 16</span>
          </button>
        )}
      </div>

      {/* Templates Grid */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Choose Template
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {TEMPLATES.map((tmpl) => {
            const isSelected = invoice.templateId === tmpl.id;
            const isLocked = tmpl.isPro && !isPro;

            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tmpl.id, tmpl.isPro)}
                className={`relative p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-950'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      style={{ backgroundColor: tmpl.defaultAccent }}
                      className="w-3 h-3 rounded-full shrink-0"
                    />
                    {tmpl.isPro && (
                      <span className="inline-flex items-center space-x-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        {isLocked ? <Lock className="w-2.5 h-2.5 mr-0.5" /> : null}
                        PRO
                      </span>
                    )}
                  </div>
                  <div className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                    {tmpl.name}
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{tmpl.tags.join(' • ')}</p>
                </div>

                {isSelected && (
                  <div className="mt-2 text-right">
                    <Check className="w-3.5 h-3.5 text-blue-600 inline-block" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color Palette */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Brand Accent Color
        </label>
        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          {ACCENT_COLORS.map((col) => (
            <button
              key={col.value}
              type="button"
              onClick={() => updateInvoice({ accentColor: col.value })}
              title={col.name}
              style={{ backgroundColor: col.value }}
              className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center ${
                invoice.accentColor === col.value
                  ? 'ring-2 ring-offset-2 ring-slate-800 dark:ring-offset-slate-900 scale-110 shadow-sm'
                  : 'hover:scale-105 opacity-90'
              }`}
            >
              {invoice.accentColor === col.value && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          ))}
          {/* Custom Hex Color Picker */}
          <div className="flex items-center space-x-1 pl-2">
            <input
              type="color"
              value={invoice.accentColor}
              onChange={(e) => updateInvoice({ accentColor: e.target.value })}
              className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0"
              title="Custom Hex Color"
            />
            <span className="text-[11px] font-mono text-slate-500">{invoice.accentColor}</span>
          </div>
        </div>
      </div>

      {/* Fonts & Paper Size & Language */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
        {/* Typography */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center space-x-1">
            <FileType className="w-3.5 h-3.5 text-slate-400" />
            <span>Typography Font</span>
          </label>
          <select
            value={invoice.fontFamily}
            onChange={(e) => updateInvoice({ fontFamily: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Paper Size */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center space-x-1">
            <Layout className="w-3.5 h-3.5 text-slate-400" />
            <span>Paper Format</span>
          </label>
          <select
            value={invoice.paperSize}
            onChange={(e) => updateInvoice({ paperSize: e.target.value as PaperSize })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
          >
            <option value="a4">Standard A4 (210 × 297 mm)</option>
            <option value="letter">US Letter (8.5 × 11 in)</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>Invoice Language</span>
          </label>
          <select
            value={invoice.language}
            onChange={(e) => updateInvoice({ language: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
          >
            {Object.entries(LANGUAGES).map(([code, item]) => (
              <option key={code} value={code}>
                {item.nativeName} ({item.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Remove Branding Watermark Option */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 block">
            "Made with InvoiceFlow" Footer
          </span>
          <span className="text-slate-500 text-[11px]">Free tier includes small credit footer</span>
        </div>

        <button
          type="button"
          onClick={handleToggleWatermark}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center space-x-1.5 ${
            invoice.showWatermark
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300'
          }`}
        >
          {!isPro && <Lock className="w-3 h-3 text-amber-500" />}
          <span>{invoice.showWatermark ? 'Watermark: Visible' : 'Watermark: Hidden (Pro)'}</span>
        </button>
      </div>
    </div>
  );
};
