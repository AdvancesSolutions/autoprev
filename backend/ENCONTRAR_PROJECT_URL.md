# 🔍 Como Encontrar a Project URL do Supabase

Se você não encontrou a Project URL na página General, tente estes locais:

## 📍 Locais Onde Pode Estar

### 1. Settings → API Keys
- Vá em **Settings** → **API Keys** (em PROJECT SETTINGS)
- A URL pode estar no topo da página ou em uma seção de informações

### 2. Settings → Data API
- Vá em **Settings** → **Data API** (em PROJECT SETTINGS)
- Procure por "REST API URL" ou "Project URL"

### 3. Project Overview
- Clique em **"Project Overview"** no menu lateral (primeira opção)
- A URL pode estar visível no cabeçalho ou em cards informativos

### 4. Settings → General (final da página)
- Role até o final da página General
- Procure por **"Project ID"** ou **"Reference ID"**
- Se encontrar um ID como `abcdefghijklmnop`, a URL será:
  ```
  https://abcdefghijklmnop.supabase.co
  ```

### 5. URL do Navegador
- Olhe a barra de endereços do navegador
- Se você estiver em: `https://app.supabase.com/project/xyz123abc`
- A Project URL será: `https://xyz123abc.supabase.co`

### 6. Na Página de Authentication → API Keys
- Vá em **Settings** → **Authentication** → **API Keys**
- Às vezes a Project URL aparece no topo ou em uma seção de informações

## 🎯 Formato da URL

A Project URL sempre segue este formato:
```
https://[PROJECT-ID].supabase.co
```

Onde `[PROJECT-ID]` é um código único gerado pelo Supabase (geralmente 20 caracteres alfanuméricos).

## 💡 Dica

Se você encontrar apenas o **Project ID** (sem o `https://` e `.supabase.co`), basta adicionar:
- Prefixo: `https://`
- Sufixo: `.supabase.co`

**Exemplo:**
- Project ID: `xyz123abc`
- Project URL: `https://xyz123abc.supabase.co`

## ❓ Ainda Não Encontrou?

1. Verifique se você está no projeto correto
2. Tente fazer logout e login novamente
3. A URL também pode estar visível quando você cria uma nova API key
4. Em último caso, você pode criar um novo projeto e anotar a URL durante a criação

