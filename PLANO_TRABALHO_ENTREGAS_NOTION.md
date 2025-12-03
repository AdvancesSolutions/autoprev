# 📋 Plano de Trabalho e Entregas - Autoprev Mobile App

**Última Atualização:** 06 de Novembro de 2025  
**Data de Início:** 20 de Outubro de 2024  
**Status Geral:** ⚠️ ATRASADO - 35% completo após 13 meses

---

## 🎯 Visão Geral do Projeto

### Progresso Atual

| Área | Progresso | Status |
|------|-----------|--------|
| UI/Design | 90% | ✅ |
| Navegação | 60% | ⚠️ |
| Funcionalidades | 25% | ⚠️ |
| Integrações | 0% | ❌ |
| Testes | 0% | ❌ |
| **TOTAL** | **35%** | ⚠️ |

### ✅ O que já está funcionando

- ✅ 4 telas completas (Splash, Login, Dashboard, Pendência Financeira)
- ✅ Design system completo e consistente
- ✅ Animações avançadas no Dashboard
- ✅ Navegação básica entre telas
- ✅ Logout funcional

### ❌ Bloqueadores Críticos

- ❌ **Backend não conectado** - Nenhuma integração com API
- ❌ **Autenticação não funcional** - Login apenas visual
- ❌ **Dados mockados** - Tudo está hardcoded
- ❌ **Falta gerenciamento de estado** - Sem Redux/Context configurado

---

## 📅 Cronograma de Entregas (Próximas 12 Semanas)

### 🚨 SEMANA 1 (06-12 Nov 2025) - URGENTE

**Objetivo:** Configurar infraestrutura básica e começar integração

**Entregas Planejadas:**
- [ ] **E1.1** Configurar Redux Toolkit ou Context API
- [ ] **E1.2** Configurar Axios com interceptors
- [ ] **E1.3** Configurar variáveis de ambiente (.env)
- [ ] **E1.4** Criar estrutura de pastas (services, store, utils)
- [ ] **E1.5** Criar serviço base de API

**Critérios de Sucesso:**
- ✅ Store configurado e funcionando
- ✅ Cliente HTTP fazendo requisições
- ✅ Estrutura de pastas organizada
- ✅ Variáveis de ambiente funcionando

**Status:** 🔴 Não iniciado

---

### 🔥 SEMANA 2 (13-19 Nov 2025) - URGENTE

**Objetivo:** Implementar autenticação funcional

**Entregas Planejadas:**
- [ ] **E2.1** Criar slice de autenticação no store
- [ ] **E2.2** Implementar função de login com API
- [ ] **E2.3** Implementar validação de CPF
- [ ] **E2.4** Implementar validação de senha
- [ ] **E2.5** Implementar armazenamento seguro de token
- [ ] **E2.6** Implementar proteção de rotas

**Critérios de Sucesso:**
- ✅ Usuário consegue fazer login real
- ✅ Token é armazenado corretamente
- ✅ Rotas protegidas funcionam
- ✅ Validações de CPF e senha funcionam

**Status:** 🔴 Não iniciado

---

### 📊 SEMANA 3 (20-26 Nov 2025)

**Objetivo:** Dashboard com dados reais

**Entregas Planejadas:**
- [ ] **E3.1** Integrar API de saldo acumulado
- [ ] **E3.2** Integrar API de dados do usuário (nome)
- [ ] **E3.3** Integrar API de pendências financeiras
- [ ] **E3.4** Adicionar loading states no Dashboard
- [ ] **E3.5** Implementar pull-to-refresh
- [ ] **E3.6** Adicionar tratamento de erros

**Critérios de Sucesso:**
- ✅ Dashboard mostra dados reais da API
- ✅ Loading aparece durante carregamento
- ✅ Pull-to-refresh atualiza dados
- ✅ Erros são tratados adequadamente

**Status:** 🔴 Não iniciado

---

### 📄 SEMANA 4 (27 Nov - 03 Dez 2025)

**Objetivo:** Tela de Extrato funcional

**Entregas Planejadas:**
- [ ] **E4.1** Criar tela de extrato
- [ ] **E4.2** Criar componente de lista de transações
- [ ] **E4.3** Integrar API de transações
- [ ] **E4.4** Implementar paginação/scroll infinito
- [ ] **E4.5** Adicionar loading states
- [ ] **E4.6** Implementar navegação do botão "Meu Extrato"

