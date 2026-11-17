import React from 'react';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useInvoice } from '../../context/InvoiceContext';

interface WatermarkProps {
  showWatermark: boolean;
}

export const Watermark: React.FC<WatermarkProps> = ({ showWatermark }) => {
  const { isPro } = useAuth();
  const { openUpgradeModal } = useInvoice();

  if (!showWatermark) return null;

  return (
    <div className="pt-6 mt-8 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-400">
      <div className="flex items-center space-x-1.5">
        <span className="font-medium text-slate-500">Made with</span>
        <span className="font-bold tracking-tight text-blue-600 flex items-center">
          <svg className="w-3.5 h-3.5 mr-0.5 inline-block text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          InvoiceFlow
        </span>
        <span>— Free fast invoice generator</span>
      </div>

      {!isPro && (
        <button
          onClick={() => openUpgradeModal('watermark')}
          type="button"
          className="no-print inline-flex items-center space-x-1 text-[11px] text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors"
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Remove branding with Pro</span>
        </button>
      )}
    </div>
  );
};
