import { useTranslation } from 'react-i18next';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ShoppingCart, Plus, Minus, Check, SlidersHorizontal,
  Wine, UtensilsCrossed, SprayCan, Package, HeartPulse, X, Filter, AlertTriangle, Lock,
} from 'lucide-react';
import { mockCategories, mockSubcategories } from '../../data/mockData';
import { Product, getStockLevel } from '../../types';
import { useCart } from '../../store/cartStore';
import { useProducts } from '../../store/productsStore';
import { useAuth } from '../../store/authStore';

const iconMap: Record<string, any> = {
  wine: Wine,
  'utensils-crossed': UtensilsCrossed,
  'spray-can': SprayCan,
  package: Package,
  'heart-pulse': HeartPulse,
};

export default function Catalog() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem, items: cartItems } = useCart();
  const { products, adjustStock } = useProducts();
  const { isLoggedIn } = useAuth();

  const selectedCategory    = searchParams.get('category') || '';
  const searchQuery         = searchParams.get('search')   || '';
  const subFromUrl          = searchParams.get('sub')      || '';

  const [selectedSubcategory, setSelectedSubcategory] = useState(subFromUrl);
  const [sortBy, setSortBy]           = useState('name');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceMin, setPriceMin]       = useState('');
  const [priceMax, setPriceMax]       = useState('');
  const [quantities, setQuantities]   = useState<Record<string, number>>({});
  const [addedItems, setAddedItems]   = useState<Record<string, boolean>>({});
  const [stockWarnings, setStockWarnings] = useState<Record<string, boolean>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setSelectedSubcategory(subFromUrl);
  }, [selectedCategory, subFromUrl]);

  const subcatsForCategory = selectedCategory
    ? mockSubcategories.filter(sc => sc.categoryId === selectedCategory)
    : [];

  const filtered = useMemo(() => {
    let result = products.filter(p => p.active);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q))
      );
    }
    if (selectedCategory)    result = result.filter(p => p.categoryId === selectedCategory);
    if (selectedSubcategory) result = result.filter(p => p.subcategoryId === selectedSubcategory);
    if (inStockOnly)         result = result.filter(p => p.stock > 0);
    if (priceMin)            result = result.filter(p => p.price >= parseFloat(priceMin));
    if (priceMax)            result = result.filter(p => p.price <= parseFloat(priceMax));
    result.sort((a, b) => {
      if (sortBy === 'name')      return a.name.localeCompare(b.name);
      if (sortBy === 'priceAsc')  return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'stock')     return b.stock - a.stock;
      return 0;
    });
    return result;
  }, [searchQuery, selectedCategory, selectedSubcategory, sortBy, inStockOnly, priceMin, priceMax, products]);

  const setCategory = (catId: string) => {
    const params: Record<string, string> = {};
    if (catId) params.category = catId;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
  };

  const handleSubcategory = (subId: string) => {
    const params: Record<string, string> = {};
    if (selectedCategory) params.category = selectedCategory;
    if (subId) params.sub = subId;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
  };

  const getQty = (id: string) => quantities[id] || 1;
  const setQty = (id: string, val: number, maxStock?: number) => {
    const clamped = Math.max(1, val);
    setQuantities(prev => ({ ...prev, [id]: clamped }));
    if (maxStock !== undefined && clamped > maxStock) {
      setStockWarnings(prev => ({ ...prev, [id]: true }));
    } else {
      setStockWarnings(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleAdd = (product: Product) => {
    const existingQty = cartItems.find(i => i.product.id === product.id)?.quantity ?? 0;
    const requested = getQty(product.id);
    const actualDelta = Math.min(requested, product.stock - existingQty);
    if (actualDelta <= 0) {
      setStockWarnings(prev => ({ ...prev, [product.id]: true }));
      return;
    }
    if (requested > product.stock - existingQty) {
      setStockWarnings(prev => ({ ...prev, [product.id]: true }));
      setQuantities(prev => ({ ...prev, [product.id]: product.stock - existingQty }));
    }
    addItem(product, requested);
    adjustStock(product.id, -actualDelta);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [product.id]: false })), 1500);
  };

  const stockBadge = (stock: number) => {
    const level = getStockLevel(stock);
    if (level === 'out') return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-50 text-red-700 border border-red-200">
        {t('stock.noStock')}
      </span>
    );
    if (level === 'low') return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
        {t('stock.lowStock')} · {stock}
      </span>
    );
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        {t('stock.inStock')} · {stock}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 animate-fade-in">

      {/* Category Bubbles */}
      <div className="mb-4 overflow-x-auto pb-1">
        <div className="flex items-center gap-2 min-w-max">
          <button
            onClick={() => setCategory('')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 whitespace-nowrap ${
              selectedCategory === ''
                ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                : 'bg-white text-surface-600 border-surface-200 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50'
            }`}
          >
            {t('categoryNames.allCategories')}
          </button>
          {mockCategories.filter(c => c.active).map(cat => {
            const Icon   = iconMap[cat.icon] || Package;
            const catKey = (cat as any).key as string;
            const count  = products.filter(p => p.categoryId === cat.id && p.active).length;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 whitespace-nowrap ${
                  active
                    ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                    : 'bg-white text-surface-600 border-surface-200 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t(`categoryNames.${catKey}`, cat.name)}
                <span className={`text-[11px] ${active ? 'text-white/70' : 'text-surface-400'}`}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subcategory pills */}
      {subcatsForCategory.length > 0 && (
        <div className="mt-3 mb-5">
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              onClick={() => handleSubcategory('')}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                !selectedSubcategory
                  ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                  : 'bg-white text-surface-600 border-surface-200 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {t('common.all')}
            </button>
            {subcatsForCategory.map(sc => {
              const scKey    = (sc as any).key as string;
              const isActive = selectedSubcategory === sc.id;
              const count    = products.filter(p => p.subcategoryId === sc.id && p.active).length;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSubcategory(sc.id)}
                  className={`flex-shrink-0 flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    isActive
                      ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                      : 'bg-white text-surface-600 border-surface-200 hover:border-primary-300 hover:text-primary-600'
                  }`}
                >
                  {t(`categoryNames.${scKey}`, sc.name)}
                  <span className={`${isActive ? 'text-primary-200' : 'text-surface-400'}`}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 mt-4">

        {/* Filters Sidebar */}
        <aside className={`lg:w-60 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-20 rounded-2xl border border-surface-200 bg-white shadow-sm overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-surface-100 bg-surface-50">
              <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center">
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary-600" />
              </div>
              <span className="font-bold text-surface-900 text-sm tracking-tight">{t('catalog.filters')}</span>
              {(inStockOnly || priceMin || priceMax) && (
                <button
                  onClick={() => { setInStockOnly(false); setPriceMin(''); setPriceMax(''); }}
                  className="ml-auto text-[11px] text-primary-600 hover:text-primary-700 font-semibold bg-primary-50 hover:bg-primary-100 px-2 py-0.5 rounded-full transition-colors"
                >
                  {t('catalog.showAll')}
                </button>
              )}
            </div>

            <div className="p-5 space-y-6">

              {/* Sort */}
              <div>
                <p className="text-[11px] font-bold text-surface-400 uppercase tracking-widest mb-2">{t('catalog.sortBy')}</p>
                <div className="flex flex-col gap-1">
                  {[
                    { value: 'name',      label: t('catalog.sortName') },
                    { value: 'priceAsc',  label: t('catalog.sortPriceAsc') },
                    { value: 'priceDesc', label: t('catalog.sortPriceDesc') },
                    { value: 'stock',     label: t('catalog.sortStock') },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        sortBy === opt.value
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'text-surface-600 hover:bg-surface-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-surface-100" />

              {/* Price range */}
              <div>
                <p className="text-[11px] font-bold text-surface-400 uppercase tracking-widest mb-2">{t('catalog.priceRange')}</p>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-surface-400 font-medium">€</span>
                    <input
                      type="number"
                      value={priceMin}
                      onChange={e => setPriceMin(e.target.value)}
                      placeholder={t('catalog.min')}
                      className="w-full pl-6 pr-2 py-2 text-sm border border-surface-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-100 transition-colors"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-surface-400 font-medium">€</span>
                    <input
                      type="number"
                      value={priceMax}
                      onChange={e => setPriceMax(e.target.value)}
                      placeholder={t('catalog.max')}
                      className="w-full pl-6 pr-2 py-2 text-sm border border-surface-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-100 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-surface-100" />

              {/* In stock toggle */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-surface-700 group-hover:text-surface-900 transition-colors">{t('catalog.inStock')}</span>
                <div
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={`relative w-9 h-5 rounded-full transition-all duration-200 ${inStockOnly ? 'bg-primary-600' : 'bg-surface-200'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${inStockOnly ? 'left-4' : 'left-0.5'}`} />
                </div>
              </label>

            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-surface-500 font-medium">{filtered.length} {t('catalog.productsFound')}</p>
            <button onClick={() => setShowFilters(!showFilters)} className="btn-ghost lg:hidden text-sm">
              <Filter className="w-4 h-4" /> {t('catalog.filters')}
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="card p-16 text-center">
              <Package className="w-14 h-14 text-surface-200 mx-auto mb-4" />
              <p className="text-base font-medium text-surface-500">{t('common.noResults')}</p>
              <button onClick={() => setSearchParams({})} className="mt-4 text-sm text-primary-600 hover:underline">
                {t('catalog.showAll')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(product => {
                const isOut   = product.stock === 0;
                const isAdded = addedItems[product.id];
                return (
                  <div key={product.id} className={`card overflow-hidden group ${isOut ? 'opacity-70' : ''} hover:shadow-card-hover hover:border-surface-300 transition-all duration-150`}>

                    {/* Image */}
                    <div
                      className="h-44 bg-white flex items-center justify-center relative overflow-hidden border-b border-surface-100 cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                          onError={e => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = 'none';
                            const fallback = img.parentElement?.querySelector('.img-fallback') as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="img-fallback absolute inset-0 items-center justify-center" style={{ display: product.imageUrl ? 'none' : 'flex' }}>
                        <Package className="w-14 h-14 text-surface-200" />
                      </div>
                      <div className="absolute top-2.5 right-2.5">{stockBadge(product.stock)}</div>
                      {product.brand && (
                        <span className="absolute top-2.5 left-2.5 bg-white/90 text-xs text-surface-600 px-2 py-0.5 rounded-full font-medium shadow-sm border border-surface-100">
                          {product.brand}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-[11px] text-primary-500 font-mono mb-0.5 uppercase tracking-wide">{product.sku}</p>
                      <h3
                        className="font-semibold text-surface-900 text-sm leading-tight mt-0.5 cursor-pointer hover:text-primary-600 transition-colors"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-surface-400 mt-1 mb-3">
                        {product.categoryName}{product.subcategoryName ? ` › ${product.subcategoryName}` : ''}
                      </p>

                      {isLoggedIn ? (
                        <p className="text-xl font-bold text-surface-900 mb-3">
                          €{product.price.toFixed(2)}
                          <span className="text-xs font-normal text-surface-400 ml-1">{t('catalog.perUnit')}</span>
                        </p>
                      ) : (
                        <Link
                          to="/"
                          className="flex items-center gap-1.5 mb-3 text-sm text-surface-400 hover:text-primary-600 transition-colors"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span className="font-medium">Inicia sesión para ver el precio</span>
                        </Link>
                      )}

                      {isLoggedIn && !isOut ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-surface-200 rounded-lg overflow-hidden">
                              <button onClick={() => setQty(product.id, getQty(product.id) - 1, product.stock)} className="px-2.5 py-1.5 hover:bg-surface-50 transition-colors text-surface-600">
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <input
                                type="number"
                                value={getQty(product.id)}
                                onChange={e => setQty(product.id, parseInt(e.target.value) || 1, product.stock)}
                                className="w-10 text-center text-sm border-x border-surface-200 py-1.5 focus:outline-none bg-white"
                                min="1"
                              />
                              <button onClick={() => setQty(product.id, getQty(product.id) + 1, product.stock)} className="px-2.5 py-1.5 hover:bg-surface-50 transition-colors text-surface-600">
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => handleAdd(product)}
                              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${
                                isAdded ? 'bg-emerald-500 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'
                              }`}
                            >
                              {isAdded
                                ? <><Check className="w-3.5 h-3.5" /> {t('catalog.added')}</>
                                : <><ShoppingCart className="w-3.5 h-3.5" /> {t('catalog.addToOrder')}</>
                              }
                            </button>
                          </div>
                          {stockWarnings[product.id] && (
                            <p className="text-xs text-amber-600 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 shrink-0" />
                              {t('cart.stockWarning')} · {t('cart.maxStock')}: {product.stock}
                            </p>
                          )}
                        </div>
                      ) : isLoggedIn && isOut ? (
                        <div className="py-2 bg-surface-50 rounded-lg text-center text-xs text-surface-400 font-medium border border-surface-200">
                          {t('stock.noStock')}
                        </div>
                      ) : (
                        <Link
                          to="/"
                          className="w-full py-2 rounded-lg text-sm font-medium border border-dashed border-primary-300 text-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          Acceder para pedir
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

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
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain p-4"
                  onError={e => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    const fb = img.parentElement?.querySelector('.modal-fb') as HTMLElement;
                    if (fb) fb.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className="modal-fb absolute inset-0 items-center justify-center"
                style={{ display: selectedProduct.imageUrl ? 'none' : 'flex' }}
              >
                <Package className="w-20 h-20 text-surface-200" />
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 w-7 h-7 bg-white border border-surface-200 rounded-full flex items-center justify-center hover:bg-surface-50 shadow-sm transition-colors"
              >
                <X className="w-3.5 h-3.5 text-surface-600" />
              </button>
              {selectedProduct.brand && (
                <span className="absolute top-3 left-3 bg-white border border-surface-100 text-xs text-surface-700 font-medium px-2.5 py-1 rounded-full shadow-sm">
                  {selectedProduct.brand}
                </span>
              )}
            </div>

            {/* Body */}
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
                {selectedProduct.unitMeasure && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-surface-100 text-surface-600">{selectedProduct.unitMeasure}</span>
                )}
                {selectedProduct.iva !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-surface-100 text-surface-600">IVA {selectedProduct.iva}%</span>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                {isLoggedIn ? (
                  <p className="text-2xl font-bold text-surface-900">
                    €{selectedProduct.price.toFixed(2)}
                    <span className="text-xs font-normal text-surface-400 ml-1">{t('catalog.perUnit')}</span>
                  </p>
                ) : (
                  <Link to="/" className="flex items-center gap-1.5 text-sm text-surface-400 hover:text-primary-600 transition-colors">
                    <Lock className="w-4 h-4" />
                    <span className="font-medium">Inicia sesión para ver el precio</span>
                  </Link>
                )}
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      if (selectedProduct.stock > 0) {
                        handleAdd(selectedProduct);
                        setTimeout(() => setSelectedProduct(null), 600);
                      }
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
                ) : (
                  <Link
                    to="/"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-dashed border-primary-300 text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <Lock className="w-4 h-4" />
                    Acceder
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
