# Plano de Trabalho e Entregas - Autoprev Mobile App

**Última Atualização:** 17 de Novembro de 2025  
**Data de Início:** 20 de Outubro de 2024  
**Status Geral:** ATRASADO - 35% completo após 13 meses

---

## Visão Geral do Projeto

### Progresso Atual
```
UI/Design:        ████████████████████░░  90% OK
Navegação:        ████████████░░░░░░░░  60% ATENCAO
Funcionalidades:  █████░░░░░░░░░░░░░░░  25% ATENCAO
Integrações:      ░░░░░░░░░░░░░░░░░░░░   0% PENDENTE
Testes:           ░░░░░░░░░░░░░░░░░░░░   0% PENDENTE
─────────────────────────────────────────
TOTAL:            ███████░░░░░░░░░░░░░  35% ATENCAO
```

### O que já está funcionando
- OK 4 telas completas (Splash, Login, Dashboard, Pendência Financeira)
- OK Design system completo e consistente
- OK Animações avançadas no Dashboard
- OK Navegação básica entre telas
- OK Logout funcional

### Bloqueadores Críticos
- PENDENTE **Backend não conectado** - Nenhuma integração com API
- PENDENTE **Autenticação não funcional** - Login apenas visual
- PENDENTE **Dados mockados** - Tudo está hardcoded
- PENDENTE **Falta gerenciamento de estado** - Sem Redux/Context configurado

---

## Cronograma de Entregas (Próximas 12 Semanas)

### SEMANA 1 (06-12 Nov 2025) - CONCLUÍDA
**Objetivo:** Configurar infraestrutura básica e começar integração

#### Entregas Planejadas:
- [ ] **E1.1** Configurar Redux Toolkit ou Context API
- [ ] **E1.2** Configurar Axios com interceptors
- [ ] **E1.3** Configurar variáveis de ambiente (.env)
- [ ] **E1.4** Criar estrutura de pastas (services, store, utils)
- [ ] **E1.5** Criar serviço base de API

**Critérios de Sucesso:**
- OK Store configurado e funcionando
- OK Cliente HTTP fazendo requisições
- OK Estrutura de pastas organizada
- OK Variáveis de ambiente funcionando

**Status:** Em revisão

---

### SEMANA 2 (13-19 Nov 2025) - EM ANDAMENTO - URGENTE
**Objetivo:** Implementar autenticação funcional

#### Entregas Planejadas:
- [ ] **E2.1** Criar slice de autenticação no store
- [ ] **E2.2** Implementar função de login com API
- [ ] **E2.3** Implementar validação de CPF
- [ ] **E2.4** Implementar validação de senha
- [ ] **E2.5** Implementar armazenamento seguro de token
- [ ] **E2.6** Implementar proteção de rotas

**Critérios de Sucesso:**
- OK Usuário consegue fazer login real
- OK Token é armazenado corretamente
- OK Rotas protegidas funcionam
- OK Validações de CPF e senha funcionam

**Status:** Não iniciado

---

### SEMANA 3 (20-26 Nov 2025)
**Objetivo:** Dashboard com dados reais

#### Entregas Planejadas:
- [ ] **E3.1** Integrar API de saldo acumulado
- [ ] **E3.2** Integrar API de dados do usuário (nome)
- [ ] **E3.3** Integrar API de pendências financeiras
- [ ] **E3.4** Adicionar loading states no Dashboard
- [ ] **E3.5** Implementar pull-to-refresh
- [ ] **E3.6** Adicionar tratamento de erros

**Critérios de Sucesso:**
- OK Dashboard mostra dados reais da API
- OK Loading aparece durante carregamento
- OK Pull-to-refresh atualiza dados
- OK Erros são tratados adequadamente

**Status:** Não iniciado

---

### SEMANA 4 (27 Nov - 03 Dez 2025)
**Objetivo:** Tela de Extrato funcional

#### Entregas Planejadas:
- [ ] **E4.1** Criar tela de extrato
- [ ] **E4.2** Criar componente de lista de transações
- [ ] **E4.3** Integrar API de transações
- [ ] **E4.4** Implementar paginação/scroll infinito
- [ ] **E4.5** Adicionar loading states
- [ ] **E4.6** Implementar navegação do botão "Meu Extrato"

**Critérios de Sucesso:**
- OK Tela de extrato exibe transações reais
- OK Paginação funciona corretamente
- OK Loading states funcionam
- OK Navegação do Dashboard funciona

