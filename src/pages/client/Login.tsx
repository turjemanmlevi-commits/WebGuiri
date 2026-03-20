import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Sparkles, Search, ShoppingCart, ClipboardCheck, Truck } from 'lucide-react';
import { useState } from 'react';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useAuth } from '../../store/authStore';
import { ThreeDMarquee } from '../../components/ui/3d-marquee';

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
      <div className="hidden lg:flex lg:w-5/12 bg-[#0C1E35] flex-col p-10 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(26,71,214,0.35) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(26,71,180,0.20) 0%, transparent 50%)' }}
        />
        <div className="relative z-10 flex flex-col h-full gap-8">

          {/* Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-500/30 border border-primary-400/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <span className="text-base font-bold text-white tracking-tight">Precious Spain</span>
            </div>
            <LanguageSwitcher dark />
          </div>

          {/* ThreeDMarquee + title overlay */}
          <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden">
            <ThreeDMarquee
              images={[
                'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1521986329282-0436c1f1e212?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=200&fit=crop',
              ]}
              className="w-full h-full"
            />
            {/* Title overlay centered on the marquee */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-center">
              <p className="text-[11px] font-bold text-primary-400 uppercase tracking-widest mb-3">{t('clientDashboard.portalB2B')}</p>
              <h2 className="text-4xl font-extrabold text-white leading-tight drop-shadow-2xl mb-3">
                Precious Spain
              </h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs drop-shadow-lg">
                {t('auth.loginDescription')}
              </p>
            </div>
          </div>

          {/* How it works — cards */}
          <div className="flex flex-col min-h-0">
            <p className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-4">{t('auth.howItWorksLabel')}</p>
            <div className="grid grid-cols-2 gap-3">

              {/* Step 1 — Catalog */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[false, true, false, false].map((hi, i) => (
                      <div key={i} className={`rounded-xl border p-2.5 flex flex-col gap-1.5 ${hi ? 'border-primary-400/50 bg-primary-500/15' : 'border-white/10 bg-white/4'}`}>
                        <div className={`h-8 rounded-lg ${hi ? 'bg-primary-400/35' : 'bg-white/10'}`} />
                        <div className="h-1.5 bg-white/12 rounded w-3/4" />
                        <div className={`h-4 w-4 rounded-lg self-end flex items-center justify-center ${hi ? 'bg-primary-500/70' : 'bg-white/10'}`}>
                          <Search className={`w-2 h-2 ${hi ? 'text-primary-200' : 'text-white/30'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-4 pb-4 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="text-sm font-semibold text-white/90">{t('auth.step1Title')}</p>
                    <p className="text-xs text-white/45 leading-snug mt-1">{t('auth.step1Desc').split('.')[0]}.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 — Cart */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 flex-1 flex flex-col justify-center">
                  <div className="bg-white/6 border border-white/10 rounded-xl overflow-hidden text-xs">
                    <div className="px-3 py-2 border-b border-white/10 flex justify-between">
                      <span className="text-white/70 font-semibold">{t('cart.title')}</span>
                      <span className="text-amber-400/80">3 ref.</span>
                    </div>
                    {['Agua ×12', 'Mahou ×24', "Lay's ×6"].map((row, i) => (
                      <div key={i} className="px-3 py-1.5 flex justify-between border-b border-white/6 last:border-0">
                        <span className="text-white/55 truncate">{row}</span>
                        <span className="text-white/75 font-semibold ml-2">€{[7.2, 18.5, 9][i].toFixed(0)}</span>
                      </div>
                    ))}
                    <div className="px-3 py-2 flex justify-between bg-white/4 border-t border-white/10">
                      <span className="text-white/55">Total</span>
                      <span className="text-amber-300 font-bold">€34.70</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="text-sm font-semibold text-white/90">{t('auth.step2Title')}</p>
                    <p className="text-xs text-white/45 leading-snug mt-1">{t('auth.step2Desc').split('.')[0]}.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 — Order summary */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 flex-1 flex flex-col justify-center">
                  <div className="bg-white/6 border border-white/10 rounded-xl p-3 text-xs space-y-2">
                    <p className="text-white/70 font-semibold border-b border-white/10 pb-2">{t('cart.orderSummary')}</p>
                    {[['Demo S.L.', ''], ['3 ref.', ''], ['€34.70', 'text-white font-bold']].map(([val, cls], i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-white/45">{[t('dashboard.company'), t('nav.products'), 'Total'][i]}</span>
                        <span className={`text-white/75 ${cls}`}>{val}</span>
                      </div>
                    ))}
                    <div className="pt-1">
                      <div className="w-full py-1.5 bg-primary-600/80 rounded-lg flex items-center justify-center gap-1.5">
                        <ShoppingCart className="w-3 h-3 text-white" />
                        <span className="text-xs text-white font-semibold">{t('cart.sendOrder')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="text-sm font-semibold text-white/90">{t('auth.step3Title')}</p>
                    <p className="text-xs text-white/45 leading-snug mt-1">{t('auth.step3Desc').split('.')[0]}.</p>
                  </div>
                </div>
              </div>

              {/* Step 4 — Delivery */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 flex-1 flex flex-col justify-center">
                  <div className="bg-white/6 border border-emerald-400/25 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                      <ClipboardCheck className="w-6 h-6 text-emerald-400" />
                    </div>
                    <p className="text-white/85 font-bold text-sm">PED-2026-00142</p>
                    <p className="text-white/45 text-xs mt-1">Est. 24 Mar</p>
                    <div className="flex justify-between mt-3 px-3">
                      {['●', '●', '●', '○'].map((dot, i) => (
                        <span key={i} className={`text-sm ${i < 3 ? 'text-emerald-400' : 'text-white/20'}`}>{dot}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2 text-white/55 text-xs">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t('orders.statusShipping')}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                  <div>
                    <p className="text-sm font-semibold text-white/90">{t('auth.step4Title')}</p>
                    <p className="text-xs text-white/45 leading-snug mt-1">{t('auth.step4Desc').split('.')[0]}.</p>
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
