# 🔧 Configurar Variáveis de Ambiente no Vercel

Agora que o Supabase está configurado localmente, você precisa configurar as mesmas variáveis no Vercel para que o backend funcione em produção.

## Passo a Passo

### 1. Acessar as Configurações do Projeto

1. Acesse [https://vercel.com](https://vercel.com)
2. Faça login na sua conta
3. Selecione o projeto do backend (geralmente `backend` ou `autoprev-backend`)

### 2. Adicionar Variáveis de Ambiente

1. No dashboard do projeto, clique em **Settings**
2. No menu lateral, clique em **Environment Variables**
3. Você verá uma lista de variáveis (pode estar vazia)

### 3. Adicionar as Variáveis do Supabase

Clique em **Add New** e adicione cada variável:

#### Variável 1: SUPABASE_URL
- **Key**: `SUPABASE_URL`
- **Value**: `https://orbvxdotchrahtttspnb.supabase.co`
- **Environment**: Selecione todas (Production, Preview, Development)
- Clique em **Save**

#### Variável 2: SUPABASE_ANON_KEY
- **Key**: `SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yYnZ4ZG90Y2hyYWh0dHRzcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODUxMTgsImV4cCI6MjA4MDM2MTExOH0.VE7oKXLK9Ekp4iSMwt3t_fVL31S303dtaopkaKRGZKY`
- **Environment**: Selecione todas (Production, Preview, Development)
- Clique em **Save**

#### Variável 3: JWT_SECRET (se ainda não tiver)
- **Key**: `JWT_SECRET`
- **Value**: `autoprev-jwt-secret-2025-aleatorio` (ou uma chave mais segura)
- **Environment**: Selecione todas
- Clique em **Save**

### 4. Fazer Novo Deploy

Após adicionar as variáveis:

1. Vá em **Deployments**
2. Clique nos três pontos (...) do último deployment
3. Selecione **Redeploy**
4. Ou faça um novo commit e push para trigger automático

### 5. Verificar se Funcionou

1. Após o deploy, teste criar um usuário via admin:
   - Acesse: `https://autoprev.vercel.app/usuarios`
   - Tente criar um novo usuário
   - Verifique no Supabase se o usuário foi criado

2. Teste o login no app mobile:
   - Use o CPF e senha do usuário criado
   - Verifique se o login funciona

## ⚠️ Importante

- As variáveis são sensíveis, não compartilhe publicamente
- Use a mesma chave `anon public` (não a `service_role`)
- Certifique-se de selecionar todos os ambientes (Production, Preview, Development)

## ✅ Checklist

- [ ] Variável `SUPABASE_URL` adicionada no Vercel
- [ ] Variável `SUPABASE_ANON_KEY` adicionada no Vercel
- [ ] Variável `JWT_SECRET` adicionada no Vercel (se necessário)
- [ ] Novo deploy feito
- [ ] Teste de criação de usuário funcionando
- [ ] Teste de login funcionando

