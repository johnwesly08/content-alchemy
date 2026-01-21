import { PlatformConfig, Platform } from '@/types/content';

export const platformConfigs: Record<Platform, PlatformConfig> = {
  twitter: {
    id: 'twitter',
    name: 'Twitter / X',
    icon: '𝕏',
    maxLength: 280,
    tone: 'Concise, punchy, conversational',
    constraints: [
      'Maximum 280 characters',
      'Hashtags count toward limit',
      'Thread-friendly structure'
    ]
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'in',
    maxLength: 3000,
    tone: 'Professional, insightful, credible',
    constraints: [
      'Hook in first 2 lines',
      'Line breaks for readability',
      'Professional terminology'
    ]
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    icon: '📷',
    maxLength: 2200,
    tone: 'Visual-first, authentic, engaging',
    constraints: [
      'Caption supports visual content',
      'Emoji usage encouraged',
      'Hashtags in comments optional'
    ]
  },
  blog: {
    id: 'blog',
    name: 'Blog Post',
    icon: '✍️',
    maxLength: 10000,
    tone: 'In-depth, structured, authoritative',
    constraints: [
      'Clear headline structure',
      'SEO-optimized intro',
      'Scannable sections'
    ]
  }
};

export const getPlatformConfig = (platform: Platform): PlatformConfig => {
  return platformConfigs[platform];
};
