import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Funcionalidades.css'

// URL da API - usa backend da Vercel em produção
const API_URL = import.meta.env.VITE_API_URL || 'https://backend-qpodtesls-advances-apps.vercel.app/api'

const Funcionalidades = () => {
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

  const handleToggle = (key) => {
    setEntidade(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await axios.put(`${API_URL}/entidade/1`, entidade)
      alert('Funcionalidades atualizadas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar funcionalidades')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  if (!entidade) {
    return (
      <div className="funcionalidades">
        <h1>Funcionalidades do App</h1>
        <div className="error-message">
          <p>Erro ao carregar dados. Verifique se o backend está rodando.</p>
          <p>URL da API: {API_URL}</p>
        </div>
      </div>
    )
  }

  const funcionalidades = [
    { key: 'mensagens_habilitado', label: 'Mensagens', description: 'Habilita sistema de mensagens' },
    { key: 'meu_retrato_habilitado', label: 'Meu Retrato', description: 'Habilita funcionalidade Meu Retrato' },
    { key: 'extrato_contribuicao_habilitado', label: 'Extrato de Contribuição', description: 'Habilita visualização de extrato de contribuição' },
    { key: 'extrato_beneficio_habilitado', label: 'Extrato de Benefício', description: 'Habilita visualização de extrato de benefício' },
    { key: 'pendencias_financeiras_habilitado', label: 'Pendências Financeiras', description: 'Habilita visualização de pendências financeiras' },
    { key: 'emprestimos_habilitado', label: 'Empréstimos', description: 'Habilita funcionalidade de empréstimos' },
    { key: 'dados_cadastrais_habilitado', label: 'Dados Cadastrais', description: 'Habilita visualização e edição de dados cadastrais' },
    { key: 'percentual_contribuicao_habilitado', label: 'Percentual de Contribuição', description: 'Habilita alteração de percentual de contribuição' },
    { key: 'simulador_tributario_habilitado', label: 'Simulador Tributário', description: 'Habilita simulador tributário' },
    { key: 'simulador_beneficios_habilitado', label: 'Simulador de Benefícios', description: 'Habilita simulador de benefícios' },
    { key: 'solicitacao_beneficios_habilitado', label: 'Solicitação de Benefícios', description: 'Habilita solicitação de benefícios' },
    { key: 'grafico_rentabilidade_habilitado', label: 'Gráfico de Rentabilidade', description: 'Habilita gráfico de rentabilidade' }
  ]

  return (
    <div className="funcionalidades">
      <h1>Funcionalidades do App</h1>
      <p className="subtitle">Habilite ou desabilite funcionalidades do aplicativo</p>

      <div className="funcionalidades-list">
        {funcionalidades.map(func => (
          <div key={func.key} className="funcionalidade-item">
            <div className="funcionalidade-info">
              <h3>{func.label}</h3>
              <p>{func.description}</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={entidade[func.key] || false}
                onChange={() => handleToggle(func.key)}
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </div>
  )
}

export default Funcionalidades

