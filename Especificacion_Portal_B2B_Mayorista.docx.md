

| ESPECIFICACION TECNICA Y FUNCIONAL Portal B2B de Pedidos Mayoristas con Categorias |
| :---: |

| Web App B2B Tipo de Proyecto | React \+ Supabase Arquitectura | EmailJS Email Engine | Vercel 24/7 Deploy |
| :---: | :---: | :---: | :---: |

| Version | 1.0 |
| :---- | :---- |
| **Fecha** | Marzo 2026 |
| **Autor** | Levi |
| **Clasificacion** | Confidencial \- Uso interno |

# **INDICE DE CONTENIDOS**

**1\.**  Resumen Ejecutivo

**2\.**  Referencias de Diseno UI (Benchmarks)

**3\.**  Arquitectura Tecnica

**4\.**  Estructura de Pantallas y Flujos

**5\.**  Panel del Proveedor (Admin)

**6\.**  Portal del Cliente (Empresa Compradora)

**7\.**  Sistema de Categorias de Productos

**8\.**  Sistema de Pedidos y Notificaciones por Email

**9\.**  Gestion de Stock y CSV

**10\.**  Formato del CSV de Productos

**11\.**  Especificacion de la Plantilla de Email

**12\.**  Requisitos No Funcionales

**13\.**  Stack Tecnologico Recomendado

**14\.**  Guia de Despliegue 24/7

**15\.**  Dominio y DNS

**16\.**  Estimacion de Costes

**17\.**  Roadmap de Desarrollo

# **1\. RESUMEN EJECUTIVO**

Este documento define la especificacion completa para el desarrollo de un portal web B2B de pedidos mayoristas. La plataforma permite a un proveedor unico gestionar su catalogo de productos organizado por categorias (Bebidas, Alimentacion, etc.) mediante la carga de archivos CSV, y ofrece a las empresas clientes un portal donde consultar el catalogo en tiempo real, seleccionar cantidades y enviar pedidos que llegan directamente al email del proveedor.

La solucion se despliega como una aplicacion web estatica con backend serverless, garantizando disponibilidad 24/7 sin costes de servidor tradicional, con escalabilidad automatica y distribucion global via CDN.

| 2 Roles del Sistema | 7 Pantallas Principales | 99.9% Disponibilidad | 0 EUR Coste Mensual |
| :---: | :---: | :---: | :---: |

**Objetivos clave del proyecto:**

**01**  Permitir la carga masiva de productos via CSV con precios, stock, categorias y descripciones.

**02**  Organizar el catalogo por categorias y subcategorias (Bebidas, Alimentacion, Limpieza, etc.).

**03**  Ofrecer un catalogo publico filtrable y con busqueda instantanea para empresas clientes.

**04**  Permitir a cada empresa crear un pedido seleccionando productos y cantidades de cualquier categoria.

**05**  Enviar automaticamente cada pedido al email del proveedor con detalle completo y desglose por categoria.

**06**  Garantizar disponibilidad continua 24/7 mediante despliegue en Vercel \+ CDN global.

**07**  Mantener un diseno profesional, rapido y responsive para cualquier dispositivo.

# **2\. REFERENCIAS DE DISENO UI (BENCHMARKS)**

Se han analizado las mejores plataformas B2B del mundo para extraer patrones de diseno aplicables a este proyecto. A continuacion se detallan las referencias seleccionadas y los principios clave extraidos de cada una.

| Plataforma | Patron Clave de Diseno | Aplicacion al Proyecto |
| :---- | :---- | :---- |
| McMaster-Carr(mcmaster.com) | Velocidad extrema de carga (\<100ms). Filtros parametricos laterales sticky. Navegacion de catalogo con cero distracciones. Busqueda predictiva instantanea. Layout tipo wireframe funcional. | Adoptar navegacion lateral con filtros por categoria. Busqueda instantanea en header. Layout limpio sin animaciones innecesarias. Prefetching de paginas al hover. |
| Grainger(grainger.com) | Stock en tiempo real por ubicacion. Historial de pedidos con reordenado rapido. Integracion procurement. Catalogo por categorias industriales. Quick Add to Cart visible. | Mostrar stock disponible junto a cada producto. Boton de agregar al carrito prominente. Sistema de categorias robusto con breadcrumbs. |
| Uline(uline.com) | Quick Order por SKU/referencia. Catalogo masivo con busqueda eficiente. Checkout simplificado en un paso. Categorias claras con iconos. Grid de productos denso. | Campo de pedido rapido por referencia. Checkout sin pasos innecesarios. Grid de productos compacto con info esencial visible. |
| Amazon Business(amazon.com/business) | Interfaz familiar tipo marketplace. Precios por volumen visibles. Filtros robustos por categoria, marca, precio. Controles multi-usuario. UX de carrito fluida. | UI intuitiva familiar para cualquier usuario. Estructura de precios clara. Barra de categorias horizontal \+ filtros laterales. |
| B2B Wave(b2bwave.com) | Portal mayorista con marca propia. Catalogos personalizados por cliente. Sistema de pedidos \+ presupuestos integrado. Dashboard limpio. | Branding personalizado del proveedor. Catalogo completo con busqueda y filtros. Dashboard admin con metricas de pedidos. |
| Fastenal(fastenal.com) | Inventario por ubicacion. Herramientas de cotizacion. Categorias por industria y aplicacion. Disponibilidad regional. | Transparencia total de stock. Navegacion por categoria con conteo de productos. |

