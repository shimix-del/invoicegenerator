import { getCurrency } from '../constants/currencies';

export const formatCurrency = (amount: number, currencyCode: string = 'USD'): string => {
  const currency = getCurrency(currencyCode);
  const safeAmount = isNaN(amount) ? 0 : amount;
  
  try {
    const formattedNumber = new Intl.NumberFormat(currency.locale, {
      minimumFractionDigits: currency.decimalPlaces,
      maximumFractionDigits: currency.decimalPlaces,
    }).format(Math.abs(safeAmount));
    
    const sign = safeAmount < 0 ? '-' : '';
    
    if (currency.position === 'prefix') {
      return `${sign}${currency.symbol}${formattedNumber}`;
    } else {
      return `${sign}${formattedNumber} ${currency.symbol}`;
    }
  } catch {
    return `${currency.symbol}${safeAmount.toFixed(currency.decimalPlaces)}`;
  }
};

export const formatDate = (dateString?: string, formatStyle: 'short' | 'medium' | 'long' = 'medium'): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    if (formatStyle === 'short') {
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' });
    }
    if (formatStyle === 'long') {
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateString;
  }
};

export const parseNumberInput = (value: string | number, fallback: number = 0): number => {
  if (typeof value === 'number') return isNaN(value) ? fallback : value;
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? fallback : parsed;
};
