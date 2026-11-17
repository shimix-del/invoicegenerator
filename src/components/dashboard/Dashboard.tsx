import React, { useState } from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { exportInvoicesToCsv } from '../../utils/pdfExport';
import {
  DollarSign,
  TrendingUp,
  FileCheck2,
  Clock,
  Download,
  Plus,
  Search,
  Filter,
  Copy,
  Trash2,
  ExternalLink,
  Users,
  Package,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { InvoiceStatus } from '../../types/invoice';

export const Dashboard: React.FC = () => {
  const {
    savedInvoices,
    loadInvoiceFromHistory,
    duplicateInvoice,
    deleteInvoiceFromHistory,
    updateInvoiceStatus,
    createNewInvoice,
    setActiveView,
    clients,
    itemPresets,
    openUpgradeModal,
  } = useInvoice();

  const { isPro } = useAuth();

  const [activeTab, setActiveTab] = useState<'invoices' | 'clients' | 'items'>('invoices');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculate Metrics
  const totalInvoiced = savedInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
  const totalPaid = savedInvoices.reduce((sum, inv) => sum + (inv.amountPaid || 0), 0);
  const totalOutstanding = savedInvoices.reduce((sum, inv) => sum + (inv.amountDue || 0), 0);
  const averageInvoice = savedInvoices.length > 0 ? totalInvoiced / savedInvoices.length : 0;

  // Filtered invoices
  const filteredInvoices = savedInvoices.filter((inv) => {
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.client.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Pro Gating reminder if on Free */}
      {!isPro && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-blue-500/10 border border-amber-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Pro Business Dashboard (Preview Mode)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Track revenue, manage client rosters, recurring invoices, and export CSVs for accounting.
              </p>
            </div>
          </div>
          <button
            onClick={() => openUpgradeModal('dashboard')}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm hover:shadow transition-all shrink-0"
          >
            <span>Activate 7-Day Free Trial</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header and Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Financial Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of your billing activity, receipts, and clients.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={() => exportInvoicesToCsv(savedInvoices)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV / Excel</span>
          </button>

          <button
            type="button"
            onClick={() => createNewInvoice('invoice')}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Invoiced</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-2">
            {formatCurrency(totalInvoiced, 'USD')}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{savedInvoices.length}</span>
            <span>total documents issued</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Paid Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-2">
            {formatCurrency(totalPaid, 'USD')}
          </div>
          <div className="text-xs text-slate-500 mt-1">Collected into bank account</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Outstanding Due</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono mt-2">
            {formatCurrency(totalOutstanding, 'USD')}
          </div>
          <div className="text-xs text-slate-500 mt-1">Awaiting client payment</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg Invoice Value</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-2">
            {formatCurrency(averageInvoice, 'USD')}
          </div>
          <div className="text-xs text-slate-500 mt-1">Per issued invoice</div>
        </div>
      </div>

      {/* Interactive Visual Trend Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Revenue Pipeline</h3>
            <p className="text-xs text-slate-500">Collected vs Outstanding Receivables</p>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-600 dark:text-slate-300">Paid ({Math.round((totalPaid / (totalInvoiced || 1)) * 100)}%)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-slate-600 dark:text-slate-300">Pending</span>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-4 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
          <div
            style={{ width: `${Math.min(100, (totalPaid / (totalInvoiced || 1)) * 100)}%` }}
            className="bg-emerald-500 h-full transition-all duration-500"
          />
          <div
            style={{ width: `${Math.min(100, (totalOutstanding / (totalInvoiced || 1)) * 100)}%` }}
            className="bg-amber-500 h-full transition-all duration-500"
          />
        </div>
      </div>

      {/* Tabs: Invoices, Clients, Items Library */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'invoices'
                  ? 'bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Invoices & Estimates ({savedInvoices.length})
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'clients'
                  ? 'bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Client Contacts ({clients.length})
            </button>
            <button
              onClick={() => setActiveTab('items')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'items'
                  ? 'bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Item Library ({itemPresets.length})
            </button>
          </div>

          {activeTab === 'invoices' && (
            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search invoice or client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white w-48 sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white"
              >
                <option value="all">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="viewed">Viewed</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          )}
        </div>

        {/* Tab 1: Invoices Table */}
        {activeTab === 'invoices' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Date Issued</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Total</th>
                  <th className="py-3 px-4 text-right">Amount Due</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      <button
                        onClick={() => loadInvoiceFromHistory(inv.id)}
                        className="hover:underline flex items-center space-x-1"
                      >
                        <span>{inv.invoiceNumber}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-white">
                      <div>{inv.client.name || 'Unnamed Client'}</div>
                      {inv.client.company && (
                        <div className="text-[11px] text-slate-500">{inv.client.company}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {formatDate(inv.issueDate, 'short')}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {formatDate(inv.dueDate, 'short')}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={inv.status}
                        onChange={(e) => updateInvoiceStatus(inv.id, e.target.value as InvoiceStatus)}
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                          inv.status === 'paid'
                            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                            : inv.status === 'overdue'
                            ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300'
                            : 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200'
                        }`}
                      >
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                        <option value="viewed">Viewed</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(inv.total, inv.currency)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                      {formatCurrency(inv.amountDue, inv.currency)}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        type="button"
                        onClick={() => duplicateInvoice(inv.id)}
                        title="Duplicate invoice"
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      {savedInvoices.length > 1 && (
                        <button
                          type="button"
                          onClick={() => deleteInvoiceFromHistory(inv.id)}
                          title="Delete invoice"
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Clients CRM */}
        {activeTab === 'clients' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {clients.map((cli) => (
                <div
                  key={cli.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{cli.name}</span>
                    <span className="p-1 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                      <Users className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  {cli.company && <p className="font-semibold text-slate-700 dark:text-slate-300">{cli.company}</p>}
                  <p className="text-slate-500">{cli.email}</p>
                  {cli.phone && <p className="text-slate-500">{cli.phone}</p>}
                  {cli.city && <p className="text-slate-500">{cli.city}, {cli.country}</p>}
                  {cli.taxId && <p className="text-[11px] text-slate-400">Tax ID: {cli.taxId}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Item Presets */}
        {activeTab === 'items' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {itemPresets.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 space-y-2 text-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">{item.category || 'Service'}</span>
                      <Package className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="font-medium text-slate-800 dark:text-white leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 font-mono font-bold text-base text-slate-900 dark:text-white">
                    {formatCurrency(item.rate, 'USD')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
