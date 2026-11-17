import React, { useState } from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import { useAuth } from '../../context/AuthContext';
import { X, Send, Link as LinkIcon, Check, Mail, Paperclip } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SendEmailModal: React.FC = () => {
  const { invoice, isEmailModalOpen, setIsEmailModalOpen, updateInvoiceStatus, openUpgradeModal } = useInvoice();
  const { isPro } = useAuth();

  const [toEmail, setToEmail] = useState(invoice.client.email || '');
  const [subject, setSubject] = useState(
    `Invoice ${invoice.invoiceNumber} from ${invoice.business.name || 'Your Provider'}`
  );
  const [message, setMessage] = useState(
    `Hi ${invoice.client.name || 'there'},\n\nPlease find attached invoice ${invoice.invoiceNumber} for ${invoice.items.length} items, due on ${invoice.dueDate}.\n\nYou can review and pay securely using the link below.\n\nThank you for your business!`
  );
  const [autoRemind, setAutoRemind] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  if (!isEmailModalOpen) return null;

  const shareableUrl = `https://invoiceflow.app/pay/${invoice.id}?num=${invoice.invoiceNumber}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSend = () => {
    if (!toEmail) {
      alert('Please enter a valid client email.');
      return;
    }

    if (!isPro) {
      setIsEmailModalOpen(false);
      openUpgradeModal('email');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      updateInvoiceStatus(invoice.id, 'sent');
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}

      setTimeout(() => {
        setSendSuccess(false);
        setIsEmailModalOpen(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5 text-slate-800 dark:text-slate-100 text-xs">
        <button
          onClick={() => setIsEmailModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Send Invoice via Email</h2>
            <p className="text-slate-500">Includes secure payment link and PDF attachment</p>
          </div>
        </div>

        {/* Shareable payment link box */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <span className="font-semibold text-slate-600 dark:text-slate-400 block">
            Direct Client Payment Link:
          </span>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={shareableUrl}
              className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-mono text-[11px]"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-1 shrink-0"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Recipient Email *
            </label>
            <input
              type="email"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              placeholder="client@company.com"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Message
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          {/* Attachments & Reminders */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-1 text-slate-500">
              <Paperclip className="w-3.5 h-3.5" />
              <span>{invoice.invoiceNumber}.pdf (Attached)</span>
            </div>

            <label className="flex items-center space-x-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={autoRemind}
                onChange={(e) => setAutoRemind(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Send automatic payment reminder</span>
            </label>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            disabled={isSending}
            onClick={handleSend}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {sendSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Invoice Sent Successfully!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{isSending ? 'Sending to Client...' : 'Send Invoice to Client'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
