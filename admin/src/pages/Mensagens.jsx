import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Mensagens.css'

// URL da API - usa backend da Vercel em produção
const API_URL = import.meta.env.VITE_API_URL || 'https://backend-qpodtesls-advances-apps.vercel.app/api'

const Mensagens = () => {
  const [entidade, setEntidade] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    carregarEntidade()
  }, [])

  const carregarEntidade = async () => {
    try {
      const response = await axios.get(`${API_URL}/entidade/1`)
      setEntidade(response.data)
    } catch (error) {
      console.error('Erro ao carregar entidade:', error)
      // Valores padrão caso a API não esteja disponível
      setEntidade({})
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEntidade(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await axios.put(`${API_URL}/entidade/1`, entidade)
      alert('Mensagens salvas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar mensagens')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  if (!entidade) {
    return (
      <div className="mensagens">
        <h1>Mensagens do App</h1>
        <div className="error-message">
          <p>Erro ao carregar dados. Verifique se o backend está rodando.</p>
          <p>URL da API: {API_URL}</p>
        </div>
      </div>
    )
  }

  const mensagens = [
    { key: 'texto_mensagem_boas_vindas', label: 'Mensagem de Boas-vindas' },
    { key: 'texto_autopatrocinio', label: 'Texto Autopatrocinio' },
    { key: 'texto_portabilidade', label: 'Texto Portabilidade' },
    { key: 'texto_resgate', label: 'Texto Resgate' },
    { key: 'texto_bpd', label: 'Texto BPD' },
    { key: 'texto_emprestimo', label: 'Texto Empréstimo' },
    { key: 'texto_confirmacao_emprestimo', label: 'Confirmação de Empréstimo' },
    { key: 'texto_quitacao_emprestimo', label: 'Texto Quitação de Empréstimo' },
    { key: 'texto_confirmacao_quitacao_emprestimo', label: 'Confirmação de Quitação' },
    { key: 'texto_refinanciamento_emprestimo', label: 'Texto Refinanciamento' },
    { key: 'texto_sucesso_refinanciamento', label: 'Sucesso no Refinanciamento' },
    { key: 'texto_confirmacao_solicitacao_beneficios', label: 'Confirmação de Solicitação de Benefícios' },
    { key: 'texto_confirmacao_aporte_extraordinario', label: 'Confirmação de Aporte Extraordinário' },
    { key: 'texto_adesao_cobertura_risco', label: 'Texto Adesão de Cobertura' },
    { key: 'texto_cobertura_morte', label: 'Texto Cobertura de Morte' },
    { key: 'texto_cobertura_invalidez', label: 'Texto Cobertura de Invalidez' },
    { key: 'texto_doencas_graves', label: 'Texto Doenças Graves' },
    { key: 'texto_auxilio_funeral', label: 'Texto Auxílio Funeral' },
    { key: 'texto_solicitacao_confirmacao_adesao', label: 'Confirmação de Adesão' },
    { key: 'texto_aceite_alteracao_contribuicao', label: 'Texto Aceite de Alteração de Contribuição' },
    { key: 'texto_confirmacao_alteracao_contribuicao', label: 'Confirmação de Alteração de Contribuição' }
  ]

  return (
    <div className="mensagens">
      <h1>Mensagens do App</h1>
      <p className="subtitle">Gerencie todos os textos e mensagens exibidos no aplicativo</p>

      <div className="mensagens-list">
        {mensagens.map(msg => (
          <div key={msg.key} className="mensagem-item">
            <label>{msg.label}</label>
            <textarea
              name={msg.key}
              value={entidade[msg.key] || ''}
              onChange={handleChange}
              rows="3"
              placeholder={`Digite o texto para ${msg.label.toLowerCase()}...`}
            />
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? 'Salvando...' : 'Salvar Todas as Mensagens'}
        </button>
      </div>
    </div>
  )
}

export default Mensagens