**Status:** Não iniciado

---

### SEMANA 5 (04-10 Dez 2025)
**Objetivo:** Recuperação de senha

#### Entregas Planejadas:
- [ ] **E5.1** Criar tela "Esqueceu a senha?"
- [ ] **E5.2** Criar tela de código de verificação
- [ ] **E5.3** Criar tela de nova senha
- [ ] **E5.4** Integrar com API de recuperação
- [ ] **E5.5** Adicionar validações nas telas
- [ ] **E5.6** Adicionar tratamento de erros

**Critérios de Sucesso:**
- OK Fluxo completo de recuperação funciona
- OK Código de verificação é validado
- OK Nova senha pode ser definida
- OK Navegação entre telas funciona

**Status:** Não iniciado

---

### SEMANA 6 (11-17 Dez 2025)
**Objetivo:** Perfil e dados cadastrais

#### Entregas Planejadas:
- [ ] **E6.1** Criar tela de perfil/conta
- [ ] **E6.2** Integrar API de dados do usuário
- [ ] **E6.3** Criar tela de dados cadastrais
- [ ] **E6.4** Implementar visualização de dados
- [ ] **E6.5** Implementar edição de dados
- [ ] **E6.6** Adicionar navegação inferior funcional

**Critérios de Sucesso:**
- OK Tela de perfil exibe dados reais
- OK Edição de dados funciona
- OK Validações funcionam
- OK Navegação inferior troca de telas

**Status:** Não iniciado

---

### SEMANA 7 (18-24 Dez 2025)
**Objetivo:** Contribuição e pagamentos

#### Entregas Planejadas:
- [ ] **E7.1** Criar tela de contribuição
- [ ] **E7.2** Implementar histórico de contribuições
- [ ] **E7.3** Implementar realizar contribuição
- [ ] **E7.4** Integrar gateway de pagamento
- [ ] **E7.5** Implementar pagamento de pendências
- [ ] **E7.6** Criar tela de comprovante

**Critérios de Sucesso:**
- OK Contribuições podem ser realizadas
- OK Pagamentos são processados
- OK Comprovantes são gerados
- OK Histórico é exibido

**Status:** Não iniciado

---

### SEMANA 8 (25-31 Dez 2025)
**Objetivo:** Empréstimos

#### Entregas Planejadas:
- [ ] **E8.1** Criar tela de empréstimos
- [ ] **E8.2** Implementar lista de empréstimos disponíveis
- [ ] **E8.3** Criar tela de simulação
- [ ] **E8.4** Integrar API de simulação
- [ ] **E8.5** Criar tela de solicitação
- [ ] **E8.6** Criar tela de status/histórico

**Critérios de Sucesso:**
- OK Empréstimos são listados
- OK Simulação funciona
- OK Solicitação é processada
- OK Histórico é exibido

**Status:** Não iniciado

---

### SEMANA 9 (01-07 Jan 2026)
**Objetivo:** Simuladores

#### Entregas Planejadas:
- [ ] **E9.1** Criar tela de simulador tributário
- [ ] **E9.2** Criar formulário de entrada
- [ ] **E9.3** Integrar API de cálculo
- [ ] **E9.4** Criar visualização de resultados
- [ ] **E9.5** Criar tela de simulador de benefícios
- [ ] **E9.6** Implementar gráficos

**Critérios de Sucesso:**
- OK Simulador tributário funciona
- OK Simulador de benefícios funciona
- OK Gráficos são exibidos
- OK Cálculos são corretos

**Status:** Não iniciado

---

### SEMANA 10 (08-14 Jan 2026)
**Objetivo:** Benefícios e notificações

#### Entregas Planejadas:
- [ ] **E10.1** Criar tela de solicitar benefícios
- [ ] **E10.2** Implementar upload de documentos
- [ ] **E10.3** Integrar API de solicitação
- [ ] **E10.4** Criar tela de acompanhamento
- [ ] **E10.5** Configurar notificações push
- [ ] **E10.6** Implementar histórico de notificações

**Critérios de Sucesso:**
- OK Solicitações são processadas
- OK Documentos são enviados
- OK Notificações são recebidas
- OK Histórico é exibido

**Status:** Não iniciado

---

### SEMANA 11 (15-21 Jan 2026)
**Objetivo:** Testes e qualidade

