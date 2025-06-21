#!/bin/bash

# 🚀 Script de Setup do Git para GitHub Pages
echo "🚀 Configurando repositório para GitHub Pages..."

# Inicializar repositório Git (se não existir)
if [ ! -d ".git" ]; then
    echo "📁 Inicializando repositório Git..."
    git init
fi

# Configurar branch principal
echo "🌿 Configurando branch principal..."
git branch -M main

# Adicionar todos os arquivos
echo "📦 Adicionando arquivos..."
git add .

# Commit inicial
echo "💾 Fazendo commit inicial..."
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
echo "🔗 Configurando remote origin..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/bielteles/learningsite1.git

echo ""
echo "✅ Setup concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Crie o repositório 'learningsite1' no GitHub"
echo "2. Execute: git push -u origin main"
echo "3. Configure GitHub Pages nas configurações do repositório"
echo "4. Aguarde o deploy automático!"
echo ""
echo "🌐 Seu site estará disponível em:"
echo "   https://bielteles.github.io/learningsite1/"
echo "" 