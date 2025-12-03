# Deploy do Backend na Vercel

## Pré-requisitos

1. Conta na Vercel (https://vercel.com)
2. Vercel CLI instalado: `npm install -g vercel`

## Passo 1: Instalar Vercel CLI (se ainda não tiver)

```bash
npm install -g vercel
```

## Passo 2: Fazer Login na Vercel

```bash
vercel login
```

## Passo 3: Deploy do Backend

No diretório `backend/`, execute:

```bash
vercel
```

Siga as instruções:
- **Set up and deploy?** → Y
- **Which scope?** → Selecione sua conta/organização
- **Link to existing project?** → N (primeira vez)
- **What's your project's name?** → autoprev-backend (ou o nome que preferir)
- **In which directory is your code located?** → ./

## Passo 4: Configurar Variáveis de Ambiente (se necessário)

Se o backend usar variáveis de ambiente, configure na Vercel:

1. Acesse o dashboard da Vercel: https://vercel.com/dashboard
2. Selecione o projeto `autoprev-backend`
3. Vá em **Settings** → **Environment Variables**
4. Adicione as variáveis necessárias (ex: `JWT_SECRET`, `CORS_ORIGIN`, etc.)

## Passo 5: Obter a URL do Backend

Após o deploy, a Vercel fornecerá uma URL como:
- `https://autoprev-backend.vercel.app`

**IMPORTANTE:** A URL da API será: `https://autoprev-backend.vercel.app/api`

## Passo 6: Atualizar o Mobile App

Atualize o arquivo `mobile/src/config/api.js`:

```javascript
const API_BASE_URL = 'https://autoprev-backend.vercel.app/api';
```

## Deploy Automático

Após o primeiro deploy, a Vercel configurará automaticamente:
- Deploy automático a cada push para o repositório Git
- URLs de preview para cada branch/PR

## Comandos Úteis

```bash
# Deploy para produção
vercel --prod

# Ver logs
vercel logs

# Listar projetos
vercel ls

# Remover projeto
vercel remove
```

## Estrutura de Arquivos

```
backend/
├── api/
│   └── index.js          # Entry point para Vercel
├── src/
│   └── server.js         # Express app
├── vercel.json           # Configuração Vercel
└── package.json
```

## Notas

- A Vercel usa serverless functions, então o Express será executado como função serverless
- O arquivo `api/index.js` é o entry point para a Vercel
- Todas as rotas serão acessíveis via `https://seu-projeto.vercel.app/api/*`
- O health check estará em: `https://seu-projeto.vercel.app/health`

