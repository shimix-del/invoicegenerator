import { BusinessProfile, Client, Invoice, ItemPreset } from '../types/invoice';
import { UserProfile } from '../types/user';

export const DEFAULT_BUSINESS_PROFILE: BusinessProfile = {
  name: 'Acme Studio Design Co.',
  email: 'hello@acmestudio.design',
  phone: '+1 (555) 234-5678',
  address: '742 Evergreen Terrace, Suite 400',
  city: 'San Francisco',
  state: 'CA',
  zip: '94107',
  country: 'United States',
  taxId: 'US-942817263',
  website: 'https://acmestudio.design',
  logoUrl: '',
  paymentDetails: {
    bankName: 'Silicon Valley Commercial Bank',
    accountName: 'Acme Studio Design Co.',
    accountNumber: '•••••••• 8821',
    routingNumber: '121000358',
    iban: 'US89SVBK121000358000008821',
    swift: 'SVBKUS6S',
    paypalEmail: 'payments@acmestudio.design',
    customInstructions: 'Please include the invoice number in the payment reference. Wire transfers or ACH preferred.',
  },
};

export const SAMPLE_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    name: 'Sarah Jenkins',
    company: 'Starlight Tech Inc.',
    email: 'sarah.jenkins@starlight.io',
    phone: '+1 (555) 891-2345',
    address: '100 Market Street, Floor 18',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States',
    taxId: 'US-829104921',
    notes: 'Key client for brand redesign and mobile frontend.',
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'cli-2',
    name: 'Marcus Vance',
    company: 'Horizon Health Innovations',
    email: 'm.vance@horizonhealth.co',
    phone: '+1 (555) 432-8765',
    address: '450 Lexington Avenue',
    city: 'New York',
    state: 'NY',
    zip: '10017',
    country: 'United States',
    taxId: 'US-102948572',
    notes: 'Quarterly retainers for product advisory.',
    createdAt: '2026-02-01T10:30:00Z',
  },
  {
    id: 'cli-3',
    name: 'Elena Rostova',
    company: 'Nordic Digital Media',
    email: 'elena@nordicdigital.se',
    phone: '+46 8 123 4567',
    address: 'Kungsgatan 12',
    city: 'Stockholm',
    state: '',
    zip: '111 43',
    country: 'Sweden',
    taxId: 'SE556012345601',
    notes: 'International client, billed in EUR or USD.',
    createdAt: '2026-02-20T14:15:00Z',
  },
];

export const SAMPLE_ITEM_PRESETS: ItemPreset[] = [
  { id: 'item-1', description: 'Brand Identity Design & Guidelines Manual', rate: 2800, category: 'Design' },
  { id: 'item-2', description: 'Responsive Web Application UI/UX Design (Figma)', rate: 3500, category: 'Design' },
  { id: 'item-3', description: 'Full-Stack React & Node.js Implementation (Hours)', rate: 125, category: 'Development' },
  { id: 'item-4', description: 'SEO Audit, Core Web Vitals & Speed Optimization', rate: 850, category: 'Marketing' },
  { id: 'item-5', description: 'Monthly Cloud Infrastructure Maintenance & Retainer', rate: 1200, category: 'DevOps' },
  { id: 'item-6', description: 'Technical Architecture & Security Consultation', rate: 200, category: 'Consulting' },
];

export const INITIAL_INVOICE: Invoice = {
  id: 'inv-init-001',
  documentType: 'invoice',
  invoiceNumber: 'INV-2026-0042',
  poNumber: 'PO-9841',
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  status: 'sent',
  
  business: { ...DEFAULT_BUSINESS_PROFILE },
  
  client: {
    id: 'cli-1',
    name: 'Sarah Jenkins',
    company: 'Starlight Tech Inc.',
    email: 'sarah.jenkins@starlight.io',
    phone: '+1 (555) 891-2345',
    address: '100 Market Street, Floor 18',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States',
    taxId: 'US-829104921',
  },
  
  items: [
    {
      id: 'li-1',
      description: 'Brand Identity System & Design Guidelines (Colors, Typography, Asset Library)',
      quantity: 1,
      rate: 2400,
      amount: 2400,
    },
    {
      id: 'li-2',
      description: 'Frontend React UI Component Library & Landing Page Development',
      quantity: 32,
      rate: 110,
      amount: 3520,
    },
    {
      id: 'li-3',
      description: 'Cloud Deployment, SSL Certification & Mobile QA Testing',
      quantity: 1,
      rate: 650,
      amount: 650,
    },
  ],
  
  currency: 'USD',
  
  subtotal: 6570,
  discountType: 'percentage',
  discountValue: 5,
  discountAmount: 328.5,
  
  taxType: 'percentage',
  taxRate: 8.5,
  taxAmount: 530.53,
  
  shipping: 0,
  total: 6772.03,
  amountPaid: 2000,
  amountDue: 4772.03,
  
  notes: 'Thank you for partnering with Acme Studio! We are excited to see Starlight Tech expand. Let us know if you need any follow-up sprint deliverables.',
  paymentTerms: 'Payment due within 14 calendar days of issue. Wire transfer, ACH, or credit card accepted.',
  footerMessage: 'Questions regarding this invoice? Contact billing@acmestudio.design or call +1 (555) 234-5678.',
  
  templateId: 'classic-minimal',
  accentColor: '#2563eb',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  logoPlacement: 'left',
  paperSize: 'a4',
  language: 'en',
  showWatermark: true,
  
  recurring: {
    enabled: false,
    frequency: 'monthly',
    nextRunDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    autoSendEmail: true,
  },
  
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const INITIAL_USER: UserProfile = {
  id: 'usr-guest-01',
  name: 'Alex Rivera',
  email: 'alex@freelance.dev',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  subscription: {
    plan: 'free',
    billingCycle: 'monthly',
    status: 'active',
  },
  invoicesCreatedThisMonth: 1,
  monthlyLimit: 5,
  savedTemplatesUnlocked: ['classic-minimal', 'modern-clean', 'bold-accent'],
};
