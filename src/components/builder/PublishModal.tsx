'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageCircle,
  X,
  Check,
  Sparkles,
  Download,
} from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  slug: string;
  phone?: string;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  businessName,
  slug,
  phone,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);

  if (!isOpen) return null;

  const publicUrl = `https://pinsite.pro/${slug}`;
  const editorUrl = `https://studio.pinsite.pro/builder?slug=${slug}`;

  const pitchText = `Hi ${businessName} Team,\n\nI was looking at your practice online and designed a high-speed, modern website concept for your clinic with 1-tap WhatsApp & phone bookings:\n\n👉 ${publicUrl}\n\nTake a look on your phone when you have 30 seconds. Would love to hear your feedback!`;

  const cleanWhatsAppNumber = (phone || '').replace(/[^0-9]/g, '');
  const whatsappShareUrl = cleanWhatsAppNumber
    ? `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(pitchText)}`
    : `https://wa.me/?text=${encodeURIComponent(pitchText)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(pitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-[#0E1015] border border-[#23262D] p-6 shadow-2xl relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#181B20] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-1.5">
              <span>Ready & Published Live!</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Your high-status preview link is active and ready to pitch.
            </p>
          </div>
        </div>

        {/* The Clean Customer Link */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Customer Public Link
          </label>
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#14171E] border border-[#23262D]">
            <a
              href={publicUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono font-semibold text-orange-400 hover:underline truncate flex items-center gap-1.5"
            >
              <span>{publicUrl}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-[#F95721] hover:bg-[#E04612] text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition-all"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
              </button>

              <a
                href={`/api/studio/export?slug=${encodeURIComponent(slug)}`}
                download={`${slug}-index.html`}
                className="p-1.5 rounded-lg bg-[#1B1F28] hover:bg-[#262C38] border border-[#2B313F] text-slate-300 hover:text-white transition-colors"
                title="Download Standalone Client index.html Package"
              >
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 1-Click WhatsApp Pitch Generator */}
        <div className="space-y-2 pt-2 border-t border-[#1E222A]">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ready-To-Send WhatsApp Pitch</span>
            </label>
            <button
              onClick={handleCopyPitch}
              className="text-xs font-semibold text-orange-400 hover:text-orange-300"
            >
              {copiedPitch ? 'Copied Pitch!' : 'Copy Text'}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#14171E] border border-[#23262D] text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-sans max-h-36 overflow-y-auto">
            {pitchText}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open in WhatsApp</span>
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#23262D] text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#181B20] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
