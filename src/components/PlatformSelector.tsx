import { Platform } from '@/types/content';
import { platformConfigs } from '@/lib/platforms';
import { Check } from 'lucide-react';

interface PlatformSelectorProps {
  selected: Platform[];
  onChange: (platforms: Platform[]) => void;
}

export function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
  const togglePlatform = (platform: Platform) => {
    if (selected.includes(platform)) {
      onChange(selected.filter(p => p !== platform));
    } else {
      onChange([...selected, platform]);
    }
  };

  const platforms = Object.values(platformConfigs);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Target Platforms</label>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => {
          const isSelected = selected.includes(platform.id);
          return (
            <button
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-primary/15 text-primary border border-primary/30 shadow-[0_0_12px_hsl(var(--primary)/0.2)]'
                  : 'bg-secondary/50 text-secondary-foreground border border-transparent hover:bg-secondary'
              }`}
            >
              <span className="text-base">{platform.icon}</span>
              <span>{platform.name}</span>
              {isSelected && (
                <Check className="w-4 h-4 ml-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
