'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Layers,
  Key,
  Plus,
  Globe,
  Search,
  Eye,
  Edit3,
  ExternalLink,
  Copy,
  Check,
  Trash2,
  MessageCircle,
  Activity,
  MapPin,
  X,
  Phone,
  Building,
  ArrowRight,
  RefreshCw,
  Download,
} from 'lucide-react';

interface ProjectSummary {
  id: string;
  slug: string;
  businessName: string;
  niche: string;
  city: string;
  templateId: string;
  viewCount: number;
  lastViewedAt: string | null;
  createdAt: string;
  heroImage: string;
}

const NICHE_TABS = [
  { id: 'all', label: 'All Projects' },
  { id: 'dental', label: 'Dental' },
  { id: 'roofing', label: 'Roofing' },
  { id: 'medical', label: 'Medical' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'auto', label: 'Auto Detailing' },
  { id: 'law', label: 'Legal' },
  { id: 'plumbing', label: 'Plumbing' },
];

export default function StudioHomePage() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNiche, setActiveNiche] = useState('all');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // New Website Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newBizName, setNewBizName] = useState('');
  const [newNiche, setNewNiche] = useState('dental');
  const [newCity, setNewCity] = useState('Pune');
  const [newPhone, setNewPhone] = useState('+91 98765 43210');
  const [autoDraft, setAutoDraft] = useState(true);

  // WhatsApp Pitch Modal State
  const [pitchProject, setPitchProject] = useState<ProjectSummary | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);

  // Delete Confirmation State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch Projects from Supabase via API
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/studio/projects');
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filtered list
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.niche.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesNiche =
        activeNiche === 'all' ||
        p.niche.toLowerCase().includes(activeNiche) ||
        (activeNiche === 'dental' && p.niche.toLowerCase().includes('dentist'));

      return matchesSearch && matchesNiche;
    });
  }, [projects, searchQuery, activeNiche]);

  // Aggregate stats
  const totalViews = useMemo(() => {
    return projects.reduce((acc, p) => acc + (p.viewCount || 0), 0);
  }, [projects]);

  // Copy link helper
  const handleCopyLink = (slug: string) => {
    const url = `https://pinsite.pro/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  // Delete project handler
  const handleDeleteProject = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch('/api/studio/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete project: ' + (data.error || 'Unknown error'));
      }
    } catch {
      alert('Error deleting project');
    } finally {
      setDeletingId(null);
    }
  };

  // WhatsApp Pitch Text
  const getPitchText = (proj: ProjectSummary) => {
    const url = `https://pinsite.pro/${proj.slug}`;
    return `Hi ${proj.businessName} Team,\n\nI was looking at your practice online and designed a high-speed, modern website concept for your clinic with 1-tap WhatsApp & phone bookings:\n\n👉 ${url}\n\nTake a look on your phone when you have 30 seconds. Would love to hear your feedback!`;
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-slate-100 flex flex-col font-sans selection:bg-orange-500/30">
      {/* Top Navbar */}
      <header className="border-b border-[#1E222A] bg-[#0C0E12]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F95721] to-[#FF8A50] flex items-center justify-center shadow-lg shadow-orange-500/25 shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-tight text-white leading-tight">
                Pinsite Web Studio
              </h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/25">
                SaaS v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              High-Ticket Website Generator & API Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/api-keys"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#23262D] text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#161920] transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>API Keys</span>
          </Link>

          <Link
            href="/builder"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#23262D] text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#161920] transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-400" />
            <span>Open Builder</span>
          </Link>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#F95721] to-[#FF6B35] hover:opacity-95 text-xs font-bold text-white shadow-md shadow-orange-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Create Website</span>
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-6">
        {/* KPI Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="bg-[#0E1015] border border-[#1E222A] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Websites Built
              </p>
              <h3 className="text-2xl font-black text-white mt-1">{projects.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#161922] border border-[#23262D] flex items-center justify-center text-orange-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#0E1015] border border-[#1E222A] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Prospect Views
              </p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">{totalViews}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Eye className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#0E1015] border border-[#1E222A] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                AI Generation
              </p>
              <h3 className="text-base font-bold text-white mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Gemini 3.5</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#0E1015] border border-[#1E222A] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Infrastructure
              </p>
              <h3 className="text-base font-bold text-white mt-1 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Cloud Live</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#161922] border border-[#23262D] flex items-center justify-center text-slate-300">
              <Globe className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search & Niche Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between pt-2">
          {/* Niche Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {NICHE_TABS.map((tab) => {
              const active = activeNiche === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveNiche(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-[#F95721] text-white shadow-sm shadow-orange-500/20'
                      : 'bg-[#12141A] text-slate-400 hover:text-slate-200 border border-[#20242D]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input & Refresh */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search business or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#12141A] border border-[#20242D] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={fetchProjects}
              className="p-2 rounded-lg bg-[#12141A] border border-[#20242D] text-slate-400 hover:text-white hover:bg-[#181B22] transition-colors"
              title="Refresh projects"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-orange-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Projects Gallery */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-3 text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin text-orange-400" />
            <p className="text-xs font-mono">Loading Studio Websites...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="border border-dashed border-[#23262D] rounded-2xl p-14 flex flex-col items-center justify-center text-center gap-4 bg-[#0E1015]/40">
            <div className="w-14 h-14 rounded-2xl bg-[#161922] border border-[#23262D] flex items-center justify-center">
              <Layers className="w-7 h-7 text-orange-400" />
            </div>
            <div className="max-w-md">
              <h3 className="text-base font-bold text-white">
                {searchQuery ? 'No matching websites found' : 'No Websites Created Yet'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {searchQuery
                  ? `No website matched "${searchQuery}". Try clearing your search filter.`
                  : 'Launch the builder to generate your first $1,000 high-ticket website concept in under 2 seconds.'}
              </p>
            </div>
            <button
              onClick={() => {
                if (searchQuery) setSearchQuery('');
                else setIsCreateModalOpen(true);
              }}
              className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F95721] hover:bg-[#E04612] text-xs font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>{searchQuery ? 'Clear Search' : 'Create Website'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((proj) => {
              const publicUrl = `https://pinsite.pro/${proj.slug}`;
              const isDeleting = deletingId === proj.id;

              return (
                <div
                  key={proj.id}
                  className="group bg-[#0D0F14] border border-[#1E222A] hover:border-[#F95721]/50 rounded-2xl overflow-hidden flex flex-col shadow-lg transition-all hover:shadow-orange-500/5"
                >
                  {/* Hero Thumbnail Preview */}
                  <div className="relative h-44 w-full bg-[#151820] overflow-hidden">
                    <img
                      src={proj.heroImage}
                      alt={proj.businessName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] via-black/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live</span>
                      </span>

                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-semibold text-emerald-300">
                        <Eye className="w-3 h-3 text-emerald-400" />
                        <span>{proj.viewCount || 0} views</span>
                      </span>
                    </div>

                    {/* Bottom Thumbnail Overlay info */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold tracking-wider text-orange-400">
                        {proj.niche}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-slate-300">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{proj.city}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                        {proj.businessName}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1 truncate">
                        <span>pinsite.pro/</span>
                        <span className="text-slate-200 font-semibold">{proj.slug}</span>
                      </p>
                    </div>

                    {/* Actions Grid */}
                    <div className="space-y-2 pt-2 border-t border-[#1C2028]">
                      {/* Primary Edit Button */}
                      <Link
                        href={`/builder?slug=${encodeURIComponent(proj.slug)}`}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#F95721] hover:bg-[#E04612] text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit in Builder</span>
                      </Link>

                      {/* Secondary Actions */}
                      <div className="grid grid-cols-5 gap-1.5">
                        <a
                          href={publicUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center p-2 rounded-lg bg-[#14171E] hover:bg-[#1B1F28] border border-[#222630] text-slate-300 hover:text-white text-xs transition-colors"
                          title="Open Live Public Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => handleCopyLink(proj.slug)}
                          className="flex items-center justify-center p-2 rounded-lg bg-[#14171E] hover:bg-[#1B1F28] border border-[#222630] text-slate-300 hover:text-white text-xs transition-colors"
                          title="Copy Public Link"
                        >
                          {copiedSlug === proj.slug ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          onClick={() => setPitchProject(proj)}
                          className="flex items-center justify-center p-2 rounded-lg bg-[#14171E] hover:bg-[#1B1F28] border border-[#222630] text-emerald-400 hover:text-emerald-300 text-xs transition-colors"
                          title="Generate WhatsApp Pitch"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={`/api/studio/export?slug=${encodeURIComponent(proj.slug)}`}
                          download={`${proj.slug}-index.html`}
                          className="flex items-center justify-center p-2 rounded-lg bg-[#14171E] hover:bg-[#1B1F28] border border-[#222630] text-orange-400 hover:text-orange-300 text-xs transition-colors"
                          title="Download Standalone Client index.html Package"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.businessName)}
                          disabled={isDeleting}
                          className="flex items-center justify-center p-2 rounded-lg bg-[#14171E] hover:bg-red-500/10 border border-[#222630] text-slate-400 hover:text-red-400 text-xs transition-colors disabled:opacity-50"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Quick Create Website Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-[#0D0F14] border border-[#23262D] p-6 shadow-2xl relative space-y-5">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#181B20]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Create New Website</h3>
                <p className="text-xs text-slate-400">
                  Instant Gemini AI draft on $1,000 tactile sheet engine.
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Business Name *
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Apex Dental Studio"
                    value={newBizName}
                    onChange={(e) => setNewBizName(e.target.value)}
                    className="w-full bg-[#14171E] border border-[#23262D] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 font-medium"
                    autoFocus
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Niche / Industry
                  </label>
                  <select
                    value={newNiche}
                    onChange={(e) => setNewNiche(e.target.value)}
                    className="w-full bg-[#14171E] border border-[#23262D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500/50 font-medium"
                  >
                    <option value="dental">Dental Practice</option>
                    <option value="roofing">Roofing Company</option>
                    <option value="medical">Medical / Clinic</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="auto">Auto Detailing</option>
                    <option value="law">Law Firm</option>
                    <option value="plumbing">Plumbing Services</option>
                    <option value="restaurant">Fine Dining</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    City / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Pune or Denver"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full bg-[#14171E] border border-[#23262D] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-[#14171E] border border-[#23262D] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoDraft}
                  onChange={(e) => setAutoDraft(e.target.checked)}
                  className="rounded border-[#23262D] text-orange-500 focus:ring-0 bg-[#14171E] w-4 h-4"
                />
                <span className="text-xs text-slate-300">
                  Auto-write bespoke $1,000 copy with Gemini AI
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#23262D] text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#161920]"
              >
                Cancel
              </button>

              <Link
                href={`/builder?biz=${encodeURIComponent(newBizName || 'New Business')}&niche=${encodeURIComponent(newNiche)}&city=${encodeURIComponent(newCity)}&phone=${encodeURIComponent(newPhone)}${autoDraft ? '&autodraft=true' : ''}`}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#F95721] hover:bg-[#E04612] text-xs font-bold text-white shadow-md shadow-orange-600/20"
              >
                <span>Launch Builder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Pitch Dialog */}
      {pitchProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-[#0D0F14] border border-[#23262D] p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setPitchProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#181B20]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">WhatsApp Outreach Pitch</h3>
                <p className="text-xs text-slate-400">
                  Send this pitch to {pitchProject.businessName} to close the client.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#14171E] border border-[#23262D] text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-sans max-h-48 overflow-y-auto">
              {getPitchText(pitchProject)}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(getPitchText(pitchProject));
                  setCopiedPitch(true);
                  setTimeout(() => setCopiedPitch(false), 2000);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#181B22] hover:bg-[#202530] border border-[#262B36] text-xs font-bold text-slate-200"
              >
                {copiedPitch ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPitch ? 'Copied Pitch!' : 'Copy Pitch Text'}</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(getPitchText(pitchProject))}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-xs font-bold text-white shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
