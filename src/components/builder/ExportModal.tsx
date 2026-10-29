'use client';

import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Globe,
  FileCode,
  ShieldCheck,
  X,
  Sparkles,
  Server,
  ExternalLink,
} from 'lucide-react';
import { WebsiteProject } from '@/lib/studio/types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: WebsiteProject;
  compiledHtml?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  project,
  compiledHtml,
}) => {
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<'package' | 'dns'>('package');

  if (!isOpen) return null;

  const slug = project.slug || 'website';
  const filename = `${slug}-index.html`;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      let htmlToDownload = compiledHtml;

      if (!htmlToDownload) {
        const res = await fetch('/api/studio/export', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(project),
        });
        const data = await res.json();
        htmlToDownload = data.html;
      }

      if (htmlToDownload) {
        const blob = new Blob([htmlToDownload], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error('Download export failed:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyHtml = async () => {
    try {
      let text = compiledHtml;
      if (!text) {
        const res = await fetch('/api/studio/export', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(project),
        });
        const data = await res.json();
        text = data.html;
      }
      if (text) {
        await navigator.clipboard.writeText(text);
        setCopiedHtml(true);
        setTimeout(() => setCopiedHtml(false), 2000);
      }
    } catch (e) {
      console.error('Copy HTML failed:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-2xl bg-[#0D0F14] border border-[#212631] p-6 shadow-2xl relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#181B22] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white shrink-0">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Client Handoff &amp; Export Package</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase font-bold">
                Zero Dependencies
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Self-contained, production-ready single-file bundle for {project.businessName}.
            </p>
          </div>
        </div>

        {/* Tabs: Package vs DNS */}
        <div className="grid grid-cols-2 bg-[#141720] p-1 rounded-xl border border-[#202532] text-xs font-semibold text-slate-400">
          <button
            onClick={() => setActiveTab('package')}
            className={`py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'package'
                ? 'bg-[#1E2330] text-orange-400 shadow-sm'
                : 'hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Standalone Package</span>
          </button>
          <button
            onClick={() => setActiveTab('dns')}
            className={`py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'dns'
                ? 'bg-[#1E2330] text-orange-400 shadow-sm'
                : 'hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Custom Domain &amp; Host</span>
          </button>
        </div>

        {/* TAB 1: STANDALONE PACKAGE */}
        {activeTab === 'package' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#12151D] border border-[#202532] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-200">
                    {filename}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  Single File (HTML + CSS + JS)
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Includes interactive Before/After drag comparison slider.</li>
                <li>Includes 3-step WhatsApp consultation booking modal.</li>
                <li>Responsive mobile bottom thumb dock and desktop layouts.</li>
                <li>Instant $0 hosting: drop into Cloudflare Pages, Vercel, or Netlify.</li>
              </ul>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#F95721] to-[#FF6B35] hover:opacity-95 text-xs font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isDownloading ? 'Packaging Bundle...' : `Download ${filename}`}
                </span>
              </button>

              <button
                onClick={handleCopyHtml}
                className="px-4 py-3 rounded-xl border border-[#272E3E] bg-[#161A24] hover:bg-[#1E2330] text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
                title="Copy entire raw HTML code to clipboard"
              >
                {copiedHtml ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy HTML</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DNS & HOSTING GUIDE */}
        {activeTab === 'dns' && (
          <div className="space-y-3 text-xs leading-relaxed">
            <div className="p-3.5 rounded-xl bg-[#12151D] border border-[#202532] space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-orange-400" />
                <span>30-Second Host Deployment (Zero Cost)</span>
              </h4>
              <p className="text-slate-300 text-[11px]">
                Because the exported code is 100% static and self-contained, you or your client can host it anywhere for free:
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                <div className="p-2 rounded-lg bg-[#181C26] border border-[#272E3E] text-slate-300 text-center">
                  Cloudflare Pages
                </div>
                <div className="p-2 rounded-lg bg-[#181C26] border border-[#272E3E] text-slate-300 text-center">
                  Vercel Static
                </div>
                <div className="p-2 rounded-lg bg-[#181C26] border border-[#272E3E] text-slate-300 text-center">
                  Netlify Drop
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#12151D] border border-[#202532] space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Custom Domain DNS Records</span>
              </h4>
              <p className="text-slate-300 text-[11px]">
                When connecting client domain (e.g. <span className="font-mono text-orange-400">www.theirdomain.com</span>):
              </p>
              <div className="p-2.5 rounded-lg bg-[#0A0C10] font-mono text-[11px] text-slate-300 space-y-1">
                <div>CNAME &nbsp; <span className="text-amber-400">www</span> &nbsp; &rarr; &nbsp; <span className="text-emerald-400">client-site.pages.dev</span></div>
                <div>A-Record &nbsp; <span className="text-amber-400">@</span> &nbsp; &rarr; &nbsp; <span className="text-emerald-400">Host IP Address</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-[#1E222A] flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready for client white-label handoff</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