**Principios de diseno extraidos para este proyecto:**

**Velocidad ante todo:** Las paginas deben cargar en menos de 1 segundo. Sin animaciones pesadas, sin scripts de tracking, sin pop-ups intrusivos. Server-side rendering donde sea posible.

**Categorias como eje central:** Todo el catalogo se organiza por categorias y subcategorias. La navegacion principal esta basada en categorias (Bebidas, Alimentacion, Limpieza, etc.) con iconos representativos.

**Stock visible siempre:** Cada producto muestra stock disponible en tiempo real. Stock bajo se marca en naranja. Agotado se marca en rojo con producto deshabilitado para pedido.

**Busqueda y filtros robustos:** Barra de busqueda prominente con resultados instantaneos. Filtros laterales por categoria, precio, disponibilidad y marca.

**Checkout en un paso:** Seleccionar cantidades, revisar carrito con desglose por categoria, confirmar datos de empresa y enviar. Maximo 3 clics desde el carrito hasta el envio.

**Mobile-first y responsive:** Las empresas compradoras pueden hacer pedidos desde tablet o movil sin fricciones. Todos los componentes se adaptan a cualquier resolucion.

# **3\. ARQUITECTURA TECNICA**

La arquitectura sigue un patron JAMstack moderno: frontend estatico desplegado en CDN global, con backend serverless para logica de negocio y almacenamiento de datos en la nube. Esto garantiza alta disponibilidad, bajo coste y escalabilidad automatica sin necesidad de gestionar servidores.

| Capa | Tecnologia | Funcion |
| :---- | :---- | :---- |
| Frontend | React (Vite) \+ Tailwind CSS | Interfaz de usuario SPA. Catalogo con categorias, carrito de compra, formularios de pedido. Renderizado rapido con lazy loading por categoria. |
| Backend / BaaS | Supabase (PostgreSQL) | Base de datos relacional para productos, categorias, usuarios y pedidos. Autenticacion, Row Level Security, almacenamiento de CSVs. |
| Email | EmailJS (plan gratuito: 200/mes) | Envio de emails de pedido desde el frontend sin servidor propio. Plantillas HTML con detalle de pedido y desglose por categorias. |
| Hosting | Vercel (plan Hobby gratuito) | Deploy automatico desde GitHub. CDN global (Edge Network). SSL gratuito. Dominio personalizado. 100GB bandwidth/mes. |
| DNS / CDN | Cloudflare (gratuito) | Gestion de DNS, cache extra, proteccion DDoS, certificado SSL adicional, reglas de redireccion y optimizacion. |

## **Flujo de datos del sistema**

| PROVEEDOR (Admin) 1\. Sube CSV de productos 2\. Gestiona categorias 3\. Actualiza stock 4\. Recibe emails de pedido | PLATAFORMA Vercel (hosting 24/7) Supabase (BD \+ Auth) EmailJS (notificaciones) Cloudflare (CDN \+ DNS) | EMPRESAS CLIENTES 1\. Se registran/login 2\. Navegan por categorias 3\. Seleccionan productos 4\. Envian pedido |
| ----- | ----- | ----- |

# **4\. ESTRUCTURA DE PANTALLAS Y FLUJOS**

La aplicacion se divide en dos areas: el Panel del Proveedor (admin) y el Portal del Cliente. Cada area tiene pantallas especificas.

| ID | Pantalla | Descripcion Funcional |
| :---- | :---- | :---- |
| P-01 | Login / Registro Empresa | Formulario de acceso para clientes. Campos: nombre empresa, CIF/NIF, email, telefono, persona de contacto, contrasena. Registro con verificacion por email. |
| P-02 | Catalogo por Categorias | Vista principal del catalogo organizada por categorias (tabs o sidebar): Bebidas, Alimentacion, Limpieza, etc. Cada categoria muestra sus subcategorias y productos con imagen, nombre, precio, stock y selector de cantidad. |
| P-03 | Detalle de Producto | Ficha completa: imagen, nombre, referencia/SKU, descripcion, categoria, subcategoria, precio unitario, stock disponible, selector de cantidad con boton de agregar al carrito. |
| P-04 | Carrito de Pedido | Resumen del pedido agrupado por categorias. Tabla con: producto, referencia, cantidad, precio unitario, subtotal. Totales por categoria y total general. Boton de enviar pedido. |
| P-05 | Confirmacion de Pedido | Pantalla de exito tras enviar pedido. Muestra numero de pedido, resumen, y mensaje de que el email ha sido enviado al proveedor. Opcion de descargar resumen en PDF. |
| P-06 | Panel Admin: Dashboard | Vista general para el proveedor: numero de pedidos recibidos, productos activos, stock bajo, ultimos pedidos. Acceso rapido a gestion de productos y categorias. |
| P-07 | Panel Admin: Gestion de Productos | CRUD completo de productos. Carga masiva via CSV. Tabla editable con filtros. Gestion de categorias y subcategorias. Edicion inline de precios y stock. |

