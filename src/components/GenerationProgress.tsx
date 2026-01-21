import { GeneratedContent, ReasoningStep } from '@/types/content';
import { platformConfigs } from '@/lib/platforms';
import { Check, Loader2, Circle, Brain, Zap, Target, Shield } from 'lucide-react';

interface GenerationProgressProps {
  content: GeneratedContent[];
  intent: string;
}

const stepIcons: Record<ReasoningStep['type'], React.ReactNode> = {
  analysis: <Brain className="w-4 h-4" />,
  adaptation: <Zap className="w-4 h-4" />,
  optimization: <Target className="w-4 h-4" />,
  validation: <Shield className="w-4 h-4" />
};

export function GenerationProgress({ content, intent }: GenerationProgressProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-pulse-subtle">
          <Loader2 className="w-4 h-4 text-primary animate-spin" />
          <span className="text-sm font-medium text-primary">Generating Content</span>
        </div>
        <h2 className="text-2xl font-semibold text-foreground">
          Crafting platform-optimized content
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          "{intent.slice(0, 80)}{intent.length > 80 ? '...' : ''}"
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {content.map((item, index) => {
          const platform = platformConfigs[item.platform];
          const completedSteps = item.reasoning.filter(s => s.status === 'complete').length;
          const progress = (completedSteps / item.reasoning.length) * 100;
          
          return (
            <div 
              key={item.id}
              className="elevated-surface rounded-2xl p-6 space-y-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Platform Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{platform.name}</h3>
                    <p className="text-xs text-muted-foreground">{platform.tone}</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-primary">
                  {Math.round(progress)}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Reasoning Steps */}
              <div className="space-y-2">
                {item.reasoning.map((step) => (
                  <div 
                    key={step.id}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                      step.status === 'complete' 
                        ? 'bg-success/5 border border-success/20' 
                        : step.status === 'processing'
                        ? 'bg-primary/5 border border-primary/20'
                        : 'bg-muted/30 border border-transparent'
                    }`}
                  >
                    <div className={`mt-0.5 ${
                      step.status === 'complete' 
                        ? 'text-success' 
                        : step.status === 'processing'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}>
                      {step.status === 'complete' ? (
                        <Check className="w-4 h-4" />
                      ) : step.status === 'processing' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`${
                          step.status === 'complete' || step.status === 'processing'
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        } text-sm font-medium`}>
                          {step.title}
                        </span>
                        <span className="text-muted-foreground">
                          {stepIcons[step.type]}
                        </span>
                      </div>
                      {(step.status === 'complete' || step.status === 'processing') && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
