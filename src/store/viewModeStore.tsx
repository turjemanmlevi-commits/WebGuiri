import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

type ViewMode = 'desktop' | 'mobile';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType>({
  viewMode: 'desktop',
  setViewMode: () => {},
});

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    return (localStorage.getItem('viewMode') as ViewMode) || 'desktop';
  });

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    localStorage.setItem('viewMode', mode);
  };

  useEffect(() => {
    const html = document.documentElement;
    if (viewMode === 'mobile') {
      html.setAttribute('data-viewmode', 'mobile');
    } else {
      html.removeAttribute('data-viewmode');
    }
  }, [viewMode]);

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}

export function ViewModeSwitcher({ dark = false }: { dark?: boolean }) {
  const { viewMode, setViewMode } = useViewMode();

  const btnBase = `p-2 rounded-lg transition-all duration-200 ${
    dark ? 'hover:bg-white/10' : 'hover:bg-surface-100'
  }`;
  const activeClass = dark
    ? 'text-white bg-white/15'
    : 'text-primary-600 bg-primary-50';
  const inactiveClass = dark ? 'text-white/40' : 'text-surface-400';

  return (
    <div className={`flex items-center gap-0.5 rounded-lg border p-0.5 ${
      dark ? 'border-white/10 bg-white/5' : 'border-surface-200 bg-surface-50'
    }`}>
      <button
        onClick={() => setViewMode('desktop')}
        className={`${btnBase} ${viewMode === 'desktop' ? activeClass : inactiveClass}`}
        title="Vista escritorio"
      >
        <Monitor className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => setViewMode('mobile')}
        className={`${btnBase} ${viewMode === 'mobile' ? activeClass : inactiveClass}`}
        title="Vista móvil"
      >
        <Smartphone className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
