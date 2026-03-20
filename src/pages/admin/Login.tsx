import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Shield } from 'lucide-react';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function AdminLogin() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen gradient-dark flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('auth.adminLogin')}</h1>
          <p className="text-surface-400">{t('auth.adminLoginSubtitle')}</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-glass p-8">
          <div className="space-y-5">
            <div>
              <label className="input-label">{t('auth.email')}</label>
              <input type="email" className="input-field" placeholder="admin@empresa.es" defaultValue="admin@webpedidos.es" id="admin-email" />
            </div>
            <div>
              <label className="input-label">{t('auth.password')}</label>
              <input type="password" className="input-field" placeholder="••••••••" defaultValue="admin123" id="admin-password" />
            </div>

            <Link to="/admin/dashboard" className="btn-primary w-full text-center" id="admin-login-btn">
              {t('auth.login')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-surface-100 text-center">
            <Link to="/" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              ← {t('auth.clientLogin')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
