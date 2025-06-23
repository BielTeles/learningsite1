#!/usr/bin/env node

/**
 * Script de build personalizado para garantir exportação estática
 * Usado no GitHub Actions para deploy
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️  Iniciando build para deploy...\n');

// Função para limpar pasta de forma segura
const cleanDirectory = (dir) => {
  try {
    if (fs.existsSync(dir)) {
      // Tentar método mais seguro no Windows
      if (process.platform === 'win32') {
        execSync(`rmdir /s /q "${dir}"`, { stdio: 'ignore' });
      } else {
        fs.rmSync(dir, { recursive: true, force: true });
      }
      console.log(`   ✓ Removido: ${dir}`);
      return true;
    }
    return false;
  } catch (error) {
    console.log(`   ⚠️  Erro ao remover ${dir}: ${error.message}`);
    return false;
  }
};

try {
  // Definir variáveis de ambiente
  process.env.NODE_ENV = 'production';
  process.env.GITHUB_PAGES = 'true';
  
  console.log('🌍 Variáveis de ambiente configuradas:');
  console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`   GITHUB_PAGES: ${process.env.GITHUB_PAGES}\n`);

  // Limpar cache e pasta out
  console.log('🧹 Limpando cache e arquivos anteriores...');
  
  const pathsToClean = ['out', '.next', 'dist'];
  pathsToClean.forEach(dir => {
    cleanDirectory(dir);
  });

  // Executar o build do Next.js
  console.log('\n📦 Executando next build...');
  execSync('npx next build', { 
    stdio: 'inherit',
    env: { 
      ...process.env,
      NODE_ENV: 'production',
      GITHUB_PAGES: 'true'
    }
  });

  console.log('\n🔍 Verificando se o build foi bem-sucedido...');

  // Verificar se a pasta out foi criada
  if (!fs.existsSync('out')) {
    // Tentar localizar onde os arquivos foram gerados
    console.log('🔍 Procurando arquivos de build...');
    const possibleDirs = ['.next/out', '.next/static', 'dist', 'build'];
    
    for (const dir of possibleDirs) {
      if (fs.existsSync(dir)) {
        console.log(`   📁 Encontrado: ${dir}`);
        const files = fs.readdirSync(dir);
        console.log(`   📄 Arquivos: ${files.slice(0, 5).join(', ')}${files.length > 5 ? '...' : ''}`);
      }
    }
    
    throw new Error('❌ Pasta out não foi criada pelo build!');
  }

  // Verificar arquivos essenciais
  console.log('\n🔍 Verificando arquivos essenciais...');
  const essentialFiles = ['index.html'];
  const optionalFiles = ['sitemap.xml', 'manifest.webmanifest', 'robots.txt'];
  
  const missingEssential = essentialFiles.filter(file => !fs.existsSync(path.join('out', file)));
  const foundOptional = optionalFiles.filter(file => fs.existsSync(path.join('out', file)));
  
  if (missingEssential.length > 0) {
    throw new Error(`❌ Arquivos essenciais não encontrados: ${missingEssential.join(', ')}`);
  }

  console.log(`   ✅ Arquivos essenciais: ${essentialFiles.join(', ')}`);
  if (foundOptional.length > 0) {
    console.log(`   ✅ Arquivos opcionais: ${foundOptional.join(', ')}`);
  }

  // Estatísticas do build
  const outStats = fs.readdirSync('out');
  console.log(`\n✅ Build concluído com sucesso!`);
  console.log(`📁 Pasta out criada com ${outStats.length} arquivos/pastas`);
  
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

  // Listar alguns arquivos para debug
  console.log('\n📋 Estrutura da pasta out:');
  const listFiles = (dir, prefix = '', maxDepth = 2, currentDepth = 0) => {
    if (currentDepth >= maxDepth) return;
    
    const files = fs.readdirSync(dir).slice(0, 10); // Limitar para evitar spam
    files.forEach((file, index) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      const isLast = index === files.length - 1;
      const connector = isLast ? '└──' : '├──';
      
      console.log(`${prefix}${connector} ${file}${stats.isDirectory() ? '/' : ''}`);
      
      if (stats.isDirectory() && currentDepth < maxDepth - 1) {
        const newPrefix = prefix + (isLast ? '    ' : '│   ');
        listFiles(filePath, newPrefix, maxDepth, currentDepth + 1);
      }
    });
  };
  
  listFiles('out');

} catch (error) {
  console.error('\n❌ Erro durante o build:', error.message);
  
  // Debug adicional em caso de erro
  console.log('\n🔍 Debug - Estrutura do projeto:');
  const debugDirs = ['.', '.next', 'out', 'dist'];
  debugDirs.forEach(dir => {
    try {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        console.log(`   ${dir}/: ${files.slice(0, 5).join(', ')}${files.length > 5 ? '...' : ''}`);
      } else {
        console.log(`   ${dir}/: não existe`);
      }
    } catch (e) {
      console.log(`   ${dir}/: erro ao listar (${e.message})`);
    }
  });
  
  process.exit(1);
} 