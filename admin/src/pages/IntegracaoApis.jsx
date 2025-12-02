import React from 'react'
import './IntegracaoApis.css'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-qpodtesls-advances-apps.vercel.app'

const sections = [
  {
    id: 'identidade',
    title: '1. Identidade, Consentimentos e Onboarding',
    description: 'Entrada segura no app, aceite de termos/avisos e seleção de plano.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/entidade',
        title: 'Listar Entidade/Marcas',
        summary: 'Lista todas as entidades/marcas configuradas no ambiente.',
        requiresAuth: false,
        request: null,
        response: `[\n  {\n    "entidade_id": 1,\n    "nome_fantasia": "Autoprev",
    "logotipo_url": "/uploads/logos/autoprev.png",\n    "telefone_0800": "0800 000 0000",\n    "telefone_entidade": "(11) 0000-0000",\n    "email": "contato@autoprev.com.br",\n    "texto_mensagem_boas_vindas": "Bem-vindo ao app Autoprev!",\n    "...": "outros campos de texto e flags de funcionalidades"\n  }\n]`
      },
      {
        method: 'GET',
        path: '/api/institutos/{instituto_id}/documentos-legais',
        title: 'Termos & Privacidade',
        summary: 'Retorna documentos legais (termo de uso, aviso de privacidade, etc).',
        requiresAuth: false,
        request: null,
        response: `[\n  {\n    "tipo": "aviso de privacidade",\n    "titulo": "Aviso de Privacidade Autoprev",\n    "versao": "1.0",\n    "pdf_url": "https://exemplo.com/aviso.pdf",\n    "data_publicacao": "2025-01-01"\n  },\n  {\n    "tipo": "termo de uso",\n    "titulo": "Termos de Uso Autoprev",\n    "versao": "1.0",\n    "pdf_url": "https://exemplo.com/termos.pdf",\n    "data_publicacao": "2025-01-01"\n  }\n]`
      },
      {
        method: 'POST',
        path: '/api/consentimentos',
        title: 'Registrar Consentimento',
        summary: 'Registra aceite de termos/avisos pelo participante.',
        requiresAuth: true,
        request: `{\n  "cpf": "11144477735",\n  "entidade_id": 1,\n  "tipo_documento": "termo de uso",\n  "versao": "1.0",\n  "aceito_em": "2025-11-17T10:00:00Z"\n}`,
        response: `{\n  "status": "registrado"\n}`
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        title: 'Login do Participante',
        summary: 'Autentica o participante e retorna token e perfis/plans disponíveis.',
        requiresAuth: false,
        request: `{\n  "cpf": "11144477735",\n  "senha": "senhaSegura123"\n}`,
        response: `{\n  "token": "jwt_token_aqui",\n  "perfis": [\n    {\n      "plano_id": 1,\n      "nome_plano": "Plano Autoprev",\n      "papel": "ativo"\n    }\n  ]\n}`
      }
    ]
  },
  {
    id: 'home',
    title: '2. Home (Resumo do Participante)',
    description: 'Consolida saldos, mensagens e atalhos de ação.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/participantes/{cpf}/resumo',
        title: 'Resumo do Participante',
        summary: 'Retorna informações consolidadas para a tela inicial (dashboard).',
        requiresAuth: true,
        request: 'Query params opcionais: ?plano_id={id}',
        response: `{\n  "nome": "João da Silva",\n  "matricula": "123456",\n  "nome_plano": "Plano Autoprev",\n  "data_adesao": "2015-01-01",\n  "regime_tributario": "progressivo",\n  "tempo_falta_aposentadoria": "10 anos",\n  "valor_ultima_contribuicao_participante": 500.0,\n  "valor_ultima_contribuicao_patrocinadora": 500.0,\n  "atalhos": [\n    "meu_extrato",\n    "contribuicao",\n    "emprestimos"\n  ]\n}`
      },
      {
        method: 'GET',
        path: '/api/participantes/{cpf}/pendencias-financeiras',
        title: 'Pendências Financeiras',
        summary: 'Lista pendências financeiras em aberto para o participante.',
        requiresAuth: true,
        request: null,
        response: `[\n  {\n    "pendencia_id": 1,\n    "descricao": "Contribuição em atraso - 10/2025",\n    "situacao": "em_aberto",\n    "vencimento": "2025-10-20",\n    "valor_atualizado": 250.75\n  }\n]`
      }
    ]
  },
  {
    id: 'cadastro',
    title: '3. Dados Cadastrais e Relacionamentos',
    description: 'Cadastro do participante, dependentes, beneficiários e contas bancárias.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/participantes/{cpf}/cadastro',
        title: 'Cadastro do Participante',
        summary: 'Dados cadastrais completos do participante.',
        requiresAuth: true,
        request: null,
        response: `{\n  "cpf": "11144477735",\n  "nome": "João da Silva",\n  "data_nascimento": "1985-05-10",\n  "email_contato": "joao@email.com",
  "telefone_celular": "(11) 99999-0000",\n  "endereco": {\n    "cep": "01000-000",\n    "logradouro": "Rua Exemplo",\n    "numero": "123",\n    "bairro": "Centro",\n    "cidade": "São Paulo",\n    "uf": "SP"\n  },\n  "...": "demais campos do cadastro"\n}`
      },
      {
        method: 'PUT',
        path: '/api/participantes/{cpf}/cadastro',
        title: 'Atualizar Cadastro',
        summary: 'Atualiza campos permitidos do cadastro (telefone, e-mail, endereço, etc).',
        requiresAuth: true,
        request: `{\n  "telefone_celular": "(11) 98888-0000",\n  "email_contato": "novoemail@exemplo.com",\n  "cep": "02000-000"
}`,
        response: `{\n  "message": "Cadastro atualizado com sucesso"\n}`
      }
    ]
  },
  {
    id: 'contribuicoes',
    title: '4. Contribuições, Extratos e Simulações',
    description: 'Extratos de contribuição e parâmetros para simulação/alteração.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/participantes/{cpf}/contribuicoes/anos',
        title: 'Anos Disponíveis para Extrato',
        summary: 'Retorna intervalo de anos com contribuições registradas.',
        requiresAuth: true,
        request: null,
        response: `{\n  "ano_inicial": 2015,\n  "ano_atual": 2025\n}`
      },
      {
        method: 'GET',
        path: '/api/participantes/{cpf}/contribuicoes',
        title: 'Extrato de Contribuições por Competência',
        summary: 'Lista contribuições por mês (competência).',
        requiresAuth: true,
        request: 'Query params: ?plano_id={id}&periodo=YYYY-MM',
        response: `[\n  {\n    "competencia": "2025-10",\n    "contrib_participante_reais": 500.0,\n    "contrib_patrocinador_reais": 500.0,\n    "contrib_participante_cotas": 10.5,\n    "contrib_patrocinador_cotas": 10.5\n  }\n]`
      }
    ]
  },
  {
    id: 'riscos',
    title: '5. Cobertura de Risco (Seguro)',
    description: 'Consulta de coberturas, cotações e adesões.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/participantes/{cpf}/riscos',
        title: 'Situação Atual de Riscos',
        summary: 'Lista coberturas vigentes (morte, invalidez etc.).',
        requiresAuth: true,
        request: 'Query params: ?plano_id={id}',
        response: `[\n  {\n    "tipo": "morte",\n    "capital_segurado": 100000.0,\n    "premio_mensal": 25.5,\n    "vigencia": "2025-01-01 a 2025-12-31"\n  }\n]`
      }
    ]
  },
  {
    id: 'emprestimos',
    title: '8. Empréstimos',
    description: 'Jornada completa de crédito (pré-aprovação, simulação, contratação).',
    endpoints: [
      {
        method: 'GET',
        path: '/api/participantes/{cpf}/emprestimos/meusemprestimos',
        title: 'Meus Empréstimos',
        summary: 'Lista contratos de empréstimo do participante.',
        requiresAuth: true,
        request: null,
        response: `[\n  {\n    "emprestimo_id": 1,\n    "tipo": "consignado",\n    "valor_contratado": 10000.0,\n    "saldo_devedor": 8000.0,\n    "situacao": "ativo"\n  }\n]`
      },
      {
        method: 'POST',
        path: '/api/participantes/{cpf}/emprestimos/simulacao',
        title: 'Simular Empréstimo',
        summary: 'Calcula proposta de empréstimo com valor e parcelas.',
        requiresAuth: true,
        request: `{\n  "valor": 10000.0,\n  "parcelas": 24\n}`,
        response: `{\n  "proposta_id": "PROP-123",\n  "cet": 0.25,\n  "valor_parcela": 500.0,\n  "data_vencimento": "2025-12-10",\n  "total_emprestimo": 12000.0\n}`
      }
    ]
  },
  {
    id: 'notificacoes',
    title: '9. Notificações e Atendimento',
    description: 'Avisos, pendências e abertura de chamados.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/participantes/{cpf}/notificacoes',
        title: 'Notificações',
        summary: 'Lista notificações do participante.',
        requiresAuth: true,
        request: null,
        response: `[\n  {\n    "id": 1,\n    "titulo": "Contribuição em atraso",\n    "corpo_resumo": "Você possui uma contribuição em atraso.",\n    "prioridade": "alta",\n    "origem": "contribuicoes",\n    "data": "2025-10-20",\n    "lido": false\n  }\n]`
      }
    ]
  }
];

