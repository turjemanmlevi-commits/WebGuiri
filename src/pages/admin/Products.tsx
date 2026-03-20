import { useTranslation } from 'react-i18next';
import { useState, useMemo, useRef } from 'react';
import { Search, Upload, Download, Plus, Edit3, Trash2, ChevronDown, X, AlertCircle, CheckCircle } from 'lucide-react';
import { mockProducts, mockCategories, mockSubcategories } from '../../data/mockData';
import { Product, getStockLevel } from '../../types';
import Papa from 'papaparse';

export default function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ price?: number; stock?: number }>({});
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [csvSummary, setCsvSummary] = useState<{ new: number; updated: number; errors: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !categoryFilter || p.categoryId === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const handleInlineEdit = (productId: string, field: 'price' | 'stock', value: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, [field]: value } : p));
    setEditingId(null);
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      delimiter: '',
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data as any[]);
        let newCount = 0, updatedCount = 0, errorCount = 0;
        (results.data as any[]).forEach((row: any) => {
          if (!row.sku || !row.nombre || !row.precio) { errorCount++; return; }
          const exists = products.find(p => p.sku === row.sku);
          if (exists) updatedCount++;
          else newCount++;
        });
        setCsvSummary({ new: newCount, updated: updatedCount, errors: errorCount });
      }
    });
  };

  const confirmCSVImport = () => {
    const newProducts = [...products];
    csvData.forEach((row: any) => {
      if (!row.sku || !row.nombre || !row.precio) return;
      const existingIdx = newProducts.findIndex(p => p.sku === row.sku);
      const product: Product = {
        id: `p-csv-${row.sku}`,
        sku: row.sku,
        name: row.nombre,
        categoryId: mockCategories.find(c => c.name === row.categoria)?.id || 'cat-1',
        categoryName: row.categoria || 'Sin Categoría',
        subcategoryName: row.subcategoria || '',
        price: parseFloat(row.precio) || 0,
        stock: parseInt(row.stock) || 0,
        description: row.descripcion || '',
        brand: row.marca || '',
        unitMeasure: row.unidad_medida || 'unidad',
        active: true,
      };
      if (existingIdx >= 0) newProducts[existingIdx] = { ...newProducts[existingIdx], ...product, id: newProducts[existingIdx].id };
      else newProducts.push(product);
    });
    setProducts(newProducts);
    setShowCSVModal(false);
    setCsvData([]);
    setCsvSummary(null);
  };

  const deleteProduct = (id: string) => {
    if (confirm(t('products.deleteConfirm'))) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const exportCSV = () => {
    const csvContent = Papa.unparse(products.map(p => ({
      sku: p.sku, nombre: p.name, categoria: p.categoryName, subcategoria: p.subcategoryName,
      precio: p.price, stock: p.stock, descripcion: p.description, marca: p.brand, unidad_medida: p.unitMeasure
    })), { delimiter: ';' });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'productos_catalogo.csv';
    link.click();
  };

  const stockColor = (stock: number) => {
    const level = getStockLevel(stock);
    if (level === 'out') return 'text-red-600 bg-red-50';
    if (level === 'low') return 'text-amber-600 bg-amber-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-surface-900">{t('products.title')}</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => { setShowCSVModal(true); setCsvData([]); setCsvSummary(null); }} className="btn-secondary text-sm" id="import-csv-btn">
            <Upload className="w-4 h-4" /> {t('products.importCSV')}
          </button>
          <button onClick={exportCSV} className="btn-secondary text-sm" id="export-csv-btn">
            <Download className="w-4 h-4" /> {t('products.exportCSV')}
          </button>
          <button className="btn-primary text-sm" id="add-product-btn">
            <Plus className="w-4 h-4" /> {t('products.addProduct')}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t('products.searchProducts')} className="input-field pl-10" id="product-search" />
        </div>
        <div className="relative">
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="input-field pr-8 appearance-none min-w-[180px]" id="category-filter">
            <option value="">{t('common.all')} {t('nav.categories')}</option>
            {mockCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">{t('products.sku')}</th>
                <th className="table-header">{t('products.name')}</th>
                <th className="table-header">{t('products.category')}</th>
                <th className="table-header">{t('products.price')}</th>
                <th className="table-header">{t('products.stock')}</th>
                <th className="table-header">{t('products.brand')}</th>
                <th className="table-header text-right">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-surface-400">{t('products.noProducts')}</td></tr>
              ) : (
                filtered.map(product => (
                  <tr key={product.id} className="hover:bg-surface-50 transition-colors">
                    <td className="table-cell font-mono text-xs text-surface-500">{product.sku}</td>
                    <td className="table-cell font-medium text-surface-900">{product.name}</td>
                    <td className="table-cell">
                      <span className="text-xs text-surface-600">{product.categoryName}</span>
                      {product.subcategoryName && <span className="text-xs text-surface-400"> › {product.subcategoryName}</span>}
                    </td>
                    <td className="table-cell">
                      {editingId === product.id ? (
                        <input type="number" step="0.01" defaultValue={product.price} className="input-field w-24 text-sm py-1" autoFocus
                          onBlur={e => handleInlineEdit(product.id, 'price', parseFloat(e.target.value))}
                          onKeyDown={e => e.key === 'Enter' && handleInlineEdit(product.id, 'price', parseFloat((e.target as HTMLInputElement).value))} />
                      ) : (
                        <span className="font-semibold text-surface-900 cursor-pointer hover:text-primary-600" onClick={() => setEditingId(product.id)}>
                          {product.price.toFixed(2)} €
                        </span>
                      )}
                    </td>
                    <td className="table-cell">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-bold ${stockColor(product.stock)}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="table-cell text-sm text-surface-500">{product.brand || '—'}</td>
                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="btn-icon" title={t('common.edit')}><Edit3 className="w-4 h-4" /></button>
                        <button className="btn-icon text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => deleteProduct(product.id)} title={t('common.delete')}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-surface-100 text-sm text-surface-500">
          {filtered.length} {t('nav.products').toLowerCase()}
        </div>
      </div>

      {/* CSV Import Modal */}
      {showCSVModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto animate-slide-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100">
              <h2 className="text-lg font-bold text-surface-900">{t('products.csvImport.title')}</h2>
              <button onClick={() => setShowCSVModal(false)} className="btn-icon"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-6">
              {/* Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-surface-300 rounded-xl p-10 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all"
              >
                <Upload className="w-10 h-10 text-surface-400 mx-auto mb-3" />
                <p className="text-surface-600 font-medium">{t('products.csvImport.dropzone')}</p>
                <p className="text-xs text-surface-400 mt-2">CSV (UTF-8, separador: ; o ,)</p>
                <input ref={fileInputRef} type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" />
              </div>

              {/* Preview & Summary */}
              {csvSummary && (
                <>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-green-700">{csvSummary.new}</p>
                      <p className="text-xs text-green-600">{t('products.csvImport.newProducts')}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-blue-700">{csvSummary.updated}</p>
                      <p className="text-xs text-blue-600">{t('products.csvImport.updatedProducts')}</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-red-700">{csvSummary.errors}</p>
                      <p className="text-xs text-red-600">{t('products.csvImport.errors')}</p>
                    </div>
                  </div>

                  {/* Preview Table */}
                  {csvData.length > 0 && (
                    <div className="overflow-x-auto max-h-60">
                      <table className="w-full text-xs">
                        <thead>
                          <tr>{Object.keys(csvData[0]).slice(0, 6).map(k => <th key={k} className="table-header text-xs">{k}</th>)}</tr>
                        </thead>
                        <tbody>
                          {csvData.slice(0, 10).map((row: any, i: number) => (
                            <tr key={i}>
                              {Object.values(row).slice(0, 6).map((v: any, j: number) => (
                                <td key={j} className="table-cell text-xs">{String(v)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {csvData.length > 10 && <p className="text-xs text-surface-400 mt-2 text-center">... +{csvData.length - 10} {t('products.csvImport.rows')}</p>}
                    </div>
                  )}

                  <div className="flex justify-end gap-3">
                    <button onClick={() => setShowCSVModal(false)} className="btn-secondary">{t('common.cancel')}</button>
                    <button onClick={confirmCSVImport} className="btn-primary" disabled={csvSummary.new === 0 && csvSummary.updated === 0}>
                      <CheckCircle className="w-4 h-4" /> {t('products.csvImport.confirmImport')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
