# Configuração do Supabase para Autoprev

Este guia explica como configurar o Supabase para armazenar os usuários do sistema.

## 1. Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha:
   - **Name**: autoprev
   - **Database Password**: (anote esta senha!)
   - **Region**: Escolha a região mais próxima
5. Clique em "Create new project"
6. Aguarde alguns minutos enquanto o projeto é criado

## 2. Obter Credenciais

### Project URL (SUPABASE_URL)

1. No dashboard do Supabase, vá em **Settings** → **General** (ou **API**)
2. Procure pela seção **Project URL** ou **Reference ID**
3. Copie a URL completa, exemplo: `https://abcdefghijklmnop.supabase.co`
   - ⚠️ **IMPORTANTE**: Substitua `abcdefghijklmnop` pela URL real do seu projeto

### Chave Anon (SUPABASE_ANON_KEY)

1. Vá em **Settings** → **Authentication** → **API Keys**
2. Clique na aba **"Legacy anon, service_role API keys"** (no topo da página)
3. Copie a chave **"anon public"** (NÃO use a "service_role")
   - A chave começa com `eyJ...` e é bem longa

### Exemplo de como ficará:

```
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODU2Nzg5MCwiZXhwIjoxOTU0MTQzODkwfQ.exemplo...
```

**Onde encontrar:**
- **URL**: Settings → General → Project URL
- **Chave**: Settings → Authentication → API Keys → Aba "Legacy anon, service_role API keys" → "anon public"

## 3. Criar Tabela no Banco de Dados

1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em "New query"
3. Cole o conteúdo do arquivo `supabase-schema.sql`
4. Clique em "Run" para executar o SQL
5. Verifique se a tabela `usuarios` foi criada em **Table Editor**

## 4. Configurar Variáveis de Ambiente

1. No backend, crie ou edite o arquivo `.env`:
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon-aqui
JWT_SECRET=seu-jwt-secret-aqui
PORT=3000
CORS_ORIGIN=*
```

2. **Para Vercel:**
   - Vá em **Settings** → **Environment Variables**
   - Adicione:
     - `SUPABASE_URL`
     - `SUPABASE_ANON_KEY`
     - `JWT_SECRET`

## 5. Testar a Integração

1. Inicie o servidor:
```bash
npm run dev
```

2. Teste criar um usuário via API:
```bash
POST http://localhost:3000/api/admin/usuarios
{
  "cpf": "12345678901",
  "nome": "Teste Usuario",
  "senha": "senha123",
  "email": "teste@email.com",
  "telefone": "(11) 98765-4321"
}
```

3. Verifique no Supabase se o usuário foi criado:
   - Vá em **Table Editor** → **usuarios**

## 6. Estrutura da Tabela

A tabela `usuarios` possui os seguintes campos:

- `id` (UUID): ID único do registro
- `cpf` (VARCHAR): CPF do usuário (único, 11 dígitos)
- `nome` (VARCHAR): Nome completo
- `senha` (VARCHAR): Hash da senha (bcrypt)
- `email` (VARCHAR): E-mail (opcional)
- `telefone` (VARCHAR): Telefone (opcional)
- `perfis` (JSONB): Array de perfis/planos
- `ativo` (BOOLEAN): Status do usuário
- `created_at` (TIMESTAMP): Data de criação
- `updated_at` (TIMESTAMP): Data de atualização

## 7. Segurança (RLS)

As políticas de Row Level Security (RLS) estão configuradas para permitir todas as operações. 

**⚠️ IMPORTANTE:** Em produção, ajuste as políticas conforme suas necessidades de segurança.

## 8. Fallback

Se o Supabase não estiver configurado, o sistema usa dados mockados em memória como fallback. Isso permite desenvolvimento local sem banco de dados.

## Próximos Passos

- [ ] Criar projeto no Supabase
- [ ] Executar o SQL schema
- [ ] Configurar variáveis de ambiente
- [ ] Testar criação de usuário
- [ ] Ajustar políticas RLS conforme necessário

