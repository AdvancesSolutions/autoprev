# Autoprev - Sistema Completo

Sistema completo para gerenciamento de previdência privada, incluindo aplicativo mobile, backend API e interface de administração.

## Estrutura do Projeto

```
AUTOPREV/
├── mobile/          # Aplicativo React Native (Expo)
├── backend/         # API Backend (Node.js/Express)
├── admin/           # Interface de Administração (React/Vite)
└── docs/            # Documentação
```

## Componentes

### 1. Mobile App (`mobile/`)
Aplicativo mobile React Native para participantes.

**Status:** UI completa, aguardando integração com backend

### 2. Backend API (`backend/`)
API REST completa com todos os endpoints necessários.

**Funcionalidades:**
- Identidade visual (logo, cores, textos)
- Autenticação e autorização
- Gestão de participantes
- Contribuições e extratos
- Cobertura de risco
- Benefícios
- Empréstimos
- Notificações e atendimento

**Tecnologias:** Node.js, Express, Multer (upload de arquivos)

### 3. Admin Interface (`admin/`)
Interface web para administração visual do app.

**Funcionalidades:**
- Configuração de identidade visual (logo, cores, nome)
- Gerenciamento de mensagens
- Habilitação/desabilitação de funcionalidades

**Tecnologias:** React, Vite, Axios

## Instalação e Execução

### Backend

```bash
cd backend
npm install
cp .env.example .env  # Configure as variáveis
npm run dev           # Desenvolvimento
npm start             # Produção
```

Backend rodará em `http://localhost:3000`

### Admin Interface

```bash
cd admin
npm install
npm run dev
```

Admin rodará em `http://localhost:3001`

### Mobile App

```bash
cd mobile
npm install
npm start
```

## Endpoints Principais

### Identidade Visual
- `GET /api/entidade` - Lista entidades
- `GET /api/entidade/:id` - Busca entidade
- `PUT /api/entidade/:id` - Atualiza configurações
- `POST /api/entidade/:id/logo` - Upload de logo

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/recuperar` - Recuperação de senha
- `POST /api/auth/validar-codigo` - Valida código
- `POST /api/auth/reset-password` - Redefine senha

### Participantes
- `GET /api/participantes/:cpf/resumo` - Resumo
- `GET /api/participantes/:cpf/cadastro` - Dados cadastrais
- `GET /api/participantes/:cpf/pendencias-financeiras` - Pendências

E muitos outros... Veja `backend/README.md` para lista completa.

## Próximos Passos

1. Conectar mobile app ao backend
2. Implementar autenticação JWT no mobile
3. Adicionar banco de dados real (atualmente usando dados mockados)
4. Implementar testes automatizados
5. Configurar CI/CD

## Documentação

- [Backend README](./backend/README.md)
- [Admin README](./admin/README.md)
- [Plano de Trabalho](./PLANO_TRABALHO_ENTREGAS.md)

## Desenvolvimento

Este projeto está em desenvolvimento ativo. Veja o plano de trabalho para mais detalhes sobre o progresso e próximas entregas.

