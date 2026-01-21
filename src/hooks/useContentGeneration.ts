import { useState, useCallback } from 'react';
import { Platform, GeneratedContent, ContentSession } from '@/types/content';
import { generateContentForPlatform, simulateGeneration } from '@/lib/contentGenerator';

type SessionStatus = 'input' | 'generating' | 'review' | 'complete';

export function useContentGeneration() {
  const [status, setStatus] = useState<SessionStatus>('input');
  const [intent, setIntent] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);

  const startGeneration = useCallback(async (intentText: string, platforms: Platform[]) => {
    setIntent(intentText);
    setStatus('generating');

    // Generate initial content for all platforms
    const initialContent = platforms.map(platform => 
      generateContentForPlatform(platform, intentText)
    );
    setGeneratedContent(initialContent);

    // Simulate generation for each platform
    for (let i = 0; i < initialContent.length; i++) {
      const content = initialContent[i];
      
      // Update step statuses one by one
      for (let stepIndex = 0; stepIndex < content.reasoning.length; stepIndex++) {
        // Mark current step as processing
        setGeneratedContent(prev => prev.map((c, idx) => {
          if (idx !== i) return c;
          return {
            ...c,
            reasoning: c.reasoning.map((step, sIdx) => ({
              ...step,
              status: sIdx === stepIndex ? 'processing' : sIdx < stepIndex ? 'complete' : 'pending'
            }))
          };
        }));

        await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300));

        // Mark step as complete
        setGeneratedContent(prev => prev.map((c, idx) => {
          if (idx !== i) return c;
          return {
            ...c,
            reasoning: c.reasoning.map((step, sIdx) => ({
              ...step,
              status: sIdx <= stepIndex ? 'complete' : 'pending'
            }))
          };
        }));
      }

      // Mark content as ready
      setGeneratedContent(prev => prev.map((c, idx) => {
        if (idx !== i) return c;
        return { ...c, status: 'ready' };
      }));
    }

    setStatus('review');
  }, []);

  const approveContent = useCallback((id: string) => {
    setGeneratedContent(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'approved' } : c
    ));
  }, []);

  const editContent = useCallback((id: string, newContent: string) => {
    setGeneratedContent(prev => prev.map(c => 
      c.id === id ? { 
        ...c, 
        isEdited: true, 
        editedContent: newContent,
        status: 'modified'
      } : c
    ));
  }, []);

  const regenerateContent = useCallback(async (id: string) => {
    const content = generatedContent.find(c => c.id === id);
    if (!content) return;

    // Reset content status
    setGeneratedContent(prev => prev.map(c => 
      c.id === id ? { 
        ...c, 
        status: 'generating',
        isEdited: false,
        editedContent: undefined,
        reasoning: c.reasoning.map(s => ({ ...s, status: 'pending' as const }))
      } : c
    ));

    // Simulate regeneration
    const idx = generatedContent.findIndex(c => c.id === id);
    const newContent = generateContentForPlatform(content.platform, intent);
    
    for (let stepIndex = 0; stepIndex < newContent.reasoning.length; stepIndex++) {
      setGeneratedContent(prev => prev.map((c, i) => {
        if (i !== idx) return c;
        return {
          ...c,
          reasoning: c.reasoning.map((step, sIdx) => ({
            ...step,
            status: sIdx === stepIndex ? 'processing' : sIdx < stepIndex ? 'complete' : 'pending'
          }))
        };
      }));

      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300));

      setGeneratedContent(prev => prev.map((c, i) => {
        if (i !== idx) return c;
        return {
          ...c,
          reasoning: c.reasoning.map((step, sIdx) => ({
            ...step,
            status: sIdx <= stepIndex ? 'complete' : 'pending'
          }))
        };
      }));
    }

    setGeneratedContent(prev => prev.map((c, i) => {
      if (i !== idx) return c;
      return { 
        ...newContent, 
        id: c.id,
        status: 'ready',
        reasoning: newContent.reasoning.map(s => ({ ...s, status: 'complete' as const }))
      };
    }));
  }, [generatedContent, intent]);

  const approveAll = useCallback(() => {
    setGeneratedContent(prev => prev.map(c => ({ ...c, status: 'approved' })));
  }, []);

  const reset = useCallback(() => {
    setStatus('input');
    setIntent('');
    setGeneratedContent([]);
  }, []);

  return {
    status,
    intent,
    generatedContent,
    startGeneration,
    approveContent,
    editContent,
    regenerateContent,
    approveAll,
    reset
  };
}
