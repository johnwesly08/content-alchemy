import { useState } from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Platform } from '@/types/content';
import { PlatformSelector } from './PlatformSelector';

interface IntentInputProps {
  onSubmit: (intent: string, platforms: Platform[]) => void;
  isProcessing: boolean;
}

const examplePrompts = [
  "Share insights about building products that users love",
  "Announce our new sustainability initiative",
  "Reflect on lessons learned from scaling a startup",
  "Discuss the future of remote work and collaboration"
];

export function IntentInput({ onSubmit, isProcessing }: IntentInputProps) {
  const [intent, setIntent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['twitter', 'linkedin']);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (intent.trim() && selectedPlatforms.length > 0) {
      onSubmit(intent.trim(), selectedPlatforms);
    }
  };

  const handleExampleClick = (example: string) => {
    setIntent(example);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Content Engine</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          What would you like to share?
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Describe your idea or message. We'll adapt it intelligently for each platform.
        </p>
      </div>

      {/* Input Area */}
      <div 
        className={`relative rounded-2xl transition-all duration-300 ${
          isFocused 
            ? 'ring-2 ring-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.15)]' 
            : 'ring-1 ring-border'
        }`}
      >
        <div className="elevated-surface rounded-2xl overflow-hidden">
          <textarea
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your content idea, announcement, or message..."
            className="w-full h-40 p-6 bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none text-lg"
          />
          
          {/* Platform Selector */}
          <div className="px-6 py-4 border-t border-border/50">
            <PlatformSelector 
              selected={selectedPlatforms} 
              onChange={setSelectedPlatforms} 
            />
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-muted/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lightbulb className="w-4 h-4" />
              <span>Be specific about your audience and goals for better results</span>
            </div>
            <Button 
              onClick={handleSubmit}
              disabled={!intent.trim() || selectedPlatforms.length === 0 || isProcessing}
              variant="glow"
              size="lg"
              className="gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Generate Content
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Example Prompts */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">Try an example:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {examplePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(prompt)}
              className="px-4 py-2 text-sm rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors duration-200 border border-border/50"
            >
              {prompt.length > 40 ? prompt.slice(0, 40) + '...' : prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
