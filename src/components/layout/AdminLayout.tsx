import { useTranslation } from 'react-i18next';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, FolderTree, ClipboardList, LogOut, Menu, X, ShoppingBag } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import { useState } from 'react';

const navItems = [
  { key: 'dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { key: 'products', path: '/admin/products', icon: Package },
  { key: 'categories', path: '/admin/categories', icon: FolderTree },
  { key: 'orders', path: '/admin/orders', icon: ClipboardList },
];

export default function AdminLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-surface-200 transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-surface-100">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-surface-900">WebPedidos</h1>
              <p className="text-xs text-surface-400">{t('auth.adminLogin')}</p>
            </div>
            <button className="lg:hidden ml-auto" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5 text-surface-400" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={active ? 'sidebar-link-active' : 'sidebar-link'}
                  id={`admin-nav-${item.key}`}
                >
                  <item.icon className="w-5 h-5" />
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="px-4 py-4 border-t border-surface-100">
            <button
              onClick={() => navigate('/admin')}
              className="sidebar-link w-full text-red-500 hover:text-red-600 hover:bg-red-50"
              id="admin-logout-btn"
            >
              <LogOut className="w-5 h-5" />
              {t('auth.logout')}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-surface-200 px-4 lg:px-8 py-3 flex items-center justify-between">
          <button className="lg:hidden btn-icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <LanguageSwitcher />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
