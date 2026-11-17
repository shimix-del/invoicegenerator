import { BusinessProfile, Client, Invoice, ItemPreset } from '../types/invoice';
import { UserProfile } from '../types/user';
import { DEFAULT_BUSINESS_PROFILE, INITIAL_INVOICE, INITIAL_USER, SAMPLE_CLIENTS, SAMPLE_ITEM_PRESETS } from '../constants/defaults';

const STORAGE_KEYS = {
  CURRENT_INVOICE: 'invoiceflow_current_invoice',
  SAVED_BUSINESS_PROFILE: 'invoiceflow_saved_business_profile',
  SAVED_INVOICES: 'invoiceflow_saved_invoices_v1',
  SAVED_CLIENTS: 'invoiceflow_saved_clients_v1',
  SAVED_ITEMS: 'invoiceflow_saved_items_v1',
  USER_PROFILE: 'invoiceflow_user_profile_v1',
  THEME_MODE: 'invoiceflow_theme_mode',
};

// --- Business Profile ---
export const loadSavedBusinessProfile = (): BusinessProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_BUSINESS_PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load saved business profile', e);
  }
  return DEFAULT_BUSINESS_PROFILE;
};

export const saveBusinessProfile = (profile: BusinessProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_BUSINESS_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save business profile', e);
  }
};

// --- Current Working Invoice ---
export const loadCurrentInvoice = (): Invoice => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_INVOICE);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load current invoice', e);
  }
  
  // If no saved draft, load initial invoice with saved business profile if present
  const profile = loadSavedBusinessProfile();
  return {
    ...INITIAL_INVOICE,
    business: profile,
  };
};

export const saveCurrentInvoice = (invoice: Invoice): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_INVOICE, JSON.stringify(invoice));
    // Also save business profile automatically
    saveBusinessProfile(invoice.business);
  } catch (e) {
    console.error('Failed to save current invoice', e);
  }
};

// --- Saved Invoices List (Dashboard) ---
export const loadSavedInvoices = (): Invoice[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_INVOICES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load saved invoices', e);
  }
  
  // Seed with sample initial invoice
  const defaultList = [INITIAL_INVOICE];
  saveSavedInvoices(defaultList);
  return defaultList;
};

export const saveSavedInvoices = (invoices: Invoice[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_INVOICES, JSON.stringify(invoices));
  } catch (e) {
    console.error('Failed to save invoices list', e);
  }
};

// --- Clients List ---
export const loadSavedClients = (): Client[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_CLIENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load clients', e);
  }
  saveSavedClients(SAMPLE_CLIENTS);
  return SAMPLE_CLIENTS;
};

export const saveSavedClients = (clients: Client[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_CLIENTS, JSON.stringify(clients));
  } catch (e) {
    console.error('Failed to save clients', e);
  }
};

// --- Item Catalog / Library ---
export const loadSavedItems = (): ItemPreset[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_ITEMS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load items', e);
  }
  saveSavedItems(SAMPLE_ITEM_PRESETS);
  return SAMPLE_ITEM_PRESETS;
};

export const saveSavedItems = (items: ItemPreset[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_ITEMS, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save items', e);
  }
};

// --- User Profile & Subscription ---
export const loadUserProfile = (): UserProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load user profile', e);
  }
  return INITIAL_USER;
};

export const saveUserProfile = (user: UserProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user profile', e);
  }
};

// --- Dark Mode ---
export const loadThemeMode = (): 'light' | 'dark' => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME_MODE);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const saveThemeMode = (theme: 'light' | 'dark'): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME_MODE, theme);
  } catch {}
};
