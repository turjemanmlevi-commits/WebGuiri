import { Category, Subcategory, Product, Order } from '../types';

// ── IMAGES ─────────────────────────────────────────────────────────────────
// Real product photos from Open Food Facts (openfoodfacts.org) — verified URLs
const off = (path: string) => `https://images.openfoodfacts.org/images/products/${path}`;
// Generic Unsplash fallbacks for non-beverage categories
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&h=300&q=80`;

const IMGS = {
  // ── Waters (Open Food Facts) ──────────────────────────────────────────
  WATER:          off('841/012/800/0400/front_en.98.400.jpg'),   // Bezoya 1.5L
  WATER_SMALL:    off('841/005/515/0018/front_fr.65.400.jpg'),   // Font Vella 1.5L
  WATER_50CL:     off('841/005/515/0018/front_fr.65.400.jpg'),   // Font Vella (same)
  // ── Colas & sodas ────────────────────────────────────────────────────
  COLA:           off('544/900/005/4227/front_en.406.400.jpg'),  // Coca-Cola 33cl
  COLA_2L:        off('544/900/013/1836/front_en.650.400.jpg'),  // Coca-Cola 2L
  COLA_ZERO:      off('544/900/005/4227/front_en.406.400.jpg'),  // Coca-Cola (placeholder)
  ORANGE_SODA:    off('544/900/005/4418/front_ru.4.400.jpg'),    // Fanta Naranja 33cl
  LEMON_SODA:     off('544/900/000/0996/front_en.1035.400.jpg'), // Sprite 33cl
  ICED_TEA:       off('544/900/001/2913/front_es.74.400.jpg'),   // Nestea Limón
  ENERGY:         off('900/249/010/0070/front_en.245.400.jpg'),  // Red Bull 25cl
  MONSTER:        off('506/033/563/2302/front_en.103.400.jpg'),  // Monster Energy
  TONIC:          off('841/410/031/7357/front_es.56.400.jpg'),   // Schweppes Tónica
  AQUARIUS:       off('544/900/013/3847/front_en.163.400.jpg'),  // Aquarius Naranja
  // ── Beers ────────────────────────────────────────────────────────────
  BEER_BOTTLE:    off('841/132/702/2019/front_es.29.400.jpg'),   // Mahou Clásica
  BEER_CAN:       off('841/109/010/1331/front_en.24.400.jpg'),   // Cruzcampo
  BEER_DARK:      off('841/065/500/0010/front_en.48.400.jpg'),   // San Miguel
  BEER_HEINEKEN:  off('311/978/025/9625/front_fr.84.400.jpg'),   // Heineken
  BEER_ESTRELLA:  off('841/079/302/1946/front_es.46.400.jpg'),   // Estrella Damm
  // ── Wines (Unsplash — no specific brand needed) ───────────────────────
  RED_WINE:       img('photo-1510812431401-41d2bd2722f3'),
  WHITE_WINE:     img('photo-1474722883778-792e7990302f'),
  CAVA:           img('photo-1578912996078-305d92249aa6'),
  // ── Juices & spirits (Unsplash) ───────────────────────────────────────
  OJ:             img('photo-1600271886742-f049cd451bba'),
  FRUIT_JUICE:    img('photo-1498557850523-fd3d118b962e'),
  WHISKY:         img('photo-1516997121675-4c2d1684aa3e'),
  GIN:            img('photo-1569529465841-dfecdab7503b'),
  RUM:            img('photo-1551538827-9c037cb4f32a'),
  COFFEE:         img('photo-1495474472287-4d71bcdd2085'),
  // ── Food (Unsplash + Lays from OFF) ──────────────────────────────────
  CHIPS:          off('841/019/900/2402/front_es.140.400.jpg'),  // Lay's España
  NACHOS:         img('photo-1573751239232-4f35a57c25e4'),
  CANNED:         img('photo-1518977676-1ef36afce4c4'),
  TUNA:           img('photo-1584661156681-540e80a161d3'),
  OLIVES:         img('photo-1484980972926-edee96e0960d'),
  SARDINES:       img('photo-1518977676-1ef36afce4c4'),
  FROZEN:         img('photo-1555396273-2f4c07abe28c'),
  FROZEN_PIZZA:   img('photo-1574071318508-1cdbab80d002'),
  MILK:           img('photo-1550583724-b2692b85b150'),
  MILK_CARTON:    img('photo-1563636619-e9143da7973b'),
  YOGURT:         img('photo-1488477181946-6428a0291777'),
  CHEESE:         img('photo-1618164436241-4473940d1f5c'),
  BUTTER:         img('photo-1589985270826-4b7bb135bc9d'),
  TOMATO_SAUCE:   img('photo-1571952048958-8e4d7bfa4f45'),
  KETCHUP:        img('photo-1472476443507-c7a5948772fc'),
  MAYO:           img('photo-1547592166-23ac45744acd'),
  OLIVE_OIL:      img('photo-1474979266404-7eaacbcd87c5'),
  RICE:           img('photo-1536304993881-ff86e0c9f5ea'),
  LEGUMES:        img('photo-1515543904379-3d757abe528c'),
  // ── Cleaning (Unsplash) ───────────────────────────────────────────────
  CLEANER:        img('photo-1585771724684-38269d6639fd'),
  BLEACH:         img('photo-1584990347209-1a1c060a7856'),
  DISH_SOAP:      img('photo-1556228720-195a672e8a03'),
  LAUNDRY:        img('photo-1584909914-80db6cc5a8b4'),
  SPRAY:          img('photo-1563453392212-326f5e854473'),
  TOILET_PAPER:   img('photo-1584568694271-c7aed2b1a41f'),
  KITCHEN_ROLL:   img('photo-1584568694271-c7aed2b1a41f'),
  AIR_FRESH:      img('photo-1611515847735-84f893c82e34'),
  SPONGE:         img('photo-1563453392212-326f5e854473'),
  GLOVES:         img('photo-1563453392212-326f5e854473'),
  // ── Tableware (Unsplash) ──────────────────────────────────────────────
  PLASTIC_CUPS:   img('photo-1571066811602-716837d681de'),
  PAPER_CUPS:     img('photo-1502741126161-b048400d085d'),
  NAPKINS:        img('photo-1544847341-9a79e1a3f9b0'),
  PLATES:         img('photo-1572635148818-ef6fd45eb394'),
  TRASH_BAGS:     img('photo-1563453392212-326f5e854473'),
  FOIL:           img('photo-1578662996442-48f60103fc96'),
  CUTLERY:        img('photo-1591622150748-434afef4a8ee'),
  // ── Drugstore (Unsplash) ──────────────────────────────────────────────
  HAND_GEL:       img('photo-1584744982491-665216d95f8b'),
  LIQUID_SOAP:    img('photo-1556228578-8c89e6adf883'),
  SHOWER_GEL:     img('photo-1631390008706-84dba432f7e6'),
  SHAMPOO:        img('photo-1526045612212-70caf35c14df'),
  DEODORANT:      img('photo-1558618666-fcd25c85cd64'),
  TOOTHPASTE:     img('photo-1559056199-641a0ac8b55e'),
  MOUTHWASH:      img('photo-1545483656-1a34f5e50c3d'),
  RAZOR:          img('photo-1621607512214-68297480165e'),
  SUNSCREEN:      img('photo-1558618666-fcd25c85cd64'),
};

// ── CATEGORIES ──────────────────────────────────────────────────────────────
export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Bebidas',             key: 'bebidas',      icon: 'wine',             order: 1, active: true },
  { id: 'cat-2', name: 'Alimentación',         key: 'alimentacion', icon: 'utensils-crossed', order: 2, active: true },
  { id: 'cat-3', name: 'Limpieza',             key: 'limpieza',     icon: 'spray-can',        order: 3, active: true },
  { id: 'cat-4', name: 'Menaje / Desechables', key: 'menaje',       icon: 'package',          order: 4, active: true },
  { id: 'cat-5', name: 'Droguería',            key: 'drogueria',    icon: 'heart-pulse',      order: 5, active: true },
];

// ── SUBCATEGORIES ────────────────────────────────────────────────────────────
export const mockSubcategories: Subcategory[] = [
  { id: 'sub-1',  categoryId: 'cat-1', name: 'Aguas',               key: 'aguas',         order: 1, active: true },
  { id: 'sub-2',  categoryId: 'cat-1', name: 'Refrescos',           key: 'refrescos',     order: 2, active: true },
  { id: 'sub-3',  categoryId: 'cat-1', name: 'Cervezas',            key: 'cervezas',      order: 3, active: true },
  { id: 'sub-4',  categoryId: 'cat-1', name: 'Vinos',               key: 'vinos',         order: 4, active: true },
  { id: 'sub-16', categoryId: 'cat-1', name: 'Zumos',               key: 'zumos',         order: 5, active: true },
  { id: 'sub-17', categoryId: 'cat-1', name: 'Licores y Spirits',   key: 'espirituosos',  order: 6, active: true },
  { id: 'sub-18', categoryId: 'cat-1', name: 'Café e Infusiones',   key: 'cafe',          order: 7, active: true },
  { id: 'sub-5',  categoryId: 'cat-2', name: 'Patatas y Snacks',    key: 'snacks',        order: 1, active: true },
  { id: 'sub-6',  categoryId: 'cat-2', name: 'Conservas',           key: 'conservas',     order: 2, active: true },
  { id: 'sub-7',  categoryId: 'cat-2', name: 'Congelados',          key: 'congelados',    order: 3, active: true },
  { id: 'sub-8',  categoryId: 'cat-2', name: 'Lácteos',             key: 'lacteos',       order: 4, active: true },
  { id: 'sub-9',  categoryId: 'cat-2', name: 'Salsas y Condimentos',key: 'salsas',        order: 5, active: true },
  { id: 'sub-19', categoryId: 'cat-2', name: 'Aceites y Vinagres',  key: 'aceites',       order: 6, active: true },
  { id: 'sub-20', categoryId: 'cat-2', name: 'Cereales y Legumbres',key: 'cereales',      order: 7, active: true },
  { id: 'sub-10', categoryId: 'cat-3', name: 'Detergentes',         key: 'detergentes',   order: 1, active: true },
  { id: 'sub-11', categoryId: 'cat-3', name: 'Desinfectantes',      key: 'desinfectantes',order: 2, active: true },
  { id: 'sub-12', categoryId: 'cat-3', name: 'Papel',               key: 'papel',         order: 3, active: true },
  { id: 'sub-21', categoryId: 'cat-3', name: 'Ambientadores',       key: 'ambientadores', order: 4, active: true },
  { id: 'sub-22', categoryId: 'cat-3', name: 'Útiles de Limpieza',  key: 'utiles',        order: 5, active: true },
  { id: 'sub-13', categoryId: 'cat-4', name: 'Vasos y Platos',      key: 'vasos',         order: 1, active: true },
  { id: 'sub-14', categoryId: 'cat-4', name: 'Servilletas',         key: 'servilletas',   order: 2, active: true },
  { id: 'sub-23', categoryId: 'cat-4', name: 'Bolsas y Film',       key: 'bolsas',        order: 3, active: true },
  { id: 'sub-24', categoryId: 'cat-4', name: 'Cubiertos',           key: 'cubiertos',     order: 4, active: true },
  { id: 'sub-15', categoryId: 'cat-5', name: 'Higiene Personal',    key: 'higiene',       order: 1, active: true },
  { id: 'sub-25', categoryId: 'cat-5', name: 'Cuidado Capilar',     key: 'capilar',       order: 2, active: true },
  { id: 'sub-26', categoryId: 'cat-5', name: 'Afeitado',            key: 'afeitado',      order: 3, active: true },
  { id: 'sub-27', categoryId: 'cat-5', name: 'Higiene Dental',      key: 'dental',        order: 4, active: true },
  { id: 'sub-28', categoryId: 'cat-5', name: 'Primeros Auxilios',   key: 'auxilios',      order: 5, active: true },
];

// ── PRODUCTS ─────────────────────────────────────────────────────────────────
export const mockProducts: Product[] = [
  // BEBIDAS: Aguas
  { id: 'p-1',   sku: 'BEB-001', name: 'Agua Bezoya 1.5L',              categoryId: 'cat-1', subcategoryId: 'sub-1',  categoryName: 'Bebidas', subcategoryName: 'Aguas',             price: 0.45, stock: 500,  brand: 'Bezoya',     unitMeasure: 'unidad',   iva: 10, active: true, imageUrl: IMGS.WATER,        description: 'Agua mineral natural de manantial, botella 1.5L' },
  { id: 'p-2',   sku: 'BEB-002', name: 'Agua Font Vella 50cl',          categoryId: 'cat-1', subcategoryId: 'sub-1',  categoryName: 'Bebidas', subcategoryName: 'Aguas',             price: 0.30, stock: 3000, brand: 'Font Vella', unitMeasure: 'unidad',   iva: 10, active: true, imageUrl: IMGS.WATER_SMALL,  description: 'Agua mineral natural botella pequeña 50cl' },
  { id: 'p-3',   sku: 'BEB-003', name: 'Agua Font Vella 1.5L',          categoryId: 'cat-1', subcategoryId: 'sub-1',  categoryName: 'Bebidas', subcategoryName: 'Aguas',             price: 0.55, stock: 2000, brand: 'Font Vella', unitMeasure: 'unidad',   iva: 10, active: true, imageUrl: IMGS.WATER_SMALL,  description: 'Agua mineral natural 1.5 litros' },
  { id: 'p-4',   sku: 'BEB-004', name: 'Agua Evian 33cl',               categoryId: 'cat-1', subcategoryId: 'sub-1',  categoryName: 'Bebidas', subcategoryName: 'Aguas',             price: 0.65, stock: 800,  brand: 'Evian',      unitMeasure: 'unidad',   iva: 10, active: true, imageUrl: IMGS.WATER,        description: 'Agua mineral premium de los Alpes franceses 33cl' },
  { id: 'p-5',   sku: 'BEB-005', name: 'Aquarius Limón 50cl',           categoryId: 'cat-1', subcategoryId: 'sub-1',  categoryName: 'Bebidas', subcategoryName: 'Aguas',             price: 0.90, stock: 600,  brand: 'Aquarius',   unitMeasure: 'unidad',   iva: 10, active: true, imageUrl: IMGS.AQUARIUS,     description: 'Bebida isotónica sabor limón 50cl' },
  // BEBIDAS: Refrescos
  { id: 'p-6',   sku: 'BEB-006', name: 'Coca-Cola 33cl',                categoryId: 'cat-1', subcategoryId: 'sub-2',  categoryName: 'Bebidas', subcategoryName: 'Refrescos',         price: 0.55, stock: 1200, brand: 'Coca-Cola',  unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.COLA,         description: 'Refresco de cola en lata 33cl' },
  { id: 'p-7',   sku: 'BEB-007', name: 'Coca-Cola Zero 33cl',           categoryId: 'cat-1', subcategoryId: 'sub-2',  categoryName: 'Bebidas', subcategoryName: 'Refrescos',         price: 0.55, stock: 900,  brand: 'Coca-Cola',  unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.COLA_ZERO,    description: 'Refresco cola sin azúcar 33cl' },
  { id: 'p-8',   sku: 'BEB-008', name: 'Fanta Naranja 33cl',            categoryId: 'cat-1', subcategoryId: 'sub-2',  categoryName: 'Bebidas', subcategoryName: 'Refrescos',         price: 0.50, stock: 800,  brand: 'Fanta',      unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.ORANGE_SODA,  description: 'Refresco de naranja con gas 33cl' },
  { id: 'p-9',   sku: 'BEB-009', name: 'Sprite 33cl',                   categoryId: 'cat-1', subcategoryId: 'sub-2',  categoryName: 'Bebidas', subcategoryName: 'Refrescos',         price: 0.50, stock: 700,  brand: 'Sprite',     unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.LEMON_SODA,   description: 'Refresco de limón-lima 33cl (Sprite)' },
  { id: 'p-10',  sku: 'BEB-010', name: 'Pepsi 33cl',                    categoryId: 'cat-1', subcategoryId: 'sub-2',  categoryName: 'Bebidas', subcategoryName: 'Refrescos',         price: 0.50, stock: 600,  brand: 'Pepsi',      unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.COLA,         description: 'Refresco de cola lata 33cl' },
  { id: 'p-11',  sku: 'BEB-011', name: 'Nestea Limón 50cl',             categoryId: 'cat-1', subcategoryId: 'sub-2',  categoryName: 'Bebidas', subcategoryName: 'Refrescos',         price: 0.80, stock: 400,  brand: 'Nestea',     unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.ICED_TEA,     description: 'Té frío sabor limón 50cl' },
  { id: 'p-12',  sku: 'BEB-012', name: 'Red Bull 25cl',                 categoryId: 'cat-1', subcategoryId: 'sub-2',  categoryName: 'Bebidas', subcategoryName: 'Refrescos',         price: 1.50, stock: 500,  brand: 'Red Bull',   unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.ENERGY,       description: 'Bebida energética lata 250ml' },
  { id: 'p-13',  sku: 'BEB-013', name: 'Agua Tónica Schweppes 20cl',    categoryId: 'cat-1', subcategoryId: 'sub-2',  categoryName: 'Bebidas', subcategoryName: 'Refrescos',         price: 0.60, stock: 300,  brand: 'Schweppes',  unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.TONIC,        description: 'Agua tónica clásica 20cl' },
  // BEBIDAS: Cervezas
  { id: 'p-14',  sku: 'BEB-014', name: 'Cerveza Mahou 25cl',            categoryId: 'cat-1', subcategoryId: 'sub-3',  categoryName: 'Bebidas', subcategoryName: 'Cervezas',          price: 0.65, stock: 2000, brand: 'Mahou',          unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.BEER_BOTTLE,  description: 'Botellín cerveza clásica 25cl' },
  { id: 'p-15',  sku: 'BEB-015', name: 'Mahou 5★ 33cl',                categoryId: 'cat-1', subcategoryId: 'sub-3',  categoryName: 'Bebidas', subcategoryName: 'Cervezas',          price: 0.75, stock: 1500, brand: 'Mahou',          unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.BEER_BOTTLE,  description: 'Cerveza Mahou cinco estrellas 33cl' },
  { id: 'p-16',  sku: 'BEB-016', name: 'Estrella Damm 33cl',            categoryId: 'cat-1', subcategoryId: 'sub-3',  categoryName: 'Bebidas', subcategoryName: 'Cervezas',          price: 0.75, stock: 1200, brand: 'Estrella Damm',  unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.BEER_ESTRELLA, description: 'Cerveza premium catalana 33cl' },
  { id: 'p-17',  sku: 'BEB-017', name: 'San Miguel 33cl',               categoryId: 'cat-1', subcategoryId: 'sub-3',  categoryName: 'Bebidas', subcategoryName: 'Cervezas',          price: 0.70, stock: 1000, brand: 'San Miguel',     unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.BEER_DARK,    description: 'Cerveza San Miguel lata 33cl' },
  { id: 'p-18',  sku: 'BEB-018', name: 'Heineken 33cl',                 categoryId: 'cat-1', subcategoryId: 'sub-3',  categoryName: 'Bebidas', subcategoryName: 'Cervezas',          price: 0.80, stock: 800,  brand: 'Heineken',       unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.BEER_HEINEKEN, description: 'Botellín cerveza holandesa 33cl' },
  { id: 'p-19',  sku: 'BEB-019', name: 'Voll-Damm Doble Malta 33cl',    categoryId: 'cat-1', subcategoryId: 'sub-3',  categoryName: 'Bebidas', subcategoryName: 'Cervezas',          price: 1.10, stock: 400,  brand: 'Estrella Damm',  unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.BEER_ESTRELLA, description: 'Cerveza doble malta premium 33cl' },
  // BEBIDAS: Vinos
  { id: 'p-20',  sku: 'BEB-020', name: 'Vino Rioja Crianza 75cl',       categoryId: 'cat-1', subcategoryId: 'sub-4',  categoryName: 'Bebidas', subcategoryName: 'Vinos',             price: 5.80, stock: 150,  brand: 'Marqués de Cáceres', unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.RED_WINE,    description: 'Vino tinto D.O.Ca Rioja Crianza 75cl' },
  { id: 'p-21',  sku: 'BEB-021', name: 'Albariño Rías Baixas 75cl',     categoryId: 'cat-1', subcategoryId: 'sub-4',  categoryName: 'Bebidas', subcategoryName: 'Vinos',             price: 7.50, stock: 100,  brand: 'Martín Códax',       unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.WHITE_WINE,  description: 'Vino blanco D.O. Rías Baixas 75cl' },
  { id: 'p-22',  sku: 'BEB-022', name: 'Cava Freixenet Cordon Negro 75cl', categoryId: 'cat-1', subcategoryId: 'sub-4', categoryName: 'Bebidas', subcategoryName: 'Vinos',            price: 8.50, stock: 80,   brand: 'Freixenet',          unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.CAVA,        description: 'Cava brut nature D.O. Cava 75cl' },
  { id: 'p-23',  sku: 'BEB-023', name: 'Ribera del Duero Protos 75cl',  categoryId: 'cat-1', subcategoryId: 'sub-4',  categoryName: 'Bebidas', subcategoryName: 'Vinos',             price: 6.90, stock: 120,  brand: 'Protos',             unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.RED_WINE,    description: 'Vino tinto D.O. Ribera del Duero 75cl' },
  // BEBIDAS: Zumos
  { id: 'p-24',  sku: 'BEB-024', name: 'Zumo Don Simon Naranja 1L',     categoryId: 'cat-1', subcategoryId: 'sub-16', categoryName: 'Bebidas', subcategoryName: 'Zumos',             price: 1.20, stock: 400,  brand: 'Don Simon',  unitMeasure: 'unidad',   iva: 10, active: true, imageUrl: IMGS.OJ,           description: 'Zumo de naranja sin pulpa brick 1L' },
  { id: 'p-25',  sku: 'BEB-025', name: 'Granini Melocotón 1L',          categoryId: 'cat-1', subcategoryId: 'sub-16', categoryName: 'Bebidas', subcategoryName: 'Zumos',             price: 1.80, stock: 250,  brand: 'Granini',    unitMeasure: 'unidad',   iva: 10, active: true, imageUrl: IMGS.FRUIT_JUICE,  description: 'Néctar de melocotón brick 1L' },
  { id: 'p-26',  sku: 'BEB-026', name: 'Tropicana Naranja 1L',          categoryId: 'cat-1', subcategoryId: 'sub-16', categoryName: 'Bebidas', subcategoryName: 'Zumos',             price: 2.20, stock: 180,  brand: 'Tropicana',  unitMeasure: 'unidad',   iva: 10, active: true, imageUrl: IMGS.OJ,           description: 'Zumo naranja exprimida premium 1L' },
  { id: 'p-27',  sku: 'BEB-027', name: 'Don Simon Multifrutas 1L',      categoryId: 'cat-1', subcategoryId: 'sub-16', categoryName: 'Bebidas', subcategoryName: 'Zumos',             price: 1.10, stock: 300,  brand: 'Don Simon',  unitMeasure: 'unidad',   iva: 10, active: true, imageUrl: IMGS.FRUIT_JUICE,  description: 'Néctar multifrutas brick 1L' },
  // BEBIDAS: Espirituosos
  { id: 'p-28',  sku: 'BEB-028', name: 'Gin MG London Dry 70cl',        categoryId: 'cat-1', subcategoryId: 'sub-17', categoryName: 'Bebidas', subcategoryName: 'Licores y Spirits', price: 12.90, stock: 60,  brand: 'MG',        unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.GIN,          description: 'Ginebra London Dry 37.5% vol. 70cl' },
  { id: 'p-29',  sku: 'BEB-029', name: 'Whisky J&B Rare 70cl',          categoryId: 'cat-1', subcategoryId: 'sub-17', categoryName: 'Bebidas', subcategoryName: 'Licores y Spirits', price: 14.50, stock: 50,  brand: 'J&B',       unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.WHISKY,       description: 'Whisky escocés blended 40% vol. 70cl' },
  { id: 'p-30',  sku: 'BEB-030', name: 'Ron Barceló Añejo 70cl',        categoryId: 'cat-1', subcategoryId: 'sub-17', categoryName: 'Bebidas', subcategoryName: 'Licores y Spirits', price: 13.80, stock: 40,  brand: 'Barceló',   unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.RUM,          description: 'Ron dominicano añejo 37.5% vol. 70cl' },
  // BEBIDAS: Café
  { id: 'p-31',  sku: 'BEB-031', name: 'Café Molido Marcilla 500g',     categoryId: 'cat-1', subcategoryId: 'sub-18', categoryName: 'Bebidas', subcategoryName: 'Café e Infusiones', price: 3.90, stock: 200,  brand: 'Marcilla',  unitMeasure: 'unidad',   iva: 10, active: true, imageUrl: IMGS.COFFEE,       description: 'Café molido mezcla 70/30 natural/torrefacto' },
  { id: 'p-32',  sku: 'BEB-032', name: 'Café Soluble Nescafé 100g',     categoryId: 'cat-1', subcategoryId: 'sub-18', categoryName: 'Bebidas', subcategoryName: 'Café e Infusiones', price: 4.50, stock: 150,  brand: 'Nescafé',   unitMeasure: 'unidad',   iva: 10, active: true, imageUrl: IMGS.COFFEE,       description: 'Café soluble clásico frasco 100g' },
  // ALIMENTACIÓN: Snacks
  { id: 'p-33',  sku: 'ALI-001', name: 'Patatas Lays Classic 150g',     categoryId: 'cat-2', subcategoryId: 'sub-5',  categoryName: 'Alimentación', subcategoryName: 'Patatas y Snacks',    price: 1.20, stock: 800,  brand: 'Lays',     unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.CHIPS,       description: 'Patatas fritas clásicas bolsa 150g' },
  { id: 'p-34',  sku: 'ALI-002', name: 'Pringles Original 165g',        categoryId: 'cat-2', subcategoryId: 'sub-5',  categoryName: 'Alimentación', subcategoryName: 'Patatas y Snacks',    price: 1.85, stock: 600,  brand: 'Pringles', unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.CHIPS,       description: 'Patatas crujientes en tubo 165g' },
  { id: 'p-35',  sku: 'ALI-003', name: 'Doritos Nacho Cheese 200g',     categoryId: 'cat-2', subcategoryId: 'sub-5',  categoryName: 'Alimentación', subcategoryName: 'Patatas y Snacks',    price: 1.60, stock: 500,  brand: 'Doritos',  unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.NACHOS,      description: 'Nachos sabor queso bolsa 200g' },
  { id: 'p-36',  sku: 'ALI-004', name: 'Ruffles Campesina 180g',        categoryId: 'cat-2', subcategoryId: 'sub-5',  categoryName: 'Alimentación', subcategoryName: 'Patatas y Snacks',    price: 1.40, stock: 400,  brand: 'Ruffles',  unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.CHIPS,       description: 'Patatas onduladas sabor campesinas 180g' },
  { id: 'p-37',  sku: 'ALI-005', name: 'Fritos Original 130g',          categoryId: 'cat-2', subcategoryId: 'sub-5',  categoryName: 'Alimentación', subcategoryName: 'Patatas y Snacks',    price: 1.10, stock: 350,  brand: 'Fritos',   unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.CHIPS,       description: 'Aperitivo de maíz 130g' },
  // ALIMENTACIÓN: Conservas
  { id: 'p-38',  sku: 'ALI-006', name: 'Atún Calvo Aceite Oliva 80g',   categoryId: 'cat-2', subcategoryId: 'sub-6',  categoryName: 'Alimentación', subcategoryName: 'Conservas',          price: 1.85, stock: 350,  brand: 'Calvo',          unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.TUNA,        description: 'Atún claro en aceite de oliva virgen extra' },
  { id: 'p-39',  sku: 'ALI-007', name: 'Aceitunas Rellenas La Española 300g', categoryId: 'cat-2', subcategoryId: 'sub-6', categoryName: 'Alimentación', subcategoryName: 'Conservas', price: 1.40, stock: 420,  brand: 'La Española',    unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.OLIVES,      description: 'Aceitunas rellenas de anchoa lata 300g' },
  { id: 'p-40',  sku: 'ALI-008', name: 'Mejillones en Escabeche 111g',  categoryId: 'cat-2', subcategoryId: 'sub-6',  categoryName: 'Alimentación', subcategoryName: 'Conservas',          price: 2.10, stock: 200,  brand: 'Dardo',          unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.CANNED,      description: 'Mejillones en salsa de escabeche' },
  { id: 'p-41',  sku: 'ALI-009', name: 'Sardinas en Aceite Ortiz 120g', categoryId: 'cat-2', subcategoryId: 'sub-6',  categoryName: 'Alimentación', subcategoryName: 'Conservas',          price: 1.50, stock: 300,  brand: 'Ortiz',          unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.SARDINES,    description: 'Sardinas en aceite de oliva 120g' },
  { id: 'p-42',  sku: 'ALI-010', name: 'Anchoas del Cantábrico Ortiz 50g', categoryId: 'cat-2', subcategoryId: 'sub-6', categoryName: 'Alimentación', subcategoryName: 'Conservas',       price: 3.80, stock: 20,   brand: 'Ortiz',          unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.CANNED,      description: 'Filetes de anchoa en aceite de oliva 50g' },
  // ALIMENTACIÓN: Congelados
  { id: 'p-43',  sku: 'ALI-011', name: 'Croquetas Jamón La Cocinera 500g', categoryId: 'cat-2', subcategoryId: 'sub-7', categoryName: 'Alimentación', subcategoryName: 'Congelados',       price: 2.95, stock: 15,   brand: 'La Cocinera', unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.FROZEN,      description: 'Croquetas de jamón ibérico congeladas 500g' },
  { id: 'p-44',  sku: 'ALI-012', name: 'Gambas Peladas Pescanova 500g', categoryId: 'cat-2', subcategoryId: 'sub-7',  categoryName: 'Alimentación', subcategoryName: 'Congelados',          price: 5.90, stock: 80,   brand: 'Pescanova',   unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.FROZEN,      description: 'Gambas peladas crudas congeladas 500g' },
  { id: 'p-45',  sku: 'ALI-013', name: 'Pizza Margarita Dr. Oetker 300g', categoryId: 'cat-2', subcategoryId: 'sub-7', categoryName: 'Alimentación', subcategoryName: 'Congelados',        price: 3.50, stock: 60,   brand: 'Dr. Oetker',  unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.FROZEN_PIZZA, description: 'Pizza margarita masa fina congelada 300g' },
  { id: 'p-46',  sku: 'ALI-014', name: 'Patatas Fritas McCain 1kg',     categoryId: 'cat-2', subcategoryId: 'sub-7',  categoryName: 'Alimentación', subcategoryName: 'Congelados',          price: 2.20, stock: 100,  brand: 'Mc Cain',     unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.FROZEN,      description: 'Patatas para freír corte classic 1kg' },
  // ALIMENTACIÓN: Lácteos
  { id: 'p-47',  sku: 'ALI-015', name: 'Leche Pascual Entera 1L',       categoryId: 'cat-2', subcategoryId: 'sub-8',  categoryName: 'Alimentación', subcategoryName: 'Lácteos',            price: 0.95, stock: 600,  brand: 'Pascual',    unitMeasure: 'unidad', iva: 4,  active: true, imageUrl: IMGS.MILK_CARTON, description: 'Leche entera UHT brick 1 litro' },
  { id: 'p-48',  sku: 'ALI-016', name: 'Leche Desnatada 1L',            categoryId: 'cat-2', subcategoryId: 'sub-8',  categoryName: 'Alimentación', subcategoryName: 'Lácteos',            price: 0.85, stock: 400,  brand: 'Hacendado',  unitMeasure: 'unidad', iva: 4,  active: true, imageUrl: IMGS.MILK,        description: 'Leche desnatada UHT brick 1 litro' },
  { id: 'p-49',  sku: 'ALI-017', name: 'Yogur Danone Natural 4x125g',   categoryId: 'cat-2', subcategoryId: 'sub-8',  categoryName: 'Alimentación', subcategoryName: 'Lácteos',            price: 1.20, stock: 300,  brand: 'Danone',     unitMeasure: 'pack',   iva: 4,  active: true, imageUrl: IMGS.YOGURT,      description: 'Yogur natural cremoso pack 4 unidades' },
  { id: 'p-50',  sku: 'ALI-018', name: 'Queso Lonchas El Caserío 200g', categoryId: 'cat-2', subcategoryId: 'sub-8',  categoryName: 'Alimentación', subcategoryName: 'Lácteos',            price: 1.90, stock: 250,  brand: 'El Caserío', unitMeasure: 'unidad', iva: 4,  active: true, imageUrl: IMGS.CHEESE,      description: 'Lonchas de queso fundido 200g' },
  { id: 'p-51',  sku: 'ALI-019', name: 'Mantequilla Président 250g',    categoryId: 'cat-2', subcategoryId: 'sub-8',  categoryName: 'Alimentación', subcategoryName: 'Lácteos',            price: 2.50, stock: 150,  brand: 'Président',  unitMeasure: 'unidad', iva: 4,  active: true, imageUrl: IMGS.BUTTER,      description: 'Mantequilla sin sal pastilla 250g' },
  { id: 'p-52',  sku: 'ALI-020', name: 'Natillas Danone Vainilla 4x135g', categoryId: 'cat-2', subcategoryId: 'sub-8', categoryName: 'Alimentación', subcategoryName: 'Lácteos',           price: 1.50, stock: 200,  brand: 'Danone',     unitMeasure: 'pack',   iva: 4,  active: true, imageUrl: IMGS.YOGURT,      description: 'Natillas sabor vainilla con galleta pack 4' },
  // ALIMENTACIÓN: Salsas
  { id: 'p-53',  sku: 'ALI-021', name: 'Tomate Frito Orlando 1L',       categoryId: 'cat-2', subcategoryId: 'sub-9',  categoryName: 'Alimentación', subcategoryName: 'Salsas y Condimentos', price: 1.50, stock: 0,   brand: 'Orlando',      unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.TOMATO_SAUCE, description: 'Tomate frito casero brick 1 litro' },
  { id: 'p-54',  sku: 'ALI-022', name: 'Ketchup Heinz 800g',            categoryId: 'cat-2', subcategoryId: 'sub-9',  categoryName: 'Alimentación', subcategoryName: 'Salsas y Condimentos', price: 2.80, stock: 280,  brand: 'Heinz',        unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.KETCHUP,      description: 'Ketchup clásico botella 800g' },
  { id: 'p-55',  sku: 'ALI-023', name: "Mayonesa Hellmann's 450ml",    categoryId: 'cat-2', subcategoryId: 'sub-9',  categoryName: 'Alimentación', subcategoryName: 'Salsas y Condimentos', price: 2.20, stock: 200,  brand: "Hellmann's",   unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.MAYO,         description: 'Mayonesa real tarro 450ml' },
  { id: 'p-56',  sku: 'ALI-024', name: 'Mostaza Dijon Amora 310g',      categoryId: 'cat-2', subcategoryId: 'sub-9',  categoryName: 'Alimentación', subcategoryName: 'Salsas y Condimentos', price: 1.60, stock: 180,  brand: 'Amora',        unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.KETCHUP,      description: 'Mostaza Dijon fina tarro 310g' },
  // ALIMENTACIÓN: Aceites
  { id: 'p-57',  sku: 'ALI-025', name: 'AOVE Carbonell 1L',             categoryId: 'cat-2', subcategoryId: 'sub-19', categoryName: 'Alimentación', subcategoryName: 'Aceites y Vinagres',  price: 5.20, stock: 300,  brand: 'Carbonell',  unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.OLIVE_OIL,   description: 'Aceite de oliva virgen extra primera extracción 1L' },
  { id: 'p-58',  sku: 'ALI-026', name: 'Aceite Girasol 1L',             categoryId: 'cat-2', subcategoryId: 'sub-19', categoryName: 'Alimentación', subcategoryName: 'Aceites y Vinagres',  price: 1.80, stock: 400,  brand: 'Hacendado',  unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.OLIVE_OIL,   description: 'Aceite de girasol refinado 1L' },
  { id: 'p-59',  sku: 'ALI-027', name: 'Vinagre Vino Blanco Borges 75cl', categoryId: 'cat-2', subcategoryId: 'sub-19', categoryName: 'Alimentación', subcategoryName: 'Aceites y Vinagres', price: 1.10, stock: 250,  brand: 'Borges',     unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.OLIVE_OIL,   description: 'Vinagre de vino blanco 750ml' },
  // ALIMENTACIÓN: Cereales
  { id: 'p-60',  sku: 'ALI-028', name: 'Arroz Largo SOS 1kg',           categoryId: 'cat-2', subcategoryId: 'sub-20', categoryName: 'Alimentación', subcategoryName: 'Cereales y Legumbres', price: 1.50, stock: 500, brand: 'SOS',       unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.RICE,        description: 'Arroz largo especial para paellas 1kg' },
  { id: 'p-61',  sku: 'ALI-029', name: 'Garbanzos Cocidos 400g',        categoryId: 'cat-2', subcategoryId: 'sub-20', categoryName: 'Alimentación', subcategoryName: 'Cereales y Legumbres', price: 0.90, stock: 350, brand: 'Cidacos',   unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.LEGUMES,     description: 'Garbanzos cocidos en conserva 400g' },
  { id: 'p-62',  sku: 'ALI-030', name: 'Lentejas Pardinas 400g',        categoryId: 'cat-2', subcategoryId: 'sub-20', categoryName: 'Alimentación', subcategoryName: 'Cereales y Legumbres', price: 0.85, stock: 300, brand: 'Cidacos',   unitMeasure: 'unidad', iva: 10, active: true, imageUrl: IMGS.LEGUMES,     description: 'Lentejas pardinas cocidas en conserva 400g' },
  // LIMPIEZA: Detergentes
  { id: 'p-63',  sku: 'LIM-001', name: 'Fregasuelos Pino 1.5L',         categoryId: 'cat-3', subcategoryId: 'sub-10', categoryName: 'Limpieza', subcategoryName: 'Detergentes',     price: 2.10, stock: 200,  brand: 'Don Limpio', unitMeasure: 'unidad',    iva: 21, active: true, imageUrl: IMGS.CLEANER,    description: 'Fregasuelos concentrado aroma pino 1.5L' },
  { id: 'p-64',  sku: 'LIM-002', name: 'Lavavajillas Fairy Limón 900ml', categoryId: 'cat-3', subcategoryId: 'sub-10', categoryName: 'Limpieza', subcategoryName: 'Detergentes',    price: 2.50, stock: 300,  brand: 'Fairy',      unitMeasure: 'unidad',    iva: 21, active: true, imageUrl: IMGS.DISH_SOAP,  description: 'Lavavajillas concentrado limón 900ml' },
  { id: 'p-65',  sku: 'LIM-003', name: 'Lavavajillas Mistol 1.4L',       categoryId: 'cat-3', subcategoryId: 'sub-10', categoryName: 'Limpieza', subcategoryName: 'Detergentes',    price: 1.80, stock: 250,  brand: 'Mistol',     unitMeasure: 'unidad',    iva: 21, active: true, imageUrl: IMGS.DISH_SOAP,  description: 'Lavavajillas concentrado azul 1.4L' },
  { id: 'p-66',  sku: 'LIM-004', name: 'Ariel Polvo 60 lavados',         categoryId: 'cat-3', subcategoryId: 'sub-10', categoryName: 'Limpieza', subcategoryName: 'Detergentes',    price: 8.90, stock: 120,  brand: 'Ariel',      unitMeasure: 'unidad',    iva: 21, active: true, imageUrl: IMGS.LAUNDRY,    description: 'Detergente polvo con Actilift 60 lavados' },
  { id: 'p-67',  sku: 'LIM-005', name: 'Skip Color Líquido 50 lavados',  categoryId: 'cat-3', subcategoryId: 'sub-10', categoryName: 'Limpieza', subcategoryName: 'Detergentes',    price: 7.50, stock: 100,  brand: 'Skip',       unitMeasure: 'unidad',    iva: 21, active: true, imageUrl: IMGS.LAUNDRY,    description: 'Detergente líquido ropa color 50 lavados' },
  { id: 'p-68',  sku: 'LIM-006', name: 'Suavizante Mimosín 60 dosis',    categoryId: 'cat-3', subcategoryId: 'sub-10', categoryName: 'Limpieza', subcategoryName: 'Detergentes',    price: 4.20, stock: 180,  brand: 'Mimosín',    unitMeasure: 'unidad',    iva: 21, active: true, imageUrl: IMGS.LAUNDRY,    description: 'Suavizante concentrado azul 60 dosis' },
  // LIMPIEZA: Desinfectantes
  { id: 'p-69',  sku: 'LIM-007', name: 'Lejía ACE 2L',                   categoryId: 'cat-3', subcategoryId: 'sub-11', categoryName: 'Limpieza', subcategoryName: 'Desinfectantes', price: 1.25, stock: 5,    brand: 'ACE',        unitMeasure: 'unidad',    iva: 21, active: true, imageUrl: IMGS.BLEACH,     description: 'Lejía desinfectante concentrada 2 litros' },
  { id: 'p-70',  sku: 'LIM-008', name: 'Lejía Conejo 1.5L',              categoryId: 'cat-3', subcategoryId: 'sub-11', categoryName: 'Limpieza', subcategoryName: 'Desinfectantes', price: 0.99, stock: 80,   brand: 'Conejo',     unitMeasure: 'unidad',    iva: 21, active: true, imageUrl: IMGS.BLEACH,     description: 'Lejía doméstica 1.5 litros' },
  { id: 'p-71',  sku: 'LIM-009', name: 'Mr Proper Spray 750ml',           categoryId: 'cat-3', subcategoryId: 'sub-11', categoryName: 'Limpieza', subcategoryName: 'Desinfectantes', price: 2.80, stock: 150,  brand: 'Mr Proper',  unitMeasure: 'unidad',    iva: 21, active: true, imageUrl: IMGS.SPRAY,      description: 'Limpiador multiusos spray 750ml' },
  { id: 'p-72',  sku: 'LIM-010', name: 'Domestos WC Gel 750ml',           categoryId: 'cat-3', subcategoryId: 'sub-11', categoryName: 'Limpieza', subcategoryName: 'Desinfectantes', price: 2.10, stock: 120,  brand: 'Domestos',   unitMeasure: 'unidad',    iva: 21, active: true, imageUrl: IMGS.BLEACH,     description: 'Limpiador WC con lejía en gel 750ml' },
  // LIMPIEZA: Papel
  { id: 'p-73',  sku: 'LIM-011', name: 'Papel Higiénico Scottex 12 rollos', categoryId: 'cat-3', subcategoryId: 'sub-12', categoryName: 'Limpieza', subcategoryName: 'Papel',       price: 4.50, stock: 300,  brand: 'Scottex',    unitMeasure: 'pack',      iva: 21, active: true, imageUrl: IMGS.TOILET_PAPER, description: 'Papel higiénico doble capa pack 12' },
  { id: 'p-74',  sku: 'LIM-012', name: 'Papel Higiénico Renova 6 rollos', categoryId: 'cat-3', subcategoryId: 'sub-12', categoryName: 'Limpieza', subcategoryName: 'Papel',        price: 3.50, stock: 200,  brand: 'Renova',     unitMeasure: 'pack',      iva: 21, active: true, imageUrl: IMGS.TOILET_PAPER, description: 'Papel higiénico premium perfumado pack 6' },
  { id: 'p-75',  sku: 'LIM-013', name: 'Rollo Cocina Scottex 3 ud',       categoryId: 'cat-3', subcategoryId: 'sub-12', categoryName: 'Limpieza', subcategoryName: 'Papel',        price: 2.80, stock: 250,  brand: 'Scottex',    unitMeasure: 'pack',      iva: 21, active: true, imageUrl: IMGS.KITCHEN_ROLL, description: 'Papel de cocina súper absorbente pack 3' },
  // LIMPIEZA: Ambientadores
  { id: 'p-76',  sku: 'LIM-014', name: 'Febreze Spray 300ml',             categoryId: 'cat-3', subcategoryId: 'sub-21', categoryName: 'Limpieza', subcategoryName: 'Ambientadores', price: 3.50, stock: 100,  brand: 'Febreze',    unitMeasure: 'unidad',    iva: 21, active: true, imageUrl: IMGS.AIR_FRESH,  description: 'Eliminador de olores en spray 300ml' },
  { id: 'p-77',  sku: 'LIM-015', name: 'Air Wick Plug-in Lavanda',        categoryId: 'cat-3', subcategoryId: 'sub-21', categoryName: 'Limpieza', subcategoryName: 'Ambientadores', price: 4.20, stock: 80,   brand: 'Air Wick',   unitMeasure: 'unidad',    iva: 21, active: true, imageUrl: IMGS.AIR_FRESH,  description: 'Ambientador eléctrico recargable lavanda' },
  // LIMPIEZA: Útiles
  { id: 'p-78',  sku: 'LIM-016', name: 'Bayetas Multiusos 10ud',          categoryId: 'cat-3', subcategoryId: 'sub-22', categoryName: 'Limpieza', subcategoryName: 'Útiles de Limpieza', price: 1.90, stock: 200, brand: 'Spontex',  unitMeasure: 'pack',      iva: 21, active: true, imageUrl: IMGS.SPONGE,     description: 'Bayetas de microfibra multiusos pack 10' },
  { id: 'p-79',  sku: 'LIM-017', name: 'Estropajo Verde Vileda 3ud',      categoryId: 'cat-3', subcategoryId: 'sub-22', categoryName: 'Limpieza', subcategoryName: 'Útiles de Limpieza', price: 0.90, stock: 300, brand: 'Vileda',   unitMeasure: 'pack',      iva: 21, active: true, imageUrl: IMGS.SPONGE,     description: 'Estropajo verde fibra abrasiva pack 3' },
  { id: 'p-80',  sku: 'LIM-018', name: 'Guantes de Goma Talla M',         categoryId: 'cat-3', subcategoryId: 'sub-22', categoryName: 'Limpieza', subcategoryName: 'Útiles de Limpieza', price: 1.50, stock: 150, brand: 'Vileda',   unitMeasure: 'par',       iva: 21, active: true, imageUrl: IMGS.GLOVES,     description: 'Guantes de protección hogar talla M' },
  // MENAJE: Vasos y Platos
  { id: 'p-81',  sku: 'MEN-001', name: 'Vasos Plástico 200ml 100ud',      categoryId: 'cat-4', subcategoryId: 'sub-13', categoryName: 'Menaje / Desechables', subcategoryName: 'Vasos y Platos', price: 3.20, stock: 500, brand: 'Papstar', unitMeasure: 'pack 100', iva: 21, active: true, imageUrl: IMGS.PLASTIC_CUPS, description: 'Vasos plástico transparente 200ml pack 100' },
  { id: 'p-82',  sku: 'MEN-002', name: 'Vasos Plástico Rojo 300ml 50ud', categoryId: 'cat-4', subcategoryId: 'sub-13', categoryName: 'Menaje / Desechables', subcategoryName: 'Vasos y Platos', price: 3.50, stock: 400, brand: 'Papstar', unitMeasure: 'pack 50',  iva: 21, active: true, imageUrl: IMGS.PLASTIC_CUPS, description: 'Vasos plástico rojo americano 300ml pack 50' },
  { id: 'p-83',  sku: 'MEN-003', name: 'Vasos Papel Café 100ml 50ud',    categoryId: 'cat-4', subcategoryId: 'sub-13', categoryName: 'Menaje / Desechables', subcategoryName: 'Vasos y Platos', price: 2.80, stock: 300, brand: 'Solia',   unitMeasure: 'pack 50',  iva: 21, active: true, imageUrl: IMGS.PAPER_CUPS,   description: 'Vasos de papel para café/té 100ml pack 50' },
  { id: 'p-84',  sku: 'MEN-004', name: 'Vasos Papel 200ml 50ud',         categoryId: 'cat-4', subcategoryId: 'sub-13', categoryName: 'Menaje / Desechables', subcategoryName: 'Vasos y Platos', price: 2.50, stock: 350, brand: 'Solia',   unitMeasure: 'pack 50',  iva: 21, active: true, imageUrl: IMGS.PAPER_CUPS,   description: 'Vasos de papel biodegradables 200ml pack 50' },
  { id: 'p-85',  sku: 'MEN-005', name: 'Platos Cartón 23cm 50ud',        categoryId: 'cat-4', subcategoryId: 'sub-13', categoryName: 'Menaje / Desechables', subcategoryName: 'Vasos y Platos', price: 4.50, stock: 250, brand: 'EcoPack', unitMeasure: 'pack 50',  iva: 21, active: true, imageUrl: IMGS.PLATES,       description: 'Platos cartón biodegradable 23cm pack 50' },
  { id: 'p-86',  sku: 'MEN-006', name: 'Platos Plástico 25cm 25ud',      categoryId: 'cat-4', subcategoryId: 'sub-13', categoryName: 'Menaje / Desechables', subcategoryName: 'Vasos y Platos', price: 3.80, stock: 200, brand: 'Papstar', unitMeasure: 'pack 25',  iva: 21, active: true, imageUrl: IMGS.PLATES,       description: 'Platos plástico blancos resistentes 25cm' },
  // MENAJE: Servilletas
  { id: 'p-87',  sku: 'MEN-007', name: 'Servilletas Blancas 30x30 200ud', categoryId: 'cat-4', subcategoryId: 'sub-14', categoryName: 'Menaje / Desechables', subcategoryName: 'Servilletas', price: 2.80, stock: 8,   brand: 'Colhogar', unitMeasure: 'pack 200', iva: 21, active: true, imageUrl: IMGS.NAPKINS, description: 'Servilletas blancas 2 capas 30x30cm pack 200' },
  { id: 'p-88',  sku: 'MEN-008', name: 'Servilletas Cóctel 25x25 100ud', categoryId: 'cat-4', subcategoryId: 'sub-14', categoryName: 'Menaje / Desechables', subcategoryName: 'Servilletas', price: 1.50, stock: 400, brand: 'Colhogar', unitMeasure: 'pack 100', iva: 21, active: true, imageUrl: IMGS.NAPKINS, description: 'Servilletas tamaño cóctel 25x25cm pack 100' },
  { id: 'p-89',  sku: 'MEN-009', name: 'Servilletas Color 33x33 100ud',  categoryId: 'cat-4', subcategoryId: 'sub-14', categoryName: 'Menaje / Desechables', subcategoryName: 'Servilletas', price: 2.10, stock: 250, brand: 'Solia',    unitMeasure: 'pack 100', iva: 21, active: true, imageUrl: IMGS.NAPKINS, description: 'Servilletas decorativas colores 33x33cm' },
  // MENAJE: Bolsas y Film
  { id: 'p-90',  sku: 'MEN-010', name: 'Bolsas Basura 30L 30ud',         categoryId: 'cat-4', subcategoryId: 'sub-23', categoryName: 'Menaje / Desechables', subcategoryName: 'Bolsas y Film', price: 1.80, stock: 500, brand: 'Albal',   unitMeasure: 'pack 30',  iva: 21, active: true, imageUrl: IMGS.TRASH_BAGS, description: 'Bolsas basura domésticas 30L pack 30' },
  { id: 'p-91',  sku: 'MEN-011', name: 'Bolsas Basura 50L 20ud',         categoryId: 'cat-4', subcategoryId: 'sub-23', categoryName: 'Menaje / Desechables', subcategoryName: 'Bolsas y Film', price: 2.20, stock: 400, brand: 'Albal',   unitMeasure: 'pack 20',  iva: 21, active: true, imageUrl: IMGS.TRASH_BAGS, description: 'Bolsas basura grandes 50L pack 20' },
  { id: 'p-92',  sku: 'MEN-012', name: 'Film Transparente 300m',         categoryId: 'cat-4', subcategoryId: 'sub-23', categoryName: 'Menaje / Desechables', subcategoryName: 'Bolsas y Film', price: 3.50, stock: 200, brand: 'Albal',   unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.FOIL,       description: 'Film plástico transparente rollo 300m' },
  { id: 'p-93',  sku: 'MEN-013', name: 'Papel Aluminio 30cm x 20m',      categoryId: 'cat-4', subcategoryId: 'sub-23', categoryName: 'Menaje / Desechables', subcategoryName: 'Bolsas y Film', price: 2.80, stock: 180, brand: 'Albal',   unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.FOIL,       description: 'Papel aluminio rollo cocina 20 metros' },
  { id: 'p-94',  sku: 'MEN-014', name: 'Papel Horno Antiadherente 8m',   categoryId: 'cat-4', subcategoryId: 'sub-23', categoryName: 'Menaje / Desechables', subcategoryName: 'Bolsas y Film', price: 1.90, stock: 220, brand: 'Albal',   unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.FOIL,       description: 'Papel para horno antiadherente 8 metros' },
  // MENAJE: Cubiertos
  { id: 'p-95',  sku: 'MEN-015', name: 'Cubiertos Plástico Set 100ud',   categoryId: 'cat-4', subcategoryId: 'sub-24', categoryName: 'Menaje / Desechables', subcategoryName: 'Cubiertos', price: 4.20, stock: 300, brand: 'Papstar', unitMeasure: 'pack 100', iva: 21, active: true, imageUrl: IMGS.CUTLERY, description: 'Set cubiertos plástico (tenedor+cuchillo+cuchara) pack 100' },
  { id: 'p-96',  sku: 'MEN-016', name: 'Tenedores Plástico 100ud',       categoryId: 'cat-4', subcategoryId: 'sub-24', categoryName: 'Menaje / Desechables', subcategoryName: 'Cubiertos', price: 1.80, stock: 400, brand: 'Papstar', unitMeasure: 'pack 100', iva: 21, active: true, imageUrl: IMGS.CUTLERY, description: 'Tenedores desechables plástico pack 100' },
  { id: 'p-97',  sku: 'MEN-017', name: 'Palillos Madera 200ud',          categoryId: 'cat-4', subcategoryId: 'sub-24', categoryName: 'Menaje / Desechables', subcategoryName: 'Cubiertos', price: 0.80, stock: 500, brand: 'Solia',   unitMeasure: 'pack 200', iva: 21, active: true, imageUrl: IMGS.CUTLERY, description: 'Palillos mondadientes madera individuales pack 200' },
  { id: 'p-98',  sku: 'MEN-018', name: 'Brochetas Madera 30cm 100ud',    categoryId: 'cat-4', subcategoryId: 'sub-24', categoryName: 'Menaje / Desechables', subcategoryName: 'Cubiertos', price: 1.50, stock: 350, brand: 'Solia',   unitMeasure: 'pack 100', iva: 21, active: true, imageUrl: IMGS.CUTLERY, description: 'Brochetas de madera para barbacoa 30cm pack 100' },
  // DROGUERÍA: Higiene Personal
  { id: 'p-99',  sku: 'DRO-001', name: 'Gel Manos Sanytol 500ml',        categoryId: 'cat-5', subcategoryId: 'sub-15', categoryName: 'Droguería', subcategoryName: 'Higiene Personal', price: 2.50, stock: 120, brand: 'Sanytol',   unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.HAND_GEL,   description: 'Gel desinfectante de manos con aloe vera 500ml' },
  { id: 'p-100', sku: 'DRO-002', name: 'Jabón Líquido Dove 300ml',       categoryId: 'cat-5', subcategoryId: 'sub-15', categoryName: 'Droguería', subcategoryName: 'Higiene Personal', price: 1.90, stock: 90,  brand: 'Dove',      unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.LIQUID_SOAP, description: 'Jabón líquido hidratante para manos 300ml' },
  { id: 'p-101', sku: 'DRO-003', name: 'Gel Ducha Dove 750ml',           categoryId: 'cat-5', subcategoryId: 'sub-15', categoryName: 'Droguería', subcategoryName: 'Higiene Personal', price: 2.80, stock: 150, brand: 'Dove',      unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.SHOWER_GEL, description: 'Gel de ducha hidratante original 750ml' },
  { id: 'p-102', sku: 'DRO-004', name: 'Gel Ducha Palmolive 750ml',      categoryId: 'cat-5', subcategoryId: 'sub-15', categoryName: 'Droguería', subcategoryName: 'Higiene Personal', price: 2.20, stock: 120, brand: 'Palmolive', unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.SHOWER_GEL, description: 'Gel de ducha nutritivo 750ml' },
  { id: 'p-103', sku: 'DRO-005', name: 'Desodorante Nivea Roll-on 50ml', categoryId: 'cat-5', subcategoryId: 'sub-15', categoryName: 'Droguería', subcategoryName: 'Higiene Personal', price: 2.10, stock: 100, brand: 'Nivea',     unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.DEODORANT,  description: 'Desodorante roll-on 48h protección 50ml' },
  { id: 'p-104', sku: 'DRO-006', name: 'Desodorante Axe Spray 150ml',    categoryId: 'cat-5', subcategoryId: 'sub-15', categoryName: 'Droguería', subcategoryName: 'Higiene Personal', price: 2.50, stock: 80,  brand: 'Axe',       unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.DEODORANT,  description: 'Desodorante body spray hombre 150ml' },
  { id: 'p-105', sku: 'DRO-007', name: 'Crema Manos Neutrogena 75ml',    categoryId: 'cat-5', subcategoryId: 'sub-15', categoryName: 'Droguería', subcategoryName: 'Higiene Personal', price: 3.50, stock: 70,  brand: 'Neutrogena',unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.LIQUID_SOAP, description: 'Crema de manos noruega concentrada 75ml' },
  // DROGUERÍA: Cuidado Capilar
  { id: 'p-106', sku: 'DRO-008', name: 'Champú Pantene Pro-V 385ml',     categoryId: 'cat-5', subcategoryId: 'sub-25', categoryName: 'Droguería', subcategoryName: 'Cuidado Capilar', price: 3.20, stock: 130, brand: 'Pantene',    unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.SHAMPOO, description: 'Champú reparación intensa Pro-V 385ml' },
  { id: 'p-107', sku: 'DRO-009', name: 'Champú Elvive Hidra 400ml',      categoryId: 'cat-5', subcategoryId: 'sub-25', categoryName: 'Droguería', subcategoryName: 'Cuidado Capilar', price: 2.90, stock: 110, brand: "L'Oréal",    unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.SHAMPOO, description: 'Champú hidratación extraordinaria 400ml' },
  { id: 'p-108', sku: 'DRO-010', name: 'Acondicionador Pantene 385ml',   categoryId: 'cat-5', subcategoryId: 'sub-25', categoryName: 'Droguería', subcategoryName: 'Cuidado Capilar', price: 3.20, stock: 100, brand: 'Pantene',    unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.SHAMPOO, description: 'Acondicionador reparación intensa 385ml' },
  // DROGUERÍA: Afeitado
  { id: 'p-109', sku: 'DRO-011', name: 'Espuma Afeitar Gillette 250ml',  categoryId: 'cat-5', subcategoryId: 'sub-26', categoryName: 'Droguería', subcategoryName: 'Afeitado', price: 2.80, stock: 90,  brand: 'Gillette', unitMeasure: 'unidad',   iva: 21, active: true, imageUrl: IMGS.RAZOR, description: 'Espuma de afeitar clásica sensible 250ml' },
  { id: 'p-110', sku: 'DRO-012', name: 'Maquinillas BIC 2H 10ud',        categoryId: 'cat-5', subcategoryId: 'sub-26', categoryName: 'Droguería', subcategoryName: 'Afeitado', price: 2.50, stock: 120, brand: 'BIC',      unitMeasure: 'pack 10',  iva: 21, active: true, imageUrl: IMGS.RAZOR, description: 'Maquinillas desechables 2 hojas pack 10' },
  // DROGUERÍA: Higiene Dental
  { id: 'p-111', sku: 'DRO-013', name: 'Colgate Total 75ml',             categoryId: 'cat-5', subcategoryId: 'sub-27', categoryName: 'Droguería', subcategoryName: 'Higiene Dental', price: 2.30, stock: 150, brand: 'Colgate',   unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.TOOTHPASTE, description: 'Pasta de dientes protección total 75ml' },
  { id: 'p-112', sku: 'DRO-014', name: 'Cepillo Oral-B Suave',           categoryId: 'cat-5', subcategoryId: 'sub-27', categoryName: 'Droguería', subcategoryName: 'Higiene Dental', price: 2.10, stock: 80,  brand: 'Oral-B',    unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.TOOTHPASTE, description: 'Cepillo dental manual cerdas suaves' },
  { id: 'p-113', sku: 'DRO-015', name: 'Listerine Cool Mint 500ml',      categoryId: 'cat-5', subcategoryId: 'sub-27', categoryName: 'Droguería', subcategoryName: 'Higiene Dental', price: 3.80, stock: 70,  brand: 'Listerine', unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.MOUTHWASH,  description: 'Colutorio antiséptico Cool Mint 500ml' },
  // DROGUERÍA: Primeros Auxilios
  { id: 'p-114', sku: 'DRO-016', name: 'Tiritas Hansaplast 20ud',        categoryId: 'cat-5', subcategoryId: 'sub-28', categoryName: 'Droguería', subcategoryName: 'Primeros Auxilios', price: 2.90, stock: 100, brand: 'Hansaplast', unitMeasure: 'pack 20', iva: 21, active: true, imageUrl: IMGS.HAND_GEL,  description: 'Tiritas adhesivas surtidas pack 20' },
  { id: 'p-115', sku: 'DRO-017', name: 'Protector Solar Nivea SPF50 200ml', categoryId: 'cat-5', subcategoryId: 'sub-28', categoryName: 'Droguería', subcategoryName: 'Primeros Auxilios', price: 5.90, stock: 50, brand: 'Nivea',     unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.SUNSCREEN, description: 'Crema solar alta protección SPF50 200ml' },
  { id: 'p-116', sku: 'DRO-018', name: 'Algodón Hidrófilo 100g',         categoryId: 'cat-5', subcategoryId: 'sub-28', categoryName: 'Droguería', subcategoryName: 'Primeros Auxilios', price: 1.50, stock: 120, brand: 'Hartmann',  unitMeasure: 'unidad', iva: 21, active: true, imageUrl: IMGS.HAND_GEL,  description: 'Algodón hidrófilo en rollo 100g' },
];

// ── ORDERS ────────────────────────────────────────────────────────────────────
export const mockOrders: Order[] = [
  {
    id: 'ord-1', orderId: 'PED-2026-00001', companyId: 'comp-1',
    companyName: 'Restaurante El Buen Sabor S.L.', companyCif: 'B12345678',
    companyEmail: 'compras@elbuensabor.es', companyPhone: '+34 912 345 678',
    contactPerson: 'María García López', deliveryAddress: 'Calle Mayor 42, 28013 Madrid',
    items: [
      { productId: 'p-1',  sku: 'BEB-001', name: 'Agua Bezoya 1.5L',          categoryName: 'Bebidas',      quantity: 100, unitPrice: 0.45, subtotal: 45.00 },
      { productId: 'p-6',  sku: 'BEB-006', name: 'Coca-Cola 33cl',             categoryName: 'Bebidas',      quantity: 200, unitPrice: 0.55, subtotal: 110.00 },
      { productId: 'p-33', sku: 'ALI-001', name: 'Patatas Lays Classic 150g',  categoryName: 'Alimentación', quantity: 50,  unitPrice: 1.20, subtotal: 60.00 },
      { productId: 'p-63', sku: 'LIM-001', name: 'Fregasuelos Pino 1.5L',      categoryName: 'Limpieza',     quantity: 10,  unitPrice: 2.10, subtotal: 21.00 },
    ],
    totalItems: 4, totalAmount: 236.00, notes: 'Entregar antes de las 10:00',
    status: 'completed', createdAt: '2026-03-18T09:30:00', estimatedDelivery: '2026-03-21',
  },
  {
    id: 'ord-2', orderId: 'PED-2026-00002', companyId: 'comp-2',
    companyName: 'Hotel Mediterráneo', companyCif: 'A87654321',
    companyEmail: 'proveedores@hotelmed.com', companyPhone: '+34 963 456 789',
    contactPerson: 'Carlos Fernández Ruiz', deliveryAddress: 'Avda del Puerto 15, 46023 Valencia',
    items: [
      { productId: 'p-14', sku: 'BEB-014', name: 'Cerveza Mahou 25cl',            categoryName: 'Bebidas',              quantity: 500, unitPrice: 0.65, subtotal: 325.00 },
      { productId: 'p-20', sku: 'BEB-020', name: 'Vino Rioja Crianza 75cl',        categoryName: 'Bebidas',              quantity: 30,  unitPrice: 5.80, subtotal: 174.00 },
      { productId: 'p-47', sku: 'ALI-015', name: 'Leche Pascual Entera 1L',        categoryName: 'Alimentación',         quantity: 100, unitPrice: 0.95, subtotal: 95.00 },
      { productId: 'p-73', sku: 'LIM-011', name: 'Papel Higiénico Scottex 12',     categoryName: 'Limpieza',             quantity: 20,  unitPrice: 4.50, subtotal: 90.00 },
      { productId: 'p-81', sku: 'MEN-001', name: 'Vasos Plástico 100ud',           categoryName: 'Menaje / Desechables', quantity: 10,  unitPrice: 3.20, subtotal: 32.00 },
    ],
    totalItems: 5, totalAmount: 716.00,
    status: 'processing', createdAt: '2026-03-19T14:15:00', estimatedDelivery: '2026-03-22',
  },
  {
    id: 'ord-3', orderId: 'PED-2026-00003', companyId: 'comp-3',
    companyName: 'Bar Pepe & Hermanos', companyCif: 'B55667788',
    companyEmail: 'pedidos@barpepe.es', companyPhone: '+34 955 112 233',
    contactPerson: 'José Martín Sánchez', deliveryAddress: 'Plaza de España 7, 41001 Sevilla',
    items: [
      { productId: 'p-6',  sku: 'BEB-006', name: 'Coca-Cola 33cl',            categoryName: 'Bebidas',      quantity: 120, unitPrice: 0.55, subtotal: 66.00 },
      { productId: 'p-38', sku: 'ALI-006', name: 'Atún Calvo Aceite Oliva',   categoryName: 'Alimentación', quantity: 40,  unitPrice: 1.85, subtotal: 74.00 },
      { productId: 'p-39', sku: 'ALI-007', name: 'Aceitunas Rellenas 300g',   categoryName: 'Alimentación', quantity: 30,  unitPrice: 1.40, subtotal: 42.00 },
    ],
    totalItems: 3, totalAmount: 182.00,
    status: 'pending', createdAt: '2026-03-19T11:00:00', estimatedDelivery: '2026-03-22',
  },
];
