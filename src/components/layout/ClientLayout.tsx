import { useTranslation } from 'react-i18next';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, ShoppingBag, User, Search, LogOut, Menu, X,
  Wine, UtensilsCrossed, SprayCan, Package, HeartPulse, Bell,
  ChevronRight, ChevronDown, ChevronUp,
  LogIn, UserPlus, Building2, Phone, MapPin, Mail,
} from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import { ViewModeSwitcher } from '../../store/viewModeStore';
import { useCart } from '../../store/cartStore';
import { useAuth } from '../../store/authStore';
import { useState } from 'react';
import { mockCategories, mockSubcategories, mockProducts } from '../../data/mockData';

const iconMap: Record<string, any> = {
  wine: Wine,
  'utensils-crossed': UtensilsCrossed,
  'spray-can': SprayCan,
  package: Package,
  'heart-pulse': HeartPulse,
};

export default function ClientLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const { userEmail, isGuest, isLoggedIn, logout, userProfile } = useAuth();
  const itemCount = getItemCount();

  const [searchQuery, setSearchQuery]           = useState('');
  const [userMenuOpen, setUserMenuOpen]         = useState(false);
  const [sidebarOpen, setSidebarOpen]           = useState(false);
  const [notifOpen, setNotifOpen]               = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [accountOpen, setAccountOpen]           = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(searchQuery.trim() ? `/catalog?search=${encodeURIComponent(searchQuery.trim())}` : '/catalog');
  };

  const handleCategoryClick = (categoryId: string) =>
    setExpandedCategory(prev => (prev === categoryId ? null : categoryId));

  const handleNavigate = (url: string) => {
    setSidebarOpen(false);
    navigate(url);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex flex-col">

      {/* ── Sidebar Drawer ───────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50 w-72 bg-white h-full shadow-2xl flex flex-col">

            {/* Sidebar header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-primary-600 flex items-center justify-center">
                  <ShoppingBag className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-semibold text-surface-900 tracking-tight">Precious Spain</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-surface-400 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Auth / Account section ── */}
            {isGuest ? (
              <div className="px-4 py-4 border-b border-surface-100 bg-surface-50">
                <p className="text-xs font-semibold text-surface-500 uppercase tracking-widest mb-3">Tu cuenta</p>
                <p className="text-xs text-surface-400 mb-3">Estás en modo exploración. Inicia sesión para hacer pedidos.</p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => { setSidebarOpen(false); navigate('/'); }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => { setSidebarOpen(false); navigate('/register'); }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-surface-50 text-surface-700 text-sm font-semibold rounded-lg border border-surface-200 transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Registrarse
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-b border-surface-100">
                {/* User info row */}
                <button
                  onClick={() => setAccountOpen(o => !o)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-surface-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-full bg-primary-100 border border-primary-200 flex items-center justify-center shrink-0">
                    <User className="w-4.5 h-4.5 text-primary-600" style={{ width: '18px', height: '18px' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-surface-900 truncate">
                      {userProfile?.companyName ?? userEmail?.split('@')[0]}
                    </p>
                    <p className="text-xs text-surface-400 truncate">{userEmail}</p>
                  </div>
                  {accountOpen
                    ? <ChevronUp className="w-4 h-4 text-surface-400 shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-surface-400 shrink-0" />
                  }
                </button>

                {/* Expanded account details */}
                {accountOpen && userProfile && (
                  <div className="bg-surface-50 border-t border-surface-100 px-4 py-3 space-y-2.5">
                    <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-1">Datos de la empresa</p>
                    {[
                      { Icon: Building2, label: 'Empresa',   value: userProfile.companyName },
                      { Icon: Building2, label: 'CIF',       value: userProfile.cif },
                      { Icon: Mail,      label: 'Email',      value: userProfile.email },
                      { Icon: Phone,     label: 'Teléfono',   value: userProfile.phone },
                      { Icon: User,      label: 'Contacto',   value: userProfile.contactPerson },
                      { Icon: MapPin,    label: 'Dirección',  value: userProfile.deliveryAddress },
                    ].map(({ Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-2">
                        <Icon className="w-3.5 h-3.5 text-surface-400 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[10px] text-surface-400">{label}</p>
                          <p className="text-xs font-medium text-surface-700 break-words">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Category tree */}
            <nav className="flex-1 overflow-y-auto py-2">
              <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest px-5 pt-3 pb-2">
                {t('catalog.categories')}
              </p>

              {/* All categories */}
              <button
                onClick={() => handleNavigate('/catalog')}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-50 text-surface-600 hover:text-surface-900 transition-colors"
              >
                <div className="w-7 h-7 rounded bg-surface-100 flex items-center justify-center shrink-0">
                  <Package className="w-3.5 h-3.5 text-surface-500" />
                </div>
                <span className="text-sm font-medium flex-1 text-left">{t('categoryNames.allCategories')}</span>
              </button>

              {/* Each category */}
              {mockCategories.filter(c => c.active).map(cat => {
                const Icon     = iconMap[cat.icon] || Package;
                const catKey   = (cat as any).key as string;
                const count    = mockProducts.filter(p => p.categoryId === cat.id && p.active).length;
                const isExp    = expandedCategory === cat.id;
                const subcats  = mockSubcategories.filter(sc => sc.categoryId === cat.id && sc.active);

                return (
                  <div key={cat.id}>
                    <button
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors ${
                        isExp ? 'bg-primary-50 text-primary-700' : 'hover:bg-surface-50 text-surface-600 hover:text-surface-900'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 transition-colors ${
                        isExp ? 'bg-primary-100' : 'bg-surface-100'
                      }`}>
                        <Icon className={`w-3.5 h-3.5 ${isExp ? 'text-primary-600' : 'text-surface-500'}`} />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <span className="text-sm font-medium block truncate">
                          {t(`categoryNames.${catKey}`, cat.name)}
                        </span>
                        <span className="text-[11px] text-surface-400">{count} productos</span>
                      </div>
                      {isExp
                        ? <ChevronDown className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                        : <ChevronRight className="w-3.5 h-3.5 text-surface-300 shrink-0" />
                      }
                    </button>

                    {/* Subcategory list */}
                    {isExp && (
                      <div className="ml-4 border-l border-surface-200 pl-0">
                        <button
                          onClick={() => handleNavigate(`/catalog?category=${cat.id}`)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary-400 shrink-0" />
                          {t('common.all')} {t(`categoryNames.${catKey}`, cat.name)}
                        </button>
                        {subcats.map(sc => {
                          const scKey   = (sc as any).key as string;
                          const scCount = mockProducts.filter(p => p.subcategoryId === sc.id && p.active).length;
                          return (
                            <button
                              key={sc.id}
                              onClick={() => handleNavigate(`/catalog?category=${cat.id}&sub=${sc.id}`)}
                              className="w-full flex items-center justify-between gap-2 px-4 py-2 text-sm text-surface-500 hover:bg-surface-50 hover:text-surface-800 transition-colors"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-1 h-1 rounded-full bg-surface-300 shrink-0" />
                                <span className="truncate">{t(`categoryNames.${scKey}`, sc.name)}</span>
                              </div>
                              <span className="text-[11px] text-surface-300 shrink-0">{scCount}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Sidebar footer — only for logged-in users */}
            {!isGuest && (
              <div className="border-t border-surface-100 px-4 py-3">
                <button
                  onClick={() => { setSidebarOpen(false); logout(); navigate('/'); }}
                  className="w-full flex items-center gap-2 px-2 py-2 text-sm text-surface-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  {t('auth.logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Header ────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-[#0C1E35]" style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 px-4 lg:px-8 h-14">

            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-white/60 hover:text-white hover:bg-white/8 rounded-lg transition-colors shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0">
              <div className="w-7 h-7 rounded bg-primary-500/30 border border-primary-400/30 flex items-center justify-center">
                <ShoppingBag className="w-3.5 h-3.5 text-primary-300" />
              </div>
              <span className="text-sm font-semibold text-white tracking-tight mobile-only">Home</span>
            </Link>

            {/* Search — hidden on mobile view */}
            <form onSubmit={handleSearch} className="desktop-only flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('common.search')}
                  className="w-full pl-9 pr-4 py-2 bg-white/8 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:bg-white/12 focus:border-white/20 transition-colors"
                />
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-0.5 shrink-0 ml-auto">
              <ViewModeSwitcher dark />

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center gap-1.5 px-3 py-2 text-white/70 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
              >
                <ShoppingCart style={{ width: '18px', height: '18px' }} />
                <span className="hidden sm:inline text-sm font-medium desktop-only">{t('nav.cart')}</span>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-amber-400 text-[#0C1E35] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              <LanguageSwitcher />

              {/* Notifications — desktop only */}
              <div className="desktop-only relative">
                <button
                  onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false); }}
                  className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
                >
                  <Bell className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-surface-200 rounded-lg shadow-dropdown overflow-hidden z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-surface-100 flex items-center justify-between">
                      <p className="text-sm font-semibold text-surface-900">{t('clientDashboard.notifications')}</p>
                      <button onClick={() => setNotifOpen(false)} className="text-surface-400 hover:text-surface-600 p-0.5">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="px-4 py-8 text-center">
                      <Bell className="w-7 h-7 text-surface-200 mx-auto mb-2" />
                      <p className="text-sm text-surface-400">{t('clientDashboard.noNotifications')}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false); }}
                  className="flex items-center gap-2 pl-1.5 pr-2 py-1.5 text-white/70 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-white/15 border border-white/10 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-white/80" />
                  </div>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-surface-200 rounded-lg shadow-dropdown overflow-hidden z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-surface-100">
                      {isGuest ? (
                        <>
                          <p className="text-sm font-semibold text-surface-900">Visitante</p>
                          <p className="text-xs text-surface-400">Modo exploración sin precios</p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-semibold text-surface-900">{userEmail?.split('@')[0]}</p>
                          <p className="text-xs text-surface-400">{userEmail}</p>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => { setUserMenuOpen(false); logout(); navigate('/'); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {t('auth.logout')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0C1E35] border-t border-white/5 py-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary-500/30 flex items-center justify-center">
              <ShoppingBag className="w-3 h-3 text-primary-300" />
            </div>
            <span className="text-sm font-medium text-white">Precious Spain</span>
          </div>
          <p className="text-xs text-white/30">© 2026 Precious Spain · Portal B2B Mayorista</p>
        </div>
      </footer>
    </div>
  );
}
