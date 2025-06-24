#!/usr/bin/env node

/**
 * Script de build personalizado para deploy com verificações rigorosas
 * Inclui ESLint, TypeScript e verificações de qualidade
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️  Iniciando build para deploy com verificações rigorosas...\n');

// Função para executar comandos e capturar erros
const runCommand = (command, description) => {
  console.log(`📋 ${description}...`);
  try {
    execSync(command, { 
      stdio: 'inherit',
      env: { 
        ...process.env,
        NODE_ENV: 'production',
        GITHUB_PAGES: 'true'
      }
    });
    console.log(`   ✅ ${description} concluído\n`);
    return true;
  } catch (error) {
    console.error(`   ❌ ${description} falhou:`);
    console.error(`   ${error.message}\n`);
    return false;
  }
};

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

  // 1. Verificação de TypeScript
  if (!runCommand('npx tsc --noEmit', 'Verificação de tipos TypeScript')) {
    throw new Error('❌ Verificação de TypeScript falhou!');
  }

  // 2. Verificação rigorosa de ESLint
  if (!runCommand('npm run lint:strict', 'Verificação rigorosa de ESLint (zero warnings)')) {
    throw new Error('❌ Verificação de ESLint falhou!');
  }

  // 3. Limpar cache e pasta out
  console.log('🧹 Limpando cache e arquivos anteriores...');
  const pathsToClean = ['out', '.next', 'dist'];
  pathsToClean.forEach(dir => {
    cleanDirectory(dir);
  });

  // 4. Executar o build do Next.js
  if (!runCommand('npx next build', 'Build do Next.js')) {
    throw new Error('❌ Build do Next.js falhou!');
  }

  console.log('🔍 Verificando se o build foi bem-sucedido...');

  // 5. Verificar se a pasta out foi criada
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

  // 6. Verificar arquivos essenciais
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

  // 7. Verificações finais de qualidade
  console.log('\n🔬 Verificações finais de qualidade...');
  
  // Verificar se há arquivos .map em produção (devem estar presentes para debug)
  const sourceMapFiles = fs.readdirSync('out').filter(file => file.endsWith('.map'));
  console.log(`   📊 Source maps encontrados: ${sourceMapFiles.length}`);

  // Verificar se o .nojekyll está presente
  if (fs.existsSync('out/.nojekyll')) {
    console.log('   ✅ Arquivo .nojekyll presente (necessário para GitHub Pages)');
  } else {
    console.log('   ⚠️  Arquivo .nojekyll não encontrado');
  }

  // 8. Estatísticas do build
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

  // 9. Listar estrutura para debug
  console.log('\n📋 Estrutura da pasta out:');
  const listFiles = (dir, prefix = '', maxDepth = 2, currentDepth = 0) => {
    if (currentDepth >= maxDepth) return;
    
    const files = fs.readdirSync(dir).slice(0, 10);
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

  console.log('\n🎉 Deploy build concluído com sucesso!');
  console.log('✅ Todas as verificações de qualidade passaram');
  console.log('✅ ESLint: Zero warnings/errors');
  console.log('✅ TypeScript: Sem erros de tipo');
  console.log('✅ Build: Geração estática bem-sucedida');

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
  
  console.log('\n💡 Dicas para resolver o problema:');
  console.log('1. Execute "npm run lint:fix" para corrigir problemas de ESLint');
  console.log('2. Execute "npm run type-check" para verificar erros de TypeScript');
  console.log('3. Verifique se todas as dependências estão instaladas');
  console.log('4. Limpe o cache com "npm cache clean --force"');
  
  process.exit(1);
} 