#### Entregas Planejadas:
- [ ] **E11.1** Configurar Jest e React Native Testing Library
- [ ] **E11.2** Criar testes para componentes principais
- [ ] **E11.3** Criar testes para slices do Redux
- [ ] **E11.4** Criar testes para serviços de API
- [ ] **E11.5** Alcançar cobertura mínima de 70%
- [ ] **E11.6** Corrigir bugs encontrados

**Critérios de Sucesso:**
- OK Testes unitários implementados
- OK Cobertura de 70%+ alcançada
- OK Todos os testes passam
- OK Bugs críticos corrigidos

**Status:** Não iniciado

---

### SEMANA 12 (22-28 Jan 2026)
**Objetivo:** Finalização e deploy

#### Entregas Planejadas:
- [ ] **E12.1** Configurar CI/CD (GitHub Actions)
- [ ] **E12.2** Configurar EAS Build
- [ ] **E12.3** Criar testes E2E principais
- [ ] **E12.4** Revisão final de código
- [ ] **E12.5** Preparação para produção
- [ ] **E12.6** Testes em dispositivos reais

**Critérios de Sucesso:**
- OK CI/CD configurado
- OK Builds automatizados
- OK Testes E2E passam
- OK App pronto para produção

**Status:** Não iniciado

---

## Métricas de Acompanhamento Semanal

### Semana Atual: SEMANA 2 (13-19 Nov 2025)

**Data:** 17/11/2025

#### Entregas da Semana:
- [ ] Entregue 1: ___________
- [ ] Entregue 2: ___________
- [ ] Entregue 3: ___________

#### Progresso:
- **Tarefas Concluídas:** ___ / ___
- **Tarefas em Andamento:** ___
- **Bloqueios:** ___

#### Bloqueios Encontrados:
1. ___________
2. ___________
3. ___________

#### Próximas Ações:
1. ___________
2. ___________
3. ___________

---

## KPIs do Projeto

### Métricas de Progresso
- **Progresso Geral:** 35% (meta: 100%)
- **Velocidade Semanal:** 0.65% (meta: 8-10%)
- **Tarefas Concluídas:** 44/142 (31%)
- **Semanas Restantes Estimadas:** 10-12 semanas

### Métricas de Qualidade
- **Cobertura de Testes:** 0% (meta: 70%)
- **Bugs Críticos:** ? (meta: 0)
- **Tempo de Carregamento:** ? (meta: < 2s)
- **Taxa de Erros:** ? (meta: < 1%)

---

## Notas e Observações

### Decisões Técnicas Pendentes:
- [ ] Escolher biblioteca de gerenciamento de estado (Redux Toolkit vs Context API)
- [ ] Definir estrutura de autenticação (JWT, Refresh Token)
- [ ] Escolher biblioteca de validação (Formik/Yup vs React Hook Form)
- [ ] Definir gateway de pagamento
- [ ] Escolher biblioteca de gráficos

### Dependências Externas:
- [ ] Backend/API disponível?
- [ ] Documentação da API disponível?
- [ ] Credenciais de teste disponíveis?
- [ ] Gateway de pagamento configurado?

### Riscos Identificados:
1. **Falta de Backend** - Impacto: Alto | Probabilidade: Média
2. **Mudanças de Requisitos** - Impacto: Médio | Probabilidade: Alta
3. **Problemas de Integração** - Impacto: Alto | Probabilidade: Média

---

## Histórico de Atualizações

| Data | Semana | Progresso | Observações |
|------|--------|-----------|-------------|
| 06/11/2025 | - | 35% | Documento criado. Projeto atrasado. Priorizar integração. |
| 17/11/2025 | SEMANA 2 | 35% | Atualização de datas. Semana 2 em andamento. |
| | | | |
| | | | |

---

## Contatos e Recursos

### Documentação:
- [Plano Detalhado](./PLANO_ENTREGA_DETALHADO.md)
- [Checklist de Pendências](./CHECKLIST_PENDENCIAS.md)
- [Relatório de Pendências](./RELATORIO_PENDENCIAS.md)

### Próxima Revisão:
**Data:** 22/11/2025 (fim da SEMANA 2)  
**Responsável:** ___________  
**Ações:** ___________

---

**Dica:** Atualize este documento toda sexta-feira com o progresso da semana e planeje a próxima semana na segunda-feira.

