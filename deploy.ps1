# ========================================
# Script de Deploy - MadaMedia
# ========================================

Write-Host "`n🚀 DEPLOY MADAMEDIA" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Función para copiar archivos
function Sync-PublicFolder {
    Write-Host "📋 Sincronizando archivos a carpeta public..." -ForegroundColor Yellow
    
    # Copiar index.html
    Copy-Item "index.html" "public/index.html" -Force
    Write-Host "  ✅ index.html copiado" -ForegroundColor Green
    
    # Copiar CSS
    Copy-Item "css/styles.css" "public/css/styles.css" -Force
    Write-Host "  ✅ styles.css copiado" -ForegroundColor Green
    
    # Copiar JS
    Copy-Item "js/main.js" "public/js/main.js" -Force
    Write-Host "  ✅ main.js copiado" -ForegroundColor Green
    
    # Copiar imágenes
    Copy-Item "images/*" "public/images/" -Force
    Write-Host "  ✅ Imágenes copiadas" -ForegroundColor Green
    
    Write-Host "`n✅ Sincronización completada`n" -ForegroundColor Green
}

# Menú principal
Write-Host "Selecciona una opción:" -ForegroundColor White
Write-Host "  [1] Sincronizar archivos (copiar a public/)" -ForegroundColor White
Write-Host "  [2] Probar localmente (firebase serve)" -ForegroundColor White
Write-Host "  [3] Deploy a Firebase" -ForegroundColor White
Write-Host "  [4] Sincronizar + Deploy" -ForegroundColor White
Write-Host "  [5] Ver logs de Firebase" -ForegroundColor White
Write-Host "  [6] Salir`n" -ForegroundColor White

$opcion = Read-Host "Opción"

switch ($opcion) {
    "1" {
        Sync-PublicFolder
    }
    "2" {
        Sync-PublicFolder
        Write-Host "🌐 Iniciando servidor local..." -ForegroundColor Cyan
        Write-Host "   Abre: http://localhost:5000`n" -ForegroundColor Yellow
        firebase serve
    }
    "3" {
        Write-Host "🚀 Haciendo deploy a Firebase..." -ForegroundColor Cyan
        firebase deploy
        Write-Host "`n✅ Deploy completado!" -ForegroundColor Green
    }
    "4" {
        Sync-PublicFolder
        Write-Host "🚀 Haciendo deploy a Firebase..." -ForegroundColor Cyan
        firebase deploy
        Write-Host "`n✅ Deploy completado!" -ForegroundColor Green
        Write-Host "🌐 Tu sitio está en: https://madamedia-proyecto.web.app" -ForegroundColor Yellow
    }
    "5" {
        Write-Host "📊 Logs de Firebase:" -ForegroundColor Cyan
        firebase hosting:sites:list
    }
    "6" {
        Write-Host "`n👋 ¡Hasta luego!" -ForegroundColor Cyan
        exit
    }
    default {
        Write-Host "`n❌ Opción inválida" -ForegroundColor Red
    }
}

Write-Host "`n✨ Proceso finalizado`n" -ForegroundColor Cyan
