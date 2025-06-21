# 🚀 Script de Setup do Git para GitHub Pages (PowerShell)
Write-Host "🚀 Configurando repositório para GitHub Pages..." -ForegroundColor Green

# Inicializar repositório Git (se não existir)
if (-not (Test-Path ".git")) {
    Write-Host "📁 Inicializando repositório Git..." -ForegroundColor Yellow
    git init
}

# Configurar branch principal
Write-Host "🌿 Configurando branch principal..." -ForegroundColor Yellow
git branch -M main

# Adicionar todos os arquivos
Write-Host "📦 Adicionando arquivos..." -ForegroundColor Yellow
git add .

# Commit inicial
Write-Host "💾 Fazendo commit inicial..." -ForegroundColor Yellow
git commit -m "🎉 Initial commit: TechCorp site with GitHub Pages setup

✨ Features:
- Next.js 15 with App Router
- Responsive design with Tailwind CSS
- Dark/Light mode toggle
- Framer Motion animations
- SEO optimized
- PWA ready
- Static export for GitHub Pages

🚀 Deploy: GitHub Actions → GitHub Pages
🌐 URL: https://bielteles.github.io/learningsite1/"

# Adicionar remote origin
Write-Host "🔗 Configurando remote origin..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/bielteles/learningsite1.git

Write-Host ""
Write-Host "✅ Setup concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Crie o repositório 'learningsite1' no GitHub" -ForegroundColor White
Write-Host "2. Execute: git push -u origin main" -ForegroundColor White
Write-Host "3. Configure GitHub Pages nas configurações do repositório" -ForegroundColor White
Write-Host "4. Aguarde o deploy automático!" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Seu site estará disponível em:" -ForegroundColor Cyan
Write-Host "   https://bielteles.github.io/learningsite1/" -ForegroundColor Magenta
Write-Host "" 