# **5\. PANEL DEL PROVEEDOR (ADMIN)**

El panel de administracion es exclusivo para el proveedor. Se accede mediante credenciales de administrador. Contiene las herramientas para gestionar el catalogo, las categorias y visualizar los pedidos recibidos.

## **5.1 Dashboard Principal**

| \--- Total Productos | \--- Pedidos del Mes | \--- Productos Stock Bajo | \--- Categorias Activas |
| :---: | :---: | :---: | :---: |

El dashboard muestra metricas en tiempo real extraidas de Supabase. Incluye graficos de pedidos por semana, listado de ultimos 10 pedidos con empresa, fecha e importe total, y alertas de productos con stock inferior a un umbral configurable.

## **5.2 Gestion de Productos y Categorias**

| Funcionalidad | Detalle |
| :---- | :---- |
| Carga CSV masiva | Boton 'Importar CSV' que abre un modal de carga. El sistema parsea el archivo, valida los campos (nombre, precio, stock, categoria, subcategoria, SKU), muestra una previsualizacion y confirma la importacion. Los productos existentes se actualizan; los nuevos se crean. |
| CRUD de productos | Tabla interactiva con columnas: SKU, Nombre, Categoria, Subcategoria, Precio, Stock, Estado. Filtros por categoria, busqueda por nombre/SKU. Edicion inline de precio y stock. Boton para agregar producto individual. |
| Gestion de categorias | Pantalla para crear, editar y eliminar categorias y subcategorias. Cada categoria tiene: nombre, icono, orden de visualizacion, estado (activa/inactiva). Las subcategorias se anidan bajo su categoria padre. |
| Edicion de stock manual | Ademas del CSV, el proveedor puede editar el stock de cada producto directamente en la tabla. Campo numerico editable con guardado automatico. |
| Historial de pedidos | Tabla con todos los pedidos recibidos: fecha, empresa cliente, numero de productos, importe total, estado. Al hacer clic se abre el detalle completo del pedido con desglose por categorias. |
| Exportar datos | Boton para descargar el catalogo actual en CSV y los pedidos en CSV/Excel para contabilidad. |

# **6\. PORTAL DEL CLIENTE (EMPRESA COMPRADORA)**

El portal de cliente es la interfaz publica donde las empresas compradoras navegan el catalogo, seleccionan productos y envian pedidos. El diseno debe ser limpio, rapido e intuitivo, inspirado en las mejores practicas de McMaster-Carr, Grainger y Uline.

## **6.1 Registro e Inicio de Sesion**

Formulario de registro con los siguientes campos obligatorios:

| Campo | Tipo | Validacion |
| :---- | :---- | :---- |
| Nombre de la empresa | Texto | Requerido, min 2 caracteres |
| CIF / NIF | Texto | Requerido, formato valido espanol |
| Email corporativo | Email | Requerido, formato email valido, unico en BD |
| Telefono | Telefono | Requerido, formato espanol (+34) |
| Persona de contacto | Texto | Requerido, nombre completo |
| Direccion de entrega | Texto largo | Requerido |
| Contrasena | Password | Min 8 caracteres, 1 mayuscula, 1 numero |

Tras el registro, la empresa recibe un email de verificacion. Una vez verificada, puede iniciar sesion y acceder al catalogo completo.

## **6.2 Navegacion del Catalogo por Categorias**

La pantalla principal del catalogo se estructura asi:

| Componente | Descripcion |
| :---- | :---- |
| Header fijo | Logo del proveedor \+ barra de busqueda global \+ icono de carrito con contador de items \+ menu de usuario (nombre empresa, cerrar sesion). |
| Barra de categorias | Navegacion horizontal (tabs) o sidebar lateral con las categorias principales: Bebidas, Alimentacion, Limpieza, Menaje, etc. Cada categoria muestra un icono y el numero de productos disponibles. |
| Subcategorias | Al seleccionar una categoria, se muestran las subcategorias. Ej: Alimentacion \> Patatas, Conservas, Snacks, Congelados, Lacteos... |
| Grid de productos | Tarjetas de producto en grid responsivo (3 columnas desktop, 2 tablet, 1 movil). Cada tarjeta: imagen, nombre, referencia, precio, stock disponible (verde/naranja/rojo), selector de cantidad, boton 'Anadir al pedido'. |
| Filtros laterales | Filtrar por: subcategoria, rango de precio (min-max), disponibilidad (en stock / todo), ordenar por (nombre, precio asc/desc, stock). |
| Busqueda global | Busqueda instantanea en tiempo real que filtra por nombre, SKU o descripcion. Resultados agrupados por categoria. |

## **6.3 Carrito de Pedido**

El carrito es una vista lateral (sidebar) o pagina completa que muestra todos los productos seleccionados, agrupados por categoria para facilitar la revision.

