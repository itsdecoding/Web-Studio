'use client';

import React, { useState } from 'react';
import {
  WebsiteProject,
  TemplateId,
  StudioImageSlot,
  ProjectServiceItem,
} from '@/lib/studio/types';
import { TEMPLATES_CATALOG, listAllTemplates } from '@/lib/studio/templates/catalog';
import { NICHE_VAULTS } from '@/lib/studio/vault';
import {
  LayoutTemplate,
  Type,
  Image as ImageIcon,
  Palette,
  Upload,
  Link as LinkIcon,
  Plus,
  Trash2,
  Check,
  Sparkles,
  RefreshCw,
  Zap,
} from 'lucide-react';

interface ControlsSidebarProps {
  project: WebsiteProject;
  onChange: (updated: Partial<WebsiteProject>) => void;
}

export type SidebarTab = 'templates' | 'content' | 'media' | 'styles';

const COLOR_PRESETS = [
  { name: 'Clinical Teal', hex: '#0F766E' },
  { name: 'Safety Amber', hex: '#F59E0B' },
  { name: 'Bioluminescent Emerald', hex: '#10B981' },
  { name: 'Electric Cyan', hex: '#06B6D4' },
  { name: 'Baked Terracotta', hex: '#C86D51' },
  { name: 'Regal Navy', hex: '#0F2744' },
  { name: 'Signal Red', hex: '#DC2626' },
  { name: 'Trust Blue', hex: '#2563EB' },
  { name: 'Swiss Obsidian', hex: '#000000' },
  { name: 'Royal Purple', hex: '#7C3AED' },
];

