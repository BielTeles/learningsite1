# 🔧 Troubleshooting - GitHub Actions Deploy

Este guia resolve os problemas mais comuns no deploy via GitHub Actions.

## ❌ Problemas Comuns

### 1. "tar: out: Cannot open: No such file or directory"

**Causa**: A pasta `out` não foi criada durante o build.

**Solução**: 
- ✅ **Já corrigido neste projeto** com script personalizado `build-for-deploy.js`
- O script limpa cache e garante criação da pasta `out`

### 2. Build falha com "EINVAL: invalid argument, readlink"

**Causa**: Cache corrompido do Next.js (comum no Windows).

**Solução**:
```bash
# Local
npm run build:deploy  # Script já limpa cache automaticamente

# Manual
rm -rf .next out
npm run build
```

### 3. "Permission denied" no GitHub Actions

**Causa**: Permissões incorretas do workflow.

**Solução**: Verificar em Settings > Actions > General:
- ✅ "Allow GitHub Actions to create and approve pull requests"
- ✅ Workflow permissions: "Read and write permissions"

### 4. GitHub Pages não atualiza

**Causa**: Configuração incorreta do Pages.

**Solução**:
1. Settings > Pages
2. Source: **GitHub Actions** (não "Deploy from branch")
3. Aguardar próximo push na main

### 5. Site carrega mas CSS/JS não funciona

**Causa**: Paths incorretos para assets.

**Solução**: 
- ✅ **Já configurado** com `trailingSlash: true` no `next.config.ts`
- Para domínio personalizado, configure `basePath` se necessário

### 6. Workflow não executa

**Causa**: Branch incorreta ou arquivo YAML inválido.

**Verificar**:
```bash
# Testar YAML localmente
npm install -g js-yaml
js-yaml .github/workflows/deploy.yml

# Verificar branch
git branch  # Deve estar na 'main'
```

### 7. Build muito lento

**Causa**: Cache não está funcionando.

**Solução**:
- ✅ **Já otimizado** com cache de dependências e `.next/cache`
- Builds subsequentes são ~3x mais rápidos

## 🔍 Debug Steps

### 1. Verificar localmente
```bash
npm run check-deploy    # Verifica configuração
npm run build:deploy    # Testa build completo
```

### 2. Logs do GitHub Actions
1. Vá na aba **Actions** do repositório
2. Clique no workflow que falhou
3. Expanda cada step para ver logs detalhados
4. Procure por mensagens de erro em vermelho

### 3. Verificar arquivos gerados
O workflow inclui step de debug que lista arquivos:
```yaml
- name: Debug - List build output
  run: |
    echo "Checking build output..."
    ls -la
    if [ -d "out" ]; then
      echo "✅ out directory exists"
      ls -la out/
    fi
```

## 🚨 Problemas Específicos

### Next.js 15 + Static Export

**Problema**: Algumas features não funcionam com `output: 'export'`

**Limitações**:
- ❌ API Routes
- ❌ Server-side functions
- ❌ Dynamic headers/redirects
- ❌ Image optimization automática

**Soluções**:
- ✅ Usar `images: { unoptimized: true }`
- ✅ Configurar `dynamic = 'force-static'` em routes especiais
- ✅ Remover API routes ou usar alternatives client-side

### Dependências Problemáticas

**Problema**: Algumas packages não funcionam em static export

**Verificar**:
```bash
npm run build:deploy 2>&1 | grep -i "error\|warn"
```

**Soluções**:
- Usar dynamic imports para packages problemáticas
- Configurar `experimental.optimizePackageImports`
- Considerar alternatives client-side

## ✅ Verificação de Saúde

Execute regularmente:

```bash
# Verificação completa
npm run check-deploy

# Build de teste
npm run build:deploy

# Lint check
npm run lint

# Type check
npx tsc --noEmit
```

## 🆘 Quando Pedir Ajuda

Se nada funcionar, colete estas informações:

1. **Logs completos** do GitHub Actions
2. **Output** de `npm run check-deploy`
3. **Versões**:
   ```bash
   node --version
   npm --version
   npx next --version
   ```
4. **Sistema operacional** (Windows/Mac/Linux)
5. **Configuração** do repositório (público/privado)

## 📞 Recursos Úteis

- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**💡 Dica**: A maioria dos problemas é resolvida limpando cache e verificando configurações. Este projeto já inclui todas as correções mais comuns! 