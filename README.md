# MadaMedia - Agencia de Medios Digitales

Sitio web profesional para agencia de producción audiovisual y gestión de redes sociales.

## 🚀 Características

- ✨ Diseño moderno y minimalista
- 📱 Totalmente responsive (móvil, tablet, desktop)
- 🎬 Portafolio con videos en formato 9:16 (Reels)
- 🎨 Animaciones suaves y profesionales
- 🎯 Modal de video personalizado con controles propios
- 💼 Sección de planes y precios
- 📋 FAQ interactivo con colores alternados
- 🎭 Proceso de trabajo animado

## 📁 Estructura del Proyecto

```
madamedia/
├── public/              # Carpeta de deploy (Firebase)
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   ├── logo.png
│   │   └── logo.jpeg
│   └── index.html
├── firebase.json        # Configuración de Firebase
├── .firebaserc         # Proyecto de Firebase
├── .gitignore          # Archivos ignorados
└── README.md           # Este archivo
```

## 🛠️ Tecnologías

- HTML5
- CSS3 (Tailwind CSS via CDN)
- JavaScript (Vanilla)
- YouTube iframe API
- Firebase Hosting

## 📦 Instalación

1. Clona el repositorio
2. Instala Firebase CLI (si no lo tienes):
   ```bash
   npm install -g firebase-tools
   ```
3. Inicia sesión en Firebase:
   ```bash
   firebase login
   ```

## 🚀 Deploy en Firebase

1. Inicializa Firebase (si es primera vez):
   ```bash
   firebase init hosting
   ```
   - Selecciona "Use an existing project" o crea uno nuevo
   - Public directory: `public`
   - Configure as SPA: `Yes`
   - Don't overwrite index.html: `Yes`

2. Deploy:
   ```bash
   firebase deploy
   ```

3. Tu sitio estará disponible en:
   ```
   https://madamedia-proyecto.web.app
   ```

## 🎨 Paleta de Colores

- **Principal:** #FF6B4A (Naranja)
- **Fondo:** #0a0a0a (Negro)
- **Texto:** #ffffff (Blanco)
- **Secundario:** #171717 (Gris oscuro)

## 📝 Secciones

1. **Hero** - Presentación principal con CTA
2. **Portafolio** - Grid de videos en formato vertical 9:16
3. **Planes** - Precios y servicios
4. **Sobre Nosotros** - Video y descripción
5. **Proceso** - Workflow en 4 pasos con animaciones
6. **FAQ** - Preguntas frecuentes interactivas
7. **Contacto** - Formulario y redes sociales

## 🎯 Funcionalidades Especiales

### Modal de Video
- Controles personalizados (play/pausa, volumen)
- Sin controles de YouTube visibles
- Formato 9:16 optimizado para móviles
- Zoom ajustado al rostro del sujeto

### Animaciones
- Tarjetas con efecto 3D en hover
- Iconos rotativos con glow
- Partículas flotantes
- Transiciones suaves

## 📱 Responsive Breakpoints

- **Móvil:** < 640px
- **Tablet:** 641px - 1024px
- **Desktop:** > 1024px

## 🔧 Mantenimiento

Para actualizar el sitio:

1. Modifica los archivos en la carpeta `public/`
2. Ejecuta: `firebase deploy`

## 📄 Licencia

© 2025 Vulix. Todos los derechos reservados.

## 👨‍💻 Desarrollado por Vulix

Proyecto creado con ❤️ para MadaMedia
