# 🔑 Como Obter as Credenciais do Supabase

## Passo a Passo Visual

### 1️⃣ Criar o Projeto

1. Acesse: https://supabase.com
2. Faça login (ou crie uma conta gratuita)
3. Clique no botão **"New Project"** (canto superior direito)
4. Preencha:
   - **Name**: `autoprev` (ou qualquer nome)
   - **Database Password**: Crie uma senha forte (anote ela!)
   - **Region**: Escolha a mais próxima (ex: South America - São Paulo)
5. Clique em **"Create new project"**
6. Aguarde 2-3 minutos enquanto o projeto é criado

### 2️⃣ Encontrar a URL do Projeto

Após o projeto ser criado:

1. No dashboard do Supabase, você verá o nome do seu projeto no topo
2. Clique em **Settings** (ícone de engrenagem) no menu lateral esquerdo
3. Clique em **API** no submenu
4. Na seção **Project URL**, você verá algo como:

```
https://abcdefghijklmnop.supabase.co
```

**Esta é a sua SUPABASE_URL!** 

⚠️ **IMPORTANTE**: Cada projeto tem uma URL única. A parte `abcdefghijklmnop` é gerada automaticamente pelo Supabase.

### 3️⃣ Encontrar a Chave Anon

Na mesma página (Settings → API):

1. Role até a seção **Project API keys**
2. Você verá várias chaves. Procure por **"anon public"**
3. Clique no ícone de **olho** 👁️ para revelar a chave
4. Clique no ícone de **cópia** 📋 para copiar

A chave será algo assim:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODU2Nzg5MCwiZXhwIjoxOTU0MTQzODkwfQ.exemplo...
```

**Esta é a sua SUPABASE_ANON_KEY!**

⚠️ **ATENÇÃO**: Use a chave **"anon public"**, NÃO a **"service_role"** (que é mais perigosa)

### 4️⃣ Criar o Arquivo .env

No diretório `backend/`, crie um arquivo chamado `.env` com:

```env
# Substitua pelos valores reais do seu projeto Supabase
SUPABASE_URL=https://SEU-PROJETO-ID.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon-aqui

# Outras configurações
JWT_SECRET=seu-jwt-secret-aqui-aleatorio
PORT=3000
CORS_ORIGIN=*
```

### 5️⃣ Exemplo Real

Se você criou um projeto chamado "autoprev" e o Supabase gerou a URL `https://xyz123abc.supabase.co`, seu `.env` ficaria assim:

```env
SUPABASE_URL=https://xyz123abc.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5ejEyM2FiYyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjM4NTY3ODkwLCJleHAiOjE5NTQxNDM4OTB9.exemplo...
JWT_SECRET=minha-chave-secreta-super-segura-123
PORT=3000
CORS_ORIGIN=*
```

## 🎯 Resumo

1. **SUPABASE_URL**: Está em Settings → API → Project URL
2. **SUPABASE_ANON_KEY**: Está em Settings → API → Project API keys → anon public

## ❓ Dúvidas?

- A URL sempre termina com `.supabase.co`
- A chave anon sempre começa com `eyJ`
- Se você não encontrar, verifique se o projeto foi criado corretamente
- Você pode criar quantos projetos quiser (há um limite na versão gratuita)

