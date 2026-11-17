import React from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  FileText,
  Sparkles,
  Sun,
  Moon,
  Download,
  PlusCircle,
  LayoutDashboard,
  CreditCard,
  Send,
  Eye,
  Edit3,
} from 'lucide-react';

export const Navbar: React.FC<{ onDownloadPdf: () => void }> = ({ onDownloadPdf }) => {
  const {
    activeView,
    setActiveView,
    createNewInvoice,
    mobileTab,
    setMobileTab,
    setIsEmailModalOpen,
    openUpgradeModal,
  } = useInvoice();

  const { isPro, user, startFreeTrial } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo & App Title */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setActiveView('landing')}
            className="flex items-center space-x-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center">
                Invoice<span className="text-blue-600">Flow</span>
              </span>
              <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium -mt-1">
                Fast & Professional
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveView('editor')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'editor'
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Invoice Editor
            </button>
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-colors ${
                activeView === 'dashboard'
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
              {!isPro && (
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.2 rounded font-bold">
                  PRO
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveView('pricing')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'pricing'
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => setActiveView('settings')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'settings'
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Center: Mobile Editor/Preview Toggle Pill (only shown when on editor view) */}
        {activeView === 'editor' && (
          <div className="flex md:hidden bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setMobileTab('editor')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                mobileTab === 'editor'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setMobileTab('preview')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                mobileTab === 'preview'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>
        )}

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* New Invoice Button */}
          {activeView === 'editor' && (
            <button
              onClick={() => createNewInvoice('invoice')}
              title="Create New Invoice"
              className="hidden lg:flex items-center space-x-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>New</span>
            </button>
          )}

          {/* Send / Email Button */}
          {activeView === 'editor' && (
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-blue-600" />
              <span>Send</span>
            </button>
          )}

          {/* Download PDF Primary Action */}
          {activeView === 'editor' && (
            <button
              onClick={onDownloadPdf}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          )}

          {/* Pro / Trial Status Pill */}
          {!isPro ? (
            <button
              onClick={() => openUpgradeModal('pro_badge')}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/10 to-indigo-500/10 hover:from-amber-500/20 hover:to-indigo-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-400 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Try Pro Free</span>
              <span className="sm:hidden">Pro</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 pl-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                PRO ACTIVE
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
