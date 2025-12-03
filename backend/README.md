# Autoprev Backend API

Backend API para o aplicativo Autoprev Mobile.

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env`

## Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## Endpoints

### Identidade Visual (Admin)
- `GET /api/entidade` - Lista entidades
- `GET /api/entidade/:entidade_id` - Busca entidade específica
- `PUT /api/entidade/:entidade_id` - Atualiza configurações
- `POST /api/entidade/:entidade_id/logo` - Upload de logo

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/recuperar` - Solicita recuperação de senha
- `POST /api/auth/validar-codigo` - Valida código de recuperação
- `POST /api/auth/reset-password` - Redefine senha

### Documentos Legais
- `GET /api/institutos/:instituto_id/documentos-legais` - Lista documentos
- `POST /api/consentimentos` - Registra consentimento

### Participantes
- `GET /api/participantes/:cpf/perfis` - Lista perfis
- `GET /api/participantes/:cpf/resumo` - Resumo do participante
- `GET /api/participantes/:cpf/pendencias-financeiras` - Lista pendências
- `GET /api/participantes/:cpf/cadastro` - Dados cadastrais
- `PUT /api/participantes/:cpf/cadastro` - Atualiza cadastro
- `GET /api/participantes/:cpf/contas-bancarias` - Lista contas
- `GET /api/participantes/:cpf/dependentes` - Lista dependentes
- `GET /api/participantes/:cpf/beneficiarios` - Lista beneficiários

### Contribuições
- `GET /api/participantes/:cpf/contribuicoes` - Extrato
- `GET /api/participantes/:cpf/contribuicoes/parametros` - Parâmetros
- `POST /api/participantes/:cpf/contribuicoes/simulacao` - Simula alteração
- `POST /api/participantes/:cpf/contribuicoes/parametros` - Altera parâmetros

### Cobertura de Risco
- `GET /api/participantes/:cpf/riscos` - Lista coberturas
- `POST /api/participantes/:cpf/riscos/cotacao` - Cota cobertura
- `POST /api/participantes/:cpf/riscos/aderir` - Adere cobertura

### Benefícios
- `GET /api/participantes/:cpf/beneficios` - Lista benefícios
- `GET /api/participantes/:cpf/beneficios/extrato` - Extrato
- `GET /api/participantes/:cpf/beneficios/simulacao` - Simula benefícios
- `POST /api/participantes/:cpf/beneficios/solicitacoes/:id/anexos` - Upload anexo

### Empréstimos
- `GET /api/participantes/:cpf/emprestimos/meusemprestimos` - Lista empréstimos
- `GET /api/participantes/:cpf/emprestimos/preaprovado` - Pré-aprovação
- `POST /api/participantes/:cpf/emprestimos/simulacao` - Simula empréstimo
- `POST /api/participantes/:cpf/emprestimos/contratar` - Contrata empréstimo
- `POST /api/participantes/:cpf/emprestimos/quitar` - Quita empréstimo
- `POST /api/participantes/:cpf/emprestimos/refinanciar` - Refinancia empréstimo

### Notificações e Atendimento
- `GET /api/participantes/:cpf/notificacoes` - Lista notificações
- `POST /api/participantes/:cpf/chamados` - Abre chamado
- `GET /api/participantes/:cpf/chamados` - Lista chamados

## Estrutura

```
backend/
├── src/
│   ├── controllers/    # Lógica de negócio
│   ├── routes/         # Definição de rotas
│   └── server.js       # Servidor principal
├── uploads/           # Arquivos enviados
├── .env               # Variáveis de ambiente
└── package.json
```

## Notas

- Este é um backend de desenvolvimento com dados mockados
- Em produção, implementar banco de dados real
- Adicionar autenticação JWT nas rotas protegidas
- Implementar validações mais robustas
- Adicionar testes automatizados

