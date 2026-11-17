import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  BusinessProfile,
  Client,
  DocumentType,
  Invoice,
  InvoiceStatus,
  ItemPreset,
  LineItem,
} from '../types/invoice';
import {
  loadCurrentInvoice,
  loadSavedBusinessProfile,
  loadSavedClients,
  loadSavedInvoices,
  loadSavedItems,
  saveBusinessProfile,
  saveCurrentInvoice,
  saveSavedClients,
  saveSavedInvoices,
  saveSavedItems,
} from '../utils/storage';
import { calculateInvoiceTotals, generateNextInvoiceNumber } from '../utils/calculations';
import { INITIAL_INVOICE } from '../constants/defaults';
import confetti from 'canvas-confetti';

export type AppView = 'landing' | 'editor' | 'dashboard' | 'pricing' | 'settings';

interface InvoiceContextType {
  invoice: Invoice;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
  updateInvoice: (fields: Partial<Invoice>) => void;
  updateBusiness: (fields: Partial<BusinessProfile>) => void;
  updateClient: (fields: Partial<Invoice['client']>) => void;
  addLineItem: (item?: Partial<LineItem>) => void;
  updateLineItem: (id: string, fields: Partial<LineItem>) => void;
  removeLineItem: (id: string) => void;
  reorderLineItems: (fromIndex: number, toIndex: number) => void;
  createNewInvoice: (type?: DocumentType) => void;
  
  // History & Invoices management
  savedInvoices: Invoice[];
  saveInvoiceToHistory: () => void;
  loadInvoiceFromHistory: (id: string) => void;
  deleteInvoiceFromHistory: (id: string) => void;
  duplicateInvoice: (invoiceId: string) => void;
  convertEstimateToInvoice: () => void;
  updateInvoiceStatus: (invoiceId: string, status: InvoiceStatus) => void;
  
  // Clients CRM
  clients: Client[];
  saveClient: (client: Client) => void;
  deleteClient: (clientId: string) => void;
  selectClientForInvoice: (client: Client) => void;
  
  // Items Catalog
  itemPresets: ItemPreset[];
  saveItemPreset: (item: ItemPreset) => void;
  deleteItemPreset: (itemId: string) => void;
  insertPresetToInvoice: (preset: ItemPreset) => void;
  
  // Navigation & View State
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  mobileTab: 'editor' | 'preview';
  setMobileTab: (tab: 'editor' | 'preview') => void;
  
  // Contextual Upgrade Modal
  isUpgradeModalOpen: boolean;
  setIsUpgradeModalOpen: (open: boolean) => void;
  upgradeModalReason: string;
  openUpgradeModal: (reason?: string) => void;
  
