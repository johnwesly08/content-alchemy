import { useState } from 'react';
import { GeneratedContent } from '@/types/content';
import { platformConfigs } from '@/lib/platforms';
import { 
  Check, 
  Edit3, 
  Copy, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  User,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContentCardProps {
  content: GeneratedContent;
  onApprove: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
  onRegenerate: (id: string) => void;
}

export function ContentCard({ content, onApprove, onEdit, onRegenerate }: ContentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(content.editedContent || content.content);
  const [showReasoning, setShowReasoning] = useState(false);
  const [copied, setCopied] = useState(false);

  const platform = platformConfigs[content.platform];
  const displayContent = content.isEdited ? content.editedContent! : content.content;
  const isOverLimit = displayContent.length > platform.maxLength;

  const handleSaveEdit = () => {
    onEdit(content.id, editedText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedText(content.editedContent || content.content);
    setIsEditing(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confidencePercent = Math.round(content.confidence * 100);

  return (
    <div className="elevated-surface rounded-2xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
            {platform.icon}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{platform.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xs ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                {displayContent.length} / {platform.maxLength} chars
              </span>
              {isOverLimit && (
                <AlertCircle className="w-3 h-3 text-destructive" />
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* AI/Human Indicator */}
          {content.isEdited ? (
            <div className="human-indicator">
              <User className="w-3 h-3" />
              <span>Modified</span>
            </div>
          ) : (
            <div className="ai-indicator">
              <Sparkles className="w-3 h-3" />
              <span>{confidencePercent}% match</span>
            </div>
          )}
          
          {/* Status Badge */}
          {content.status === 'approved' && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
              <Check className="w-3 h-3" />
              Approved
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full h-48 p-4 rounded-xl bg-muted/50 border border-border text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div 
            className="prose prose-invert max-w-none text-foreground whitespace-pre-wrap leading-relaxed"
          >
            {displayContent}
          </div>
        )}
      </div>

      {/* Reasoning Toggle */}
      <div className="px-5 pb-2">
        <button
          onClick={() => setShowReasoning(!showReasoning)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {showReasoning ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span>View AI reasoning</span>
        </button>
        
        {showReasoning && (
          <div className="mt-3 p-4 rounded-xl bg-muted/30 border border-border/50 space-y-3 animate-fade-in">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Generation Reasoning
            </p>
            {content.reasoning.map((step) => (
              <div key={step.id} className="space-y-1">
                <p className="text-sm font-medium text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
                {step.insights && (
                  <ul className="mt-1.5 space-y-0.5">
                    {step.insights.map((insight, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-primary mt-1">•</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      {!isEditing && (
        <div className="flex items-center justify-between p-5 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditing(true)}
              className="gap-1.5"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy}
              className="gap-1.5"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onRegenerate(content.id)}
              className="gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Regenerate
            </Button>
          </div>
          
          {content.status !== 'approved' && (
            <Button 
              variant="glow" 
              size="sm" 
              onClick={() => onApprove(content.id)}
              className="gap-1.5"
            >
              <Check className="w-4 h-4" />
              Approve
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