const buildCurlCommand = (endpoint) => {
  const url = `${BASE_URL}${endpoint.path}`
  const hasJsonBody = endpoint.request && endpoint.request.trim().startsWith('{')

  const lines = []
  lines.push(`curl -X ${endpoint.method} "${url}"`)

  if (endpoint.requiresAuth) {
    lines.push('  -H "Authorization: Bearer SEU_TOKEN_AQUI"')
  }

  if (hasJsonBody) {
    lines.push('  -H "Content-Type: application/json"')
    const body = endpoint.request.replace(/\n/g, ' ')
    lines.push(`  -d '${body}'`)
  }

  return lines.join(' \\\n')
}

const IntegracaoApis = () => {
  return (
    <div className="integracao-apis">
      <h1>Integração com APIs Autoprev</h1>
      <p className="subtitle">
        Use esta documentação rápida para integrar outros sistemas (portais, centrais, bots) à API do Autoprev.
      </p>

      <div className="info-box">
        <p><strong>Base URL (ambiente atual):</strong> <code>{BASE_URL}</code></p>
        <p>
          Para produção/homologação, ajuste a URL de acordo com o endpoint publicado (ex.: 
          <code> https://api.suaentidade.com.br/autoprev</code>).
        </p>
      </div>

      <div className="sections">
        {sections.map(section => (
          <div key={section.id} className="section">
            <h2>{section.title}</h2>
            <p className="section-description">{section.description}</p>

            {section.endpoints.map((ep, index) => (
              <div key={index} className="endpoint-card">
                <div className="endpoint-header">
                  <span className={`method method-${ep.method.toLowerCase()}`}>{ep.method}</span>
                  <code className="path">{ep.path}</code>
                </div>
                <h3>{ep.title}</h3>
                <p className="endpoint-summary">{ep.summary}</p>

                {ep.request && (
                  <div className="code-block">
                    <div className="code-header">Exemplo de requisição</div>
                    <pre><code>{ep.request}</code></pre>
                  </div>
                )}

                {ep.response && (
                  <div className="code-block">
                    <div className="code-header">Exemplo de resposta</div>
                    <pre><code>{ep.response}</code></pre>
                  </div>
                )}

                <div className="code-block">
                  <div className="code-header">Exemplo de chamada via curl</div>
                  <pre><code>{buildCurlCommand(ep)}</code></pre>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default IntegracaoApis


