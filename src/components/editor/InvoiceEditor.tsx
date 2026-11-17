import React, { useState } from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { useAuth } from '../../context/AuthContext';
import { BusinessSection } from './BusinessSection';
import { ClientSection } from './ClientSection';
import { MetaSection } from './MetaSection';
import { LineItemsTable } from './LineItemsTable';
import { TotalsSection } from './TotalsSection';
import { PaymentNotesSection } from './PaymentNotesSection';
import { TemplateCustomizer } from './TemplateCustomizer';
import { InvoicePreview } from '../preview/InvoicePreview';
import { exportInvoiceToPdf, printInvoiceDirectly } from '../../utils/pdfExport';
import {
  Download,
  Printer,
  Send,
  Repeat,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Save,
  Check,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const InvoiceEditor: React.FC = () => {
  const {
    invoice,
    mobileTab,
    saveInvoiceToHistory,
    openUpgradeModal,
    setIsEmailModalOpen,
    setIsRecurringModalOpen,
  } = useInvoice();

  const { isPro, invoicesLeft, incrementInvoiceCount } = useAuth();

  const [zoom, setZoom] = useState<number>(0.95);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    
    // Check if free user is exceeding quota
    if (!isPro && invoicesLeft <= 0) {
      setIsExporting(false);
      openUpgradeModal('monthly_limit');
      return;
    }

    try {
      const fileName = `${invoice.invoiceNumber || 'invoice'}_${invoice.client.name.replace(/\s+/g, '_') || 'client'}.pdf`;
      const success = await exportInvoiceToPdf('invoice-printable-area', fileName, invoice.paperSize);
      
      if (success) {
        incrementInvoiceCount();
        saveInvoiceToHistory();
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        });
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveDraft = () => {
    saveInvoiceToHistory();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Notification / Free Quota Bar */}
      {!isPro && (
        <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Free Plan:</strong> {invoicesLeft} of 5 free invoices remaining this month.
              Includes 3 standard templates.
            </span>
          </div>
          <button
            onClick={() => openUpgradeModal('monthly_limit')}
            className="inline-flex items-center space-x-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Upgrade to Pro for Unlimited</span>
          </button>
        </div>
      )}

      {/* Main Split-Screen Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: The Input Forms & Controls */}
        <div
          className={`lg:col-span-6 xl:col-span-6 space-y-6 ${
            mobileTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Document Meta (Type, Number, Dates) */}
          <MetaSection />

          {/* Template & Styling Customizer */}
          <TemplateCustomizer />

          {/* Business Profile Section */}
          <BusinessSection />

          {/* Client Information Section */}
          <ClientSection />

          {/* Line Items Table */}
          <LineItemsTable />

          {/* Calculations, Tax, Discount, Totals & Currency */}
          <TotalsSection />

          {/* Notes & Payment Terms */}
          <PaymentNotesSection />

          {/* Bottom Action Buttons on mobile / desktop */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">Saved to History</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-slate-500" />
                  <span>Save Draft</span>
                </>
              )}
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsRecurringModalOpen(true)}
                title="Schedule recurring invoice (Pro)"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Repeat className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={printInvoiceDirectly}
                title="Print Invoice"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isExporting}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm hover:shadow transition-all disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Generating...' : 'Download PDF'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Live Preview Panel */}
        <div
          className={`lg:col-span-6 xl:col-span-6 lg:sticky lg:top-20 space-y-4 ${
            mobileTab === 'editor' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Preview Toolbar */}
          <div className="no-print bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 flex items-center justify-between text-xs shadow-xs">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Preview</span>
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-[11px] text-slate-500 font-mono uppercase">
                {invoice.paperSize.toUpperCase()}
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
                title="Zoom Out"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400 w-10 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.3, z + 0.1))}
                title="Zoom In"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(0.95)}
                title="Reset Zoom"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

              {/* Quick Send by Email */}
              <button
                type="button"
                onClick={() => setIsEmailModalOpen(true)}
                className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-2 py-1"
              >
                <Send className="w-3 h-3" />
                <span>Send</span>
              </button>
            </div>
          </div>

          {/* Invoice Document Canvas Container */}
          <div className="bg-slate-200/70 dark:bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-300/60 dark:border-slate-800 overflow-x-auto flex justify-center items-start min-h-[600px] shadow-inner">
            <InvoicePreview invoice={invoice} zoom={zoom} />
          </div>
        </div>
      </div>
    </div>
  );
};
