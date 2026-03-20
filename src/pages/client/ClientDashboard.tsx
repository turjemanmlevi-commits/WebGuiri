import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import CircularGallery from '../../components/CircularGallery';
import { BentoGrid, BentoGridItem } from '../../components/ui/bento-grid';
import { ThreeDMarquee } from '../../components/ui/3d-marquee';
import {
  Wine, UtensilsCrossed, SprayCan, Package, HeartPulse, ArrowRight,
} from 'lucide-react';
import { mockCategories } from '../../data/mockData';

const iconMap: Record<string, any> = {
  wine: Wine,
  'utensils-crossed': UtensilsCrossed,
  'spray-can': SprayCan,
  package: Package,
  'heart-pulse': HeartPulse,
};

const CATEGORY_IMAGES: Record<string, string> = {
  // Bebidas — botellas de vino / bebidas coloridas
  bebidas:      'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=800&h=600&fit=crop',
  // Alimentación — productos de supermercado / verduras frescas
  alimentacion: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop',
  // Limpieza — productos de limpieza en estante
  limpieza:     'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop',
  // Menaje — utensilios de cocina / vajilla
  menaje:       'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&h=600&fit=crop',
  // Droguería — productos de higiene y cuidado personal
  drogueria:    'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=800&h=600&fit=crop',
};

const SUBCATEGORY_LABELS: Record<string, string[]> = {
  bebidas:      ['aguas', 'refrescos', 'cervezas'],
  alimentacion: ['conservas', 'lacteos', 'snacks'],
  limpieza:     ['detergentes', 'desinfectantes', 'papel'],
  menaje:       ['vasos', 'cubiertos', 'servilletas'],
  drogueria:    ['higiene', 'capilar', 'dental'],
};

export default function ClientDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const activeCategories = mockCategories.filter(c => c.active);

  const galleryItems = useMemo(() =>
    activeCategories.map(cat => ({
      image: CATEGORY_IMAGES[(cat as any).key] ?? `https://picsum.photos/seed/${(cat as any).key}/800/600`,
      text: t(`categoryNames.${(cat as any).key}`, cat.name),
      categoryId: cat.id,
    })),
  [activeCategories, t]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 animate-fade-in space-y-10">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0C1E35] text-white" style={{ minHeight: '480px' }}>

        {/* ThreeDMarquee — full background */}
        <div className="absolute inset-0">
          <ThreeDMarquee
            images={[
              'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1521986329282-0436c1f1e212?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=280&fit=crop',
              'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=280&fit=crop',
            ]}
            className="w-full h-full"
          />
        </div>

        {/* Dark center gradient so text is always readable */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(12,30,53,0.88) 0%, rgba(12,30,53,0.40) 70%, transparent 100%)' }}
        />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-8 py-16 lg:py-24 h-full" style={{ minHeight: '480px' }}>
          <p className="text-xs font-bold text-primary-300 uppercase tracking-widest mb-5 opacity-90">
            {t('clientDashboard.portalB2B')}
          </p>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-5 leading-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
            {t('clientDashboard.welcome')}
          </h1>
          <p className="text-white/80 text-lg mb-10 leading-relaxed max-w-xl" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
            {t('clientDashboard.subtitle')}
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className="inline-flex items-center gap-2.5 bg-white text-[#0C1E35] font-bold px-10 py-4 rounded-xl hover:bg-primary-50 transition-colors text-base shadow-2xl"
          >
            {t('clientDashboard.browseAll')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Categories Bento ──────────────────────────────────────── */}
      <section>
        <div className="text-center mb-6">
          <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-2">{t('clientDashboard.ourCategories')}</p>
          <h2 className="text-xl font-bold text-surface-900 mb-1">{t('clientDashboard.shopByCategory')}</h2>
        </div>

        <BentoGrid className="auto-rows-[180px]">
          {/* All Categories — spans 2 cols × 2 rows (biggest card) */}
          <BentoGridItem
            className="md:col-span-2 md:row-span-2"
            title={t('categoryNames.allCategories')}
            description={t('clientDashboard.shopByCategory')}
            icon={<Package className="w-4 h-4 text-primary-600" />}
            onClick={() => navigate('/catalog')}
            header={
              <div className="relative w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0C1E35] via-[#1a3a5c] to-[#1a47d6]" />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(26,71,214,0.5) 0%, transparent 70%)' }} />
                <div className="absolute inset-0 grid grid-cols-3 gap-2 p-4 opacity-20">
                  {Object.values(CATEGORY_IMAGES).map((src, i) => (
                    <div key={i} className="rounded-lg overflow-hidden">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-4 shadow-lg">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{t('categoryNames.allCategories')}</p>
                  <p className="text-white/60 text-sm">{activeCategories.length} {t('catalog.categories').toLowerCase()}</p>
                </div>
              </div>
            }
          />

          {/* Individual categories */}
          {activeCategories.map(cat => {
            const key = (cat as any).key as string;
            const Icon = iconMap[key] || Package;
            const imgSrc = CATEGORY_IMAGES[key];
            const sublabels = SUBCATEGORY_LABELS[key] ?? [];
            const gradients: Record<string, string> = {
              bebidas:      'from-blue-900 to-blue-600',
              alimentacion: 'from-emerald-900 to-emerald-600',
              limpieza:     'from-sky-900 to-sky-600',
              menaje:       'from-amber-900 to-amber-600',
              drogueria:    'from-rose-900 to-rose-600',
            };
            return (
              <BentoGridItem
                key={cat.id}
                title={t(`categoryNames.${key}`, cat.name)}
                description={sublabels.map(k => t(`categoryNames.${k}`, k)).join(' · ')}
                icon={<Icon className="w-4 h-4 text-primary-600" />}
                onClick={() => navigate(`/catalog?category=${cat.id}`)}
                header={
                  <div className="relative w-full h-full overflow-hidden">
                    {imgSrc && <img src={imgSrc} alt={cat.name} className="w-full h-full object-cover" />}
                    <div className={`absolute inset-0 bg-gradient-to-t ${gradients[key] ?? 'from-gray-900 to-gray-600'} opacity-60`} />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-white font-semibold text-sm drop-shadow">{t(`categoryNames.${key}`, cat.name)}</span>
                    </div>
                  </div>
                }
              />
            );
          })}
        </BentoGrid>

      </section>

      {/* ── Shop by Category ──────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-surface-900">{t('clientDashboard.shopByCategory')}</h2>
            <p className="text-xs text-surface-400 mt-0.5">{t('clientDashboard.ourCategories')}</p>
          </div>
          <button
            onClick={() => navigate('/catalog')}
            className="flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 font-semibold border border-primary-200 hover:border-primary-400 rounded-md px-3 py-1.5 transition-colors bg-white"
          >
            {t('clientDashboard.browseAll')} <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Circular Gallery — hover to auto-scroll */}
        <div
          className="rounded-2xl overflow-hidden bg-[#0C1E35] mb-8"
          style={{ height: '500px' }}
        >
          <CircularGallery
            items={galleryItems}
            bend={1}
            textColor="#ffffff"
            borderRadius={0.05}
            font="bold 32px Inter, sans-serif"
            scrollSpeed={3}
            scrollEase={0.06}
            onItemClick={(catId) => navigate(`/catalog?category=${catId}`)}
          />
        </div>

      </section>

    </div>
  );
}
