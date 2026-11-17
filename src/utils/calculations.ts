import { DiscountType, LineItem, TaxType } from '../types/invoice';

export interface CalculationResult {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  total: number;
  amountDue: number;
}

export const calculateInvoiceTotals = (
  items: LineItem[],
  discountType: DiscountType,
  discountValue: number,
  taxType: TaxType,
  taxRate: number,
  shipping: number = 0,
  amountPaid: number = 0
): CalculationResult => {
  // 1. Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    return sum + (qty * rate);
  }, 0);

  // 2. Calculate discount
  let discountAmount = 0;
  const dVal = Number(discountValue) || 0;
  if (discountType === 'percentage') {
    discountAmount = (subtotal * Math.max(0, Math.min(100, dVal))) / 100;
  } else {
    discountAmount = Math.min(subtotal, Math.max(0, dVal));
  }

  const taxableBase = Math.max(0, subtotal - discountAmount);

  // 3. Calculate tax
  let taxAmount = 0;
  const tVal = Number(taxRate) || 0;
  if (taxType === 'percentage') {
    taxAmount = (taxableBase * Math.max(0, tVal)) / 100;
  } else {
    taxAmount = Math.max(0, tVal);
  }

  // 4. Shipping / Extra Fees
  const shippingAmount = Math.max(0, Number(shipping) || 0);

  // 5. Total
  const total = Math.max(0, taxableBase + taxAmount + shippingAmount);

  // 6. Amount Due
  const paid = Math.max(0, Number(amountPaid) || 0);
  const amountDue = Math.max(0, total - paid);

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    shippingAmount: Math.round(shippingAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
    amountDue: Math.round(amountDue * 100) / 100,
  };
};

export const generateNextInvoiceNumber = (currentNumber?: string): string => {
  if (!currentNumber) return 'INV-0001';
  
  // Look for trailing digits
  const match = currentNumber.match(/^(.*?)(\d+)$/);
  if (match) {
    const prefix = match[1];
    const numberStr = match[2];
    const nextNumber = parseInt(numberStr, 10) + 1;
    const padded = nextNumber.toString().padStart(numberStr.length, '0');
    return `${prefix}${padded}`;
  }
  
  return `${currentNumber}-1`;
};
