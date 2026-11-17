import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Invoice } from '../types/invoice';

export const exportInvoiceToPdf = async (
  elementId: string,
  fileName: string = 'invoice.pdf',
  paperSize: 'a4' | 'letter' = 'a4'
): Promise<boolean> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    // Clone and prepare styles for crisp rendering
    const canvas = await html2canvas(element, {
      scale: 2.5, // High DPI capture for crisp print text
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1024,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Page dimensions in mm
    const isA4 = paperSize === 'a4';
    const pdfWidth = isA4 ? 210 : 215.9;
    const pdfHeight = isA4 ? 297 : 279.4;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: isA4 ? 'a4' : 'letter',
      compress: true,
    });

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Multi-page support if invoice has lots of line items
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to window.print if canvas rendering encounters issue
    window.print();
    return false;
  }
};

export const printInvoiceDirectly = (): void => {
  window.print();
};

export const exportInvoicesToCsv = (invoices: Invoice[]): void => {
  const headers = [
    'Invoice Number',
    'Document Type',
    'Status',
    'Issue Date',
    'Due Date',
    'Client Name',
    'Client Company',
    'Client Email',
    'Subtotal',
    'Tax',
    'Discount',
    'Shipping',
    'Total',
    'Amount Paid',
    'Amount Due',
    'Currency',
  ];

  const rows = invoices.map((inv) => [
    `"${inv.invoiceNumber}"`,
    `"${inv.documentType}"`,
    `"${inv.status}"`,
    `"${inv.issueDate}"`,
    `"${inv.dueDate}"`,
    `"${inv.client.name.replace(/"/g, '""')}"`,
    `"${inv.client.company.replace(/"/g, '""')}"`,
    `"${inv.client.email.replace(/"/g, '""')}"`,
    inv.subtotal,
    inv.taxAmount,
    inv.discountAmount,
    inv.shipping,
    inv.total,
    inv.amountPaid,
    inv.amountDue,
    `"${inv.currency}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `invoiceflow_export_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
