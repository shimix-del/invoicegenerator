export type DocumentType = 'invoice' | 'estimate' | 'quote' | 'receipt';

export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue';

export type PaperSize = 'a4' | 'letter';

export type LogoPlacement = 'left' | 'right' | 'center' | 'hidden';

export type DiscountType = 'percentage' | 'fixed';

export type TaxType = 'percentage' | 'fixed';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface BusinessProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  taxId: string;
  website: string;
  logoUrl?: string;
  paymentDetails: {
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    routingNumber?: string;
    iban?: string;
    swift?: string;
    paypalEmail?: string;
    customInstructions?: string;
  };
}

export interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  taxId?: string;
  notes?: string;
  createdAt: string;
}

export interface ItemPreset {
  id: string;
  description: string;
  rate: number;
  category?: string;
}

export interface RecurringSchedule {
  enabled: boolean;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
  nextRunDate: string;
  autoSendEmail: boolean;
}

export interface Invoice {
  id: string;
  documentType: DocumentType;
  invoiceNumber: string;
  poNumber?: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  
  business: BusinessProfile;
  client: {
    id?: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    taxId: string;
  };

  items: LineItem[];
  
  currency: string;
  
  subtotal: number;
  discountType: DiscountType;
  discountValue: number;
  discountAmount: number;
  
  taxType: TaxType;
  taxRate: number;
  taxAmount: number;
  
  shipping: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  
  notes: string;
  paymentTerms: string;
  footerMessage: string;
  
  // Customization & styling
  templateId: string;
  accentColor: string;
  fontFamily: string;
  logoPlacement: LogoPlacement;
  paperSize: PaperSize;
  language: string;
  showWatermark: boolean;
  
  // Pro features
  recurring?: RecurringSchedule;
  remindersSentCount?: number;
  viewCount?: number;
  
  createdAt: string;
  updatedAt: string;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  isPro: boolean;
  category: 'minimal' | 'modern' | 'corporate' | 'creative' | 'bold' | 'classic';
  previewBadge?: string;
  defaultAccent: string;
  tags: string[];
}
