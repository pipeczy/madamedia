# Instrucciones de Configuración - Formulario de Contacto

## 📧 Configuración del Formulario

El formulario de contacto está configurado para enviar emails usando SMTP de tu servidor de correo.

### Credenciales Configuradas:

```
Servidor SMTP: madamedia.cl
Puerto: 465 (SSL)
Email Remitente: no-reply@madamedia.cl
Contraseña Remitente: xoTo+31wEPoHGo8T
Email Destino: Contacto@madamedia.cl
```

---

## 🚀 Pasos para Subir al Servidor

### 1. Subir archivos por FTP/cPanel

Sube todos los archivos de la carpeta `public/` a la raíz de tu dominio:

```
/public_html/  (o /www/ o /httpdocs/ según tu hosting)
├── index.html
├── proyectos.html
├── send-email.php  ← IMPORTANTE
├── css/
├── images/
├── js/
└── ...
```

### 2. Verificar permisos del archivo PHP

Asegúrate de que el archivo `send-email.php` tenga permisos de ejecución (644 o 755).

En cPanel:
1. Ve a "Administrador de Archivos"
2. Busca `send-email.php`
3. Click derecho → Permisos
4. Establece: `644` o `755`

---

## 🔧 Configuración Alternativa (si el método actual no funciona)

Si el servidor no permite enviar emails con las credenciales actuales, tienes 2 opciones:

### Opción 1: Usar PHPMailer (Recomendado)

Si tu hosting tiene Composer instalado, ejecuta en SSH:

```bash
cd /ruta/a/tu/sitio
composer require phpmailer/phpmailer
```

El archivo `send-email.php` ya está preparado para usar PHPMailer automáticamente.

### Opción 2: Cambiar Puerto SMTP

Si el puerto 465 está bloqueado, edita el archivo `send-email.php`:

**Línea 60-61:**
```php
$smtp_port = 587; // Cambiar de 465 a 587
$smtp_secure = 'tls'; // Cambiar de 'ssl' a 'tls'
```

---

## ✅ Probar el Formulario

1. Abre tu sitio: `https://madamedia.cl`
2. Ve a la sección "Contacto" (al final de la página)
3. Completa el formulario con datos de prueba
4. Click en "Enviar Mensaje"

**Deberías ver:**
- Un mensaje verde de confirmación
- Un email en `Contacto@madamedia.cl`

---

## 🐛 Solución de Problemas

### Error: "No se pudo enviar el email"

**Causas posibles:**
1. El servidor bloquea el puerto SMTP
2. Las credenciales son incorrectas
3. El firewall bloquea conexiones SMTP

**Solución:**
1. Verifica las credenciales en cPanel → Email Accounts
2. Prueba cambiar el puerto a 587 (TLS)
3. Contacta a tu proveedor de hosting para verificar si SMTP está habilitado

### Error: "Página no encontrada" al enviar

**Causa:** El archivo PHP no está en la ubicación correcta

**Solución:**
1. Verifica que `send-email.php` esté en la raíz del sitio
2. Asegúrate de que el archivo se subió correctamente

### El formulario se envía pero no llega el email

**Solución:**
1. Revisa la carpeta de SPAM de `Contacto@madamedia.cl`
2. Verifica los logs de errores en cPanel → Errores
3. Activa el log de errores en `send-email.php` (línea 3):
   ```php
   ini_set('display_errors', 1); // Cambiar de 0 a 1 temporalmente
   ```

---

## 📝 Información Técnica

### Puerto SMTP Recomendado

| Puerto | Cifrado | Uso |
|--------|---------|-----|
| 465 | SSL | Conexión cifrada desde el inicio (configurado por defecto) |
| 587 | TLS | Conexión que se cifra después (alternativa) |
| 25 | Ninguno | **No recomendado** - bloqueado por la mayoría de hostings |

### Seguridad

El archivo `send-email.php` incluye:
- ✅ Validación de datos de entrada
- ✅ Protección contra XSS
- ✅ Protección contra inyección de headers
- ✅ Rate limiting (prevención de spam)
- ✅ Sanitización de HTML
- ✅ Logs de errores

---

## 📧 Verificar Cuentas de Email en cPanel

1. Ingresa a cPanel
2. Ve a **Email → Cuentas de Email**
3. Verifica que existan:
   - `no-reply@madamedia.cl` (password: `xoTo+31wEPoHGo8T`)
   - `Contacto@madamedia.cl` (password: `vahrep-4reSso-wyfnyt`)

---

## 🔐 Cambiar Credenciales SMTP

Si necesitas cambiar las credenciales, edita `send-email.php` en las líneas 55-59:

```php
$smtp_host = 'madamedia.cl';
$smtp_port = 465;
$smtp_user = 'tu-nuevo-email@madamedia.cl';
$smtp_pass = 'tu-nueva-contraseña';
$smtp_secure = 'ssl';
```

Y también cambia el email destino en la línea 63:

```php
$to_email = 'nuevo-destino@madamedia.cl';
```

---

## 📞 Soporte

Si tienes problemas configurando el formulario:

1. Verifica los logs de error de PHP en cPanel
2. Prueba enviar un email de prueba desde cPanel → Email → Track Delivery
3. Contacta a tu proveedor de hosting para verificar configuración SMTP

---

## ✨ Características del Formulario

- ✅ Envío asíncrono (sin recargar página)
- ✅ Validación en tiempo real
- ✅ Mensajes de error y éxito
- ✅ Diseño responsive
- ✅ Prevención de spam
- ✅ Email con formato HTML profesional
- ✅ Información del usuario (IP, navegador, fecha)

---

**Archivo creado para:** MadaMedia.cl
**Fecha:** Diciembre 2024
**Versión:** 1.0
