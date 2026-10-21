'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  Key,
  Plus,
  Copy,
  Check,
  Trash2,
  ShieldAlert,
  Terminal,
  Activity,
  CheckCircle2,
  X,
  RefreshCw,
  Code2,
} from 'lucide-react';

interface ApiKeyItem {
  id: string;
  name: string;
  maskedKey: string;
  createdAt: string;
  lastUsedAt: string | null;
  usageCount: number;
  status: 'active' | 'revoked';
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Key creation state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [createdRawKey, setCreatedRawKey] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedRawKey, setCopiedRawKey] = useState(false);

  // Documentation code tab state
  const [codeTab, setCodeTab] = useState<'curl' | 'js' | 'python'>('curl');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/studio/keys');
      const data = await res.json();
      if (data.success && Array.isArray(data.keys)) {
        setKeys(data.keys);
      }
    } catch (err) {
      console.error('Error fetching API keys:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const totalUsage = useMemo(() => {
    return keys.reduce((acc, k) => acc + (k.usageCount || 0), 0);
  }, [keys]);

  const activeCount = useMemo(() => {
    return keys.filter((k) => k.status === 'active').length;
  }, [keys]);

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/studio/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName.trim() }),
      });
      const data = await res.json();
      if (data.success && data.rawKey) {
        setCreatedRawKey(data.rawKey);
        fetchKeys();
      } else {
        alert('Failed to generate key: ' + (data.error || 'Unknown error'));
      }
    } catch {
      alert('Error generating key');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevokeKey = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to revoke key "${name}"? It will immediately stop accepting API requests.`)) {
      return;
    }

    try {
      const res = await fetch('/api/studio/keys', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'revoke' }),
      });
      const data = await res.json();
      if (data.success) {
        setKeys((prev) =>
          prev.map((k) => (k.id === id ? { ...k, status: 'revoked' } : k))
        );
      }
    } catch {
      alert('Error revoking key');
    }
  };

  const handleDeleteKey = async (id: string, name: string) => {
    if (!confirm(`Permanently delete key "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch('/api/studio/keys', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setKeys((prev) => prev.filter((k) => k.id !== id));
      }
    } catch {
      alert('Error deleting key');
    }
  };

  const sampleKeyDisplay = keys[0]?.maskedKey || 'pks_live_example123456789';

  const codeSnippets = {
    curl: `curl -X POST https://studio.pinsite.pro/api/generate \\
  -H "Content-Type: application/json" \\
  -H "X-Studio-Api-Key: ${sampleKeyDisplay}" \\
  -d '{
    "businessName": "Apex Dental Studio",
    "niche": "dental",
    "city": "Pune",
    "phone": "+91 98765 43210"
  }'`,
    js: `const response = await fetch("https://studio.pinsite.pro/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Studio-Api-Key": "${sampleKeyDisplay}",
  },
  body: JSON.stringify({
    businessName: "Apex Dental Studio",
    niche: "dental",
    city: "Pune",
    phone: "+91 98765 43210",
  }),
});

const data = await response.json();
console.log("Public URL:", data.public_url);
console.log("Studio Editor:", data.editor_url);`,
    python: `import requests

url = "https://studio.pinsite.pro/api/generate"
headers = {
    "Content-Type": "application/json",
    "X-Studio-Api-Key": "${sampleKeyDisplay}",
}
payload = {
    "businessName": "Apex Dental Studio",
    "niche": "dental",
    "city": "Pune",
    "phone": "+91 98765 43210",
}

res = requests.post(url, json=payload, headers=headers)
data = res.json()
print("Live Website:", data["public_url"])
print("Editor URL:", data["editor_url"])`,
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(codeSnippets[codeTab]);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-slate-100 flex flex-col font-sans selection:bg-orange-500/30">
      {/* Top Navbar */}
      <header className="border-b border-[#1E222A] bg-[#0C0E12]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#161922] text-xs font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Studio Home</span>
          </Link>
          <div className="h-4 w-px bg-[#23262D]" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white leading-tight">
                API Key Management Center
              </h1>
              <p className="text-[11px] text-slate-400">
                Generate secure keys to integrate external CRMs or sell automated site creation
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setNewKeyName('');
            setCreatedRawKey(null);
            setCreateModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#F95721] to-[#FF6B35] hover:opacity-95 text-xs font-bold text-white shadow-md shadow-orange-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Generate API Key</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 flex flex-col gap-8">
        {/* KPI Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="bg-[#0E1015] border border-[#1E222A] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Total Keys
              </p>
              <h3 className="text-2xl font-black text-white mt-1">{keys.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#161922] border border-[#23262D] flex items-center justify-center text-amber-400">
              <Key className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#0E1015] border border-[#1E222A] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Active Keys
              </p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">{activeCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#0E1015] border border-[#1E222A] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                API Calls Served
              </p>
              <h3 className="text-2xl font-black text-white mt-1">{totalUsage}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#161922] border border-[#23262D] flex items-center justify-center text-orange-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#0E1015] border border-[#1E222A] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Dual-Link Bridge
              </p>
              <h3 className="text-base font-bold text-white mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ready</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Terminal className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* API Keys Table */}
        <div className="bg-[#0D0F14] border border-[#1E222A] rounded-2xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-[#1E222A] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Active Secret Keys</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Never share secret keys in public GitHub repositories or client-side bundles.
              </p>
            </div>
            <button
              onClick={fetchKeys}
              className="p-1.5 rounded-lg bg-[#14171E] border border-[#23262D] text-slate-400 hover:text-white"
              title="Refresh keys"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-orange-400' : ''}`} />
            </button>
          </div>

          {loading ? (
            <div className="py-16 text-center text-xs font-mono text-slate-400 flex flex-col items-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-orange-400" />
              <span>Loading API keys...</span>
            </div>
          ) : keys.length === 0 ? (
            <div className="py-14 text-center px-4 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#161922] border border-[#23262D] flex items-center justify-center text-amber-400">
                <Key className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">No API Keys Generated</h4>
              <p className="text-xs text-slate-400 max-w-sm">
                Generate an API key to allow external scripts or Agency OS to automatically trigger high-status website generations.
              </p>
              <button
                onClick={() => {
                  setNewKeyName('');
                  setCreatedRawKey(null);
                  setCreateModalOpen(true);
                }}
                className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F95721] hover:bg-[#E04612] text-xs font-bold text-white shadow-md shadow-orange-600/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Generate Key</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#1A1E26] overflow-x-auto">
              {keys.map((k) => (
                <div
                  key={k.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#12151C]/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{k.name}</h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          k.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}
                      >
                        {k.status === 'active' ? 'Active' : 'Revoked'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                      <code className="text-xs font-mono text-slate-300 bg-[#161922] border border-[#242834] px-2.5 py-1 rounded-md">
                        {k.maskedKey}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(k.maskedKey);
                          setCopiedKeyId(k.id);
                          setTimeout(() => setCopiedKeyId(null), 2000);
                        }}
                        className="text-slate-400 hover:text-white p-1 rounded"
                        title="Copy key prefix"
                      >
                        {copiedKeyId === k.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 pt-0.5">
                      Created on {new Date(k.createdAt).toLocaleDateString()} • {k.usageCount || 0} calls served
                      {k.lastUsedAt && ` • Last used ${new Date(k.lastUsedAt).toLocaleDateString()}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {k.status === 'active' && (
                      <button
                        onClick={() => handleRevokeKey(k.id, k.name)}
                        className="px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-semibold text-amber-400 transition-colors"
                      >
                        Revoke
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteKey(k.id, k.name)}
                      className="p-1.5 rounded-lg border border-[#23262D] text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete key"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Developer Integration Guide */}
        <div className="bg-[#0D0F14] border border-[#1E222A] rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Dual-Link Website Generation API</h3>
                <p className="text-xs text-slate-400">
                  Trigger 1-click high-ticket generation and receive both the live prospect link and studio editor.
                </p>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#14171E] border border-[#23262D] rounded-lg p-0.5 text-xs font-semibold">
              <button
                onClick={() => setCodeTab('curl')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  codeTab === 'curl' ? 'bg-[#F95721] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                cURL
              </button>
              <button
                onClick={() => setCodeTab('js')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  codeTab === 'js' ? 'bg-[#F95721] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                JavaScript
              </button>
              <button
                onClick={() => setCodeTab('python')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  codeTab === 'python' ? 'bg-[#F95721] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Python
              </button>
            </div>
          </div>

          {/* Snippet box */}
          <div className="relative rounded-xl bg-[#090A0D] border border-[#1E222A] p-4 font-mono text-xs text-slate-300 overflow-x-auto">
            <button
              onClick={handleCopySnippet}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#161922] border border-[#252A36] text-[11px] font-sans font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="pr-16">{codeSnippets[codeTab]}</pre>
          </div>

          {/* Response Preview */}
          <div className="space-y-1.5 pt-2">
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
              Response (Dual-Link Return)
            </label>
            <div className="p-3.5 rounded-xl bg-[#090A0D] border border-[#1E222A] font-mono text-xs text-emerald-400">
              <pre>{`{
  "success": true,
  "slug": "apex-dental-studio",
  "public_url": "https://pinsite.pro/apex-dental-studio",
  "editor_url": "https://studio.pinsite.pro/builder?slug=apex-dental-studio"
}`}</pre>
            </div>
          </div>
        </div>
      </main>

      {/* Generate API Key Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-[#0D0F14] border border-[#23262D] p-6 shadow-2xl relative space-y-5">
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#181B20]"
            >
              <X className="w-4 h-4" />
            </button>

            {!createdRawKey ? (
              <form onSubmit={handleCreateKey} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Generate Secret API Key</h3>
                    <p className="text-xs text-slate-400">
                      Creates a dedicated access token for automated website creation.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Key Name / Description *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Agency OS Auto-Pilot, Zapier CRM"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full bg-[#14171E] border border-[#23262D] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 font-medium"
                    autoFocus
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#23262D] text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#161920]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || !newKeyName.trim()}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#F95721] hover:bg-[#E04612] text-xs font-bold text-white shadow-md shadow-orange-600/20 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Generating...' : 'Create Key'}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Key Generated Successfully!</h3>
                    <p className="text-xs text-slate-400">
                      Copy your secret key now. You will not see it again.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-300">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <p>
                    For security, Pinsite only hashes this key. If you lose this key, you will have to revoke it and generate a new one.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                    Secret Key
                  </label>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#14171E] border border-[#23262D]">
                    <code className="text-xs font-mono text-orange-400 break-all select-all flex-1">
                      {createdRawKey}
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(createdRawKey);
                        setCopiedRawKey(true);
                        setTimeout(() => setCopiedRawKey(false), 2000);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#F95721] hover:bg-[#E04612] text-xs font-bold text-white shrink-0 shadow-sm"
                    >
                      {copiedRawKey ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setCreateModalOpen(false);
                      setCreatedRawKey(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#161922] hover:bg-[#1E222D] border border-[#262A36] text-xs font-bold text-white transition-colors"
                  >
                    I have saved this key safely
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
