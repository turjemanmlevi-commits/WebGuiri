import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Sparkles, Search, ShoppingCart, ClipboardCheck, Truck } from 'lucide-react';
import { useState } from 'react';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { ViewModeSwitcher } from '../../store/viewModeStore';
import { useAuth } from '../../store/authStore';

export default function ClientLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, loginAsGuest } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = login(email.trim(), password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Credenciales incorrectas');
    }
  };

  const handleTryFree = () => {
    loginAsGuest();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">

      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#0C1E35] flex-col justify-between p-10 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(26,71,214,0.30) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-primary-500/30 border border-primary-400/30 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-primary-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white tracking-tight">Precious Spain</span>
              </div>
              <LanguageSwitcher dark />
            </div>

            <p className="text-[11px] font-bold text-primary-400 uppercase tracking-widest mb-3">{t('clientDashboard.portalB2B')}</p>
            <h2 className="text-2xl font-bold text-white leading-snug mb-3">
              {t('auth.loginHero')}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {t('auth.loginDescription')}
            </p>

          </div>

          {/* How it works */}
          <div>
            <p className="text-[11px] font-bold text-primary-400 uppercase tracking-widest mb-2">{t('auth.howItWorksLabel')}</p>
            <p className="text-white/40 text-xs leading-relaxed mb-4">{t('auth.loginDescription')}</p>
            <div className="grid grid-cols-2 gap-2.5">

              {/* Step 1 — Catalog mockup */}
              <div className="bg-white/5 border border-white/8 rounded-xl overflow-hidden flex flex-col">
                <div className="p-3 pb-2 flex-1">
                  <div className="grid grid-cols-2 gap-1 mb-2">
                    {[false, true, false, false].map((hi, i) => (
                      <div key={i} className={`rounded-lg border p-1.5 flex flex-col gap-1 ${hi ? 'border-primary-400/40 bg-primary-500/10' : 'border-white/8 bg-white/3'}`}>
                        <div className={`h-5 rounded ${hi ? 'bg-primary-400/30' : 'bg-white/8'}`} />
                        <div className="h-1 bg-white/10 rounded w-3/4" />
                        <div className={`h-3 w-3 rounded self-end flex items-center justify-center ${hi ? 'bg-primary-500/60' : 'bg-white/8'}`}>
                          <Search className={`w-1.5 h-1.5 ${hi ? 'text-primary-200' : 'text-white/30'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-3 pb-3 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-primary-600 text-white text-[8px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="text-[11px] font-semibold text-white/90">{t('auth.step1Title')}</p>
                    <p className="text-[10px] text-white/40 leading-snug mt-0.5">{t('auth.step1Desc').split('.')[0]}.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 — Cart mockup */}
              <div className="bg-white/5 border border-white/8 rounded-xl overflow-hidden flex flex-col">
                <div className="p-3 pb-2 flex-1">
                  <div className="bg-white/5 border border-white/8 rounded-lg overflow-hidden text-[8px]">
                    <div className="px-2 py-1 border-b border-white/8 flex justify-between">
                      <span className="text-white/60 font-medium">{t('cart.title')}</span>
                      <span className="text-amber-400/70">3 ref.</span>
                    </div>
                    {['Agua ×12', 'Mahou ×24', "Lay's ×6"].map((row, i) => (
                      <div key={i} className="px-2 py-0.5 flex justify-between border-b border-white/5 last:border-0">
                        <span className="text-white/50 truncate">{row}</span>
                        <span className="text-white/70 font-medium ml-1">€{[7.2, 18.5, 9][i].toFixed(0)}</span>
                      </div>
                    ))}
                    <div className="px-2 py-1 flex justify-between bg-white/3 border-t border-white/8">
                      <span className="text-white/50">Total</span>
                      <span className="text-amber-300 font-bold">€34.70</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 pb-3 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[8px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="text-[11px] font-semibold text-white/90">{t('auth.step2Title')}</p>
                    <p className="text-[10px] text-white/40 leading-snug mt-0.5">{t('auth.step2Desc').split('.')[0]}.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 — Order summary mockup */}
              <div className="bg-white/5 border border-white/8 rounded-xl overflow-hidden flex flex-col">
                <div className="p-3 pb-2 flex-1">
                  <div className="bg-white/5 border border-white/8 rounded-lg p-2 text-[8px] space-y-1">
                    <p className="text-white/60 font-medium border-b border-white/8 pb-1">{t('cart.orderSummary')}</p>
                    {[['Demo S.L.', ''], ['3 ref.', ''], ['€34.70', 'text-white font-bold']].map(([val, cls], i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-white/40">{[t('dashboard.company'), t('nav.products'), 'Total'][i]}</span>
                        <span className={`text-white/70 ${cls}`}>{val}</span>
                      </div>
                    ))}
                    <div className="pt-1">
                      <div className="w-full py-1 bg-primary-600/70 rounded flex items-center justify-center gap-1">
                        <ShoppingCart className="w-2 h-2 text-white" />
                        <span className="text-[8px] text-white font-medium">{t('cart.sendOrder')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-3 pb-3 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-primary-600 text-white text-[8px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="text-[11px] font-semibold text-white/90">{t('auth.step3Title')}</p>
                    <p className="text-[10px] text-white/40 leading-snug mt-0.5">{t('auth.step3Desc').split('.')[0]}.</p>
                  </div>
                </div>
              </div>

              {/* Step 4 — Delivery mockup */}
              <div className="bg-white/5 border border-white/8 rounded-xl overflow-hidden flex flex-col">
                <div className="p-3 pb-2 flex-1">
                  <div className="bg-white/5 border border-emerald-400/20 rounded-lg p-2 text-[8px] text-center">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-1">
                      <ClipboardCheck className="w-3 h-3 text-emerald-400" />
                    </div>
                    <p className="text-white/80 font-semibold">PED-2026-00142</p>
                    <p className="text-white/40 mt-0.5">Est. 24 Mar</p>
                    <div className="flex justify-between mt-1.5 px-1">
                      {['●', '●', '●', '○'].map((dot, i) => (
                        <span key={i} className={`text-[6px] ${i < 3 ? 'text-emerald-400' : 'text-white/20'}`}>{dot}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-1 text-white/50">
                      <Truck className="w-2.5 h-2.5 text-emerald-400" />
                      <span>{t('orders.statusShipping')}</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 pb-3 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[8px] font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                  <div>
                    <p className="text-[11px] font-semibold text-white/90">{t('auth.step4Title')}</p>
                    <p className="text-[10px] text-white/40 leading-snug mt-0.5">{t('auth.step4Desc').split('.')[0]}.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col bg-[#f4f6fa]">
        <div className="flex justify-end items-center gap-2 p-4">
          <ViewModeSwitcher />
          <LanguageSwitcher />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-sm animate-slide-up">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-7 h-7 rounded bg-primary-600 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <span className="text-sm font-semibold text-surface-900">Precious Spain</span>
            </div>

            <div className="mb-7">
              <h1 className="text-2xl font-bold text-surface-900 mb-1">{t('auth.loginTitle')}</h1>
              <p className="text-sm text-surface-500">{t('auth.loginSubtitle')}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="input-label">{t('auth.email')}</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="usuario@leviturjeman.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="input-label mb-0">{t('auth.password')}</label>
                  <a href="#" className="text-xs text-primary-600 hover:text-primary-700 font-medium">{t('auth.forgotPassword')}</a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-field pr-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Verificando...' : t('auth.login')}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Try for free */}
            <div className="mt-4">
              <div className="relative flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-surface-200" />
                <span className="text-xs text-surface-400 font-medium">o</span>
                <div className="flex-1 h-px bg-surface-200" />
              </div>
              <button
                onClick={handleTryFree}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-primary-300 text-primary-600 hover:bg-primary-50 hover:border-primary-400 transition-all text-sm font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                {t('auth.tryFreeLabel')}
              </button>
              <p className="text-xs text-surface-400 text-center mt-2">{t('auth.tryFreeSubtext')}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-surface-200 text-center">
              <p className="text-sm text-surface-500">
                {t('auth.noAccount')}{' '}
                <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">{t('auth.register')}</Link>
              </p>
            </div>

            <div className="text-center mt-4">
              <Link to="/admin" className="text-xs text-surface-400 hover:text-surface-600 transition-colors">
                {t('auth.adminLogin')} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
