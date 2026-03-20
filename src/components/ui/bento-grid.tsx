import React from 'react';
import { cn } from '../../lib/utils';

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]',
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  onClick,
}: {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group row-span-1 rounded-2xl overflow-hidden border border-surface-200 bg-white',
        'flex flex-col shadow-sm hover:shadow-lg transition-all duration-300',
        'hover:-translate-y-0.5 cursor-pointer',
        className
      )}
    >
      {/* Visual header */}
      <div className="flex-1 relative overflow-hidden">
        {header}
      </div>

      {/* Text footer */}
      <div className="px-4 py-3 flex items-center gap-2.5 bg-white border-t border-surface-100 group-hover:bg-surface-50 transition-colors">
        {icon && (
          <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-surface-100 group-hover:bg-primary-100 transition-colors">
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-surface-900 truncate">{title}</p>
          {description && (
            <p className="text-xs text-surface-400 truncate mt-0.5">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
