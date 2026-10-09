import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: string;
  className?: string;
  light?: boolean;
}

export default function SectionLabel({
  children,
  className,
  light = false,
}: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'h-px w-8',
          light ? 'bg-champagne' : 'bg-champagne'
        )}
      />
      <span
        className={cn(
          'overline',
          light ? 'text-champagne' : 'text-champagne'
        )}
      >
        {children}
      </span>
    </div>
  );
}
