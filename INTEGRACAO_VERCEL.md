# Integração Completa na Vercel

## 📋 Status da Integração

✅ **Backend** - Deployado e funcionando na Vercel  
✅ **Admin** - Deployado e funcionando na Vercel  
✅ **Mobile** - Configurado para usar backend da Vercel  

## 🔗 URLs de Produção

### Backend API
- **URL Base:** `https://backend-qpodtesls-advances-apps.vercel.app`
- **API Endpoint:** `https://backend-qpodtesls-advances-apps.vercel.app/api`
- **Health Check:** `https://backend-qpodtesls-advances-apps.vercel.app/health`

### Admin Interface
- **URL:** `https://autoprev.vercel.app` (ou URL configurada na Vercel)
- **Backend:** Configurado para usar `https://backend-qpodtesls-advances-apps.vercel.app`

### Mobile App
- **Backend:** Configurado para usar `https://backend-qpodtesls-advances-apps.vercel.app/api`
- **APK:** `autoprev-mobile-v1.0.0.apk` (com backend da Vercel)

## 🔧 Configurações

### Mobile (`mobile/src/config/api.js`)
```javascript
const API_BASE_URL = 'https://backend-qpodtesls-advances-apps.vercel.app/api';
```

### Admin (`admin/src/pages/*.jsx`)
Todas as páginas usam:
```javascript
const API_URL = import.meta.env.VITE_API_URL || '/api'
```

O proxy do Vite está configurado para usar o backend da Vercel em produção.

### Admin - Integração APIs (`admin/src/pages/IntegracaoApis.jsx`)
```javascript
const BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-qpodtesls-advances-apps.vercel.app'
```

## 📱 Credenciais de Teste

### Login Mobile/Backend
- **CPF:** `11144477735` ou `77744411135`
- **Senha:** `senha123`

## 🚀 Próximos Passos Recomendados

### 1. Gerar Novo APK com Backend da Vercel
O APK atual (`autoprev-mobile-v1.0.0.apk`) já está configurado, mas se precisar gerar um novo:

```bash
cd mobile
# Certifique-se de que mobile/src/config/api.js está usando a URL da Vercel
npm start
# Ou gere o APK localmente
```

### 2. Configurar Variáveis de Ambiente na Vercel (Opcional)

#### Para o Admin:
Na Vercel Dashboard → Settings → Environment Variables:
- `VITE_API_URL` = `https://backend-qpodtesls-advances-apps.vercel.app`

#### Para o Backend:
- `JWT_SECRET` = (seu secret para tokens JWT)
- `NODE_ENV` = `production`

### 3. Verificar Deployments

1. **Backend:**
   - Verificar se está rodando: `https://backend-qpodtesls-advances-apps.vercel.app/health`
   - Verificar logs na Vercel Dashboard

2. **Admin:**
   - Acessar: `https://autoprev.vercel.app`
   - Verificar se as páginas carregam corretamente
   - Testar conexão com backend

3. **Mobile:**
   - Instalar APK no dispositivo
   - Testar login com credenciais acima
   - Verificar se todas as telas carregam dados do backend

## 🔍 Troubleshooting

### Erro: "Network Error" no Mobile
- Verificar se o dispositivo tem internet
- Verificar se a URL da Vercel está correta em `mobile/src/config/api.js`
- Verificar se o backend está online: `https://backend-qpodtesls-advances-apps.vercel.app/health`

### Erro: "CORS Error" no Admin
- Verificar se o backend tem CORS configurado para aceitar requisições do admin
- Verificar variável `VITE_API_URL` na Vercel

### Backend não responde
- Verificar logs na Vercel Dashboard
- Verificar se o deployment foi bem-sucedido
- Verificar se a proteção de deployment está desabilitada (se necessário)

## 📝 Checklist de Integração

- [x] Backend deployado na Vercel
- [x] Admin deployado na Vercel
- [x] Mobile configurado para usar backend da Vercel
- [x] Admin configurado para usar backend da Vercel
- [x] Health check do backend funcionando
- [x] CPFs de teste cadastrados no backend
- [ ] Variáveis de ambiente configuradas na Vercel (opcional)
- [ ] Testes end-to-end realizados
- [ ] APK gerado com configuração da Vercel (se necessário)

## 🎯 Arquitetura

```
┌─────────────────┐
│   Mobile App    │
│   (React Native)│
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────────────────────┐
│   Backend API (Vercel)          │
│   https://backend-...vercel.app │
└────────┬────────────────────────┘
         │
         │ HTTPS
         ▼
┌─────────────────┐
│   Admin (Vercel) │
│   autoprev.app  │
└─────────────────┘
```

Todos os componentes estão integrados e usando o backend na Vercel! 🎉

