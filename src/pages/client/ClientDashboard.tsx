import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useCallback, useMemo } from 'react';
import CircularGallery from '../../components/CircularGallery';
import { BentoGrid, BentoGridItem } from '../../components/ui/bento-grid';
import { ThreeDMarquee } from '../../components/ui/3d-marquee';
import {
  Wine, UtensilsCrossed, SprayCan, Package, HeartPulse,
  ArrowRight, ChevronDown, ChevronUp, Truck, Clock,
  ShoppingCart, Plus, Check, X, ChevronLeft,
} from 'lucide-react';
import { mockCategories } from '../../data/mockData';
import { Product, getStockLevel } from '../../types';
import { useProducts } from '../../store/productsStore';
import { useCart } from '../../store/cartStore';
import { useOrders } from '../../store/ordersStore';

const iconMap: Record<string, any> = {
  wine: Wine,
  'utensils-crossed': UtensilsCrossed,
  'spray-can': SprayCan,
  package: Package,
  'heart-pulse': HeartPulse,
};

const statusStyles: Record<string, string> = {
  pending:               'bg-amber-50 text-amber-700 border-amber-200',
  authorization_pending: 'bg-orange-50 text-orange-700 border-orange-200',
  processing:            'bg-blue-50 text-blue-700 border-blue-200',
  completed:             'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled:             'bg-red-50 text-red-700 border-red-200',
};

const SCROLL_AMOUNT = 660;

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

export default function ClientDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addItem } = useCart();
  const { orders } = useOrders();

