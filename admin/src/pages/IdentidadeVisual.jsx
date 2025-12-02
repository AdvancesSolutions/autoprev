import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './IdentidadeVisual.css'

// URL da API - usa backend da Vercel em produção
const API_URL = import.meta.env.VITE_API_URL || 'https://backend-qpodtesls-advances-apps.vercel.app/api'

const IdentidadeVisual = () => {
  const [entidade, setEntidade] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [logoFile, setLogoFile] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    carregarEntidade()
  }, [])

  const carregarEntidade = async () => {
    try {
      const response = await axios.get(`${API_URL}/entidade/1`)
      setEntidade(response.data)
      if (response.data.logotipo_url) {
        setPreview(response.data.logotipo_url)
      }
    } catch (error) {
      console.error('Erro ao carregar entidade:', error)
      // Valores padrão caso a API não esteja disponível
      setEntidade({
        nome_fantasia: '',
        email: '',
        telefone_0800: '',
        telefone_entidade: '',
        cores: {
          primaria: '#0066CC',
          secundaria: '#00A86B',
          background: '#FFFFFF',
          texto: '#333333'
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setEntidade(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleColorChange = (colorType, value) => {
    setEntidade(prev => ({
      ...prev,
      cores: {
        ...prev.cores,
        [colorType]: value
      }
    }))
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadLogo = async () => {
    if (!logoFile) return

    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('logo', logoFile)

      await axios.post(`${API_URL}/entidade/1/logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      alert('Logo atualizado com sucesso!')
      setLogoFile(null)
    } catch (error) {
      console.error('Erro ao fazer upload do logo:', error)
      alert('Erro ao fazer upload do logo')
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await axios.put(`${API_URL}/entidade/1`, entidade)
      alert('Configurações salvas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar configurações')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  if (!entidade) {
    return (
      <div className="identidade-visual">
        <h1>Identidade Visual</h1>
        <div className="error-message">
          <p>Erro ao carregar dados. Verifique se o backend está rodando.</p>
          <p>URL da API: {API_URL}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="identidade-visual">
      <h1>Identidade Visual</h1>

      <div className="form-section">
        <h2>Informações Básicas</h2>
        <div className="form-group">
          <label>Nome Fantasia</label>
          <input
            type="text"
            name="nome_fantasia"
            value={entidade.nome_fantasia || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={entidade.email || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Telefone 0800</label>
          <input
            type="text"
            name="telefone_0800"
            value={entidade.telefone_0800 || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Telefone da Entidade</label>
          <input
            type="text"
            name="telefone_entidade"
            value={entidade.telefone_entidade || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Logo</h2>
        <div className="logo-upload">
          {preview && (
            <div className="logo-preview">
              <img src={preview} alt="Logo preview" />
            </div>
          )}
          <div className="logo-upload-controls">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
            {logoFile && (
              <button onClick={handleUploadLogo} disabled={saving}>
                {saving ? 'Enviando...' : 'Fazer Upload'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Cores</h2>
        <div className="colors-grid">
          <div className="color-input">
            <label>Cor Primária</label>
            <input
              type="color"
              value={entidade.cores?.primaria || '#0066CC'}
              onChange={(e) => handleColorChange('primaria', e.target.value)}
            />
            <input
              type="text"
              value={entidade.cores?.primaria || '#0066CC'}
              onChange={(e) => handleColorChange('primaria', e.target.value)}
            />
          </div>

          <div className="color-input">
            <label>Cor Secundária</label>
            <input
              type="color"
              value={entidade.cores?.secundaria || '#00A86B'}
              onChange={(e) => handleColorChange('secundaria', e.target.value)}
            />
            <input
              type="text"
              value={entidade.cores?.secundaria || '#00A86B'}
              onChange={(e) => handleColorChange('secundaria', e.target.value)}
            />
          </div>

          <div className="color-input">
            <label>Cor de Fundo</label>
            <input
              type="color"
              value={entidade.cores?.background || '#FFFFFF'}
              onChange={(e) => handleColorChange('background', e.target.value)}
            />
            <input
              type="text"
              value={entidade.cores?.background || '#FFFFFF'}
              onChange={(e) => handleColorChange('background', e.target.value)}
            />
          </div>

          <div className="color-input">
            <label>Cor do Texto</label>
            <input
              type="color"
              value={entidade.cores?.texto || '#333333'}
              onChange={(e) => handleColorChange('texto', e.target.value)}
            />
            <input
              type="text"
              value={entidade.cores?.texto || '#333333'}
              onChange={(e) => handleColorChange('texto', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </div>
  )
}

export default IdentidadeVisual