| Elemento | Detalle |
| :---- | :---- |
| Agrupacion por categoria | Los productos se agrupan por categoria con subtotal por grupo. Ej: 'Bebidas: 3 productos \- 150 EUR' / 'Alimentacion: 5 productos \- 320 EUR'. |
| Linea de producto | Cada linea: imagen miniatura, nombre, referencia, precio unitario, selector de cantidad (editable), subtotal de linea, boton eliminar. |
| Validacion de stock | Si la cantidad seleccionada supera el stock disponible, se muestra un aviso en rojo y se limita al maximo disponible. |
| Resumen del pedido | Tabla resumen: total de productos, total por categoria, gran total. Campo de observaciones/notas para el proveedor. |
| Datos de la empresa | Se muestran automaticamente: nombre empresa, CIF, email, telefono, direccion de entrega (precargados del perfil, editables). |
| Boton 'Enviar Pedido' | Al confirmar, se genera el email via EmailJS con todo el detalle y se muestra la pantalla de confirmacion con numero de pedido. |

# **7\. SISTEMA DE CATEGORIAS DE PRODUCTOS**

El sistema de categorias es el eje organizativo de toda la plataforma. Permite estructurar el catalogo de forma jerarquica para que las empresas clientes encuentren rapidamente lo que necesitan.

## **7.1 Estructura Jerarquica**

El catalogo se organiza en dos niveles: Categoria principal y Subcategoria. Ejemplos:

| Categoria | Subcategorias (ejemplos) | Productos ejemplo |
| :---- | :---- | :---- |
| Bebidas | Aguas, Refrescos, Zumos, Cervezas, Vinos, Destilados, Bebidas calientes | Agua mineral 1.5L, Coca-Cola 33cl, Cerveza Mahou 25cl, Vino Rioja Crianza... |
| Alimentacion | Patatas, Conservas, Snacks, Congelados, Lacteos, Panaderia, Embutidos, Salsas | Patatas fritas bolsa 150g, Atun Calvo lata, Jamon serrano 100g, Salsa tomate 1L... |
| Limpieza | Detergentes, Desinfectantes, Papel, Bolsas basura, Ambientadores | Fregasuelos 1L, Lejia 2L, Papel higienico 12 rollos, Bolsas basura 30L... |
| Menaje / Desechables | Vasos, Platos, Cubiertos, Servilletas, Film, Aluminio | Vasos plastico 100ud, Platos carton 50ud, Servilletas 200ud... |
| Drogueria | Higiene personal, Cosmetica, Farmacia basica | Gel de manos 500ml, Crema hidratante, Tiritas... |

## **7.2 Gestion de Categorias (Admin)**

| Funcionalidad | Detalle |
| :---- | :---- |
| Crear categoria | Formulario: nombre, icono (seleccion de libreria de iconos), orden de visualizacion, estado activa/inactiva. |
| Crear subcategoria | Formulario: nombre, categoria padre (selector), orden de visualizacion, estado. |
| Editar / Eliminar | Edicion inline. Al eliminar una categoria, los productos asociados pasan a 'Sin categoria'. Se muestra aviso de confirmacion. |
| Reordenar | Drag-and-drop para cambiar el orden de visualizacion de categorias y subcategorias en el catalogo. |
| Asignacion via CSV | La columna 'categoria' y 'subcategoria' del CSV asigna automaticamente cada producto. Si la categoria no existe, se crea automaticamente. |

# **8\. SISTEMA DE PEDIDOS Y NOTIFICACIONES POR EMAIL**

Cada vez que una empresa confirma un pedido, el sistema genera un email completo que llega al proveedor de forma instantanea. El email contiene toda la informacion necesaria para procesar el pedido sin necesidad de acceder a la plataforma.

## **8.1 Flujo del Pedido**

**01**  La empresa navega el catalogo por categorias y anade productos al carrito con las cantidades deseadas.

**02**  Al acceder al carrito, revisa el pedido agrupado por categorias y puede modificar cantidades o eliminar productos.

**03**  Confirma los datos de su empresa (nombre, CIF, direccion de entrega, persona de contacto).

**04**  Opcionalmente, anade notas u observaciones para el proveedor.

**05**  Hace clic en 'Enviar Pedido'. El sistema valida stock disponible en ese momento.

**06**  Se envia el email via EmailJS al proveedor con todo el detalle del pedido.

**07**  Se descuenta el stock de Supabase (opcional, configurable por el admin).

**08**  Se muestra pantalla de confirmacion con numero de pedido y resumen.

**09**  El pedido se guarda en Supabase para historial y consulta posterior.

## **8.2 Datos del Email de Pedido**

| Campo del Email | Contenido |
| :---- | :---- |
| Asunto | 'Nuevo Pedido \#\[ID\] \- \[Nombre Empresa\] \- \[Fecha\]' |
| Datos de la empresa | Nombre, CIF/NIF, email, telefono, persona de contacto, direccion de entrega. |
| Tabla de productos | Organizada por categorias. Por cada producto: referencia/SKU, nombre, cantidad, precio unitario, subtotal. |
| Subtotales por categoria | Total de cada categoria (ej: Bebidas: 245.50 EUR, Alimentacion: 380.00 EUR). |
| Total general | Suma de todos los subtotales. Numero total de lineas de producto. |
| Observaciones | Notas del cliente si las ha incluido. |
| Fecha y hora | Timestamp exacto del pedido en zona horaria de Espana (CET/CEST). |
| Numero de pedido | ID unico autogenerado (formato: PED-2026-XXXXX). |

