import { GeneratedContent } from '@/types/content';
import { ContentCard } from './ContentCard';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, Download, Sparkles } from 'lucide-react';

interface ContentReviewProps {
  content: GeneratedContent[];
  intent: string;
  onApprove: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
  onRegenerate: (id: string) => void;
  onApproveAll: () => void;
  onStartOver: () => void;
}

export function ContentReview({
  content,
  intent,
  onApprove,
  onEdit,
  onRegenerate,
  onApproveAll,
  onStartOver
}: ContentReviewProps) {
  const approvedCount = content.filter(c => c.status === 'approved').length;
  const allApproved = approvedCount === content.length;

  const handleExportAll = () => {
    const exportData = content.map(c => ({
      platform: c.platform,
      content: c.isEdited ? c.editedContent : c.content,
      status: c.status
    }));
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <button 
            onClick={onStartOver}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Start new
          </button>
          <h2 className="text-2xl font-semibold text-foreground">Review Generated Content</h2>
          <p className="text-muted-foreground">
            {approvedCount} of {content.length} approved • Edit or approve each piece before publishing
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExportAll} className="gap-2">
            <Download className="w-4 h-4" />
            Export All
          </Button>
          {!allApproved && (
            <Button variant="glow" onClick={onApproveAll} className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Approve All
            </Button>
          )}
        </div>
      </div>

      {/* Intent Summary */}
      <div className="glass-surface rounded-xl p-4 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Original Intent</p>
          <p className="text-foreground mt-0.5">{intent}</p>
        </div>
      </div>

      {/* Content Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {content.map((item, index) => (
          <div 
            key={item.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ContentCard
              content={item}
              onApprove={onApprove}
              onEdit={onEdit}
              onRegenerate={onRegenerate}
            />
          </div>
        ))}
      </div>

      {/* All Approved State */}
      {allApproved && (
        <div className="text-center py-8 space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 border border-success/20">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">All Content Approved</h3>
            <p className="text-muted-foreground mt-1">
              Your content is ready to publish across all platforms
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button variant="outline" onClick={handleExportAll} className="gap-2">
              <Download className="w-4 h-4" />
              Export Content
            </Button>
            <Button variant="glow" onClick={onStartOver} className="gap-2">
              <Sparkles className="w-4 h-4" />
              Create More
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