**Critérios de Sucesso:**
- ✅ Tela de extrato exibe transações reais
- ✅ Paginação funciona corretamente
- ✅ Loading states funcionam
- ✅ Navegação do Dashboard funciona

**Status:** 🔴 Não iniciado

---

### 🔐 SEMANA 5 (04-10 Dez 2025)

**Objetivo:** Recuperação de senha

**Entregas Planejadas:**
- [ ] **E5.1** Criar tela "Esqueceu a senha?"
- [ ] **E5.2** Criar tela de código de verificação
- [ ] **E5.3** Criar tela de nova senha
- [ ] **E5.4** Integrar com API de recuperação
- [ ] **E5.5** Adicionar validações nas telas
- [ ] **E5.6** Adicionar tratamento de erros

**Critérios de Sucesso:**
- ✅ Fluxo completo de recuperação funciona
- ✅ Código de verificação é validado
- ✅ Nova senha pode ser definida
- ✅ Navegação entre telas funciona

**Status:** 🔴 Não iniciado

---

### 👤 SEMANA 6 (11-17 Dez 2025)

**Objetivo:** Perfil e dados cadastrais

**Entregas Planejadas:**
- [ ] **E6.1** Criar tela de perfil/conta
- [ ] **E6.2** Integrar API de dados do usuário
- [ ] **E6.3** Criar tela de dados cadastrais
- [ ] **E6.4** Implementar visualização de dados
- [ ] **E6.5** Implementar edição de dados
- [ ] **E6.6** Adicionar navegação inferior funcional

**Critérios de Sucesso:**
- ✅ Tela de perfil exibe dados reais
- ✅ Edição de dados funciona
- ✅ Validações funcionam
- ✅ Navegação inferior troca de telas

**Status:** 🔴 Não iniciado

---

### 💰 SEMANA 7 (18-24 Dez 2025)

**Objetivo:** Contribuição e pagamentos

**Entregas Planejadas:**
- [ ] **E7.1** Criar tela de contribuição
- [ ] **E7.2** Implementar histórico de contribuições
- [ ] **E7.3** Implementar realizar contribuição
- [ ] **E7.4** Integrar gateway de pagamento
- [ ] **E7.5** Implementar pagamento de pendências
- [ ] **E7.6** Criar tela de comprovante

**Critérios de Sucesso:**
- ✅ Contribuições podem ser realizadas
- ✅ Pagamentos são processados
- ✅ Comprovantes são gerados
- ✅ Histórico é exibido

**Status:** 🔴 Não iniciado

---

### 💳 SEMANA 8 (25-31 Dez 2025)

**Objetivo:** Empréstimos

**Entregas Planejadas:**
- [ ] **E8.1** Criar tela de empréstimos
- [ ] **E8.2** Implementar lista de empréstimos disponíveis
- [ ] **E8.3** Criar tela de simulação
- [ ] **E8.4** Integrar API de simulação
- [ ] **E8.5** Criar tela de solicitação
- [ ] **E8.6** Criar tela de status/histórico

**Critérios de Sucesso:**
- ✅ Empréstimos são listados
- ✅ Simulação funciona
- ✅ Solicitação é processada
- ✅ Histórico é exibido

**Status:** 🔴 Não iniciado

---

### 📈 SEMANA 9 (01-07 Jan 2026)

**Objetivo:** Simuladores

**Entregas Planejadas:**
- [ ] **E9.1** Criar tela de simulador tributário
- [ ] **E9.2** Criar formulário de entrada
- [ ] **E9.3** Integrar API de cálculo
- [ ] **E9.4** Criar visualização de resultados
- [ ] **E9.5** Criar tela de simulador de benefícios
- [ ] **E9.6** Implementar gráficos

**Critérios de Sucesso:**
- ✅ Simulador tributário funciona
- ✅ Simulador de benefícios funciona
- ✅ Gráficos são exibidos
- ✅ Cálculos são corretos

**Status:** 🔴 Não iniciado

---

### 🔔 SEMANA 10 (08-14 Jan 2026)

**Objetivo:** Benefícios e notificações

**Entregas Planejadas:**
- [ ] **E10.1** Criar tela de solicitar benefícios
- [ ] **E10.2** Implementar upload de documentos
- [ ] **E10.3** Integrar API de solicitação
- [ ] **E10.4** Criar tela de acompanhamento
- [ ] **E10.5** Configurar notificações push
- [ ] **E10.6** Implementar histórico de notificações

**Critérios de Sucesso:**
- ✅ Solicitações são processadas
- ✅ Documentos são enviados
- ✅ Notificações são recebidas
- ✅ Histórico é exibido

