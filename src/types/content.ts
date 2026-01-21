export type Platform = 'twitter' | 'linkedin' | 'instagram' | 'blog';

export interface PlatformConfig {
  id: Platform;
  name: string;
  icon: string;
  maxLength: number;
  tone: string;
  constraints: string[];
}

export interface ContentIntent {
  id: string;
  text: string;
  context?: string;
  targetPlatforms: Platform[];
  createdAt: Date;
}

export interface ReasoningStep {
  id: string;
  type: 'analysis' | 'adaptation' | 'optimization' | 'validation';
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'complete';
  insights?: string[];
}

export interface GeneratedContent {
  id: string;
  platform: Platform;
  content: string;
  characterCount: number;
  hashtags?: string[];
  isEdited: boolean;
  editedContent?: string;
  reasoning: ReasoningStep[];
  confidence: number;
  status: 'generating' | 'ready' | 'approved' | 'modified';
}

export interface ContentSession {
  id: string;
  intent: ContentIntent;
  generatedContent: GeneratedContent[];
  status: 'input' | 'generating' | 'review' | 'complete';
  createdAt: Date;
}
