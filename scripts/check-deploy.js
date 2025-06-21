#!/usr/bin/env node

/**
 * Script para verificar se o projeto está pronto para deploy
 * Execute: node scripts/check-deploy.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuração de deploy...\n');

const checks = [
  {
    name: 'Next.js configurado para exportação estática',
    check: () => {
      try {
        const config = fs.readFileSync('next.config.ts', 'utf8');
        return config.includes('output: \'export\'') && config.includes('trailingSlash: true');
      } catch {
        return false;
      }
    }
  },
  {
    name: 'Workflows do GitHub Actions',
    check: () => {
      return fs.existsSync('.github/workflows/deploy.yml') && 
             fs.existsSync('.github/workflows/ci.yml');
    }
  },
  {
    name: 'Dependabot configurado',
    check: () => fs.existsSync('.github/dependabot.yml')
  },
  {
    name: 'Arquivo .nojekyll presente',
    check: () => fs.existsSync('public/.nojekyll')
  },
  {
    name: 'Build gerou arquivos estáticos',
    check: () => {
      return fs.existsSync('out/index.html') && fs.existsSync('out/sitemap.xml');
    }
  },
  {
    name: 'Sitemap e manifest configurados para static export',
    check: () => {
      try {
        const sitemap = fs.readFileSync('src/app/sitemap.ts', 'utf8');
        const manifest = fs.readFileSync('src/app/manifest.ts', 'utf8');
        return sitemap.includes('force-static') && manifest.includes('force-static');
      } catch {
        return false;
      }
    }
  }
];

let allPassed = true;

checks.forEach(({ name, check }) => {
  const passed = check();
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} ${name}`);
  if (!passed) allPassed = false;
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 Projeto pronto para deploy!');
  console.log('\n📋 Próximos passos:');
  console.log('1. Faça push para o GitHub');
  console.log('2. Configure GitHub Pages (Settings > Pages > Source: GitHub Actions)');
  console.log('3. Próximo push na main = deploy automático!');
  console.log('\n🔗 Seu site estará em: https://[username].github.io/[repository-name]/');
} else {
  console.log('⚠️  Algumas verificações falharam.');
  console.log('Corrija os problemas acima antes do deploy.');
  process.exit(1);
} 