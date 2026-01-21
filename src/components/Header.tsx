import { Layers, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
              <Layers className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-semibold text-foreground">ContentFlow</span>
              <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">AI</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <HelpCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="subtle" size="sm" className="ml-2">
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