# **9\. GESTION DE STOCK Y CSV**

La gestion de stock se realiza principalmente mediante la carga de archivos CSV. El proveedor puede actualizar su catalogo completo subiendo un nuevo CSV en cualquier momento. Tambien puede editar productos individualmente desde el panel admin.

## **9.1 Proceso de Carga CSV**

**01**  El proveedor accede al Panel Admin y hace clic en 'Importar CSV'.

**02**  Selecciona el archivo CSV desde su ordenador. Formato requerido: UTF-8, separador por comas o punto y coma.

**03**  El sistema parsea el archivo y muestra una previsualizacion en tabla con las primeras 10 filas.

**04**  Se ejecuta la validacion automatica: campos requeridos, formatos de precio (numerico), stock (entero positivo), categorias.

**05**  Se muestra un resumen: X productos nuevos, Y productos actualizados, Z errores.

**06**  El proveedor revisa errores (si los hay) y confirma la importacion.

**07**  Los productos se insertan/actualizan en Supabase. Las categorias/subcategorias nuevas se crean automaticamente.

**08**  El catalogo se actualiza instantaneamente para las empresas clientes.

## **9.2 Reglas de Actualizacion**

| Regla | Comportamiento |
| :---- | :---- |
| Producto existente (mismo SKU) | Se actualizan precio, stock, nombre, descripcion, categoria. El SKU es la clave unica. |
| Producto nuevo (SKU no existe) | Se crea un nuevo producto con todos los campos del CSV. |
| Producto en BD no presente en CSV | NO se elimina. Permanece en la BD. Para eliminarlo, el admin lo hace manualmente o carga un CSV con stock \= 0\. |
| Categoria nueva en CSV | Se crea automaticamente la categoria y/o subcategoria. |
| Campo vacio en CSV | Se mantiene el valor anterior del producto en BD. No se sobreescribe con vacio. |
| Precio con formato incorrecto | Se marca como error. El producto no se importa. Se muestra en el resumen de errores. |

# **10\. FORMATO DEL CSV DE PRODUCTOS**

El archivo CSV debe seguir exactamente la siguiente estructura. Las columnas marcadas con (\*) son obligatorias.

| Columna | Tipo | Obligatorio | Descripcion y Ejemplo |
| :---- | :---- | :---- | :---- |
| sku | Texto | Si (\*) | Codigo unico del producto. Ej: BEB-001, ALI-PAT-005. Sirve como identificador para actualizaciones. |
| nombre | Texto | Si (\*) | Nombre del producto. Ej: 'Agua mineral Bezoya 1.5L' |
| categoria | Texto | Si (\*) | Categoria principal. Ej: 'Bebidas', 'Alimentacion', 'Limpieza'. Si no existe, se crea automaticamente. |
| subcategoria | Texto | No | Subcategoria. Ej: 'Aguas', 'Patatas', 'Detergentes'. Si no existe, se crea bajo la categoria indicada. |
| precio | Numero | Si (\*) | Precio unitario sin IVA en EUR. Separador decimal: punto. Ej: 0.85, 12.50 |
| stock | Entero | Si (\*) | Unidades disponibles. Numero entero \>= 0\. Ej: 500, 0, 10000 |
| descripcion | Texto | No | Descripcion breve del producto. Ej: 'Botella de agua mineral natural de 1.5 litros.' |
| marca | Texto | No | Marca del producto. Ej: 'Bezoya', 'Coca-Cola', 'Mahou' |
| unidad\_medida | Texto | No | Unidad de venta. Ej: 'unidad', 'pack 6', 'caja 24', 'kg' |
| imagen\_url | URL | No | URL de la imagen del producto. Si esta vacio, se muestra imagen placeholder generica. |
| peso\_kg | Numero | No | Peso en kilogramos por unidad. Ej: 1.5, 0.33 |
| iva | Numero | No | Porcentaje de IVA. Si esta vacio, se aplica IVA general (21%). Valores comunes: 4, 10, 21\. |

## **Ejemplo de CSV**

sku;nombre;categoria;subcategoria;precio;stock;descripcion;marca;unidad\_medida

BEB-001;Agua Bezoya 1.5L;Bebidas;Aguas;0.45;500;Agua mineral natural;Bezoya;unidad

BEB-002;Coca-Cola 33cl;Bebidas;Refrescos;0.55;1200;Lata de refresco;Coca-Cola;unidad

ALI-001;Patatas Lays Classic 150g;Alimentacion;Patatas;1.20;800;Patatas fritas clasicas;Lays;unidad

ALI-002;Atun Calvo Aceite Oliva;Alimentacion;Conservas;1.85;350;Lata atun en aceite;Calvo;unidad

LIM-001;Fregasuelos Pino 1.5L;Limpieza;Detergentes;2.10;200;Fregasuelos aroma pino;Don Limpio;unidad

# **11\. ESPECIFICACION DE LA PLANTILLA DE EMAIL**

