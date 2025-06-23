#!/usr/bin/env node

/**
 * Script de verificação para debug do processo de deploy
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificação do ambiente de deploy\n');

// Verificar variáveis de ambiente
console.log('🌍 Variáveis de ambiente:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'não definido'}`);
console.log(`   GITHUB_PAGES: ${process.env.GITHUB_PAGES || 'não definido'}`);
console.log(`   GITHUB_ACTIONS: ${process.env.GITHUB_ACTIONS || 'não definido'}`);

// Verificar arquivos de configuração
console.log('\n⚙️  Arquivos de configuração:');
const configFiles = ['next.config.ts', 'next.config.js', 'package.json'];
configFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file} existe`);
  } else {
    console.log(`   ❌ ${file} não encontrado`);
  }
});

// Verificar estrutura do projeto
console.log('\n📁 Estrutura do projeto:');
const importantDirs = ['src', 'public', '.next', 'out', 'dist'];
importantDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    console.log(`   ✅ ${dir}/ (${files.length} itens)`);
  } else {
    console.log(`   ❌ ${dir}/ não existe`);
  }
});

// Verificar package.json scripts
console.log('\n📋 Scripts disponíveis:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const scripts = packageJson.scripts || {};
  Object.keys(scripts).forEach(script => {
    console.log(`   📜 ${script}: ${scripts[script]}`);
  });
} catch (error) {
  console.log('   ❌ Erro ao ler package.json');
}

// Verificar se há conflitos na configuração do Next.js
console.log('\n🔧 Verificação da configuração Next.js:');
try {
  // Simular as injeções do GitHub Actions
  const nextConfigContent = fs.readFileSync('next.config.ts', 'utf8');
  console.log('   ✅ next.config.ts lido com sucesso');
  
  // Verificar se há configurações que podem causar conflito
  if (nextConfigContent.includes('basePath')) {
    console.log('   ⚠️  basePath detectado na configuração');
  }
  if (nextConfigContent.includes('images')) {
    console.log('   ⚠️  configuração de images detectada');
  }
  if (nextConfigContent.includes('output')) {
    console.log('   ✅ configuração de output detectada');
  }
  
} catch (error) {
  console.log(`   ❌ Erro ao verificar configuração: ${error.message}`);
}

console.log('\n✅ Verificação concluída!'); 