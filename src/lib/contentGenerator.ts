import { Platform, GeneratedContent, ReasoningStep } from '@/types/content';
import { platformConfigs } from './platforms';

const generateReasoningSteps = (platform: Platform, intent: string): ReasoningStep[] => {
  const config = platformConfigs[platform];
  
  return [
    {
      id: `${platform}-analysis`,
      type: 'analysis',
      title: 'Analyzing Intent',
      description: `Understanding core message and key themes from your input`,
      status: 'pending',
      insights: [
        'Identified primary topic and angle',
        'Extracted key value propositions',
        'Detected emotional tone signals'
      ]
    },
    {
      id: `${platform}-adaptation`,
      type: 'adaptation',
      title: `Adapting for ${config.name}`,
      description: `Restructuring content for ${config.tone.toLowerCase()} delivery`,
      status: 'pending',
      insights: config.constraints
    },
    {
      id: `${platform}-optimization`,
      type: 'optimization',
      title: 'Optimizing Engagement',
      description: 'Enhancing hooks, calls-to-action, and platform-specific elements',
      status: 'pending',
      insights: [
        'Strengthened opening hook',
        'Added strategic formatting',
        'Optimized for algorithm visibility'
      ]
    },
    {
      id: `${platform}-validation`,
      type: 'validation',
      title: 'Validating Output',
      description: `Ensuring compliance with ${config.name} best practices`,
      status: 'pending',
      insights: [
        `Character count: within ${config.maxLength} limit`,
        'Tone alignment verified',
        'Accessibility check passed'
      ]
    }
  ];
};

const contentTemplates: Record<Platform, (intent: string) => string> = {
  twitter: (intent) => {
    const sentences = intent.split(/[.!?]+/).filter(Boolean);
    const hook = sentences[0]?.trim() || intent.slice(0, 50);
    return `${hook}.\n\nHere's what most people miss:\n\n→ The power lies in simplicity\n→ Consistency beats perfection\n→ Start before you're ready\n\nThe best time to start was yesterday.\nThe second best time is now.\n\n#Growth #Mindset`;
  },
  linkedin: (intent) => {
    const topic = intent.slice(0, 100);
    return `I've been thinking about ${topic.toLowerCase()}...\n\nAnd here's what I've realized:\n\nThe most successful people I know share one trait.\n\nThey don't wait for perfect conditions.\nThey create them.\n\n📌 Three principles that changed my perspective:\n\n1️⃣ Clarity over complexity\nEvery breakthrough started with a simple question.\n\n2️⃣ Progress over perfection\nShipping beats polishing every time.\n\n3️⃣ Connection over competition\nThe network effect is real.\n\n—\n\nWhat's one insight that transformed how you work?\n\nDrop it in the comments. 👇`;
  },
  instagram: (intent) => {
    return `✨ This is your sign.\n\n${intent.slice(0, 150)}...\n\nSometimes the smallest step forward creates the biggest momentum.\n\n💫 Save this for when you need a reminder.\n\n.\n.\n.\n#Motivation #GrowthMindset #DailyInspiration #Success #Mindfulness`;
  },
  blog: (intent) => {
    const title = intent.slice(0, 80);
    return `# ${title}\n\n**TL;DR:** This post explores the core principles that drive meaningful results and how you can apply them starting today.\n\n---\n\n## The Challenge We All Face\n\nIn a world of infinite options, clarity becomes your competitive advantage. ${intent}\n\n## Why This Matters Now\n\nThe landscape has shifted. What worked before may not work tomorrow. Here's how to adapt:\n\n### 1. Start With First Principles\n\nBefore adding complexity, strip away assumptions. Ask yourself:\n- What is the core problem?\n- What would success look like?\n- What's the simplest path forward?\n\n### 2. Build in Public\n\nTransparency creates trust. Document your journey, share your learnings, and invite feedback early.\n\n### 3. Iterate Relentlessly\n\nPerfection is the enemy of progress. Ship, learn, improve, repeat.\n\n## Taking Action\n\nKnowledge without action is just entertainment. Here's your next step:\n\n1. Identify one area where you're overcomplicating things\n2. Simplify it to its essence\n3. Take one small action today\n\n---\n\n*What resonated with you? I'd love to hear your thoughts.*`;
  }
};

export const generateContentForPlatform = (
  platform: Platform,
  intent: string
): GeneratedContent => {
  const content = contentTemplates[platform](intent);
  const config = platformConfigs[platform];
  
  return {
    id: `content-${platform}-${Date.now()}`,
    platform,
    content,
    characterCount: content.length,
    hashtags: content.match(/#\w+/g) || [],
    isEdited: false,
    reasoning: generateReasoningSteps(platform, intent),
    confidence: 0.85 + Math.random() * 0.12,
    status: 'generating'
  };
};

export const simulateGeneration = async (
  content: GeneratedContent,
  onStepComplete: (stepId: string) => void
): Promise<GeneratedContent> => {
  const steps = content.reasoning;
  
  for (let i = 0; i < steps.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
    onStepComplete(steps[i].id);
  }
  
  return { ...content, status: 'ready' };
};