La plantilla de EmailJS recibe variables dinamicas desde el frontend y genera un email HTML profesional con el detalle completo del pedido. A continuacion se especifican las variables y la estructura del email.

## **11.1 Variables de la Plantilla**

| Variable EmailJS | Contenido |
| :---- | :---- |
| {{order\_id}} | Numero de pedido unico (PED-2026-XXXXX) |
| {{company\_name}} | Nombre de la empresa que realiza el pedido |
| {{company\_cif}} | CIF/NIF de la empresa |
| {{company\_email}} | Email de contacto de la empresa |
| {{company\_phone}} | Telefono de la empresa |
| {{contact\_person}} | Persona de contacto |
| {{delivery\_address}} | Direccion de entrega |
| {{order\_date}} | Fecha y hora del pedido (formato: dd/mm/yyyy HH:mm CET) |
| {{order\_table}} | Tabla HTML completa con todos los productos, agrupados por categoria, con subtotales y total general |
| {{total\_items}} | Numero total de lineas de producto |
| {{total\_amount}} | Importe total del pedido en EUR |
| {{notes}} | Observaciones del cliente (puede estar vacio) |

## **11.2 Estructura del Email**

El email se envia al correo del proveedor configurado en EmailJS. Estructura:

**01**  Cabecera con logo del proveedor y titulo 'Nuevo Pedido Recibido'.

**02**  Bloque de datos de la empresa cliente (nombre, CIF, contacto, direccion).

**03**  Tabla de productos agrupada por categorias con cabecera coloreada por categoria.

**04**  Fila de subtotal al final de cada grupo de categoria.

**05**  Fila de TOTAL GENERAL al final con importe destacado en negrita.

**06**  Bloque de observaciones/notas si las hay.

**07**  Pie con fecha, hora y numero de pedido.

# **12\. REQUISITOS NO FUNCIONALES**

| Requisito | Metrica / Objetivo | Implementacion |
| :---- | :---- | :---- |
| Rendimiento | First Contentful Paint \< 1.2s. Time to Interactive \< 2s. | React con Vite (build optimizado), lazy loading de imagenes, code splitting por ruta, CDN global de Vercel. |
| Disponibilidad | 99.9% uptime (\< 8.7h downtime/ano) | Vercel Edge Network distribuido globalmente. Supabase con replicacion automatica. Cloudflare como fallback de DNS. |
| Seguridad | HTTPS obligatorio. Autenticacion segura. RGPD compliance. | SSL de Vercel \+ Cloudflare. Supabase Auth con JWT. Row Level Security en BD. Politica de privacidad y cookies. |
| Responsive | Funcional en todas las resoluciones desde 320px. | Tailwind CSS mobile-first. Testing en Chrome, Safari, Firefox, Edge. Breakpoints: 640, 768, 1024, 1280px. |
| Escalabilidad | Soportar 100+ empresas y 10.000+ productos sin degradacion. | Supabase escala automaticamente. Vercel serverless sin limites de concurrencia. Paginacion en catalogo. |
| Accesibilidad | WCAG 2.1 nivel AA | Contraste de colores, etiquetas aria, navegacion por teclado, textos alternativos en imagenes. |
| Internacionalizacion | Preparado para multi-idioma (futuro). | Textos en archivos i18n separados. Formato de moneda y fechas configurable. |
| Backup | Backup diario de BD automatico. | Supabase incluye backups automaticos diarios en plan gratuito (7 dias retencion). |

# **13\. STACK TECNOLOGICO RECOMENDADO**

| Componente | Tecnologia | Justificacion |
| :---- | :---- | :---- |
| Framework frontend | React 18+ con Vite | Ecosistema masivo, rendimiento excelente con Vite, facil integracion con Supabase y EmailJS. Amplia documentacion. |
| Estilos CSS | Tailwind CSS 3+ | Utility-first para desarrollo rapido. Mobile-first nativo. Purge CSS automatico para bundles minimos. |
| Backend as a Service | Supabase (plan Free) | PostgreSQL gestionado, Auth integrado, Storage, Realtime subscriptions, Row Level Security. Plan gratuito: 500MB BD, 1GB storage, 50K auth users. |
| Envio de emails | EmailJS (plan Free) | 200 emails/mes gratis. Integracion frontend pura (sin servidor). Plantillas HTML personalizables. Compatible con Gmail/Outlook. |
| Hosting/Deploy | Vercel (plan Hobby) | Deploy automatico desde GitHub. CDN global. SSL gratuito. Dominio custom. 100GB bandwidth. Serverless functions. Zero-config. |
| DNS y CDN extra | Cloudflare (plan Free) | DNS ultrarapido, cache agresivo, proteccion DDoS, reglas de pagina, certificado SSL edge, analytics basico. |
| Control de version | GitHub | Repositorio de codigo. CI/CD automatico con Vercel (push to deploy). Colaboracion si se necesita. |
| Parseo CSV | PapaParse (libreria JS) | Parseo robusto de CSV en el frontend. Soporta delimitadores multiples, headers, streaming para archivos grandes. |
| Iconos | Lucide React | Libreria de iconos open source, ligera, consistente. Ideal para categorias y UI general. |
| Tablas interactivas | TanStack Table (React Table) | Tablas con filtros, ordenacion, paginacion. Ideal para el panel admin y listados de productos. |

