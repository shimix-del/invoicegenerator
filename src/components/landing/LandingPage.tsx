import React, { useState } from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { useAuth } from '../../context/AuthContext';
import { TEMPLATES } from '../../constants/templates';
import { CURRENCIES } from '../../constants/currencies';
import {
  FileText,
  Zap,
  ShieldCheck,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Download,
  Star,
  Layers,
  ChevronDown,
  Check,
  Send,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LandingPage: React.FC = () => {
  const { setActiveView, updateInvoice, updateBusiness, openUpgradeModal } = useInvoice();
  const { isPro, startFreeTrial } = useAuth();

  // Mini-demo interactive state in Hero
  const [demoBusiness, setDemoBusiness] = useState('Studio Aurora Design');
  const [demoClient, setDemoClient] = useState('Acme Corp.');
  const [demoCurrency, setDemoCurrency] = useState('USD');
  const [demoAmount, setDemoAmount] = useState('3200');
  const [selectedTemplate, setSelectedTemplate] = useState('classic-minimal');

  const handleLaunchEditorWithDemo = () => {
    updateBusiness({ name: demoBusiness });
    updateInvoice({
      client: {
        name: demoClient,
        company: demoClient,
        email: 'billing@client.com',
        phone: '',
        address: '100 Innovation Blvd',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States',
        taxId: '',
      },
      currency: demoCurrency,
      items: [
        {
          id: 'li-demo-1',
          description: 'UI/UX Design Sprint & Mobile App Prototype',
          quantity: 1,
          rate: parseFloat(demoAmount) || 1200,
          amount: parseFloat(demoAmount) || 1200,
        },
      ],
      templateId: selectedTemplate,
    });

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}

    setActiveView('editor');
  };

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Do I need to sign up or create an account to create my first invoice?',
      a: 'Not at all! You can immediately customize line items, add your business logo, and download a clean, print-ready PDF in under 2 minutes with zero signup required.',
    },
    {
      q: 'Is my business information saved for next time?',
      a: 'Yes! InvoiceFlow securely stores your business details, logo, and preferred currency in your browser’s local storage so it auto-fills every time you return.',
    },
    {
      q: 'How many invoices do free users get?',
      a: 'Free users get 5 invoices per month with 3 modern templates. Upgrading to Pro ($7/mo or $60/yr) gives unlimited invoices, 15+ premium templates, removal of the watermark, and client management.',
    },
    {
      q: 'Which currencies are supported?',
      a: 'Over 30 global currencies are natively supported with correct symbols, currency placement, and international decimal formatting (USD, EUR, GBP, CAD, AUD, JPY, INR, CHF, BRL, and more).',
    },
    {
      q: 'Can I send invoices directly to clients via email?',
      a: 'Yes! Pro members can send formatted invoices straight from the app with shareable payment links and automatic reminders.',
    },
  ];

  const testimonials = [
    {
      quote:
        'I used to waste 30 minutes wrestling with messy Word templates. With InvoiceFlow, I sent my client a gorgeous PDF invoice in 90 seconds while at the coffee shop.',
      author: 'David Chen',
      role: 'Freelance Fullstack Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      quote:
        'The dark-header and modern templates make my creative agency look 10x more established. Clients comment on how sharp and clear the invoices are.',
      author: 'Camila Rodriguez',
      role: 'Brand Identity Director',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      quote:
        'Client-side PDF generation is lightning fast. No clunky server loading or weird broken fonts. It just works, beautifully.',
      author: 'Thomas Wright',
      role: 'Management Consultant',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Fastest Invoice Generator for Freelancers & SMBs</span>
          </div>

          {/* Main Headline */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              From landing page to professional invoice in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                under 2 minutes.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Ditch slow Excel tables and clunky Word docs. Generate clean, high-impact PDF invoices
              with instant live preview. <span className="font-semibold text-slate-900 dark:text-white">No signup required</span> to download your first invoice.
            </p>
          </div>

          {/* Quick CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveView('editor')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all active:scale-95"
            >
              <span>Create Free Invoice Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                startFreeTrial();
                setActiveView('editor');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white font-bold text-sm shadow-xs transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Start 7-Day Pro Trial (No Card)</span>
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Client-side instant PDF</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>30+ Currencies & Multi-language</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Auto-saved locally</span>
            </div>
          </div>

          {/* INTERACTIVE MINI-DEMO HERO CARD */}
          <div className="pt-6 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-left space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-400 ml-2 font-mono">
                    LIVE DEMO GENERATOR
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                  Try it right here
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Business / Freelance Name
                  </label>
                  <input
                    type="text"
                    value={demoBusiness}
                    onChange={(e) => setDemoBusiness(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-medium text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={demoClient}
                    onChange={(e) => setDemoClient(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-medium text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Currency
                  </label>
                  <select
                    value={demoCurrency}
                    onChange={(e) => setDemoCurrency(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium"
                  >
                    {CURRENCIES.slice(0, 15).map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.symbol}) — {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Sample Amount
                  </label>
                  <input
                    type="number"
                    value={demoAmount}
                    onChange={(e) => setDemoAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Template selection pill */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Select Design Style:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TEMPLATES.slice(0, 3).map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-center ${
                        selectedTemplate === tmpl.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {tmpl.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLaunchEditorWithDemo}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Generate My Invoice In 2 Minutes →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Built specifically for freelancers and small businesses
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Everything you need to look professional and get paid on time, without bloated enterprise software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Zero Signup Friction</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Don’t let a signup form delay your invoice. Build your invoice with our split-screen editor and download a crisp PDF immediately.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Global Billing Ready</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bill clients worldwide in 30+ currencies with correct regional symbols, IBAN/SWIFT routing, and multi-language invoices.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">16 Premium Templates</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Choose from minimalist, tech developer, corporate, executive, and studio designs with custom accent colors and fonts.
            </p>
          </div>
        </div>
      </section>

      {/* TEMPLATE GALLERY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Templates designed to leave a lasting impression
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select any design and customize colors, typography, and logos instantly.
            </p>
          </div>
          <button
            onClick={() => setActiveView('editor')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-1"
          >
            <span>Browse all in Editor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATES.slice(0, 8).map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    style={{ backgroundColor: tmpl.defaultAccent }}
                    className="w-4 h-4 rounded-full"
                  />
                  {tmpl.isPro ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      PRO
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      FREE
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{tmpl.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {tmpl.description}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    updateInvoice({ templateId: tmpl.id, accentColor: tmpl.defaultAccent });
                    setActiveView('editor');
                  }}
                  className="w-full py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Use Template →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING TABLE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Simple, honest pricing.
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Start for free today. Upgrade only when your business scales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Free Tier</span>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">$0</div>
              <p className="text-xs text-slate-500">Perfect for occasional invoicing and freelance side-gigs.</p>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>5 invoices per month</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>3 core templates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Instant PDF download</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>30+ global currencies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Auto-saves business profile</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setActiveView('editor')}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white hover:bg-slate-50 transition-colors"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-blue-600/5 to-indigo-600/5 dark:from-blue-950/40 dark:to-indigo-950/40 p-8 rounded-2xl border-2 border-blue-600 shadow-xl space-y-6 relative flex flex-col justify-between">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
              Most Popular
            </span>
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Pro Subscription</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$7</span>
                <span className="text-xs text-slate-500">/ month ($60/year)</span>
              </div>
              <p className="text-xs text-slate-500">For active freelancers who want an established brand.</p>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span><strong>Unlimited invoices</strong></span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>All 16+ Premium Templates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Remove "Made with InvoiceFlow" footer</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Client directory & Item catalog</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Recurring automated invoices</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Financial revenue dashboard & CSV</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => openUpgradeModal('pricing_hero')}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
            >
              Start 7-Day Free Trial (No Card)
            </button>
          </div>

          {/* Business Plan */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Business Tier</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$15</span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <p className="text-xs text-slate-500">For small agencies, multiple brands, and teams.</p>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Multiple brand profiles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Unlimited team seats</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Priority email support & SLA</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => openUpgradeModal('business')}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white hover:bg-slate-50 transition-colors"
            >
              Choose Business
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Loved by thousands of freelancers
          </h2>
          <p className="text-xs text-slate-500">See why independent contractors switch from Excel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img src={t.avatar} alt={t.author} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">{t.author}</div>
                  <div className="text-[11px] text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">Everything you need to know about InvoiceFlow.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-500 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL BOTTOM CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to send your next invoice in 2 minutes?
          </h2>
          <p className="text-blue-100 text-sm max-w-xl mx-auto leading-relaxed">
            No registration required. Select a template, customize line items, and download your clean PDF right now.
          </p>
          <button
            onClick={() => setActiveView('editor')}
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-white text-blue-600 font-extrabold text-sm shadow-md hover:bg-slate-50 transition-all active:scale-95"
          >
            <Zap className="w-4 h-4 text-blue-600" />
            <span>Open Invoice Generator Free</span>
          </button>
        </div>
      </section>
    </div>
  );
};