const [expandedOrders, setExpandedOrders]   = useState<Record<string, boolean>>({});
  const [addedItems, setAddedItems]           = useState<Record<string, boolean>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const activeCategories = mockCategories.filter(c => c.active);

  const galleryItems = useMemo(() =>
    activeCategories.map(cat => ({
      image: CATEGORY_IMAGES[(cat as any).key] ?? `https://picsum.photos/seed/${(cat as any).key}/800/600`,
      text: t(`categoryNames.${(cat as any).key}`, cat.name),
      categoryId: cat.id,
    })),
  [activeCategories, t]);

  const SUBCATEGORY_LABELS: Record<string, string[]> = {
    bebidas:      ['aguas', 'refrescos', 'cervezas'],
    alimentacion: ['conservas', 'lacteos', 'snacks'],
    limpieza:     ['detergentes', 'desinfectantes', 'papel'],
    menaje:       ['vasos', 'cubiertos', 'servilletas'],
    drogueria:    ['higiene', 'capilar', 'dental'],
  };


  const scroll = useCallback((catId: string, dir: 'left' | 'right') => {
    const el = rowRefs.current[catId];
    if (el) el.scrollBy({ left: dir === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT, behavior: 'smooth' });
  }, []);

  const toggleOrder = (id: string) =>
    setExpandedOrders(prev => ({ ...prev, [id]: !prev[id] }));

  const handleQuickAdd = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (product.stock === 0) return;
    addItem(product, 1);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [product.id]: false })), 1500);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 animate-fade-in space-y-10">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0C1E35] text-white" style={{ minHeight: '420px' }}>
        {/* ThreeDMarquee fills the background */}
        <div className="absolute inset-0">
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
        </div>

        {/* Overlay content */}
        <div className="relative z-20 flex flex-col items-center text-center px-8 py-14 lg:py-20">
          <p className="text-xs font-semibold text-primary-300 uppercase tracking-widest mb-4">
            {t('clientDashboard.portalB2B')}
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight drop-shadow-2xl">
            {t('clientDashboard.welcome')}
          </h1>
          <p className="text-white/70 text-base mb-8 leading-relaxed max-w-xl drop-shadow">
            {t('clientDashboard.subtitle')}
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className="inline-flex items-center gap-2.5 bg-white text-[#0C1E35] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-base shadow-xl"
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

      {/* ── Recent Orders ─────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-surface-900">{t('clientDashboard.recentOrders')}</h2>
            <p className="text-xs text-surface-400 mt-0.5">{orders.length} pedidos</p>
          </div>
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 font-semibold border border-primary-200 hover:border-primary-400 rounded-md px-3 py-1.5 transition-colors bg-white"
          >
            {t('dashboard.viewAll')} <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {orders.length === 0 ? (
          <p className="text-surface-400 text-sm">{t('clientDashboard.noRecentOrders')}</p>
        ) : (
          <div className="card overflow-hidden divide-y divide-surface-100">
            {orders.map(order => {
              const isExpanded = expandedOrders[order.id];
              return (
                <div key={order.id}>
                  <button
                    onClick={() => toggleOrder(order.id)}
                    className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-surface-50 transition-colors text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-surface-900 truncate">{order.orderId}</p>
                      <p className="text-xs text-surface-400 mt-0.5 truncate">{order.companyName}</p>
                    </div>
                    <span className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${statusStyles[order.status]}`}>
                      {t(`orders.${order.status}`)}
                    </span>
                    <div className="hidden lg:flex items-center gap-1.5 text-xs text-surface-400 shrink-0">
                      <Truck className="w-3.5 h-3.5" />
                      {formatDate(order.estimatedDelivery)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-surface-400 shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDate(order.createdAt)}
                    </div>
                    <p className="text-sm font-bold text-surface-900 shrink-0">€{order.totalAmount.toFixed(2)}</p>
                    {isExpanded
                      ? <ChevronUp className="w-4 h-4 text-surface-400 shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-surface-400 shrink-0" />
                    }
                  </button>

                  {isExpanded && (
                    <div className="bg-surface-50 border-t border-surface-100">
                      <div className="sm:hidden flex gap-3 px-5 pt-3 pb-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusStyles[order.status]}`}>
                          {t(`orders.${order.status}`)}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-surface-400">
                          <Truck className="w-3.5 h-3.5" /> {formatDate(order.estimatedDelivery)}
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm min-w-[460px]">
                          <thead>
                            <tr className="text-xs text-surface-400 uppercase border-b border-surface-200">
                              <th className="text-left px-5 py-2">{t('products.name')}</th>
                              <th className="text-right px-5 py-2">{t('cart.quantity')}</th>
                              <th className="text-right px-5 py-2">{t('cart.unitPrice')}</th>
                              <th className="text-right px-5 py-2">{t('cart.subtotal')}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-surface-100">
                            {order.items.map((item, i) => (
                              <tr key={i} className="hover:bg-white transition-colors">
                                <td className="px-5 py-2.5">
                                  <p className="font-medium text-surface-800">{item.name}</p>
                                  <p className="text-xs text-surface-400">{item.categoryName}</p>
                                </td>
                                <td className="text-right px-5 py-2.5 text-surface-600">{item.quantity}</td>
                                <td className="text-right px-5 py-2.5 text-surface-600">€{item.unitPrice.toFixed(2)}</td>
                                <td className="text-right px-5 py-2.5 font-semibold text-surface-900">€{item.subtotal.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="border-t-2 border-surface-200 bg-white">
                              <td colSpan={3} className="text-right px-5 py-3 text-sm font-medium text-surface-500">Total</td>
                              <td className="text-right px-5 py-3 font-bold text-surface-900">€{order.totalAmount.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
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

        {/* Per-category product carousels */}
        <div className="space-y-8">
          {activeCategories.map(cat => {
            const Icon        = iconMap[cat.icon] || Package;
            const catKey      = (cat as any).key as string;
            const catProducts = products.filter(p => p.active && p.categoryId === cat.id);
            if (catProducts.length === 0) return null;

            return (
              <div key={cat.id}>
                {/* Row header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-surface-900">
                      {t(`categoryNames.${catKey}`, cat.name)}
                    </h3>
                    <p className="text-xs text-surface-400">{catProducts.length} {t('clientDashboard.productsAvailable')}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => scroll(cat.id, 'left')}
                      className="w-7 h-7 rounded-md border border-surface-200 bg-white hover:bg-surface-50 flex items-center justify-center transition-colors shadow-sm"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-surface-500" />
                    </button>
                    <button
                      onClick={() => scroll(cat.id, 'right')}
                      className="w-7 h-7 rounded-md border border-surface-200 bg-white hover:bg-surface-50 flex items-center justify-center transition-colors shadow-sm"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-surface-500" />
                    </button>
                    <button
                      onClick={() => navigate(`/catalog?category=${cat.id}`)}
                      className="hidden sm:flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium border border-primary-200 hover:border-primary-300 rounded-md px-2.5 py-1.5 transition-colors bg-white"
                    >
                      {t('dashboard.viewAll')} <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Horizontal scroll */}
                <div
                  ref={el => { rowRefs.current[cat.id] = el; }}
                  className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {catProducts.map(product => {
                    const isOut   = product.stock === 0;
                    const isAdded = addedItems[product.id];
                    const level   = getStockLevel(product.stock);

                    return (
                      <div
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className={`flex-shrink-0 w-44 bg-white rounded-lg overflow-hidden border border-surface-200 hover:border-surface-300 hover:shadow-card-hover transition-all duration-150 cursor-pointer ${isOut ? 'opacity-60' : ''}`}
                      >
                        {/* Image */}
                        <div className="h-28 bg-white flex items-center justify-center relative overflow-hidden border-b border-surface-100">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-contain p-1"
                              onError={e => {
                                const img = e.target as HTMLImageElement;
                                img.style.display = 'none';
                                const fb = img.parentElement?.querySelector('.fb') as HTMLElement;
                                if (fb) fb.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className="fb absolute inset-0 items-center justify-center" style={{ display: product.imageUrl ? 'none' : 'flex' }}>
                            <Package className="w-10 h-10 text-surface-200" />
                          </div>
                          {/* Stock dot */}
                          <div className={`absolute bottom-2 right-2 w-2 h-2 rounded-full ${
                            level === 'out' ? 'bg-red-400' : level === 'low' ? 'bg-amber-400' : 'bg-emerald-400'
                          }`} />
                        </div>

                        {/* Info */}
                        <div className="p-3">
                          <p className="text-xs font-semibold text-surface-800 leading-tight line-clamp-2 min-h-[2.25rem] mb-1">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-surface-400 mb-2.5 truncate">{product.brand}</p>
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-sm font-bold text-surface-900">€{product.price.toFixed(2)}</p>
                            <button
                              onClick={e => handleQuickAdd(product, e)}
                              disabled={isOut}
                              className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors duration-200 ${
                                isAdded
                                  ? 'bg-emerald-500 text-white'
                                  : isOut
                                  ? 'bg-surface-100 text-surface-300 cursor-not-allowed'
                                  : 'bg-primary-600 hover:bg-primary-700 text-white'
                              }`}
                            >
                              {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile: Ver todo */}
                <div className="sm:hidden mt-2">
                  <button
                    onClick={() => navigate(`/catalog?category=${cat.id}`)}
                    className="text-xs text-primary-600 font-medium flex items-center gap-1"
                  >
                    {t('dashboard.viewAll')} {t(`categoryNames.${catKey}`, cat.name)} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Product Detail Modal ──────────────────────────────────── */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Image */}
            <div className="h-56 bg-surface-50 relative overflow-hidden border-b border-surface-100">
              {selectedProduct.imageUrl ? (
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-contain p-4" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-20 h-20 text-surface-200" />
                </div>
              )}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 w-7 h-7 bg-white border border-surface-200 rounded-full flex items-center justify-center hover:bg-surface-50 shadow-sm transition-colors"
              >
                <X className="w-3.5 h-3.5 text-surface-600" />
              </button>
              {selectedProduct.brand && (
                <span className="absolute top-3 left-3 bg-white border border-surface-200 text-xs text-surface-700 font-medium px-2.5 py-1 rounded-full shadow-sm">
                  {selectedProduct.brand}
                </span>
              )}
            </div>

            <div className="p-6">
              <p className="text-[11px] text-primary-500 font-mono mb-1 uppercase tracking-wide">{selectedProduct.sku}</p>
              <h2 className="text-lg font-bold text-surface-900 mb-1">{selectedProduct.name}</h2>
              <p className="text-xs text-surface-400 mb-3">
                {selectedProduct.categoryName}{selectedProduct.subcategoryName ? ` › ${selectedProduct.subcategoryName}` : ''}
              </p>

              {selectedProduct.description && (
                <p className="text-sm text-surface-600 mb-4 leading-relaxed">{selectedProduct.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-2 mb-5">
                {(() => {
                  const level = getStockLevel(selectedProduct.stock);
                  if (level === 'out') return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">{t('stock.noStock')}</span>;
                  if (level === 'low') return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">{t('stock.lowStock')} · {selectedProduct.stock} ud</span>;
                  return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">{t('stock.inStock')} · {selectedProduct.stock} ud</span>;
                })()}
                {selectedProduct.unitMeasure && <span className="px-2 py-0.5 rounded-full text-xs bg-surface-100 text-surface-600">{selectedProduct.unitMeasure}</span>}
                {selectedProduct.iva !== undefined && <span className="px-2 py-0.5 rounded-full text-xs bg-surface-100 text-surface-600">IVA {selectedProduct.iva}%</span>}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-2xl font-bold text-surface-900">€{selectedProduct.price.toFixed(2)}</p>
                  <p className="text-xs text-surface-400">{t('catalog.perUnit')}</p>
                </div>
                <button
                  onClick={() => {
                    handleQuickAdd(selectedProduct);
                    setTimeout(() => setSelectedProduct(null), 500);
                  }}
                  disabled={selectedProduct.stock === 0}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm ${
                    selectedProduct.stock === 0
                      ? 'bg-surface-100 text-surface-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {t('catalog.addToOrder')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
