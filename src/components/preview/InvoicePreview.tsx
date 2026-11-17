import React from 'react';
import { Invoice } from '../../types/invoice';
import { getTranslation } from '../../constants/languages';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Watermark } from './Watermark';
import clsx from 'clsx';

interface InvoicePreviewProps {
  invoice: Invoice;
  zoom?: number;
  printMode?: boolean;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  invoice,
  zoom = 1,
  printMode = false,
}) => {
  const t = getTranslation(invoice.language || 'en');
  const accent = invoice.accentColor || '#2563eb';
  const isA4 = invoice.paperSize === 'a4';

  const docTitle = {
    invoice: t.invoice,
    estimate: t.estimate,
    quote: t.quote,
    receipt: t.receipt,
  }[invoice.documentType] || t.invoice;

  const statusColors = {
    draft: 'bg-slate-100 text-slate-700 border-slate-300',
    sent: 'bg-blue-50 text-blue-700 border-blue-200',
    viewed: 'bg-purple-50 text-purple-700 border-purple-200',
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    overdue: 'bg-rose-50 text-rose-700 border-rose-300',
  };

  // Dimensions: A4 ratio (1:1.414) vs US Letter ratio (1:1.294)
  const minHeightStyle = isA4 ? '1120px' : '1056px';

  // Helper for logo rendering
  const renderLogo = () => {
    if (invoice.logoPlacement === 'hidden' || !invoice.business.logoUrl) return null;
    return (
      <img
        src={invoice.business.logoUrl}
        alt="Business Logo"
        className="max-h-16 max-w-[180px] object-contain rounded-md"
      />
    );
  };

  return (
    <div
      style={{
        transform: printMode ? 'none' : `scale(${zoom})`,
        transformOrigin: 'top center',
        transition: 'transform 0.15s ease',
      }}
      className={clsx(
        'print-sheet bg-white text-slate-900 shadow-xl transition-shadow w-full max-w-[800px] mx-auto',
        !printMode && 'rounded-lg border border-slate-200'
      )}
    >
      <div
        id="invoice-printable-area"
        style={{
          fontFamily: invoice.fontFamily || "'Plus Jakarta Sans', sans-serif",
          minHeight: minHeightStyle,
        }}
        className="p-8 sm:p-12 relative flex flex-col justify-between bg-white text-slate-800"
      >
        {/* Render Template Specific Style */}
        {renderTemplateContent(invoice, t, accent, docTitle, statusColors, renderLogo)}

        {/* Optional Watermark for free tier */}
        <Watermark showWatermark={invoice.showWatermark} />
      </div>
    </div>
  );
};

