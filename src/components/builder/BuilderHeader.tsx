'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Rocket,
  Edit2,
  Check,
  Sparkles,
} from 'lucide-react';

interface BuilderHeaderProps {
  businessName: string;
  slug: string;
  onSlugChange: (slug: string) => void;
  device: 'mobile' | 'tablet' | 'desktop';
  onDeviceChange: (device: 'mobile' | 'tablet' | 'desktop') => void;
  onSaveDraft: () => void;
  onPublishLive: () => void;
  isSaving?: boolean;
}

export const BuilderHeader: React.FC<BuilderHeaderProps> = ({
  businessName,
  slug,
  onSlugChange,
  device,
  onDeviceChange,
  onSaveDraft,
  onPublishLive,
  isSaving,
}) => {
  const [editingSlug, setEditingSlug] = useState(false);
  const [tempSlug, setTempSlug] = useState(slug);

  const handleSlugSubmit = () => {
    const clean = tempSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    onSlugChange(clean || 'my-website');
    setEditingSlug(false);
  };

  return (
    <header className="h-14 border-b border-[#1E222A] bg-[#0E1015] px-4 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Left: Back & Project Info */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#181B20] text-xs font-medium transition-colors"
          title="Back to Studio Home"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>

        <div className="h-4 w-px bg-[#23262D]" />

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h1 className="text-xs font-bold text-white max-w-[200px] truncate leading-tight">
              {businessName || 'Untitled Practice'}
            </h1>
            <div className="flex items-center gap-1 text-[10px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-Time Hot Studio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Device Switcher & Vanity URL Bar */}
      <div className="flex items-center gap-4">
        {/* Device Switcher */}
        <div className="flex items-center bg-[#14171E] border border-[#23262D] rounded-lg p-0.5">
          <button
            onClick={() => onDeviceChange('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              device === 'mobile'
                ? 'bg-[#F95721] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="iPhone 16 Pro View (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
          <button
            onClick={() => onDeviceChange('tablet')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              device === 'tablet'
                ? 'bg-[#F95721] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="iPad View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => onDeviceChange('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              device === 'desktop'
                ? 'bg-[#F95721] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop View (Full Screen)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
        </div>

        {/* Vanity URL Pill */}
        <div className="hidden md:flex items-center gap-1 bg-[#121419] border border-[#23262D] px-2.5 py-1 rounded-lg text-xs font-mono">
          <span className="text-slate-500">pinsite.pro/</span>
          {editingSlug ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={tempSlug}
                onChange={(e) => setTempSlug(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSlugSubmit()}
                className="bg-[#181B20] text-orange-400 border border-orange-500/40 rounded px-1.5 py-0.5 text-xs outline-none w-28"
                autoFocus
              />
              <button
                onClick={handleSlugSubmit}
                className="text-emerald-400 hover:text-emerald-300"
              >
                <Check className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-orange-400 font-semibold">
              <span>{slug}</span>
              <button
                onClick={() => {
                  setTempSlug(slug);
                  setEditingSlug(true);
                }}
                className="text-slate-500 hover:text-slate-300 ml-0.5"
                title="Edit vanity slug"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onSaveDraft}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#23262D] text-xs font-medium text-slate-300 hover:text-white hover:bg-[#181B20] transition-colors disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5 text-slate-400" />
          <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
        </button>

        <button
          onClick={onPublishLive}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#F95721] to-[#FF6B35] hover:opacity-95 text-xs font-bold text-white shadow-md shadow-orange-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Rocket className="w-3.5 h-3.5" />
          <span>Publish Live</span>
        </button>
      </div>
    </header>
  );
};
