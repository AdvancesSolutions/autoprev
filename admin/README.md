# Autoprev Admin

Interface de administração para gerenciar a identidade visual e configurações do aplicativo Autoprev.

## Funcionalidades

- **Identidade Visual**: Configure logo, nome do app, cores e informações básicas
- **Mensagens**: Gerencie todos os textos e mensagens exibidos no app
- **Funcionalidades**: Habilite ou desabilite funcionalidades do aplicativo

## Instalação

```bash
npm install
```

## Execução

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3001`

## Estrutura

```
admin/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── App.jsx         # Componente principal
│   └── main.jsx        # Entry point
├── index.html
└── vite.config.js
```

## Requisitos

- Backend rodando em `http://localhost:3000`
- Node.js 16+