  // Share & Email modal
  isEmailModalOpen: boolean;
  setIsEmailModalOpen: (open: boolean) => void;
  isRecurringModalOpen: boolean;
  setIsRecurringModalOpen: (open: boolean) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoice, setInvoiceState] = useState<Invoice>(() => loadCurrentInvoice());
  const [savedInvoices, setSavedInvoices] = useState<Invoice[]>(() => loadSavedInvoices());
  const [clients, setClients] = useState<Client[]>(() => loadSavedClients());
  const [itemPresets, setItemPresets] = useState<ItemPreset[]>(() => loadSavedItems());

  const [activeView, setActiveView] = useState<AppView>('landing');
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
  const [upgradeModalReason, setUpgradeModalReason] = useState<string>('pro_feature');
  
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [isRecurringModalOpen, setIsRecurringModalOpen] = useState<boolean>(false);

  // Auto-sync invoice changes to localStorage
  useEffect(() => {
    saveCurrentInvoice(invoice);
  }, [invoice]);

  const openUpgradeModal = (reason: string = 'pro_feature') => {
    setUpgradeModalReason(reason);
    setIsUpgradeModalOpen(true);
  };

  // Generic recalculate helper
  const updateInvoice = useCallback((fields: Partial<Invoice>) => {
    setInvoiceState((prev) => {
      const merged: Invoice = { ...prev, ...fields, updatedAt: new Date().toISOString() };
      
      const totals = calculateInvoiceTotals(
        merged.items,
        merged.discountType,
        merged.discountValue,
        merged.taxType,
        merged.taxRate,
        merged.shipping,
        merged.amountPaid
      );

      return {
        ...merged,
        ...totals,
      };
    });
  }, []);

  const updateBusiness = useCallback((fields: Partial<BusinessProfile>) => {
    setInvoiceState((prev) => {
      const updatedBusiness = { ...prev.business, ...fields };
      saveBusinessProfile(updatedBusiness);
      return {
        ...prev,
        business: updatedBusiness,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const updateClient = useCallback((fields: Partial<Invoice['client']>) => {
    setInvoiceState((prev) => ({
      ...prev,
      client: { ...prev.client, ...fields },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const addLineItem = useCallback((item?: Partial<LineItem>) => {
    setInvoiceState((prev) => {
      const newItem: LineItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        description: item?.description || 'Professional Services / Consultation',
        quantity: item?.quantity ?? 1,
        rate: item?.rate ?? 100,
        amount: (item?.quantity ?? 1) * (item?.rate ?? 100),
      };
      
      const newItems = [...prev.items, newItem];
      const totals = calculateInvoiceTotals(
        newItems,
        prev.discountType,
        prev.discountValue,
        prev.taxType,
        prev.taxRate,
        prev.shipping,
        prev.amountPaid
      );

      return {
        ...prev,
        items: newItems,
        ...totals,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const updateLineItem = useCallback((id: string, fields: Partial<LineItem>) => {
    setInvoiceState((prev) => {
      const newItems = prev.items.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, ...fields };
        const qty = Number(updated.quantity) || 0;
        const rate = Number(updated.rate) || 0;
        updated.amount = Math.round(qty * rate * 100) / 100;
        return updated;
      });

      const totals = calculateInvoiceTotals(
        newItems,
        prev.discountType,
        prev.discountValue,
        prev.taxType,
        prev.taxRate,
        prev.shipping,
        prev.amountPaid
      );

      return {
        ...prev,
        items: newItems,
        ...totals,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const removeLineItem = useCallback((id: string) => {
    setInvoiceState((prev) => {
      if (prev.items.length <= 1) return prev; // Keep at least one line item
      const newItems = prev.items.filter((item) => item.id !== id);
      
      const totals = calculateInvoiceTotals(
        newItems,
        prev.discountType,
        prev.discountValue,
        prev.taxType,
        prev.taxRate,
        prev.shipping,
        prev.amountPaid
      );

      return {
        ...prev,
        items: newItems,
        ...totals,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const reorderLineItems = useCallback((fromIndex: number, toIndex: number) => {
    setInvoiceState((prev) => {
      if (fromIndex < 0 || fromIndex >= prev.items.length || toIndex < 0 || toIndex >= prev.items.length) {
        return prev;
      }
      const updated = [...prev.items];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return {
        ...prev,
        items: updated,
      };
    });
  }, []);

  const createNewInvoice = useCallback((type: DocumentType = 'invoice') => {
    const savedBusiness = loadSavedBusinessProfile();
    const nextNumber = generateNextInvoiceNumber(invoice.invoiceNumber);

    const freshInvoice: Invoice = {
      ...INITIAL_INVOICE,
      id: `inv-${Date.now()}`,
      documentType: type,
      invoiceNumber: nextNumber,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'draft',
      business: savedBusiness,
      client: {
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        taxId: '',
      },
      items: [
        {
          id: `item-${Date.now()}`,
          description: 'Web & Brand Consulting Services',
          quantity: 1,
          rate: 500,
          amount: 500,
        },
      ],
      subtotal: 500,
      discountValue: 0,
      discountAmount: 0,
      taxRate: 0,
      taxAmount: 0,
      shipping: 0,
      total: 500,
      amountPaid: 0,
      amountDue: 500,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setInvoiceState(freshInvoice);
    setActiveView('editor');
  }, [invoice.invoiceNumber]);

  const saveInvoiceToHistory = useCallback(() => {
    setSavedInvoices((prev) => {
      const existingIdx = prev.findIndex((inv) => inv.id === invoice.id);
      let updated: Invoice[];
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = invoice;
      } else {
        updated = [invoice, ...prev];
      }
      saveSavedInvoices(updated);
      return updated;
    });
  }, [invoice]);

  const loadInvoiceFromHistory = useCallback((id: string) => {
    const found = savedInvoices.find((i) => i.id === id);
    if (found) {
      setInvoiceState(found);
      setActiveView('editor');
    }
  }, [savedInvoices]);

  const deleteInvoiceFromHistory = useCallback((id: string) => {
    setSavedInvoices((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      saveSavedInvoices(updated);
      return updated;
    });
  }, []);

  const duplicateInvoice = useCallback((invoiceId: string) => {
    const target = savedInvoices.find((i) => i.id === invoiceId) || invoice;
    const duplicated: Invoice = {
      ...target,
      id: `inv-${Date.now()}`,
      invoiceNumber: generateNextInvoiceNumber(target.invoiceNumber),
      status: 'draft',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setInvoiceState(duplicated);
    setSavedInvoices((prev) => {
      const updated = [duplicated, ...prev];
      saveSavedInvoices(updated);
      return updated;
    });
    setActiveView('editor');
  }, [savedInvoices, invoice]);

  const convertEstimateToInvoice = useCallback(() => {
    updateInvoice({
      documentType: 'invoice',
      status: 'draft',
      invoiceNumber: invoice.invoiceNumber.replace(/^EST-|^QUO-/, 'INV-') || 'INV-0001',
    });
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}
  }, [updateInvoice, invoice.invoiceNumber]);

  const updateInvoiceStatus = useCallback((invoiceId: string, status: InvoiceStatus) => {
    setSavedInvoices((prev) => {
      const updated = prev.map((inv) => (inv.id === invoiceId ? { ...inv, status, updatedAt: new Date().toISOString() } : inv));
      saveSavedInvoices(updated);
      return updated;
    });

    if (invoice.id === invoiceId) {
      updateInvoice({ status });
    }
  }, [invoice.id, updateInvoice]);

  // Clients CRM
  const saveClient = useCallback((client: Client) => {
    setClients((prev) => {
      const exists = prev.findIndex((c) => c.id === client.id);
      let updated: Client[];
      if (exists >= 0) {
        updated = [...prev];
        updated[exists] = client;
      } else {
        updated = [client, ...prev];
      }
      saveSavedClients(updated);
      return updated;
    });
  }, []);

  const deleteClient = useCallback((clientId: string) => {
    setClients((prev) => {
      const updated = prev.filter((c) => c.id !== clientId);
      saveSavedClients(updated);
      return updated;
    });
  }, []);

  const selectClientForInvoice = useCallback((client: Client) => {
    updateInvoice({
      client: {
        id: client.id,
        name: client.name,
        company: client.company || '',
        email: client.email,
        phone: client.phone || '',
        address: client.address || '',
        city: client.city || '',
        state: client.state || '',
        zip: client.zip || '',
        country: client.country || '',
        taxId: client.taxId || '',
      },
    });
  }, [updateInvoice]);

  // Items catalog
  const saveItemPreset = useCallback((item: ItemPreset) => {
    setItemPresets((prev) => {
      const exists = prev.findIndex((i) => i.id === item.id);
      let updated: ItemPreset[];
      if (exists >= 0) {
        updated = [...prev];
        updated[exists] = item;
      } else {
        updated = [item, ...prev];
      }
      saveSavedItems(updated);
      return updated;
    });
  }, []);

  const deleteItemPreset = useCallback((itemId: string) => {
    setItemPresets((prev) => {
      const updated = prev.filter((i) => i.id !== itemId);
      saveSavedItems(updated);
      return updated;
    });
  }, []);

  const insertPresetToInvoice = useCallback((preset: ItemPreset) => {
    addLineItem({
      description: preset.description,
      rate: preset.rate,
      quantity: 1,
    });
  }, [addLineItem]);

  return (
    <InvoiceContext.Provider
      value={{
        invoice,
        setInvoice: setInvoiceState,
        updateInvoice,
        updateBusiness,
        updateClient,
        addLineItem,
        updateLineItem,
        removeLineItem,
        reorderLineItems,
        createNewInvoice,
        savedInvoices,
        saveInvoiceToHistory,
        loadInvoiceFromHistory,
        deleteInvoiceFromHistory,
        duplicateInvoice,
        convertEstimateToInvoice,
        updateInvoiceStatus,
        clients,
        saveClient,
        deleteClient,
        selectClientForInvoice,
        itemPresets,
        saveItemPreset,
        deleteItemPreset,
        insertPresetToInvoice,
        activeView,
        setActiveView,
        mobileTab,
        setMobileTab,
        isUpgradeModalOpen,
        setIsUpgradeModalOpen,
        upgradeModalReason,
        openUpgradeModal,
        isEmailModalOpen,
        setIsEmailModalOpen,
        isRecurringModalOpen,
        setIsRecurringModalOpen,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = (): InvoiceContextType => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};
