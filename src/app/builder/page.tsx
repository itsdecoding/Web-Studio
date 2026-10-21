'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { WebsiteProject } from '@/lib/studio/types';
import { compileWebsiteHtml } from '@/lib/studio/compiler';
import { BuilderHeader } from '@/components/builder/BuilderHeader';
import { ControlsSidebar } from '@/components/builder/ControlsSidebar';
import { DeviceCanvas } from '@/components/builder/DeviceCanvas';
import { PublishModal } from '@/components/builder/PublishModal';

const DEFAULT_PROJECT: WebsiteProject = {
  businessName: 'Perfect Smile Dental Clinic',
  niche: 'dental',
  templateId: 'tactile-sheet',
  slug: 'perfect-smile',
  headlineLine1: 'PERFECT SMILE',
  headlineLine2: 'DENTAL CLINIC',
  subheadline: 'Microscopic precision root canal, CAD/CAM ceramic crowns, and laser whitening with strict sterilization protocols.',
  phone: '+91 98765 43210',
  whatsappNumber: '919876543210',
  city: 'Hadapsar, Pune',
  address: 'Shop 4, Landmark Arcade, Hadapsar-Manjri Road, Pune',
  doctorOrOwnerName: 'Dr. Amit Sharma',
  doctorOrOwnerTitle: 'Lead Implantologist & Dental Surgeon',
  rating: 4.9,
  reviewCount: 194,
  services: [
    {
      title: 'Microscopic Root Canal',
      description: 'Single-sitting painless root canal under surgical magnification.',
    },
    {
      title: 'Zirconia Ceramic Crowns',
      description: 'CAD/CAM engineered Zirconia crowns with natural enamel translucency.',
    },
    {
      title: 'Laser Teeth Whitening',
      description: 'In-office cold light laser brightening up to 8 shades in 45 minutes.',
    },
    {
      title: 'Guided Dental Implants',
      description: 'Computer-guided titanium implants designed for lifelong chewing stability.',
    },
    {
      title: 'Clear Invisible Aligners',
      description: 'Custom orthodontic aligners for straight teeth without metal braces.',
    },
    {
      title: 'Gentle Pediatric Dentistry',
      description: 'Zero-fear checkups, preventive sealants, and cavity fillings for kids.',
    },
  ],
};

function BuilderWorkspace() {
  const searchParams = useSearchParams();
  const [project, setProject] = useState<WebsiteProject>(DEFAULT_PROJECT);
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [isSaving, setIsSaving] = useState(false);
  const [isAiDrafting, setIsAiDrafting] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  // Handle Gemini AI 1-Click Auto-Draft
  const handleAiAutoDraft = async () => {
    setIsAiDrafting(true);
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
      if (res.ok && json.success && json.data) {
        const ai = json.data;
        setProject((prev) => ({
          ...prev,
          headlineLine1: ai.headlineLine1,
          headlineLine2: ai.headlineLine2,
          subheadline: ai.subheadline,
          services: ai.services,
          doctorOrOwnerName: ai.doctorOrOwnerName,
          doctorOrOwnerTitle: ai.doctorOrOwnerTitle,
          templateId: ai.recommendedTemplateId || prev.templateId,
        }));
      }
    } catch {
      // ignore
    } finally {
      setIsAiDrafting(false);
    }
  };

  // Initialize from search params or localStorage
  useEffect(() => {
    const slugParam = searchParams.get('slug');
    const bizParam = searchParams.get('biz');
    const nicheParam = searchParams.get('niche');
    const autoDraftParam = searchParams.get('autodraft');

    if (slugParam) {
      // Fetch saved project from Supabase
      fetch(`/api/studio/projects?slug=${encodeURIComponent(slugParam)}`)
        .then((r) => r.json())
        .then((json) => {
          if (json.success && json.project) {
            setProject(json.project);
          } else if (bizParam || nicheParam) {
            setProject((prev) => ({
              ...prev,
              businessName: bizParam || prev.businessName,
              niche: nicheParam || prev.niche,
              slug: slugParam,
              headlineLine1: bizParam ? bizParam.toUpperCase() : prev.headlineLine1,
            }));
          }
        })
        .catch(() => {});
    } else if (bizParam || nicheParam) {
      setProject((prev) => ({
        ...prev,
        businessName: bizParam || prev.businessName,
        niche: nicheParam || prev.niche,
        slug: (bizParam || 'website').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        headlineLine1: bizParam ? bizParam.toUpperCase() : prev.headlineLine1,
      }));
    } else {
      // Check for saved local draft
      try {
        const saved = localStorage.getItem('pinsite_studio_active_project');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.businessName) {
            setProject(parsed);
          }
        }
      } catch (e) {
        // ignore storage parse error
      }
    }
  }, [searchParams]);

  // Real-time Hot Compiler (< 1ms execution)
  const compiled = useMemo(() => {
    return compileWebsiteHtml(project);
  }, [project]);

  // Handle Project Mutations
  const handleProjectChange = (updated: Partial<WebsiteProject>) => {
    setProject((prev) => {
      const next = { ...prev, ...updated };
      // Keep slug in sync if business name changed and slug wasn't manually edited
      if (updated.businessName && !updated.slug) {
        const autoSlug = updated.businessName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        if (autoSlug) {
          next.slug = autoSlug;
        }
      }
      return next;
    });
  };

  // Save Draft locally
  const handleSaveDraft = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('pinsite_studio_active_project', JSON.stringify(project));
      setTimeout(() => setIsSaving(false), 500);
    } catch (e) {
      setIsSaving(false);
    }
  };

  // Publish Live to Supabase
  const handlePublishLive = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/studio/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      // Also cache locally
      localStorage.setItem('pinsite_studio_active_project', JSON.stringify(project));
    } catch {
      // ignore
    } finally {
      setIsSaving(false);
      setPublishModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-slate-100 flex flex-col overflow-hidden">
      {/* Top Header */}
      <BuilderHeader
        businessName={project.businessName}
        slug={project.slug || 'perfect-smile'}
        onSlugChange={(slug) => handleProjectChange({ slug })}
        device={device}
        onDeviceChange={setDevice}
        onSaveDraft={handleSaveDraft}
        onPublishLive={handlePublishLive}
        onAiAutoDraft={handleAiAutoDraft}
        isSaving={isSaving}
        isAiDrafting={isAiDrafting}
      />

      {/* Split-Screen Studio Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: 420px Controls Sidebar */}
        <ControlsSidebar
          project={project}
          onChange={handleProjectChange}
        />

        {/* Right Side: Interactive Device Canvas */}
        <DeviceCanvas
          device={device}
          compiledHtml={compiled.html}
          executionMs={compiled.executionMs}
        />
      </div>

      {/* Publish Live Modal */}
      <PublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        businessName={project.businessName}
        slug={project.slug || 'perfect-smile'}
        phone={project.whatsappNumber || project.phone}
      />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07080A] flex items-center justify-center text-xs font-mono text-slate-400">Loading Studio Builder...</div>}>
      <BuilderWorkspace />
    </Suspense>
  );
}
