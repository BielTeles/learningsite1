#!/usr/bin/env node

/**
 * Script de build personalizado para garantir exportação estática
 * Usado no GitHub Actions para deploy
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️  Iniciando build para deploy...\n');

try {
  // Limpar cache e pasta out
  console.log('🧹 Limpando cache e arquivos anteriores...');
  
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true, force: true });
  }
  
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
  }

  // Executar o build do Next.js
  console.log('📦 Executando next build...');
  execSync('npx next build', { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_ENV: 'production' 
    }
  });

  // Verificar se a pasta out foi criada
  if (!fs.existsSync('out')) {
    throw new Error('❌ Pasta out não foi criada pelo build!');
  }

  // Verificar arquivos essenciais
  const essentialFiles = ['index.html', 'sitemap.xml', 'manifest.webmanifest'];
  const missingFiles = essentialFiles.filter(file => !fs.existsSync(path.join('out', file)));
  
  if (missingFiles.length > 0) {
    throw new Error(`❌ Arquivos essenciais não encontrados: ${missingFiles.join(', ')}`);
  }

  // Estatísticas do build
  const outStats = fs.readdirSync('out');
  console.log(`\n✅ Build concluído com sucesso!`);
  console.log(`📁 Pasta out criada com ${outStats.length} arquivos/pastas`);
  console.log(`📄 Arquivos principais: ${essentialFiles.join(', ')}`);
  
  // Verificar tamanho da pasta
  const getDirectorySize = (dirPath) => {
    let totalSize = 0;
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile()) {
        totalSize += stats.size;
      } else if (stats.isDirectory()) {
        totalSize += getDirectorySize(filePath);
      }
    });
    
    return totalSize;
  };

  const totalSize = getDirectorySize('out');
  const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
  console.log(`📊 Tamanho total: ${sizeInMB} MB`);

} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
} 