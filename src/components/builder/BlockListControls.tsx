'use client';

import React, { useState } from 'react';
import { WebsiteProject } from '@/lib/studio/types';
import { WebsiteBlock, BlockType } from '@/lib/studio/blocks/types';
import { generateDefaultBlocks } from '@/lib/studio/blocks/engine';
import { resolveVaultNiche } from '@/lib/studio/vault';
import {
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Layers,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface BlockListControlsProps {
  project: WebsiteProject;
  onChange: (updated: Partial<WebsiteProject>) => void;
}

interface BlockMeta {
  title: string;
  category: 'core' | 'conversion' | 'authority' | 'trust';
  description: string;
}

const BLOCK_METAS: Record<BlockType, BlockMeta> = {
  'top-bar': {
    title: 'Top Announcement Bar',
    category: 'core',
    description: 'High-contrast emergency or accreditation banner above the main nav.',
  },
  'nav': {
    title: 'Header Navigation',
    category: 'core',
    description: 'Brand identity, primary phone trigger, and consultation CTA.',
  },
  'hero': {
    title: 'Hero Showcase',
    category: 'core',
    description: 'Above-the-fold headline, authority photo, and dual high-intent action buttons.',
  },
  'track-record': {
    title: 'Track Record & Numbers',
    category: 'authority',
    description: 'Settlement ticker, recovery figures, or claim metrics for high-ticket proof.',
  },
  'philosophy-tilts': {
    title: 'Philosophy & Tilted Frames',
    category: 'authority',
    description: 'Editorial manifesto statement flanked by layered asymmetric photo cards.',
  },
  'before-after': {
    title: 'Interactive Split Slider',
    category: 'conversion',
    description: 'Real-time draggable before/after comparison slider with touch and mouse dragging.',
  },
  'services-rail': {
    title: 'Core Services Grid',
    category: 'core',
    description: 'Signature procedural dossiers or services with clinical micro-tags.',
  },
  'trust-pillars': {
    title: 'Trust & Safety Pillars',
    category: 'trust',
    description: 'Structured 3-column architectural standards and protocol guarantees.',
  },
  'founder-spotlight': {
    title: 'Founder / Lead Spotlight',
    category: 'authority',
    description: 'Principal practitioner or owner portrait, credentials, and philosophy quote.',
  },
  'google-reviews': {
    title: 'Google 5-Star Reviews',
    category: 'trust',
    description: 'Verified badge, 5.0 score ticker, and scrollable patient/client testimonial cards.',
  },
  'booking-intake': {
    title: 'Interactive Booking Modal',
    category: 'conversion',
    description: 'Multi-step triage booking form with direct encrypted WhatsApp routing.',
  },
  'sticky-callbar': {
    title: 'Sticky Mobile Call Bar',
    category: 'conversion',
    description: 'Fixed bottom thumb-zone call and WhatsApp action bar on mobile viewports.',
  },
};

export const BlockListControls: React.FC<BlockListControlsProps> = ({
  project,
  onChange,
}) => {
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);

  // Obtain active blocks (fallback to archetype defaults)
  const vault = resolveVaultNiche(project.niche || 'general');
  const blocks: WebsiteBlock[] =
    project.blocks && Array.isArray(project.blocks) && project.blocks.length > 0
      ? (project.blocks as WebsiteBlock[])
      : generateDefaultBlocks(project, vault);

  const updateBlocks = (newBlocks: WebsiteBlock[]) => {
    onChange({ blocks: newBlocks });
  };

  const handleToggleBlock = (index: number) => {
    const updated = [...blocks];
    const isCurrentlyEnabled = updated[index].enabled !== false;
    updated[index] = {
      ...updated[index],
      enabled: !isCurrentlyEnabled,
    };
    updateBlocks(updated);
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    updateBlocks(updated);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all blocks to industry archetype defaults?')) {
      const defaults = generateDefaultBlocks(project, vault);
      updateBlocks(defaults);
      setExpandedBlockId(null);
    }
  };

  const handleFieldChange = (index: number, field: string, value: any) => {
    const updated = [...blocks];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    updateBlocks(updated);
  };

  return (
    <div className="space-y-4">
      {/* Header Info & Actions */}
      <div className="bg-[#13161C] border border-[#212631] rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-400" />
            <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase">
              Modular Block Layout ({blocks.length} Sections)
            </h3>
          </div>
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-orange-400 transition-colors bg-[#1A1E26] hover:bg-[#232834] px-2.5 py-1 rounded-md border border-[#2A303E]"
            title="Reset blocks to archetype default order"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Reorder sections, toggle visibility, and customize content on each block. Every change recompiles instantly in under 1ms.
        </p>
      </div>

      {/* Block List */}
      <div className="space-y-2">
        {blocks.map((block, index) => {
          const isEnabled = block.enabled !== false;
          const meta = BLOCK_METAS[block.type] || {
            title: block.type,
            category: 'core',
            description: '',
          };
          const isExpanded = expandedBlockId === block.id;

          return (
            <div
              key={block.id || `block-${index}`}
              className={`rounded-xl border transition-all ${
                isEnabled
                  ? isExpanded
                    ? 'bg-[#151922] border-orange-500/40 shadow-lg'
                    : 'bg-[#11141B] border-[#1F242E] hover:border-[#2C3342]'
                  : 'bg-[#0D0F14] border-[#1A1D24] opacity-60'
              }`}
            >
              {/* Block Item Row */}
              <div className="flex items-center gap-2 p-2.5 select-none">
                {/* Order Index Pill */}
                <span className="w-5 h-5 flex items-center justify-center rounded-md bg-[#1B202A] text-[10px] font-mono text-slate-400 shrink-0">
                  {index + 1}
                </span>

                {/* Eye Toggle */}
                <button
                  type="button"
                  onClick={() => handleToggleBlock(index)}
                  className={`p-1.5 rounded-md transition-colors ${
                    isEnabled
                      ? 'text-emerald-400 hover:bg-emerald-950/40'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                  }`}
                  title={isEnabled ? 'Hide section' : 'Show section'}
                >
                  {isEnabled ? (
                    <Eye className="w-3.5 h-3.5" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Block Title and Category Badge */}
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() =>
                    setExpandedBlockId(isExpanded ? null : block.id)
                  }
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-semibold truncate ${
                        isEnabled ? 'text-slate-200' : 'text-slate-500 line-through'
                      }`}
                    >
                      {meta.title}
                    </span>
                    {meta.category === 'conversion' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                        High Conv
                      </span>
                    )}
                    {meta.category === 'authority' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                        Authority
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                    {meta.description}
                  </p>
                </div>

                {/* Up / Down Controls */}
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMoveBlock(index, 'up')}
                    disabled={index === 0}
                    className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-[#1E232F] disabled:opacity-20 disabled:hover:bg-transparent"
                    title="Move up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveBlock(index, 'down')}
                    disabled={index === blocks.length - 1}
                    className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-[#1E232F] disabled:opacity-20 disabled:hover:bg-transparent"
                    title="Move down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedBlockId(isExpanded ? null : block.id)
                    }
                    className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-[#1E232F]"
                    title={isExpanded ? 'Collapse settings' : 'Edit section content'}
                  >
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        isExpanded ? 'rotate-90 text-orange-400' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Collapsible Block Content Editor */}
              {isExpanded && (
                <div className="p-3 border-t border-[#1F242E] bg-[#0E1117] space-y-3 text-xs">
                  {/* HERO BLOCK EDIT */}
                  {block.type === 'hero' && (
                    <>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                          Badge / Credential Tag
                        </label>
                        <input
                          type="text"
                          value={(block as any).badgeText || ''}
                          onChange={(e) =>
                            handleFieldChange(index, 'badgeText', e.target.value)
                          }
                          className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Headline Line 1
                          </label>
                          <input
                            type="text"
                            value={(block as any).headlineLine1 || ''}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                'headlineLine1',
                                e.target.value
                              )
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Headline Line 2
                          </label>
                          <input
                            type="text"
                            value={(block as any).headlineLine2 || ''}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                'headlineLine2',
                                e.target.value
                              )
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                          Subheadline
                        </label>
                        <textarea
                          rows={2}
                          value={(block as any).subheadline || ''}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              'subheadline',
                              e.target.value
                            )
                          }
                          className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500 resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Primary CTA
                          </label>
                          <input
                            type="text"
                            value={(block as any).primaryCtaText || ''}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                'primaryCtaText',
                                e.target.value
                              )
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Secondary CTA
                          </label>
                          <input
                            type="text"
                            value={(block as any).secondaryCtaText || ''}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                'secondaryCtaText',
                                e.target.value
                              )
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* BEFORE / AFTER BLOCK EDIT */}
                  {block.type === 'before-after' && (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Heading
                          </label>
                          <input
                            type="text"
                            value={(block as any).heading || ''}
                            onChange={(e) =>
                              handleFieldChange(index, 'heading', e.target.value)
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Tag / Badge
                          </label>
                          <input
                            type="text"
                            value={(block as any).tagText || ''}
                            onChange={(e) =>
                              handleFieldChange(index, 'tagText', e.target.value)
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Before Label
                          </label>
                          <input
                            type="text"
                            value={(block as any).beforeLabel || 'BEFORE'}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                'beforeLabel',
                                e.target.value
                              )
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            After Label
                          </label>
                          <input
                            type="text"
                            value={(block as any).afterLabel || 'AFTER'}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                'afterLabel',
                                e.target.value
                              )
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                          Case Study Description
                        </label>
                        <input
                          type="text"
                          value={(block as any).caseDescription || ''}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              'caseDescription',
                              e.target.value
                            )
                          }
                          className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Before Image URL
                          </label>
                          <input
                            type="text"
                            value={(block as any).beforeImage || ''}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                'beforeImage',
                                e.target.value
                              )
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500 font-mono text-[11px]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            After Image URL
                          </label>
                          <input
                            type="text"
                            value={(block as any).afterImage || ''}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                'afterImage',
                                e.target.value
                              )
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500 font-mono text-[11px]"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* TRACK RECORD BLOCK EDIT */}
                  {block.type === 'track-record' && (
                    <>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                          Section Headline
                        </label>
                        <input
                          type="text"
                          value={(block as any).headline || ''}
                          onChange={(e) =>
                            handleFieldChange(index, 'headline', e.target.value)
                          }
                          className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                          Key Metrics / Stats
                        </label>
                        {((block as any).stats || []).map(
                          (stat: any, sIdx: number) => (
                            <div
                              key={sIdx}
                              className="grid grid-cols-2 gap-2 bg-[#141720] p-2 rounded-lg border border-[#212632]"
                            >
                              <input
                                type="text"
                                placeholder="Value (e.g. $140M+)"
                                value={stat.value || ''}
                                onChange={(e) => {
                                  const stats = [
                                    ...((block as any).stats || []),
                                  ];
                                  stats[sIdx] = {
                                    ...stats[sIdx],
                                    value: e.target.value,
                                  };
                                  handleFieldChange(index, 'stats', stats);
                                }}
                                className="bg-[#1B202B] border border-[#2D3444] rounded px-2 py-1 text-slate-100 text-xs font-bold"
                              />
                              <input
                                type="text"
                                placeholder="Label (e.g. Recovered)"
                                value={stat.label || ''}
                                onChange={(e) => {
                                  const stats = [
                                    ...((block as any).stats || []),
                                  ];
                                  stats[sIdx] = {
                                    ...stats[sIdx],
                                    label: e.target.value,
                                  };
                                  handleFieldChange(index, 'stats', stats);
                                }}
                                className="bg-[#1B202B] border border-[#2D3444] rounded px-2 py-1 text-slate-100 text-xs"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}

                  {/* PHILOSOPHY TILTS EDIT */}
                  {block.type === 'philosophy-tilts' && (
                    <>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                          Tag Text
                        </label>
                        <input
                          type="text"
                          value={(block as any).tagText || ''}
                          onChange={(e) =>
                            handleFieldChange(index, 'tagText', e.target.value)
                          }
                          className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                          Manifesto Statement (Supports &lt;span&gt; highlight)
                        </label>
                        <textarea
                          rows={3}
                          value={(block as any).statementHtml || ''}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              'statementHtml',
                              e.target.value
                            )
                          }
                          className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500 font-mono text-[11px]"
                        />
                      </div>
                    </>
                  )}

                  {/* SERVICES RAIL EDIT */}
                  {block.type === 'services-rail' && (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Section Tag
                          </label>
                          <input
                            type="text"
                            value={(block as any).sectionTag || ''}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                'sectionTag',
                                e.target.value
                              )
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={(block as any).sectionTitle || ''}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                'sectionTitle',
                                e.target.value
                              )
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                          Section Subtitle
                        </label>
                        <input
                          type="text"
                          value={(block as any).sectionSubtitle || ''}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              'sectionSubtitle',
                              e.target.value
                            )
                          }
                          className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </>
                  )}

                  {/* FOUNDER SPOTLIGHT EDIT */}
                  {block.type === 'founder-spotlight' && (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Practitioner / Lead Name
                          </label>
                          <input
                            type="text"
                            value={(block as any).name || ''}
                            onChange={(e) =>
                              handleFieldChange(index, 'name', e.target.value)
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Professional Title
                          </label>
                          <input
                            type="text"
                            value={(block as any).title || ''}
                            onChange={(e) =>
                              handleFieldChange(index, 'title', e.target.value)
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                          Philosophy / Bio Quote
                        </label>
                        <textarea
                          rows={2}
                          value={(block as any).bio || ''}
                          onChange={(e) =>
                            handleFieldChange(index, 'bio', e.target.value)
                          }
                          className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </>
                  )}

                  {/* BOOKING INTAKE EDIT */}
                  {block.type === 'booking-intake' && (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Intake Heading
                          </label>
                          <input
                            type="text"
                            value={(block as any).heading || ''}
                            onChange={(e) =>
                              handleFieldChange(index, 'heading', e.target.value)
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Intake Subheading
                          </label>
                          <input
                            type="text"
                            value={(block as any).subheading || ''}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                'subheading',
                                e.target.value
                              )
                            }
                            className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* TOP BAR / NAV / OTHER EDIT */}
                  {block.type === 'top-bar' && (
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Announcement Banner Text
                      </label>
                      <input
                        type="text"
                        value={(block as any).badgeText || ''}
                        onChange={(e) =>
                          handleFieldChange(index, 'badgeText', e.target.value)
                        }
                        className="w-full bg-[#161A22] border border-[#272D3B] rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  )}

                  {/* Quick block meta indicator */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1 border-t border-[#1F242E]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Live synced with real-time compiler</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
