export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  position: 'prefix' | 'suffix';
  decimalPlaces: number;
  locale: string;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', position: 'prefix', decimalPlaces: 2, locale: 'en-US' },
  { code: 'EUR', name: 'Euro', symbol: '€', position: 'prefix', decimalPlaces: 2, locale: 'de-DE' },
  { code: 'GBP', name: 'British Pound', symbol: '£', position: 'prefix', decimalPlaces: 2, locale: 'en-GB' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', position: 'prefix', decimalPlaces: 2, locale: 'en-CA' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', position: 'prefix', decimalPlaces: 2, locale: 'en-AU' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', position: 'prefix', decimalPlaces: 0, locale: 'ja-JP' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', position: 'prefix', decimalPlaces: 2, locale: 'en-IN' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', position: 'prefix', decimalPlaces: 2, locale: 'de-CH' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', position: 'prefix', decimalPlaces: 2, locale: 'zh-CN' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', position: 'prefix', decimalPlaces: 2, locale: 'pt-BR' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', position: 'prefix', decimalPlaces: 2, locale: 'en-ZA' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$', position: 'prefix', decimalPlaces: 2, locale: 'es-MX' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', position: 'prefix', decimalPlaces: 2, locale: 'en-SG' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', position: 'prefix', decimalPlaces: 2, locale: 'en-NZ' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', position: 'prefix', decimalPlaces: 2, locale: 'zh-HK' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', position: 'suffix', decimalPlaces: 2, locale: 'sv-SE' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', position: 'suffix', decimalPlaces: 2, locale: 'nb-NO' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', position: 'suffix', decimalPlaces: 2, locale: 'da-DK' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', position: 'suffix', decimalPlaces: 2, locale: 'pl-PL' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', position: 'prefix', decimalPlaces: 2, locale: 'ar-AE' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR', position: 'prefix', decimalPlaces: 2, locale: 'ar-SA' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', position: 'prefix', decimalPlaces: 0, locale: 'ko-KR' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', position: 'prefix', decimalPlaces: 2, locale: 'tr-TR' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', position: 'prefix', decimalPlaces: 2, locale: 'th-TH' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', position: 'prefix', decimalPlaces: 2, locale: 'en-PH' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', position: 'prefix', decimalPlaces: 0, locale: 'id-ID' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', position: 'prefix', decimalPlaces: 2, locale: 'ms-MY' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', position: 'suffix', decimalPlaces: 0, locale: 'vi-VN' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', position: 'prefix', decimalPlaces: 2, locale: 'ar-EG' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', position: 'prefix', decimalPlaces: 2, locale: 'en-NG' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', position: 'prefix', decimalPlaces: 2, locale: 'en-KE' },
  { code: 'CLP', name: 'Chilean Peso', symbol: 'CLP$', position: 'prefix', decimalPlaces: 0, locale: 'es-CL' },
  { code: 'COP', name: 'Colombian Peso', symbol: 'COP$', position: 'prefix', decimalPlaces: 0, locale: 'es-CO' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', position: 'suffix', decimalPlaces: 2, locale: 'cs-CZ' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', position: 'suffix', decimalPlaces: 0, locale: 'hu-HU' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', position: 'prefix', decimalPlaces: 2, locale: 'he-IL' },
];

export const getCurrency = (code: string): CurrencyInfo => {
  return CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
};
