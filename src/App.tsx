import React, { useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { InvoiceProvider, useInvoice } from './context/InvoiceContext';
import { Navbar } from './components/navbar/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { InvoiceEditor } from './components/editor/InvoiceEditor';
import { Dashboard } from './components/dashboard/Dashboard';
import { PricingPage } from './components/pricing/PricingPage';
import { SettingsView } from './components/settings/SettingsView';
import { UpgradeModal } from './components/modals/UpgradeModal';
import { SendEmailModal } from './components/modals/SendEmailModal';
import { RecurringModal } from './components/modals/RecurringModal';
import { exportInvoiceToPdf } from './utils/pdfExport';
import { FileText, Heart, Shield, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';

const AppContent: React.FC = () => {
  const { activeView, setActiveView, invoice, saveInvoiceToHistory, openUpgradeModal } = useInvoice();
  const { isPro, invoicesLeft, incrementInvoiceCount } = useAuth();

  const handleGlobalDownloadPdf = async () => {
    if (activeView !== 'editor') {
      setActiveView('editor');
      return;
    }

    if (!isPro && invoicesLeft <= 0) {
      openUpgradeModal('monthly_limit');
      return;
    }

    const fileName = `${invoice.invoiceNumber || 'invoice'}_${invoice.client.name.replace(/\s+/g, '_') || 'client'}.pdf`;
    const success = await exportInvoiceToPdf('invoice-printable-area', fileName, invoice.paperSize);
    if (success) {
      incrementInvoiceCount();
      saveInvoiceToHistory();
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } catch {}
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar onDownloadPdf={handleGlobalDownloadPdf} />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeView === 'landing' && <LandingPage />}
        {activeView === 'editor' && <InvoiceEditor />}
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'pricing' && <PricingPage />}
        {activeView === 'settings' && <SettingsView />}
      </main>

      {/* Footer */}
      <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
            {/* Brand Column */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  Invoice<span className="text-blue-600">Flow</span>
                </span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Simple, fast invoice generator for freelancers and small businesses. Download clean, print-ready PDF invoices in under 2 minutes.
              </p>
              <div className="flex items-center space-x-3 text-slate-400">
                <span className="flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Private Client-Side PDF</span>
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Product</h4>
              <ul className="space-y-2 text-slate-500">
                <li>
                  <button onClick={() => setActiveView('editor')} className="hover:text-blue-600 transition-colors">
                    Invoice Editor
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('dashboard')} className="hover:text-blue-600 transition-colors">
                    Pro Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('pricing')} className="hover:text-blue-600 transition-colors">
                    Pricing & Plans
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('settings')} className="hover:text-blue-600 transition-colors">
                    Business Settings
                  </button>
                </li>
              </ul>
            </div>

            {/* Templates */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Popular Templates</h4>
              <ul className="space-y-2 text-slate-500">
                <li>
                  <button onClick={() => setActiveView('editor')} className="hover:text-blue-600 transition-colors">
                    Classic Minimal
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('editor')} className="hover:text-blue-600 transition-colors">
                    Modern Clean
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('editor')} className="hover:text-blue-600 transition-colors">
                    Dark Header Luxe (Pro)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('editor')} className="hover:text-blue-600 transition-colors">
                    Developer Monospace (Pro)
                  </button>
                </li>
              </ul>
            </div>

            {/* Currencies & Global */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Global Support</h4>
              <p className="text-slate-500 leading-relaxed mb-3">
                Supporting 30+ currencies (USD, EUR, GBP, CAD, AUD, JPY, INR, CHF, BRL) and 8 invoice languages.
              </p>
              <div className="flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>Multi-Currency & VAT Ready</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © {new Date().getFullYear()} InvoiceFlow. Built for freelancers and creators worldwide.
            </div>
            <div className="flex items-center space-x-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Security</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Interactive Modals */}
      <UpgradeModal />
      <SendEmailModal />
      <RecurringModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <InvoiceProvider>
          <AppContent />
        </InvoiceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
