# Como Desabilitar Proteção de Deployment na Vercel

## Método 1: Via Dashboard (Recomendado)

### Passo a Passo:

1. **Acesse o Dashboard da Vercel:**
   - URL: https://vercel.com/advances-apps/backend
   - Ou acesse: https://vercel.com/dashboard

2. **Navegue até Settings:**
   - Clique no projeto `backend`
   - No menu lateral, clique em **Settings**

3. **Acesse Deployment Protection:**
   - No menu de Settings, clique em **Deployment Protection**

4. **Desabilite a Proteção:**
   - Encontre a opção **"Protect Deployments"** ou **"Deployment Protection"**
   - Desabilite o toggle/switch
   - Salve as alterações

## Método 2: Via URL Direta

Acesse diretamente:
```
https://vercel.com/advances-apps/backend/settings/deployment-protection
```

## Método 3: Via CLI (se disponível)

```bash
# No diretório backend/
vercel env ls
```

## Verificação

Após desabilitar, teste se o backend está acessível:

```bash
# Teste o endpoint de health
curl https://backend-qpodtesls-advances-apps.vercel.app/health
```

Ou acesse no navegador:
```
https://backend-qpodtesls-advances-apps.vercel.app/health
```

Se retornar `{"status":"ok","timestamp":"..."}`, a proteção foi desabilitada com sucesso!

## Nota

- A proteção de deployment é uma medida de segurança da Vercel
- Ao desabilitar, o backend ficará acessível publicamente
- Certifique-se de que o backend tem outras medidas de segurança (autenticação, rate limiting, etc.)