# **14\. GUIA DE DESPLIEGUE 24/7**

Esta seccion explica paso a paso como desplegar la aplicacion para que funcione las 24 horas del dia, los 7 dias de la semana, sin interrupciones y sin necesidad de mantener un servidor encendido. La clave esta en usar servicios serverless y CDN globales que funcionan de forma autonoma.

## **14.1 Por que funciona 24/7 sin servidor propio**

Las plataformas serverless como Vercel no dependen de un servidor unico que puede caerse. En su lugar, tu aplicacion se replica automaticamente en cientos de servidores distribuidos por todo el mundo (Edge Network). Cuando un usuario en Madrid accede a la web, se le sirve desde el servidor mas cercano. Si un servidor falla, otro lo sustituye automaticamente. No hay un punto unico de fallo.

## **14.2 Paso a paso del despliegue**

**01  Crear repositorio en GitHub:**  Sube todo el codigo de la aplicacion a un repositorio en GitHub (publico o privado). Estructura tipica: /src, /public, package.json, vite.config.js.

**02  Crear cuenta en Vercel:**  Registrate en vercel.com con tu cuenta de GitHub. Es gratuito para proyectos personales (plan Hobby).

**03  Conectar repositorio:**  En el dashboard de Vercel, haz clic en 'New Project' y selecciona tu repositorio de GitHub. Vercel detecta automaticamente que es un proyecto React/Vite.

**04  Configurar variables de entorno:**  En Settings \> Environment Variables, anade las claves de Supabase (VITE\_SUPABASE\_URL, VITE\_SUPABASE\_ANON\_KEY) y EmailJS (VITE\_EMAILJS\_SERVICE\_ID, VITE\_EMAILJS\_TEMPLATE\_ID, VITE\_EMAILJS\_PUBLIC\_KEY).

**05  Deploy automatico:**  Haz clic en 'Deploy'. Vercel ejecuta npm run build, genera los archivos estaticos y los distribuye en su CDN global. En menos de 60 segundos, la web esta online.

**06  Dominio personalizado:**  En Settings \> Domains, anade tu dominio (ej: pedidos.tuempresa.es). Vercel te da los registros DNS que debes configurar en tu proveedor de dominio o Cloudflare.

**07  SSL automatico:**  Vercel genera automaticamente un certificado SSL gratuito. Tu web funciona con HTTPS sin configuracion adicional.

**08  Actualizaciones automaticas:**  Cada vez que hagas git push a la rama main, Vercel reconstruye y despliega automaticamente la nueva version. Zero-downtime deployment.

## **14.3 Garantia de disponibilidad**

| Mecanismo | Como garantiza el 24/7 |
| :---- | :---- |
| CDN Global de Vercel | Tu web se replica en 100+ ubicaciones mundiales. Si un datacenter cae, el trafico se redirige automaticamente al siguiente mas cercano. No hay punto unico de fallo. |
| Serverless Functions | Las funciones backend se ejecutan bajo demanda. No hay un servidor que 'apagar'. Se escalan automaticamente segun la demanda. |
| Supabase Cloud | La base de datos corre en la nube de AWS (region EU). Incluye replicacion, backups automaticos y uptime del 99.9%. Si Supabase tiene un incidente, los datos estan respaldados. |
| EmailJS | Servicio cloud independiente. Funciona 24/7 con sus propios servidores. Los emails se envian en menos de 2 segundos tras la solicitud. |
| Cloudflare DNS | DNS anycasted globalmente. Resolucion en \< 20ms. Proteccion DDoS automatica. Si tu sitio recibe un ataque, Cloudflare lo absorbe. |
| Zero-downtime deploys | Vercel despliega nuevas versiones sin interrumpir el servicio. Los usuarios activos siguen viendo la version anterior mientras la nueva se propaga. |
| Monitoring | Vercel ofrece Analytics y Logs en tiempo real. Configura alertas de error en el dashboard para detectar problemas al instante. |

## **14.4 Emails 24/7: como garantizar la recepcion**

El envio de emails funciona de la siguiente manera y esta garantizado las 24 horas:

| Aspecto | Detalle |
| :---- | :---- |
| Motor de envio | EmailJS es un servicio cloud SaaS que funciona 24/7. La solicitud de envio se hace desde el navegador del cliente directamente a los servidores de EmailJS. |
| Servicio de email | EmailJS conecta con tu proveedor de email (Gmail, Outlook, etc.). Si usas Gmail, los emails llegan a tu bandeja normal. Si usas un dominio propio, puedes configurar SMTP. |
| Redundancia | Si EmailJS falla temporalmente (muy raro), el sistema puede reintentar el envio. Ademas, el pedido queda guardado en Supabase, asi que no se pierde nunca. |
| Plan gratuito | 200 emails/mes. Si superas ese limite, puedes actualizar al plan Personal (1000 emails/mes por 10 EUR/mes) o Profesional (15 EUR/mes, ilimitado). |
| Alternativa futura | Para mayor volumen, se puede migrar a Resend, SendGrid o un SMTP propio via Vercel Serverless Functions. La arquitectura lo permite sin cambiar el frontend. |

