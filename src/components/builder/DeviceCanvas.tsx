'use client';

import React from 'react';
import { Smartphone, Zap } from 'lucide-react';

interface DeviceCanvasProps {
  device: 'mobile' | 'tablet' | 'desktop';
  compiledHtml: string;
  executionMs?: number;
}

export const DeviceCanvas: React.FC<DeviceCanvasProps> = ({
  device,
  compiledHtml,
  executionMs = 0.4,
}) => {
  return (
    <section className="flex-1 h-[calc(100vh-56px)] bg-[#07080A] flex flex-col items-center justify-start p-4 sm:p-5 overflow-y-auto relative select-none [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-[#23262D]">
      {/* Background Studio Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#262B35 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Canvas Status Pill */}
      <div className="z-10 mb-3 flex items-center gap-3 bg-[#111318]/90 backdrop-blur-md border border-[#23262D] px-3.5 py-1 rounded-full text-[11px] font-mono text-slate-400 shadow-lg">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Hot Virtual DOM</span>
        </div>
        <span className="text-slate-600">•</span>
        <div className="flex items-center gap-1 text-slate-300">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>{executionMs}ms compile</span>
        </div>
        <span className="text-slate-600">•</span>
        <span className="text-slate-400">
          {device === 'mobile' ? '390 × 844 (iPhone 16 Pro)' : device === 'tablet' ? '768 × 1024 (iPad)' : '100% Responsive'}
        </span>
      </div>

      {/* Device Viewport Frames */}
      <div className="z-10 w-full flex justify-center pb-8 transition-all">
        {device === 'mobile' && (
          <div className="relative w-[390px] h-[820px] bg-black rounded-[48px] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-[4px] border-[#2A2E39]">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
              <div className="w-2 h-2 rounded-full bg-[#181B20] border border-white/10" />
            </div>

            {/* Inner Display (Scrollbar Completely Hidden Inside) */}
            <div className="w-full h-full rounded-[40px] overflow-hidden bg-white relative">
              <iframe
                title="Mobile Preview Canvas"
                srcDoc={compiledHtml}
                className="w-full h-full border-0 select-auto"
                sandbox="allow-scripts allow-same-origin allow-popups"
                style={{
                  scrollbarWidth: 'none',
                }}
              />
            </div>

            {/* Home Indicator Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-30 pointer-events-none" />
          </div>
        )}

        {device === 'tablet' && (
          <div className="relative w-[768px] h-[920px] bg-black rounded-[36px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-[4px] border-[#2A2E39]">
            <div className="w-full h-full rounded-[26px] overflow-hidden bg-white">
              <iframe
                title="Tablet Preview Canvas"
                srcDoc={compiledHtml}
                className="w-full h-full border-0 select-auto"
                sandbox="allow-scripts allow-same-origin allow-popups"
                style={{ scrollbarWidth: 'none' }}
              />
            </div>
          </div>
        )}

        {device === 'desktop' && (
          <div className="w-full max-w-5xl rounded-2xl overflow-hidden bg-[#121418] border border-[#2A2E39] shadow-2xl flex flex-col">
            {/* Browser Tab Mock */}
            <div className="h-9 bg-[#16181F] border-b border-[#23262D] px-4 flex items-center gap-2 select-none">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="mx-auto w-1/2 bg-[#0E1015] border border-[#23262D] rounded-md px-3 py-0.5 text-[11px] font-mono text-slate-400 text-center truncate">
                https://pinsite.pro/preview
              </div>
            </div>

            <div className="w-full h-[760px] bg-white">
              <iframe
                title="Desktop Preview Canvas"
                srcDoc={compiledHtml}
                className="w-full h-full border-0 select-auto"
                sandbox="allow-scripts allow-same-origin allow-popups"
                style={{ scrollbarWidth: 'none' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
