# InvoiceFlow ⚡

**Fast, professional invoice generator for freelancers and small businesses.**

> Go from landing page to a downloadable professional invoice in under 2 minutes, with no signup required for the first invoice.

---

## 🚀 Key Highlights & Features

### 🆓 Core Free Tier
- **Live Preview Editor**: Split-screen on desktop with zoom controls, tabbed on mobile ("Edit" vs "Live Preview").
- **Business Profile**: Logo upload (with auto local persistence), company name, address, email, phone, tax ID/VAT, website.
- **Client Information**: Name, company, billing address, email, phone, and tax ID, with 1-click save to contacts.
- **Invoice Metadata**: Document type (Invoice, Estimate, Quotation, Receipt), auto-increment invoice number (`INV-0042`), issue date, due date, PO number.
- **Line Items**: Description, quantity, rate, amount (auto-calculated), reorder up/down, add/remove rows.
- **Item Presets Library**: Save commonly billed services and insert them into invoices in one click.
- **Auto Calculations**: Subtotal, discount (% or fixed amount), tax/VAT/GST (% or fixed), shipping / extra fees, total billable, amount paid, and net amount due.
- **30+ Currencies**: USD ($), EUR (€), GBP (£), CAD (CA$), AUD (A$), JPY (¥), INR (₹), CHF (CHF), CNY (¥), BRL (R$), ZAR (R), MXN ($), SGD ($), SEK (kr), etc., with proper symbols, decimal places, and formatting.
- **Multi-Language Invoices**: Instantly translate labels to English, Spanish, French, German, Italian, Portuguese, Dutch, and Japanese.
- **Client-Side PDF Generation**: Direct pixel-perfect PDF download via `html2canvas` & `jsPDF` without needing a backend server, plus optimized browser print stylesheet. Supports standard **A4** and **US Letter**.
- **Local Persistence**: Saves your business details and current invoice locally so they auto-fill next time.
- **Estimate / Quote Conversion**: Convert any estimate or quote to a finalized invoice in 1 click with celebratory confetti.

### 💎 Pro & Monetization Features
- **16 Designer Templates**:
  - *Free Tier*: Classic Minimal, Modern Clean, Bold Accent
  - *Pro Tier*: Corporate Slate, Creative Studio, Dark Header Luxe, Tech & Dev Monospace, Swiss International, Compact Slip, Executive Editorial, Aura Gradient, Consultant Signature, Neon Cyber, Nordic Calm, Blueprint Technical, Formal Legal & Tax.
- **Watermark Toggle**: Remove the "Made with InvoiceFlow" branding footer.
- **Unlimited Invoices**: Bypass the 5 invoice/month free quota.
- **Pro Financial Dashboard**:
  - Metrics: Total Invoiced, Paid Revenue, Outstanding Due, Average Invoice Value.
  - Interactive Revenue Pipeline visual progress.
  - Saved Invoices list with status filter (Draft, Sent, Viewed, Paid, Overdue).
  - Client contacts roster.
  - Export all invoices to **CSV / Excel** for accounting.
- **Direct Email Dispatch**: Send invoices straight to clients with customized message, attached PDF, and shareable payment link (`https://invoiceflow.app/pay/...`).
- **Recurring Invoices**: Set weekly, bi-weekly, monthly, quarterly, or yearly auto-generation schedules.
- **Monetization Architecture**:
  - Plans: Free ($0), Pro ($7/mo or $60/yr - save 28%), Business ($15/mo).
  - One-time template pack purchase options ($5–$9).
  - **7-day free trial** of Pro with no credit card required.
  - Contextual, non-blocking upgrade prompts.

### 🎨 UI & Design
- Clean, modern, trustworthy design built with Tailwind CSS.
- Dark mode toggle with seamless system preference detection.
- Fast, instant feedback with zero full-page reloads.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React
- **PDF Export**: jsPDF + html2canvas + print stylesheet
- **FX**: Canvas Confetti
- **Build Tool**: Vite 8

---

## 🏃 Getting Started

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```
