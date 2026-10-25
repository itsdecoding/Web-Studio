/**
 * Pinsite Web Studio: Master Compiler & Block Engine Entrypoint
 * Phase 5.1: Modular Block-Based Website Compiler
 * Replaces monolithic string templates with composable JSON block architecture.
 */

import { WebsiteProject, CompileHtmlResult } from './types';
import { getTemplate } from './templates/catalog';
import { resolveVaultNiche } from './vault';
import {
  generateDefaultBlocks,
  compileBlocksToHtml,
  resolveThemeTokens,
  renderBlock,
} from './blocks/engine';
import { WebsiteBlock } from './blocks/types';

export {
  generateDefaultBlocks,
  compileBlocksToHtml,
  resolveThemeTokens,
  renderBlock,
};
export type { WebsiteBlock };

export function compileWebsiteHtml(project: WebsiteProject): CompileHtmlResult {
  const template = getTemplate(project.templateId);
  const vault = resolveVaultNiche(project.niche || 'general');
  const themeTokens = resolveThemeTokens(template, project.primaryColorOverride);

  // If project has custom blocks configured, use them; otherwise construct default blocks
  const blocks: WebsiteBlock[] =
    project.blocks && Array.isArray(project.blocks) && project.blocks.length > 0
      ? (project.blocks as WebsiteBlock[])
      : generateDefaultBlocks(project, vault);

  return compileBlocksToHtml(blocks, project, themeTokens);
}
