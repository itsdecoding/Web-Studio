import Link from "next/link";
import { Sparkles, Layers, Key, Plus, Globe } from "lucide-react";

export default function StudioHomePage() {
  return (
    <div className="min-h-screen bg-[#0B0C0E] text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-[#1E222A] bg-[#0E1015]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F95721] to-[#FF8A50] flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              Pinsite Web Studio <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">SaaS v1.0</span>
            </h1>
            <p className="text-xs text-slate-400">Universal Website Generator & Visual Split-Screen Editor</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/api-keys"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#23262D] text-xs font-medium text-slate-300 hover:text-white hover:bg-[#181B20] transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            API Keys
          </Link>
          <Link
            href="/builder"
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#F95721] hover:bg-[#E04612] text-xs font-semibold text-white shadow-md shadow-orange-600/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-3.5 h-3.5" />
            Create New Website
          </Link>
        </div>
      </header>

      {/* Main Studio Home Hub */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Projects & Websites</h2>
            <p className="text-sm text-slate-400 mt-1">Manage, edit, or track all generated prospect and client websites.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#121418] border border-[#23262D] px-3 py-1.5 rounded-lg">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Standalone Studio Active</span>
          </div>
        </div>

        {/* Empty State / Showcase Card */}
        <div className="border border-dashed border-[#23262D] rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4 bg-[#0E1015]/40">
          <div className="w-14 h-14 rounded-2xl bg-[#161920] border border-[#23262D] flex items-center justify-center">
            <Layers className="w-7 h-7 text-orange-400" />
          </div>
          <div className="max-w-md">
            <h3 className="text-lg font-semibold text-white">Create Your First Website</h3>
            <p className="text-xs text-slate-400 mt-1">
              Type any business name, pick a niche, upload photos, and build a high-status website on a live phone preview.
            </p>
          </div>
          <Link
            href="/builder"
            className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F95721] hover:bg-[#E04612] text-xs font-semibold text-white shadow-lg shadow-orange-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Launch Visual Builder
          </Link>
        </div>
      </main>
    </div>
  );
}