**Status:** 🔴 Não iniciado

---

### 🧪 SEMANA 11 (15-21 Jan 2026)

**Objetivo:** Testes e qualidade

**Entregas Planejadas:**
- [ ] **E11.1** Configurar Jest e React Native Testing Library
- [ ] **E11.2** Criar testes para componentes principais
- [ ] **E11.3** Criar testes para slices do Redux
- [ ] **E11.4** Criar testes para serviços de API
- [ ] **E11.5** Alcançar cobertura mínima de 70%
- [ ] **E11.6** Corrigir bugs encontrados

**Critérios de Sucesso:**
- ✅ Testes unitários implementados
- ✅ Cobertura de 70%+ alcançada
- ✅ Todos os testes passam
- ✅ Bugs críticos corrigidos

**Status:** 🔴 Não iniciado

---

### 🚀 SEMANA 12 (22-28 Jan 2026)

**Objetivo:** Finalização e deploy

**Entregas Planejadas:**
- [ ] **E12.1** Configurar CI/CD (GitHub Actions)
- [ ] **E12.2** Configurar EAS Build
- [ ] **E12.3** Criar testes E2E principais
- [ ] **E12.4** Revisão final de código
- [ ] **E12.5** Preparação para produção
- [ ] **E12.6** Testes em dispositivos reais

**Critérios de Sucesso:**
- ✅ CI/CD configurado
- ✅ Builds automatizados
- ✅ Testes E2E passam
- ✅ App pronto para produção

**Status:** 🔴 Não iniciado

---

## 📊 Métricas de Acompanhamento Semanal

### Semana Atual: [SELECIONAR SEMANA]

**Data:** ___/___/2025

**Entregas da Semana:**
- [ ] Entregue 1: ___________
- [ ] Entregue 2: ___________
- [ ] Entregue 3: ___________

**Progresso:**
- **Tarefas Concluídas:** ___ / ___
- **Tarefas em Andamento:** ___
- **Bloqueios:** ___

**Bloqueios Encontrados:**
1. ___________
2. ___________
3. ___________

**Próximas Ações:**
1. ___________
2. ___________
3. ___________

---

## 🎯 KPIs do Projeto

### Métricas de Progresso

| Métrica | Atual | Meta |
|---------|-------|------|
| Progresso Geral | 35% | 100% |
| Velocidade Semanal | 0.65% | 8-10% |
| Tarefas Concluídas | 44/142 (31%) | 142/142 (100%) |
| Semanas Restantes | 10-12 semanas | - |

### Métricas de Qualidade

| Métrica | Atual | Meta |
|---------|-------|------|
| Cobertura de Testes | 0% | 70% |
| Bugs Críticos | ? | 0 |
| Tempo de Carregamento | ? | < 2s |
| Taxa de Erros | ? | < 1% |

---

## 📝 Notas e Observações

### Decisões Técnicas Pendentes

- [ ] Escolher biblioteca de gerenciamento de estado (Redux Toolkit vs Context API)
- [ ] Definir estrutura de autenticação (JWT, Refresh Token)
- [ ] Escolher biblioteca de validação (Formik/Yup vs React Hook Form)
- [ ] Definir gateway de pagamento
- [ ] Escolher biblioteca de gráficos

### Dependências Externas

- [ ] Backend/API disponível?
- [ ] Documentação da API disponível?
- [ ] Credenciais de teste disponíveis?
- [ ] Gateway de pagamento configurado?

### Riscos Identificados

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|----------------|-----------|
| Falta de Backend | Alto | Média | Desenvolver mocks/backend paralelamente |
| Mudanças de Requisitos | Médio | Alta | Reuniões semanais de alinhamento |
| Problemas de Integração | Alto | Média | Testar integração cedo, ter alternativa |

---

## 🔄 Histórico de Atualizações

| Data | Semana | Progresso | Observações |
|------|--------|-----------|-------------|
| 06/11/2025 | - | 35% | Documento criado. Projeto atrasado. Priorizar integração. |
| | | | |
| | | | |
| | | | |

---

## 📞 Contatos e Recursos

### Documentação
- Plano Detalhado
- Checklist de Pendências
- Relatório de Pendências

### Próxima Revisão
**Data:** ___/___/2025  
**Responsável:** ___________  
**Ações:** ___________

---

**💡 Dica:** Atualize este documento toda sexta-feira com o progresso da semana e planeje a próxima semana na segunda-feira.


