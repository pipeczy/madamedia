# 📦 Guía de Uso del Sprite SVG

## ¿Qué es un Sprite SVG?

Un sprite SVG es un archivo que contiene múltiples iconos SVG definidos como `<symbol>`, permitiendo reutilizarlos en todo el sitio sin duplicar código.

## ✅ Beneficios

- **Reducción de peso**: De ~15KB de SVGs duplicados a ~2KB de sprite
- **Facilidad de actualización**: Cambiar un icono en un solo lugar
- **Mejor caché**: Un solo archivo para todos los iconos
- **Consistencia**: Mismos iconos en todo el sitio

---

## 📍 Ubicación del Sprite

```
public/images/icons-sprite.svg
```

---

## 🎯 Cómo Usar

### 1. Incluir el Sprite en HTML (Opción 1: Inline)

Agregar al inicio del `<body>` en [index.html](public/index.html):

```html
<body>
  <!-- Sprite SVG -->
  <svg style="display: none;">
    <use href="images/icons-sprite.svg#icon-check"></use>
  </svg>

  <!-- Resto del contenido -->
  ...
</body>
```

### 2. Usar Directamente (Opción 2: External Reference)

Simplemente referenciar el icono donde lo necesites:

```html
<!-- Checkmark -->
<svg class="w-4 h-4 text-accent">
  <use href="images/icons-sprite.svg#icon-check"></use>
</svg>

<!-- Flecha derecha -->
<svg class="w-5 h-5 text-white">
  <use href="images/icons-sprite.svg#icon-arrow-right"></use>
</svg>

<!-- Instagram -->
<svg class="w-6 h-6 text-neutral-500 hover:text-accent">
  <use href="images/icons-sprite.svg#icon-instagram"></use>
</svg>
```

---

## 🎨 Iconos Disponibles

| ID | Descripción | Uso Común |
|----|-------------|-----------|
| `icon-check` | ✓ Checkmark | Listas de características en planes |
| `icon-arrow-right` | → Flecha derecha | Botones CTA, navegación |
| `icon-arrow-diagonal` | ↗ Flecha diagonal | Links externos, "Ver más" |
| `icon-chevron-down` | ⌄ Chevron abajo | FAQs, dropdowns |
| `icon-play` | ▶ Play | Controles de video |
| `icon-pause` | ⏸ Pause | Controles de video |
| `icon-volume-high` | 🔊 Volumen alto | Controles de audio |
| `icon-volume-low` | 🔉 Volumen bajo | Controles de audio |
| `icon-volume-muted` | 🔇 Muted | Controles de audio |
| `icon-instagram` | Instagram logo | Footer, redes sociales |
| `icon-youtube` | YouTube logo | Footer, redes sociales |
| `icon-linkedin` | LinkedIn logo | Footer, redes sociales |
| `icon-menu` | ☰ Menú hamburguesa | Mobile menu |
| `icon-close` | ✕ Cerrar | Modales, mobile menu |

---

## 🔄 Reemplazar SVGs Existentes

### Ejemplo: Lista de Características en Planes

**❌ Antes (repetido ~40 veces):**
```html
<li class="flex items-start gap-3">
  <svg class="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
  </svg>
  <span>Instagram, Facebook y TikTok</span>
</li>
```

**✅ Después:**
```html
<li class="flex items-start gap-3">
  <svg class="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2">
    <use href="images/icons-sprite.svg#icon-check"></use>
  </svg>
  <span>Instagram, Facebook y TikTok</span>
</li>
```

### Ejemplo: Botón CTA

**❌ Antes:**
```html
<a href="#contacto" class="btn">
  Cotiza Ahora
  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
</a>
```

**✅ Después:**
```html
<a href="#contacto" class="btn">
  Cotiza Ahora
  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2">
    <use href="images/icons-sprite.svg#icon-arrow-right"></use>
  </svg>
</a>
```

### Ejemplo: Footer Social Media

**❌ Antes:**
```html
<a href="#" class="social-link">
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
  </svg>
</a>
```

