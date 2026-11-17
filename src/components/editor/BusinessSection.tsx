import React, { useRef } from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { Building2, Upload, Trash2, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';

export const BusinessSection: React.FC = () => {
  const { invoice, updateBusiness } = useInvoice();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPaymentDetails, setShowPaymentDetails] = React.useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file size must be under 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      updateBusiness({ logoUrl: base64 });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    updateBusiness({ logoUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Your Business Info</h3>
            <p className="text-xs text-slate-500">Auto-saved locally for next time</p>
          </div>
        </div>

        {/* Logo Upload / Preview */}
        <div className="flex items-center space-x-2">
          {invoice.business.logoUrl ? (
            <div className="flex items-center space-x-2">
              <img
                src={invoice.business.logoUrl}
                alt="Logo"
                className="h-9 max-w-[120px] object-contain rounded border border-slate-200 dark:border-slate-700 p-0.5 bg-white"
              />
              <button
                type="button"
                onClick={removeLogo}
                title="Remove logo"
                className="p-1.5 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span>Add Logo</span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 text-xs">
        <div className="sm:col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Business / Freelancer Name *
          </label>
          <input
            type="text"
            value={invoice.business.name}
            onChange={(e) => updateBusiness({ name: e.target.value })}
            placeholder="e.g. Acme Studio Design"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
          <input
            type="email"
            value={invoice.business.email}
            onChange={(e) => updateBusiness({ email: e.target.value })}
            placeholder="billing@yourbrand.com"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
          <input
            type="text"
            value={invoice.business.phone}
            onChange={(e) => updateBusiness({ phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Street Address</label>
          <input
            type="text"
            value={invoice.business.address}
            onChange={(e) => updateBusiness({ address: e.target.value })}
            placeholder="123 Innovation Way, Suite 400"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 sm:col-span-2">
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">City</label>
            <input
              type="text"
              value={invoice.business.city}
              onChange={(e) => updateBusiness({ city: e.target.value })}
              placeholder="San Francisco"
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">State / Prov</label>
            <input
              type="text"
              value={invoice.business.state}
              onChange={(e) => updateBusiness({ state: e.target.value })}
              placeholder="CA"
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Postal / ZIP</label>
            <input
              type="text"
              value={invoice.business.zip}
              onChange={(e) => updateBusiness({ zip: e.target.value })}
              placeholder="94107"
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Country</label>
          <input
            type="text"
            value={invoice.business.country}
            onChange={(e) => updateBusiness({ country: e.target.value })}
            placeholder="United States"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Tax ID / VAT / EIN</label>
          <input
            type="text"
            value={invoice.business.taxId}
            onChange={(e) => updateBusiness({ taxId: e.target.value })}
            placeholder="e.g. US-98471203"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Collapsible Payment Details Section */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setShowPaymentDetails(!showPaymentDetails)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-1"
        >
          <div className="flex items-center space-x-1.5">
            <CreditCard className="w-3.5 h-3.5 text-blue-600" />
            <span>Bank & Payment Receiving Info (Optional)</span>
          </div>
          {showPaymentDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showPaymentDetails && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs">
            <div>
              <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">Bank Name</label>
              <input
                type="text"
                value={invoice.business.paymentDetails.bankName || ''}
                onChange={(e) =>
                  updateBusiness({
                    paymentDetails: { ...invoice.business.paymentDetails, bankName: e.target.value },
                  })
                }
                placeholder="e.g. Chase Bank"
                className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">Account Holder</label>
              <input
                type="text"
                value={invoice.business.paymentDetails.accountName || ''}
                onChange={(e) =>
                  updateBusiness({
                    paymentDetails: { ...invoice.business.paymentDetails, accountName: e.target.value },
                  })
                }
                placeholder="e.g. Acme Studio LLC"
                className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">Account Number / IBAN</label>
              <input
                type="text"
                value={invoice.business.paymentDetails.iban || invoice.business.paymentDetails.accountNumber || ''}
                onChange={(e) =>
                  updateBusiness({
                    paymentDetails: { ...invoice.business.paymentDetails, iban: e.target.value },
                  })
                }
                placeholder="IBAN or Account #"
                className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">SWIFT / BIC / Routing</label>
              <input
                type="text"
                value={invoice.business.paymentDetails.swift || invoice.business.paymentDetails.routingNumber || ''}
                onChange={(e) =>
                  updateBusiness({
                    paymentDetails: { ...invoice.business.paymentDetails, swift: e.target.value },
                  })
                }
                placeholder="SWIFT code or Routing #"
                className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">PayPal Email / Payment Link</label>
              <input
                type="text"
                value={invoice.business.paymentDetails.paypalEmail || ''}
                onChange={(e) =>
                  updateBusiness({
                    paymentDetails: { ...invoice.business.paymentDetails, paypalEmail: e.target.value },
                  })
                }
                placeholder="payments@yourdomain.com or https://paypal.me/yourbrand"
                className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
