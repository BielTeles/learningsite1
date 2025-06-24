#!/usr/bin/env node

/**
 * Script de verificações pré-commit
 * Executa verificações de qualidade antes de permitir commits
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 Executando verificações pré-commit...\n');

const checks = [
  {
    name: 'TypeScript Type Check',
    command: 'npx tsc --noEmit',
    description: 'Verificando tipos TypeScript'
  },
  {
    name: 'ESLint Strict Check',
    command: 'npm run lint:strict',
    description: 'Verificando ESLint (zero warnings)'
  },
  {
    name: 'Prettier Format Check',
    command: 'npx prettier --check "src/**/*.{ts,tsx,js,jsx,css,md}"',
    description: 'Verificando formatação do código',
    optional: true
  }
];

let allPassed = true;
const results = [];

for (const check of checks) {
  console.log(`📋 ${check.description}...`);
  
  try {
    execSync(check.command, { 
      stdio: 'pipe',
      encoding: 'utf8'
    });
    
    console.log(`   ✅ ${check.name} passou\n`);
    results.push({ name: check.name, status: 'passed' });
    
  } catch (error) {
    console.error(`   ❌ ${check.name} falhou`);
    
    if (check.optional) {
      console.log(`   ⚠️  ${check.name} é opcional, continuando...\n`);
      results.push({ name: check.name, status: 'failed-optional' });
    } else {
      console.error(`   Erro: ${error.message}\n`);
      results.push({ name: check.name, status: 'failed', error: error.message });
      allPassed = false;
    }
  }
}

// Verificações adicionais de qualidade de código
console.log('🔬 Verificações adicionais de qualidade...');

try {
  // Verificar se há arquivos grandes demais
  const srcFiles = execSync('find src -type f -size +500k 2>/dev/null || true', { encoding: 'utf8' });
  if (srcFiles.trim()) {
    console.log('   ⚠️  Arquivos grandes encontrados (>500KB):');
    console.log(`   ${srcFiles.trim()}`);
    console.log('   Considere otimizar estes arquivos\n');
  }

  // Verificar se há TODO/FIXME comentários
  const todoComments = execSync('grep -r "TODO\\|FIXME\\|XXX" src/ || true', { encoding: 'utf8' });
  if (todoComments.trim()) {
    console.log('   📝 Comentários TODO/FIXME encontrados:');
    const lines = todoComments.trim().split('\n').slice(0, 5);
    lines.forEach(line => console.log(`   ${line}`));
    if (todoComments.split('\n').length > 5) {
      console.log(`   ... e mais ${todoComments.split('\n').length - 5} outros`);
    }
    console.log('');
  }

  // Verificar imports não utilizados (básico)
  const unusedImports = execSync('grep -r "^import.*from.*\\".*\\"$" src/ | grep -v "use" | head -3 || true', { encoding: 'utf8' });
  if (unusedImports.trim()) {
    console.log('   📦 Possíveis imports não utilizados encontrados:');
    unusedImports.trim().split('\n').forEach(line => {
      if (line) console.log(`   ${line}`);
    });
    console.log('   Execute ESLint para verificação detalhada\n');
  }

} catch (error) {
  // Verificações adicionais são opcionais
  console.log('   ⚠️  Algumas verificações adicionais falharam (não crítico)\n');
}

// Resumo final
console.log('='.repeat(60));
console.log('📊 Resumo das verificações:');

results.forEach(result => {
  const icon = result.status === 'passed' ? '✅' : 
               result.status === 'failed-optional' ? '⚠️' : '❌';
  console.log(`${icon} ${result.name}`);
});

console.log('='.repeat(60));

if (allPassed) {
  console.log('🎉 Todas as verificações obrigatórias passaram!');
  console.log('✅ Código pronto para commit');
  process.exit(0);
} else {
  console.log('❌ Algumas verificações falharam');
  console.log('\n💡 Para corrigir automaticamente alguns problemas:');
  console.log('• Execute: npm run lint:fix');
  console.log('• Execute: npx prettier --write "src/**/*.{ts,tsx,js,jsx,css,md}"');
  console.log('• Verifique os erros de TypeScript acima');
  console.log('\n🚫 Commit bloqueado até resolver os problemas');
  process.exit(1);
} 