**✅ Después:**
```html
<a href="#" class="social-link">
  <svg class="w-5 h-5" fill="currentColor">
    <use href="images/icons-sprite.svg#icon-instagram"></use>
  </svg>
</a>
```

---

## 🔍 Encontrar SVGs para Reemplazar

### Buscar en el proyecto:

```bash
# Buscar todos los <svg> inline en HTML
grep -n "<svg" public/index.html | wc -l
# Resultado: ~118 instancias

# Buscar checkmarks específicamente
grep -n "M5 13l4 4L19 7" public/index.html
```

### Ubicaciones comunes:

1. **Líneas 690-930**: Lista de características en planes (~40 checkmarks)
2. **Líneas 76, 176, 470**: Botones CTA con flechas (~15 flechas)
3. **Líneas 1104-1186**: FAQs con chevrons (~5 chevrons)
4. **Líneas 1310-1333**: Footer con iconos sociales (~3 iconos)
5. **Línea 82**: Mobile menu button (~1 icono)

---

## 🎨 Estilos CSS

Los iconos del sprite heredan los estilos del SVG contenedor:

```html
<!-- Color -->
<svg class="text-accent">
  <use href="images/icons-sprite.svg#icon-check"></use>
</svg>

<!-- Tamaño -->
<svg class="w-6 h-6">
  <use href="images/icons-sprite.svg#icon-play"></use>
</svg>

<!-- Hover -->
<svg class="text-neutral-500 hover:text-accent transition-colors">
  <use href="images/icons-sprite.svg#icon-instagram"></use>
</svg>
```

---

## 🚀 Automatización (Opcional)

Crear un script para buscar y reemplazar automáticamente:

```javascript
// replace-svgs.js
const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const replacements = [
  {
    old: /<svg class="([^"]*)" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\s*<path[^>]*d="M5 13l4 4L19 7"[^>]*\/>\s*<\/svg>/g,
    new: '<svg class="$1" fill="none" stroke="currentColor" stroke-width="2"><use href="images/icons-sprite.svg#icon-check"></use></svg>'
  },
  // Más reemplazos...
];

let newHtml = html;
replacements.forEach(({ old, new: replacement }) => {
  newHtml = newHtml.replace(old, replacement);
});

fs.writeFileSync('public/index.html', newHtml);
console.log('✓ SVGs reemplazados');
```

---

## 📊 Impacto Esperado

### Antes de Reemplazar
- **HTML**: 84KB
- **SVGs inline**: ~118 instancias
- **Peso de SVGs**: ~15KB

### Después de Reemplazar
- **HTML**: ~69KB (-18%)
- **SVG Sprite**: 2KB
- **Total**: ~71KB
- **Reducción neta**: ~13KB

---

## ⚠️ Consideraciones

### Compatibilidad
- ✅ Todos los navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ IE11+ con polyfill
- ✅ Mobile (iOS, Android)

### Fallback para IE11
```html
<svg class="w-4 h-4">
  <use href="images/icons-sprite.svg#icon-check"></use>
  <!-- Fallback inline -->
  <path d="M5 13l4 4L19 7" />
</svg>
```

### Cache
El sprite SVG se cachea como cualquier asset estático. Versionarlo si cambia:

```html
<use href="images/icons-sprite.svg?v=2.0#icon-check"></use>
```

---

## 🎓 Agregar Nuevos Iconos

1. Abrir `public/images/icons-sprite.svg`
2. Agregar nuevo `<symbol>`:

```xml
<symbol id="icon-nuevo" viewBox="0 0 24 24">
  <path d="..." />
</symbol>
```

3. Usar en HTML:

```html
<svg class="w-5 h-5">
  <use href="images/icons-sprite.svg#icon-nuevo"></use>
</svg>
```

---

## 📚 Recursos

- [SVG Sprite Best Practices](https://css-tricks.com/svg-sprites-use-better-icon-fonts/)
- [Can I Use: SVG Use Element](https://caniuse.com/svg-use)
- [Optimizador SVG Online](https://jakearchibald.github.io/svgomg/)

---

**Última actualización**: 2025-12-05
**Versión**: 1.0
