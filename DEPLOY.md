# 🚀 Guía de Deploy - MadaMedia

## 📋 Pre-requisitos

Antes de hacer deploy, asegúrate de tener:

- ✅ Node.js instalado (v14 o superior)
- ✅ Firebase CLI instalado
- ✅ Cuenta de Firebase/Google

## 🛠️ Instalación de Firebase CLI

Si no tienes Firebase CLI instalado:

```bash
npm install -g firebase-tools
```

## 🔐 Login en Firebase

```bash
firebase login
```

Esto abrirá tu navegador para autenticarte con tu cuenta de Google.

## 🎯 Inicializar Proyecto (Solo primera vez)

Si es la primera vez que configuras Firebase en este proyecto:

```bash
firebase init hosting
```

Responde:
- ❓ **Select project:** Elige "madamedia-proyecto" o crea uno nuevo
- ❓ **Public directory:** `public`
- ❓ **Configure as SPA:** `Yes`
- ❓ **Overwrite index.html:** `No`

## 🚀 Hacer Deploy

### Opción 1: Deploy completo

```bash
firebase deploy
```

### Opción 2: Solo hosting

```bash
firebase deploy --only hosting
```

### Opción 3: Preview antes de deploy

```bash
firebase hosting:channel:deploy preview
```

## 🌐 Ver tu sitio

Después del deploy, tu sitio estará disponible en:

```
https://madamedia-proyecto.web.app
```

O también en:

```
https://madamedia-proyecto.firebaseapp.com
```

## 📝 Comandos Útiles

### Ver proyectos disponibles
```bash
firebase projects:list
```

### Cambiar de proyecto
```bash
firebase use [project-id]
```

### Servir localmente (testing)
```bash
firebase serve
```
Luego abre: http://localhost:5000

### Ver logs
```bash
firebase hosting:sites:list
```

### Rollback (volver a versión anterior)
```bash
firebase hosting:rollback
```

## 🔄 Workflow Recomendado

1. **Hacer cambios** en los archivos de `public/`
2. **Probar localmente:**
   ```bash
   firebase serve
   ```
3. **Verificar** que todo funciona en http://localhost:5000
4. **Deploy:**
   ```bash
   firebase deploy
   ```
5. **Verificar** el sitio en producción

## 📁 Estructura de Archivos

```
madamedia/
├── public/              ← Solo esta carpeta se sube a Firebase
│   ├── css/
│   ├── js/
│   ├── images/
│   └── index.html
├── firebase.json        ← Configuración de Firebase
└── .firebaserc         ← Proyecto activo
```

## ⚠️ Notas Importantes

- Solo los archivos en `public/` se suben a Firebase
- Los archivos en la raíz NO se suben (son para desarrollo)
- Antes de hacer deploy, verifica que los cambios estén en `public/`
- Firebase cachea agresivamente, usa Ctrl+Shift+R para limpiar caché

## 🐛 Solución de Problemas

### Error: "Not authorized"
```bash
firebase logout
firebase login
```

### Error: "Project not found"
```bash
firebase use --add
```

### Cache no actualiza
- Limpia caché del navegador (Ctrl+Shift+R)
- O usa modo incógnito

### Deploy muy lento
- Verifica tu conexión a internet
- Firebase comprime archivos automáticamente

## 📊 Verificar Deploy

Después del deploy, verifica:

- ✅ Videos del portafolio funcionan
- ✅ Modal de video abre correctamente
- ✅ Controles personalizados funcionan
- ✅ Animaciones se ven bien
- ✅ Responsive en móviles
- ✅ Formulario de contacto funciona

## 🎯 Siguiente Nivel

### Custom Domain (Dominio personalizado)

1. Ve a Firebase Console → Hosting
2. Click en "Add custom domain"
3. Sigue las instrucciones para configurar DNS

### SSL Automático

Firebase proporciona SSL automático para todos los sitios (HTTPS).

## 💡 Tips

- Usa `firebase serve` para probar antes de deploy
- Mantén backup de los archivos originales
- Documenta todos los cambios importantes
- Prueba en diferentes navegadores después del deploy

## 📞 Ayuda

Si tienes problemas:
- Documentación oficial: https://firebase.google.com/docs/hosting
- Community: https://firebase.community
