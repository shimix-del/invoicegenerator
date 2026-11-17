import React, { useState } from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { Users, UserPlus, Bookmark, Check } from 'lucide-react';
import { Client } from '../../types/invoice';

export const ClientSection: React.FC = () => {
  const { invoice, updateClient, clients, selectClientForInvoice, saveClient } = useInvoice();
  const [showClientPicker, setShowClientPicker] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAsClient = () => {
    if (!invoice.client.name) {
      alert('Please enter at least a client name.');
      return;
    }

    const newClient: Client = {
      id: `cli-${Date.now()}`,
      name: invoice.client.name,
      company: invoice.client.company,
      email: invoice.client.email,
      phone: invoice.client.phone,
      address: invoice.client.address,
      city: invoice.client.city,
      state: invoice.client.state,
      zip: invoice.client.zip,
      country: invoice.client.country,
      taxId: invoice.client.taxId,
      createdAt: new Date().toISOString(),
    };

    saveClient(newClient);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Client Information</h3>
            <p className="text-xs text-slate-500">Who is this invoice billed to?</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {clients.length > 0 && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowClientPicker(!showClientPicker)}
                className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>Select Saved</span>
              </button>

              {showClientPicker && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-20 p-2 space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Saved Clients ({clients.length})
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {clients.map((cli) => (
                      <button
                        key={cli.id}
                        type="button"
                        onClick={() => {
                          selectClientForInvoice(cli);
                          setShowClientPicker(false);
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="font-semibold text-slate-900 dark:text-white truncate">{cli.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{cli.company || cli.email}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={handleSaveAsClient}
            title="Save current client details to library"
            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                <span>Save Client</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Client Contact Name *
          </label>
          <input
            type="text"
            value={invoice.client.name}
            onChange={(e) => updateClient({ name: e.target.value })}
            placeholder="e.g. Sarah Jenkins"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Company / Organization</label>
          <input
            type="text"
            value={invoice.client.company}
            onChange={(e) => updateClient({ company: e.target.value })}
            placeholder="e.g. Starlight Tech Inc."
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Client Email</label>
          <input
            type="email"
            value={invoice.client.email}
            onChange={(e) => updateClient({ email: e.target.value })}
            placeholder="client@company.com"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Client Phone</label>
          <input
            type="text"
            value={invoice.client.phone}
            onChange={(e) => updateClient({ phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Billing Address</label>
          <input
            type="text"
            value={invoice.client.address}
            onChange={(e) => updateClient({ address: e.target.value })}
            placeholder="100 Market St, Floor 18"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 sm:col-span-2">
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">City</label>
            <input
              type="text"
              value={invoice.client.city}
              onChange={(e) => updateClient({ city: e.target.value })}
              placeholder="San Francisco"
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">State / Prov</label>
            <input
              type="text"
              value={invoice.client.state}
              onChange={(e) => updateClient({ state: e.target.value })}
              placeholder="CA"
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Postal / ZIP</label>
            <input
              type="text"
              value={invoice.client.zip}
              onChange={(e) => updateClient({ zip: e.target.value })}
              placeholder="94105"
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Country</label>
          <input
            type="text"
            value={invoice.client.country}
            onChange={(e) => updateClient({ country: e.target.value })}
            placeholder="United States"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Client Tax ID / VAT</label>
          <input
            type="text"
            value={invoice.client.taxId}
            onChange={(e) => updateClient({ taxId: e.target.value })}
            placeholder="e.g. US-829104921"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};
