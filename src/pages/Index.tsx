import { Header } from '@/components/Header';
import { IntentInput } from '@/components/IntentInput';
import { GenerationProgress } from '@/components/GenerationProgress';
import { ContentReview } from '@/components/ContentReview';
import { useContentGeneration } from '@/hooks/useContentGeneration';

const Index = () => {
  const {
    status,
    intent,
    generatedContent,
    startGeneration,
    approveContent,
    editContent,
    regenerateContent,
    approveAll,
    reset
  } = useContentGeneration();

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30">
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
        </div>
      </div>

      <Header />
      
      <main className="relative pt-24 pb-16 px-6">
        <div className="container mx-auto">
          {/* Input State */}
          {status === 'input' && (
            <IntentInput 
              onSubmit={startGeneration}
              isProcessing={false}
            />
          )}

          {/* Generating State */}
          {status === 'generating' && (
            <GenerationProgress 
              content={generatedContent}
              intent={intent}
            />
          )}

          {/* Review State */}
          {(status === 'review' || status === 'complete') && (
            <ContentReview
              content={generatedContent}
              intent={intent}
              onApprove={approveContent}
              onEdit={editContent}
              onRegenerate={regenerateContent}
              onApproveAll={approveAll}
              onStartOver={reset}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>ContentFlow AI • Intelligent Content Automation</span>
            <div className="flex items-center gap-4">
              <span className="ai-indicator">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                AI-Powered
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
