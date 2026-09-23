# 🏎️ Top Gear Clásico — Sitio Web Multi-Página (2002–2015)

Sitio web estático multi-página de alto rendimiento, 100% responsivo y desarrollado bajo las mejores prácticas de **SEO Técnico, Semántica HTML5, Accesibilidad Web (WCAG)** y diseño automotriz moderno en tributo a la era dorada de Top Gear conducida por **Jeremy Clarkson, Richard Hammond, James May y The Stig**.

---

## 📁 Estructura del Proyecto

```text
prograIV/
│
├── index.html            # Portada / Home: Especiales por el mundo, pistas, desafíos y contacto
├── presentadores.html    # Nueva Página: Biografías y perfiles detallados (Clarkson, Hammond, May y The Stig)
├── galeria.html          # Nueva Página: Catálogo de autos ampliado con filtros dinámicos y Lightbox
├── css/
│   └── styles.css        # Estilos CSS3 globales (Variables CSS, Mobile-First, Flexbox/Grid, Dark Theme)
├── js/
│   └── main.js           # Lógica interactiva (Menú hamburguesa, Dropdown accesible, Lightbox, Validación)
├── robots.txt            # Directivas de rastreo e indexación para Googlebot y buscadores
├── sitemap.xml           # Mapa del sitio XML con todas las páginas y metadatos de imágenes
└── README.md             # Documentación técnica y guía de despliegue
```

---

## 🚀 Páginas y Navegación

El sitio cuenta con enlaces relativos compatibles tanto de forma local como en **GitHub Pages**:

1. **Página de Inicio (`index.html`)**:
   - Portada con H1 optimizado y métricas de impacto.
   - Resumen del show y accesos directos a los episodios, pruebas de pista y desafíos.
   - Formulario de contacto con validación HTML5 nativa y feedback interactivo.
2. **Página de Presentadores (`presentadores.html`)**:
   - Biografías exhaustivas de **Jeremy Clarkson**, **Richard Hammond**, **James May** y la incorporación estelar de **The Stig**.
   - Tarjetas responsivas con datos técnicos, autos icónicos, frases célebres y anécdotas.
   - Bloque de citas históricas y migas de pan (*Breadcrumbs*) con microdatos Schema Person.
3. **Página de Galería de Autos (`galeria.html`)**:
   - Colección ampliada de 12+ autos legendarios (Lexus LFA, Toyota Hilux indestructible, Bugatti Veyron 417 km/h, Oliver Opel Kadett, autos anfibios, Reliant Robin, etc.).
   - Filtros por categoría interactivos con accesibilidad ARIA (*Superdeportivos, Cheap Cars, Creaciones, Pista*).
   - Visor modal **Lightbox** con zoom, soporte para tecla ESC y navegación accesible.

---

## 🔍 Optimizaciones SEO Aplicadas

| Optimización | Implementación Técnica | Beneficio SEO |
| :--- | :--- | :--- |
| **Arquitectura Multi-Página** | URLs limpias y enlazado interno coherente (`index.html`, `presentadores.html`, `galeria.html`). | Distribución uniforme del *PageRank* y estructura de rastreo optimizada. |
| **Meta Titles & Descriptions Únicos** | Cada página cuenta con un `<title>` y `<meta name="description">` específico y persuasivo. | Máxima relevancia temática y aumento del CTR en las SERPs de Google. |
| **Migas de Pan (Breadcrumbs)** | Navegación semántica estructurada en subpáginas. | Facilita la comprensión de la jerarquía del sitio a usuarios y bots. |
| **Jerarquía H1-H3** | Un único `<h1>` temático por página, con subencabezados `<h2>` y `<h3>` ordenados. | Mejora el análisis semántico y la indexación del contenido en Google. |
| **Atributos `alt` en Imágenes** | Textos alternativos descriptivos y contextuales en todas las imágenes. | Posicionamiento en Google Imágenes y accesibilidad universal. |
| **Core Web Vitals (CLS & LCP)** | `width`/`height` explícitos, `loading="lazy"` y `preconnect` de fuentes. | Elimina saltos de diseño acumulados y acelera la renderización. |
| **Open Graph & Twitter Cards** | Metadatos `og:title`, `og:description`, `og:image`, `twitter:card` por página. | Vistas previas ricas y profesionales al compartir en WhatsApp, Twitter, etc. |
| **Schema.org JSON-LD** | Esquemas `@type: WebSite`, `@type: CollectionPage`, `@type: Person` e `@type: ImageGallery`. | Generación de fragmentos enriquecidos (*Rich Snippets*) en Google. |
| **Rastreo e Indexación** | Archivos `robots.txt`, `sitemap.xml` y etiquetas canónicas en cada documento. | Indexación total y prevención de contenido duplicado. |

---