# **15\. DOMINIO Y DNS**

## **15.1 Registro de dominio**

Se recomienda registrar un dominio .es o .com para la plataforma. Opciones de registrador:

| Registrador | Precio aprox/ano | Ventajas |
| :---- | :---- | :---- |
| Namecheap | 8-12 EUR | Interfaz sencilla, precios competitivos, DNS incluido, WhoisGuard gratuito. |
| Cloudflare Registrar | 8-10 EUR | Precio a coste (sin margen), DNS ultra-rapido integrado, proteccion incluida. |
| Google Domains (Squarespace) | 12-14 EUR | Integracion con Google Workspace, interfaz limpia. |
| Dondominio (.es) | 6-9 EUR | Especializado en dominios .es, soporte en espanol. |

## **15.2 Configuracion DNS recomendada**

Para maxima velocidad y proteccion, se recomienda usar Cloudflare como DNS proxy:

**01**  Registra tu dominio en el registrador elegido.

**02**  Crea cuenta gratuita en Cloudflare y anade tu dominio.

**03**  Cambia los nameservers del dominio a los de Cloudflare (se indican en el panel).

**04**  En Cloudflare, anade un registro CNAME: nombre '@' apuntando a 'cname.vercel-dns.com'.

**05**  Anade otro CNAME: 'www' apuntando a 'cname.vercel-dns.com'.

**06**  En Vercel, anade tu dominio en Settings \> Domains y verifica.

**07**  Activa SSL Full (Strict) en Cloudflare para doble capa de encriptacion.

**08**  Activa 'Always HTTPS' y 'Auto Minify' en Cloudflare para optimizacion extra.

# **16\. ESTIMACION DE COSTES**

Una de las ventajas clave de esta arquitectura es que puede funcionar con coste cero en la fase inicial. A medida que el volumen crezca, los costes se incrementan de forma predecible y gradual.

## **16.1 Fase inicial (0-50 empresas clientes)**

| Servicio | Plan | Coste Mensual |
| :---- | :---- | :---- |
| Vercel Hosting | Hobby (gratuito) | 0 EUR |
| Supabase | Free (500MB BD, 1GB storage) | 0 EUR |
| EmailJS | Free (200 emails/mes) | 0 EUR |
| Cloudflare | Free | 0 EUR |
| Dominio .es | Registro anual | \~0.75 EUR/mes (9 EUR/ano) |
| TOTAL MENSUAL |  | \~0.75 EUR/mes |

## **16.2 Fase de crecimiento (50-200 empresas)**

| Servicio | Plan | Coste Mensual |
| :---- | :---- | :---- |
| Vercel Hosting | Pro (si se excede bandwidth) | 20 EUR |
| Supabase | Pro (8GB BD, 100GB storage) | 25 EUR |
| EmailJS | Personal (1.000 emails/mes) | 10 EUR |
| Cloudflare | Free (sigue suficiente) | 0 EUR |
| Dominio | Registro anual | \~0.75 EUR |
| TOTAL MENSUAL |  | \~55.75 EUR/mes |

## **16.3 Fase avanzada (200+ empresas)**

| Servicio | Plan | Coste Mensual |
| :---- | :---- | :---- |
| Vercel Hosting | Pro | 20 EUR |
| Supabase | Pro | 25 EUR |
| Email (Resend/SendGrid) | Volumen alto | 15-30 EUR |
| Cloudflare | Pro (si se necesita WAF) | 20 EUR |
| Dominio | Registro anual | \~0.75 EUR |
| TOTAL MENSUAL |  | \~80-95 EUR/mes |

# **17\. ROADMAP DE DESARROLLO**

Plan de desarrollo dividido en 4 sprints de una semana cada uno para un MVP funcional completo.

| Sprint | Duracion | Entregables |
| :---- | :---- | :---- |
| Sprint 1 | Semana 1 | Setup del proyecto (React \+ Vite \+ Tailwind). Configuracion de Supabase (BD, tablas, auth). Modelo de datos: productos, categorias, subcategorias, empresas, pedidos. Panel admin: login, dashboard basico, CRUD de categorias. |
| Sprint 2 | Semana 2 | Carga y parseo de CSV con PapaParse. CRUD completo de productos con tabla interactiva. Gestion de categorias y subcategorias. Edicion inline de stock y precios. Vista previa de importacion CSV. |
| Sprint 3 | Semana 3 | Portal del cliente: registro/login de empresas. Catalogo por categorias con grid de productos. Filtros, busqueda, navegacion por subcategorias. Carrito de pedido agrupado por categorias. Selector de cantidades con validacion de stock. |
| Sprint 4 | Semana 4 | Integracion EmailJS: plantilla de email con detalle por categorias. Flujo completo de pedido: carrito \> datos empresa \> confirmar \> email. Historial de pedidos en admin. Despliegue en Vercel \+ dominio \+ Cloudflare. Testing final y QA. |

| FIN DEL DOCUMENTO Especificacion lista para desarrollo |
| :---: |

*Documento preparado por Levi | Marzo 2026 | Confidencial*