// Sub-renderer for various templates
function renderTemplateContent(
  inv: Invoice,
  t: ReturnType<typeof getTranslation>,
  accent: string,
  docTitle: string,
  statusColors: Record<string, string>,
  renderLogo: () => React.ReactNode
) {
  const tid = inv.templateId || 'classic-minimal';

  // 1. Bold Accent Template
  if (tid === 'bold-accent') {
    return (
      <div className="space-y-8 flex-1">
        {/* Colored Top Banner */}
        <div
          style={{ backgroundColor: accent }}
          className="rounded-xl p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-md"
        >
          <div className="flex items-center space-x-4">
            {inv.business.logoUrl && inv.logoPlacement !== 'hidden' && (
              <div className="bg-white p-2 rounded-lg max-h-16 max-w-[160px] flex items-center justify-center">
                <img src={inv.business.logoUrl} alt="Logo" className="max-h-12 object-contain" />
              </div>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{docTitle}</h1>
              <p className="text-white/80 text-sm font-medium mt-1">
                {t.invoiceNumber}: <span className="font-mono text-white font-bold">{inv.invoiceNumber}</span>
              </p>
            </div>
          </div>

          <div className="text-right sm:text-right">
            <span
              className={clsx(
                'inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm'
              )}
            >
              {inv.status}
            </span>
            <div className="mt-2 text-white/90 text-sm">
              <div>{t.issueDate}: {formatDate(inv.issueDate)}</div>
              <div>{t.dueDate}: {formatDate(inv.dueDate)}</div>
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
          <div className="border-l-4 pl-4" style={{ borderColor: accent }}>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.from}</span>
            <h3 className="font-bold text-slate-900 text-base mt-1">{inv.business.name}</h3>
            {inv.business.address && <p className="text-slate-600">{inv.business.address}</p>}
            {(inv.business.city || inv.business.state || inv.business.zip) && (
              <p className="text-slate-600">
                {[inv.business.city, inv.business.state, inv.business.zip].filter(Boolean).join(', ')}
              </p>
            )}
            {inv.business.country && <p className="text-slate-600">{inv.business.country}</p>}
            {inv.business.email && <p className="text-slate-600">{inv.business.email}</p>}
            {inv.business.taxId && <p className="text-slate-500 text-xs mt-1">Tax ID: {inv.business.taxId}</p>}
          </div>

          <div className="border-l-4 pl-4 border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.billedTo}</span>
            <h3 className="font-bold text-slate-900 text-base mt-1">{inv.client.name || 'Client Name'}</h3>
            {inv.client.company && <p className="font-medium text-slate-700">{inv.client.company}</p>}
            {inv.client.address && <p className="text-slate-600">{inv.client.address}</p>}
            {(inv.client.city || inv.client.state || inv.client.zip) && (
              <p className="text-slate-600">
                {[inv.client.city, inv.client.state, inv.client.zip].filter(Boolean).join(', ')}
              </p>
            )}
            {inv.client.email && <p className="text-slate-600">{inv.client.email}</p>}
            {inv.client.taxId && <p className="text-slate-500 text-xs mt-1">Tax ID: {inv.client.taxId}</p>}
          </div>
        </div>

        {/* Line Items */}
        {renderStandardTable(inv, t, accent, 'bold')}

        {/* Totals & Notes */}
        {renderStandardSummary(inv, t, accent)}
      </div>
    );
  }

  // 2. Dark Header Luxe Template (Pro)
  if (tid === 'dark-header') {
    return (
      <div className="space-y-8 flex-1">
        <div className="bg-slate-900 text-white rounded-xl p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              {renderLogo()}
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">{inv.business.name}</h1>
                <p className="text-xs text-slate-400">{inv.business.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <span
                style={{ backgroundColor: accent }}
                className="w-2.5 h-2.5 rounded-full inline-block"
              />
              <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
                {docTitle} // {inv.invoiceNumber}
              </span>
            </div>
          </div>

          <div className="text-right sm:text-right border-t sm:border-t-0 sm:border-l border-slate-700/60 pt-4 sm:pt-0 sm:pl-6">
            <div className="text-xs uppercase tracking-wider text-slate-400">{t.amountDue}</div>
            <div style={{ color: accent }} className="text-3xl font-extrabold font-mono mt-1">
              {formatCurrency(inv.amountDue, inv.currency)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {t.dueDate}: <span className="text-white font-medium">{formatDate(inv.dueDate)}</span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 text-xs">
          <div>
            <span className="text-slate-400 font-medium block uppercase tracking-wider">{t.issueDate}</span>
            <span className="font-bold text-slate-800 text-sm">{formatDate(inv.issueDate)}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block uppercase tracking-wider">{t.dueDate}</span>
            <span className="font-bold text-slate-800 text-sm">{formatDate(inv.dueDate)}</span>
          </div>
          {inv.poNumber && (
            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider">{t.poNumber}</span>
              <span className="font-bold text-slate-800 text-sm">{inv.poNumber}</span>
            </div>
          )}
          <div>
            <span className="text-slate-400 font-medium block uppercase tracking-wider">Status</span>
            <span className={clsx('inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase', statusColors[inv.status])}>
              {inv.status}
            </span>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.from}</span>
            <h3 className="font-bold text-slate-900 mt-1">{inv.business.name}</h3>
            <p className="text-slate-600 text-xs leading-relaxed">{inv.business.address}, {inv.business.city} {inv.business.zip}</p>
            {inv.business.taxId && <p className="text-slate-400 text-xs mt-1">Tax ID: {inv.business.taxId}</p>}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.billedTo}</span>
            <h3 className="font-bold text-slate-900 mt-1">{inv.client.name}</h3>
            {inv.client.company && <p className="text-slate-700 font-medium text-xs">{inv.client.company}</p>}
            <p className="text-slate-600 text-xs leading-relaxed">{inv.client.address}, {inv.client.city} {inv.client.zip}</p>
            {inv.client.email && <p className="text-slate-500 text-xs">{inv.client.email}</p>}
          </div>
        </div>

        {/* Table */}
        {renderStandardTable(inv, t, accent, 'dark')}
        {/* Totals */}
        {renderStandardSummary(inv, t, accent)}
      </div>
    );
  }

  // 3. Tech Developer / Monospace Template (Pro)
  if (tid === 'tech-developer') {
    return (
      <div className="space-y-6 flex-1 font-mono text-xs">
        <div className="border border-slate-300 rounded-md p-4 bg-slate-50 flex justify-between items-center">
          <div>
            <div className="text-emerald-600 font-bold tracking-wider">
              $ {docTitle.toLowerCase()} --id="{inv.invoiceNumber}"
            </div>
            <div className="text-slate-500 text-[11px] mt-0.5">
              timestamp: {inv.issueDate} | due: {inv.dueDate} | status: [{inv.status.toUpperCase()}]
            </div>
          </div>
          {renderLogo()}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-slate-200 p-4 rounded-md">
          <div>
            <div className="text-slate-400 uppercase text-[10px] tracking-wider">// ORIGIN</div>
            <div className="font-bold text-slate-900 text-sm mt-1">{inv.business.name}</div>
            <div className="text-slate-600">{inv.business.email}</div>
            <div className="text-slate-500">{inv.business.address}, {inv.business.city}</div>
            {inv.business.taxId && <div className="text-slate-400 text-[10px]">TAX: {inv.business.taxId}</div>}
          </div>
          <div>
            <div className="text-slate-400 uppercase text-[10px] tracking-wider">// TARGET_CLIENT</div>
            <div className="font-bold text-slate-900 text-sm mt-1">{inv.client.name || 'N/A'}</div>
            {inv.client.company && <div className="text-slate-700">{inv.client.company}</div>}
            <div className="text-slate-600">{inv.client.email}</div>
            <div className="text-slate-500">{inv.client.address}, {inv.client.city}</div>
          </div>
        </div>

        {/* Tech Table */}
        <div className="border border-slate-200 rounded-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 text-[11px]">
              <tr>
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">{t.description}</th>
                <th className="py-2.5 px-3 text-right">{t.quantity}</th>
                <th className="py-2.5 px-3 text-right">{t.rate}</th>
                <th className="py-2.5 px-3 text-right">{t.amount}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inv.items.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 text-slate-400">{index + 1}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-800 text-xs font-medium">{item.description}</td>
                  <td className="py-2.5 px-3 text-right">{item.quantity}</td>
                  <td className="py-2.5 px-3 text-right">{formatCurrency(item.rate, inv.currency)}</td>
                  <td className="py-2.5 px-3 text-right font-bold">{formatCurrency(item.amount, inv.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {renderStandardSummary(inv, t, accent, true)}
      </div>
    );
  }

  // 4. Default / Classic Minimal / Modern Clean / Others
  const isModern = tid === 'modern-clean';
  const isCreative = tid === 'creative-studio';
  const isCorporate = tid === 'corporate-slate';
  const isExecutive = tid === 'executive-serif';

  return (
    <div className="space-y-8 flex-1">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-4">
          {renderLogo()}
          <div>
            <h2 className={clsx('text-xl font-bold text-slate-900', isExecutive && 'font-serif text-2xl')}>
              {inv.business.name}
            </h2>
            <div className="text-sm text-slate-500 space-y-0.5 mt-1">
              {inv.business.address && <p>{inv.business.address}</p>}
              {(inv.business.city || inv.business.state || inv.business.zip) && (
                <p>{[inv.business.city, inv.business.state, inv.business.zip].filter(Boolean).join(', ')}</p>
              )}
              {inv.business.email && <p>{inv.business.email}</p>}
              {inv.business.phone && <p>{inv.business.phone}</p>}
              {inv.business.taxId && <p className="text-xs text-slate-400">Tax ID: {inv.business.taxId}</p>}
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right space-y-2">
          <div className="inline-flex items-center space-x-2">
            <span
              style={{ color: accent }}
              className={clsx(
                'text-3xl sm:text-4xl font-extrabold tracking-tight uppercase',
                isExecutive && 'font-serif'
              )}
            >
              {docTitle}
            </span>
          </div>
          
          <div className="text-sm text-slate-600 space-y-1">
            <div>
              <span className="text-slate-400 font-medium">{t.invoiceNumber}:</span>{' '}
              <span className="font-bold text-slate-800 font-mono">{inv.invoiceNumber}</span>
            </div>
            {inv.poNumber && (
              <div>
                <span className="text-slate-400 font-medium">{t.poNumber}:</span>{' '}
                <span className="font-medium text-slate-800">{inv.poNumber}</span>
              </div>
            )}
            <div>
              <span className="text-slate-400 font-medium">{t.issueDate}:</span>{' '}
              <span className="font-medium text-slate-800">{formatDate(inv.issueDate)}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">{t.dueDate}:</span>{' '}
              <span className="font-medium text-slate-800">{formatDate(inv.dueDate)}</span>
            </div>
          </div>

          <div className="pt-2">
            <span
              className={clsx(
                'inline-block px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider border',
                statusColors[inv.status]
              )}
            >
              {inv.status}
            </span>
          </div>
        </div>
      </div>

      {/* Bill To & Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
        <div
          className={clsx(
            'p-4 rounded-lg',
            isModern ? 'bg-slate-50 border border-slate-100' : 'pl-0'
          )}
        >
          <span
            style={{ color: accent }}
            className="text-xs font-bold uppercase tracking-wider block mb-1.5"
          >
            {t.billedTo}
          </span>
          <h3 className="font-bold text-slate-900 text-base">{inv.client.name || 'Client Name'}</h3>
          {inv.client.company && <p className="font-medium text-slate-700">{inv.client.company}</p>}
          {inv.client.address && <p className="text-slate-600 mt-1">{inv.client.address}</p>}
          {(inv.client.city || inv.client.state || inv.client.zip) && (
            <p className="text-slate-600">
              {[inv.client.city, inv.client.state, inv.client.zip].filter(Boolean).join(', ')}
            </p>
          )}
          {inv.client.country && <p className="text-slate-600">{inv.client.country}</p>}
          {inv.client.email && <p className="text-slate-600">{inv.client.email}</p>}
          {inv.client.taxId && <p className="text-xs text-slate-400 mt-1">Tax ID: {inv.client.taxId}</p>}
        </div>

        {/* Total Due Highlight Card */}
        <div
          style={{ borderColor: accent }}
          className={clsx(
            'p-5 rounded-xl border flex flex-col justify-center items-start sm:items-end text-left sm:text-right',
            isCorporate ? 'bg-slate-50' : 'bg-slate-50/60'
          )}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.amountDue}</span>
          <span
            style={{ color: accent }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1"
          >
            {formatCurrency(inv.amountDue, inv.currency)}
          </span>
          <span className="text-xs text-slate-500 mt-1">
            {t.dueDate}: <span className="font-semibold text-slate-700">{formatDate(inv.dueDate)}</span>
          </span>
        </div>
      </div>

      {/* Line Items Table */}
      {renderStandardTable(inv, t, accent, isModern ? 'modern' : 'classic')}

      {/* Totals & Notes Section */}
      {renderStandardSummary(inv, t, accent)}
    </div>
  );
}

// Line items table renderer
function renderStandardTable(
  inv: Invoice,
  t: ReturnType<typeof getTranslation>,
  accent: string,
  variant: 'classic' | 'modern' | 'bold' | 'dark' = 'classic'
) {
  const isDark = variant === 'dark';
  const isBold = variant === 'bold';

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr
            style={{
              backgroundColor: isBold ? accent : isDark ? '#1e293b' : '#f8fafc',
              color: isBold || isDark ? '#ffffff' : '#475569',
            }}
            className="text-xs uppercase font-bold tracking-wider rounded-t-lg"
          >
            <th className="py-3 px-4 rounded-l-lg">{t.description}</th>
            <th className="py-3 px-4 text-center w-20">{t.quantity}</th>
            <th className="py-3 px-4 text-right w-28">{t.rate}</th>
            <th className="py-3 px-4 text-right w-28 rounded-r-lg">{t.amount}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {inv.items.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 px-4 font-medium text-slate-800 whitespace-pre-line leading-relaxed">
                {item.description || 'Item description'}
              </td>
              <td className="py-4 px-4 text-center text-slate-600 font-mono">{item.quantity}</td>
              <td className="py-4 px-4 text-right text-slate-600 font-mono">
                {formatCurrency(item.rate, inv.currency)}
              </td>
              <td className="py-4 px-4 text-right font-bold text-slate-900 font-mono">
                {formatCurrency(item.amount, inv.currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Summary calculation breakdown & notes renderer
function renderStandardSummary(
  inv: Invoice,
  t: ReturnType<typeof getTranslation>,
  accent: string,
  isMono: boolean = false
) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
      {/* Left: Notes, Payment Info, Banking */}
      <div className="space-y-4 text-xs text-slate-600">
        {inv.notes && (
          <div>
            <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-1">{t.notes}</h4>
            <p className="whitespace-pre-line leading-relaxed text-slate-600 bg-slate-50/80 p-3 rounded border border-slate-100">
              {inv.notes}
            </p>
          </div>
        )}

        {inv.paymentTerms && (
          <div>
            <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-1">{t.paymentTerms}</h4>
            <p className="text-slate-600">{inv.paymentTerms}</p>
          </div>
        )}

        {/* Bank / Payment Details */}
        {(inv.business.paymentDetails.bankName ||
          inv.business.paymentDetails.iban ||
          inv.business.paymentDetails.paypalEmail ||
          inv.business.paymentDetails.accountNumber) && (
          <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/60">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-2">{t.paymentDetails}</h4>
            <div className="space-y-1 text-slate-600">
              {inv.business.paymentDetails.bankName && (
                <div>
                  <span className="font-medium">{t.bankName}:</span> {inv.business.paymentDetails.bankName}
                </div>
              )}
              {inv.business.paymentDetails.accountName && (
                <div>
                  <span className="font-medium">Account Name:</span> {inv.business.paymentDetails.accountName}
                </div>
              )}
              {inv.business.paymentDetails.accountNumber && (
                <div>
                  <span className="font-medium">{t.accountNumber}:</span>{' '}
                  <span className="font-mono">{inv.business.paymentDetails.accountNumber}</span>
                </div>
              )}
              {inv.business.paymentDetails.iban && (
                <div>
                  <span className="font-medium">{t.iban}:</span>{' '}
                  <span className="font-mono">{inv.business.paymentDetails.iban}</span>
                </div>
              )}
              {inv.business.paymentDetails.swift && (
                <div>
                  <span className="font-medium">{t.swift}:</span>{' '}
                  <span className="font-mono">{inv.business.paymentDetails.swift}</span>
                </div>
              )}
              {inv.business.paymentDetails.paypalEmail && (
                <div>
                  <span className="font-medium">{t.paypal}:</span> {inv.business.paymentDetails.paypalEmail}
                </div>
              )}
              {inv.business.paymentDetails.customInstructions && (
                <div className="pt-1 text-slate-500 italic">
                  {inv.business.paymentDetails.customInstructions}
                </div>
              )}
            </div>
          </div>
        )}

        {inv.footerMessage && (
          <p className="text-slate-400 italic text-[11px] pt-2">{inv.footerMessage}</p>
        )}
      </div>

      {/* Right: Calculations Totals Box */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between py-1 text-slate-600">
          <span>{t.subtotal}</span>
          <span className="font-mono font-medium">{formatCurrency(inv.subtotal, inv.currency)}</span>
        </div>

        {inv.discountAmount > 0 && (
          <div className="flex justify-between py-1 text-emerald-600 font-medium">
            <span>
              {t.discount} {inv.discountType === 'percentage' && `(${inv.discountValue}%)`}
            </span>
            <span className="font-mono">-{formatCurrency(inv.discountAmount, inv.currency)}</span>
          </div>
        )}

        {inv.taxAmount > 0 && (
          <div className="flex justify-between py-1 text-slate-600">
            <span>
              {t.tax} {inv.taxType === 'percentage' && `(${inv.taxRate}%)`}
            </span>
            <span className="font-mono">{formatCurrency(inv.taxAmount, inv.currency)}</span>
          </div>
        )}

        {inv.shipping > 0 && (
          <div className="flex justify-between py-1 text-slate-600">
            <span>{t.shipping}</span>
            <span className="font-mono">{formatCurrency(inv.shipping, inv.currency)}</span>
          </div>
        )}

        <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-base text-slate-900">
          <span>{t.total}</span>
          <span className="font-mono text-lg">{formatCurrency(inv.total, inv.currency)}</span>
        </div>

        {inv.amountPaid > 0 && (
          <div className="flex justify-between py-1 text-slate-500 text-xs">
            <span>{t.amountPaid}</span>
            <span className="font-mono">-{formatCurrency(inv.amountPaid, inv.currency)}</span>
          </div>
        )}

        <div
          style={{ borderColor: accent }}
          className="border-t-2 pt-2.5 flex justify-between items-center text-lg font-extrabold text-slate-900"
        >
          <span>{t.amountDue}</span>
          <span style={{ color: accent }} className="font-mono text-xl">
            {formatCurrency(inv.amountDue, inv.currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