export const ControlsSidebar: React.FC<ControlsSidebarProps> = ({
  project,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('templates');
  const [activeSlot, setActiveSlot] = useState<StudioImageSlot>('hero');
  const [vaultNiche, setVaultNiche] = useState<string>(project.niche || 'dental');
  const [webImageUrl, setWebImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // AI State
  const [isAiDrafting, setIsAiDrafting] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const templates = listAllTemplates();
  const currentVault = NICHE_VAULTS[vaultNiche] || NICHE_VAULTS.dental;

  // AI 1-Click Magic Auto-Draft
  const handleAiAutoDraft = async () => {
    setIsAiDrafting(true);
    setAiError(null);

    try {
      const res = await fetch('/api/studio/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'draft',
          businessName: project.businessName || 'Elite Local Practice',
          niche: project.niche || 'dental',
          city: project.city || 'Pune',
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'AI generation failed');
      }

      const ai = json.data;
      onChange({
        headlineLine1: ai.headlineLine1,
        headlineLine2: ai.headlineLine2,
        subheadline: ai.subheadline,
        services: ai.services,
        doctorOrOwnerName: ai.doctorOrOwnerName,
        doctorOrOwnerTitle: ai.doctorOrOwnerTitle,
        templateId: ai.recommendedTemplateId || project.templateId,
      });
    } catch (err: any) {
      setAiError(err?.message || 'Could not connect to Gemini AI');
    } finally {
      setIsAiDrafting(false);
    }
  };

  // AI Re-Roll for headlines
  const handleAiReRoll = async (tone: 'luxury' | 'urgent' | 'warm') => {
    try {
      const res = await fetch('/api/studio/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reroll',
          section: 'headline',
          businessName: project.businessName,
          niche: project.niche,
          currentText: `${project.headlineLine1} ${project.headlineLine2}`,
          tone,
        }),
      });
      const json = await res.json();
      if (json.success && json.rewritten) {
        onChange({ headlineLine1: json.rewritten.toUpperCase() });
      }
    } catch {
      // ignore
    }
  };

  // Handle local file upload to Supabase storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', activeSlot);

      const res = await fetch('/api/studio/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange({
        customImages: {
          ...(project.customImages || {}),
          [activeSlot]: data.url,
        },
      });
    } catch (err: any) {
      setUploadError(err?.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle pasting web URL
  const handleApplyWebUrl = async () => {
    if (!webImageUrl.trim()) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const res = await fetch('/api/studio/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: webImageUrl.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid image URL');
      }

      onChange({
        customImages: {
          ...(project.customImages || {}),
          [activeSlot]: data.url,
        },
      });
      setWebImageUrl('');
    } catch (err: any) {
      setUploadError(err?.message || 'Could not verify image link');
    } finally {
      setIsUploading(false);
    }
  };

  // Assign image from curated niche vault
  const handleSelectVaultImage = (url: string) => {
    onChange({
      customImages: {
        ...(project.customImages || {}),
        [activeSlot]: url,
      },
    });
  };

  // Services management
  const handleAddService = () => {
    const current = project.services || [];
    const newService: ProjectServiceItem = {
      title: 'New Specialty Treatment',
      description: 'Precision clinical procedure backed by modern diagnostic standards.',
    };
    onChange({ services: [...current, newService] });
  };

  const handleUpdateService = (index: number, updated: Partial<ProjectServiceItem>) => {
    const current = [...(project.services || [])];
    current[index] = { ...current[index], ...updated };
    onChange({ services: current });
  };

  const handleDeleteService = (index: number) => {
    const current = [...(project.services || [])];
    current.splice(index, 1);
    onChange({ services: current });
  };

  return (
    <aside className="w-full lg:w-[420px] h-[calc(100vh-56px)] border-r border-[#1E222A] bg-[#0E1015] flex flex-col shrink-0 select-none">
      {/* Tab Navigation Header */}
      <div className="grid grid-cols-4 border-b border-[#1E222A] bg-[#0A0C0F] text-xs font-semibold text-slate-400 p-1.5 gap-1">
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-colors ${
            activeTab === 'templates'
              ? 'bg-[#181B20] text-orange-400 shadow-sm font-bold'
              : 'hover:text-slate-200 hover:bg-[#121418]'
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span>Styles</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-colors ${
            activeTab === 'content'
              ? 'bg-[#181B20] text-orange-400 shadow-sm font-bold'
              : 'hover:text-slate-200 hover:bg-[#121418]'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Copy & AI</span>
        </button>

        <button
          onClick={() => setActiveTab('media')}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-colors ${
            activeTab === 'media'
              ? 'bg-[#181B20] text-orange-400 shadow-sm font-bold'
              : 'hover:text-slate-200 hover:bg-[#121418]'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Photos</span>
        </button>

        <button
          onClick={() => setActiveTab('styles')}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-colors ${
            activeTab === 'styles'
              ? 'bg-[#181B20] text-orange-400 shadow-sm font-bold'
              : 'hover:text-slate-200 hover:bg-[#121418]'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Color</span>
        </button>
      </div>

      {/* Tab Panels Body with Micro-Scrollbar */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#23262D] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        {/* ----------------- TAB 1: TEMPLATES ----------------- */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">Select Architectural Style</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Switch between 10 high-status layout blueprints. Right-side preview updates immediately.
              </p>
            </div>

            <div className="space-y-2.5">
              {templates.map((tpl) => {
                const isSelected = project.templateId === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => onChange({ templateId: tpl.id })}
                    className={`cursor-pointer rounded-xl border p-3.5 transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-orange-500/80 bg-[#F95721]/5 shadow-md shadow-orange-500/10'
                        : 'border-[#23262D] bg-[#121418] hover:border-[#383C45]'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-lg shrink-0 border border-white/10 flex items-center justify-center font-bold text-xs"
                      style={{ backgroundColor: tpl.primaryColor, color: '#FFFFFF' }}
                    >
                      {tpl.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white truncate">{tpl.name}</h4>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#F95721] text-white flex items-center justify-center text-[10px]">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                      <span className="inline-block text-[10px] text-orange-400 font-medium">
                        {tpl.category}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {tpl.tagline}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ----------------- TAB 2: CONTENT & GEMINI AI ----------------- */}
        {activeTab === 'content' && (
          <div className="space-y-5">
            {/* Gemini AI Auto-Draft Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent border border-orange-500/30 space-y-2.5 shadow-lg shadow-orange-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-white">Gemini AI Auto-Draft</span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30">
                  GEMINI 3.5 FLASH
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Click below to let Gemini analyze your business name and auto-write a complete $1,000 bespoke website (headlines, 6 treatments, value pillars, reviews) in &lt; 2s.
              </p>
              <button
                onClick={handleAiAutoDraft}
                disabled={isAiDrafting}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-[#F95721] to-[#FF6B35] hover:opacity-95 text-xs font-bold text-white shadow-md shadow-orange-600/20 transition-all disabled:opacity-50"
              >
                {isAiDrafting ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{isAiDrafting ? 'Writing $1,000 Website Copy...' : 'Generate Website with AI'}</span>
              </button>
              {aiError && <p className="text-[10px] text-red-400 font-medium">{aiError}</p>}
            </div>

            {/* Core Info */}
            <div className="space-y-3.5 pt-1">
              <div>
                <label className="text-xs font-semibold text-slate-300">Business Name</label>
                <input
                  type="text"
                  value={project.businessName}
                  onChange={(e) => onChange({ businessName: e.target.value })}
                  className="mt-1 w-full bg-[#14171E] border border-[#23262D] rounded-lg px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                  placeholder="e.g. Perfect Smile Dental Clinic"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Headlines</label>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleAiReRoll('luxury')}
                      className="text-[10px] text-orange-400 hover:underline flex items-center gap-0.5"
                      title="Re-roll with Luxury tone"
                    >
                      <Sparkles className="w-2.5 h-2.5" /> Luxury
                    </button>
                    <span className="text-slate-600">•</span>
                    <button
                      onClick={() => handleAiReRoll('urgent')}
                      className="text-[10px] text-orange-400 hover:underline flex items-center gap-0.5"
                      title="Re-roll with Direct Urgent tone"
                    >
                      Urgent
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={project.headlineLine1 || ''}
                    onChange={(e) => onChange({ headlineLine1: e.target.value })}
                    className="w-full bg-[#14171E] border border-[#23262D] rounded-lg px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                    placeholder="PERFECT SMILE"
                  />
                  <input
                    type="text"
                    value={project.headlineLine2 || ''}
                    onChange={(e) => onChange({ headlineLine2: e.target.value })}
                    className="w-full bg-[#14171E] border border-[#23262D] rounded-lg px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                    placeholder="DENTAL CLINIC"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Subheadline / Value Prop</label>
                <textarea
                  rows={2}
                  value={project.subheadline || ''}
                  onChange={(e) => onChange({ subheadline: e.target.value })}
                  className="mt-1 w-full bg-[#14171E] border border-[#23262D] rounded-lg px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                  placeholder="Single-sitting painless root canals, Zirconia crowns, and microscopic dental implants."
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Phone (For Calls)</label>
                  <input
                    type="text"
                    value={project.phone || ''}
                    onChange={(e) => onChange({ phone: e.target.value })}
                    className="mt-1 w-full bg-[#14171E] border border-[#23262D] rounded-lg px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">WhatsApp Number</label>
                  <input
                    type="text"
                    value={project.whatsappNumber || ''}
                    onChange={(e) => onChange({ whatsappNumber: e.target.value })}
                    className="mt-1 w-full bg-[#14171E] border border-[#23262D] rounded-lg px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                    placeholder="919876543210"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">City & Location</label>
                <input
                  type="text"
                  value={project.city || ''}
                  onChange={(e) => onChange({ city: e.target.value })}
                  className="mt-1 w-full bg-[#14171E] border border-[#23262D] rounded-lg px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                  placeholder="Hadapsar, Pune"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Doctor / Owner Name</label>
                  <input
                    type="text"
                    value={project.doctorOrOwnerName || ''}
                    onChange={(e) => onChange({ doctorOrOwnerName: e.target.value })}
                    className="mt-1 w-full bg-[#14171E] border border-[#23262D] rounded-lg px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                    placeholder="Dr. Amit Sharma"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Doctor Title</label>
                  <input
                    type="text"
                    value={project.doctorOrOwnerTitle || ''}
                    onChange={(e) => onChange({ doctorOrOwnerTitle: e.target.value })}
                    className="mt-1 w-full bg-[#14171E] border border-[#23262D] rounded-lg px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                    placeholder="Chief Implantologist"
                  />
                </div>
              </div>
            </div>

            {/* Services Editor */}
            <div className="pt-2 border-t border-[#1E222A]">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-white">Specialties & Services</label>
                <button
                  onClick={handleAddService}
                  className="flex items-center gap-1 text-[11px] text-orange-400 hover:text-orange-300 font-semibold"
                >
                  <Plus className="w-3 h-3" />
                  Add Service
                </button>
              </div>

              <div className="space-y-3">
                {(project.services || []).map((srv, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-[#23262D] bg-[#121418] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono text-slate-500">
                        Service #{idx + 1}
                      </span>
                      <button
                        onClick={() => handleDeleteService(idx)}
                        className="text-slate-500 hover:text-red-400 transition-colors"
                        title="Delete service"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => handleUpdateService(idx, { title: e.target.value })}
                      className="w-full bg-[#161920] border border-[#282C35] rounded px-2.5 py-1.5 text-xs text-white focus:border-orange-500 outline-none"
                      placeholder="Service Name"
                    />
                    <textarea
                      rows={2}
                      value={srv.description || ''}
                      onChange={(e) => handleUpdateService(idx, { description: e.target.value })}
                      className="w-full bg-[#161920] border border-[#282C35] rounded px-2.5 py-1.5 text-xs text-slate-300 focus:border-orange-500 outline-none"
                      placeholder="Short description of procedure or benefit"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB 3: MEDIA HUB ----------------- */}
        {activeTab === 'media' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white">Photo & Asset Manager</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload real business photos or pick from pre-stocked industry vaults.
              </p>
            </div>

            {/* Target Image Slot Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300">Assign To Photo Slot</label>
              <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                {[
                  { id: 'hero', label: '1. Hero Banner' },
                  { id: 'tilt_1', label: '2. Facility Showcase' },
                  { id: 'tilt_2', label: '3. Treatment Photo' },
                  { id: 'founder', label: '4. Doctor / Founder' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSlot(s.id as StudioImageSlot)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-all ${
                      activeSlot === s.id
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold'
                        : 'bg-[#121418] text-slate-400 border border-[#23262D] hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Method A: Upload Computer / Phone File */}
            <div className="border border-dashed border-[#23262D] rounded-xl p-4 text-center bg-[#121418]">
              <Upload className="w-5 h-5 text-orange-400 mx-auto mb-2" />
              <label className="cursor-pointer text-xs font-bold text-orange-400 hover:text-orange-300 underline block">
                <span>{isUploading ? 'Uploading to cloud...' : 'Browse Photo File'}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
              <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, WebP up to 10MB</p>
            </div>

            {/* Method B: Paste URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Or Paste Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={webImageUrl}
                  onChange={(e) => setWebImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 bg-[#14171E] border border-[#23262D] rounded-lg px-3 py-1.5 text-xs text-white focus:border-orange-500 outline-none"
                />
                <button
                  onClick={handleApplyWebUrl}
                  disabled={isUploading || !webImageUrl.trim()}
                  className="px-3 py-1.5 rounded-lg bg-[#23262D] hover:bg-[#2C3038] text-xs font-semibold text-white disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
            </div>

            {uploadError && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                {uploadError}
              </div>
            )}

            {/* Method C: Curated Vault Selection */}
            <div className="pt-2 border-t border-[#1E222A]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-white">Pre-Stocked Industry Vault</label>
                <select
                  value={vaultNiche}
                  onChange={(e) => setVaultNiche(e.target.value)}
                  className="bg-[#161920] border border-[#282C35] rounded px-2 py-1 text-xs text-orange-400 font-medium outline-none"
                >
                  {Object.keys(NICHE_VAULTS).map((key) => (
                    <option key={key} value={key}>
                      {NICHE_VAULTS[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto p-1 bg-[#0A0C0F] rounded-lg border border-[#1E222A] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#23262D]">
                {[
                  currentVault.hero,
                  ...currentVault.tilts,
                  currentVault.founder,
                  ...currentVault.services.map((s) => s.image),
                ].map((imgUrl, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectVaultImage(imgUrl)}
                    className="group relative aspect-video rounded-md overflow-hidden border border-[#282C35] hover:border-orange-500 cursor-pointer"
                  >
                    <img
                      src={imgUrl}
                      alt="Vault Thumbnail"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white bg-orange-600 px-1.5 py-0.5 rounded">
                        Pick
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB 4: BRANDING & COLORS ----------------- */}
        {activeTab === 'styles' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white">Branding & Color Engine</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Customize primary accent colors and brand highlights.
              </p>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Signature Palette Presets</label>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_PRESETS.map((col) => {
                  const isActive = project.primaryColorOverride === col.hex;
                  return (
                    <button
                      key={col.hex}
                      onClick={() => onChange({ primaryColorOverride: col.hex })}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs font-medium transition-all ${
                        isActive
                          ? 'border-orange-500 bg-[#1A1D24]'
                          : 'border-[#23262D] bg-[#121418] hover:border-[#383C45]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-white/20"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="truncate text-slate-300">{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Hex */}
            <div className="pt-2 border-t border-[#1E222A]">
              <label className="text-xs font-semibold text-slate-300">Custom Hex Code</label>
              <div className="flex gap-2 mt-1.5 items-center">
                <input
                  type="color"
                  value={project.primaryColorOverride || '#0F766E'}
                  onChange={(e) => onChange({ primaryColorOverride: e.target.value })}
                  className="w-9 h-9 rounded-lg border border-[#23262D] bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={project.primaryColorOverride || ''}
                  onChange={(e) => onChange({ primaryColorOverride: e.target.value })}
                  placeholder="#0F766E"
                  className="flex-1 bg-[#14171E] border border-[#23262D] rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-orange-500 outline-none"
                />
                {project.primaryColorOverride && (
                  <button
                    onClick={() => onChange({ primaryColorOverride: undefined })}
                    className="px-2.5 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-[#181B20]"
                    title="Reset to template default"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
