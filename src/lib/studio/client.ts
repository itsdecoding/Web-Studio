/**
 * Pinsite Web Studio: Universal Client SDK
 * Drop-in SDK for external CRMs, Agency OS, or scraping bots
 * to generate high-ticket websites and receive the Dual-Link return.
 */

import { GenerateSiteParams, GenerateSiteResult } from './generator';

export interface StudioClientConfig {
  apiKey: string;
  baseUrl?: string;
}

export class PinsiteStudioClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: StudioClientConfig) {
    if (!config.apiKey) {
      throw new Error('PinsiteStudioClient requires an apiKey ("pks_live_...")');
    }
    this.apiKey = config.apiKey;
    this.baseUrl = (config.baseUrl || 'https://studio.pinsite.pro').replace(/\/+$/, '');
  }

  async generate(params: GenerateSiteParams): Promise<GenerateSiteResult> {
    const url = `${this.baseUrl}/api/generate`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Studio-Api-Key': this.apiKey,
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || `Generation failed with HTTP ${res.status}`);
    }

    return data;
  }
}
