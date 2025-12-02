import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Usuarios.css'

// URL da API - usa backend da Vercel em produção
const API_URL = 'https://backend-qpodtesls-advances-apps.vercel.app/api'

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingUsuario, setEditingUsuario] = useState(null)
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    senha: '',
    email: '',
    telefone: ''
  })

  useEffect(() => {
    carregarUsuarios()
  }, [])

  const carregarUsuarios = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/admin/usuarios`)
      setUsuarios(response.data || [])
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
      console.error('URL tentada:', `${API_URL}/admin/usuarios`)
      console.error('Erro completo:', error.response?.data || error.message)
      // Não mostra alert, apenas define array vazio
      setUsuarios([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const formatCPF = (cpf) => {
    const numbers = cpf.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    }
    return cpf
  }

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value)
    setFormData(prev => ({ ...prev, cpf: formatted }))
  }

  const abrirModalNovo = () => {
    setEditingUsuario(null)
    setFormData({
      cpf: '',
      nome: '',
      senha: '',
      email: '',
      telefone: ''
    })
    setShowModal(true)
  }

  const abrirModalEditar = (usuario) => {
    setEditingUsuario(usuario)
    setFormData({
      cpf: usuario.cpf,
      nome: usuario.nome,
      senha: '',
      email: usuario.email || '',
      telefone: usuario.telefone || ''
    })
    setShowModal(true)
  }

  const fecharModal = () => {
    setShowModal(false)
    setEditingUsuario(null)
    setFormData({
      cpf: '',
      nome: '',
      senha: '',
      email: '',
      telefone: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingUsuario) {
        // Atualizar
        await axios.put(`${API_URL}/admin/usuarios/${editingUsuario.cpf.replace(/\D/g, '')}`, formData)
        alert('Usuário atualizado com sucesso!')
      } else {
        // Criar
        if (!formData.senha) {
          alert('Senha é obrigatória para novos usuários')
          return
        }
        await axios.post(`${API_URL}/admin/usuarios`, formData)
        alert('Usuário criado com sucesso!')
      }
      fecharModal()
      carregarUsuarios()
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
      alert(error.response?.data?.error || 'Erro ao salvar usuário')
    }
  }

  const handleDelete = async (cpf) => {
    if (!confirm(`Tem certeza que deseja remover o usuário ${cpf}?`)) {
      return
    }

    try {
      await axios.delete(`${API_URL}/admin/usuarios/${cpf.replace(/\D/g, '')}`)
      alert('Usuário removido com sucesso!')
      carregarUsuarios()
    } catch (error) {
      console.error('Erro ao remover usuário:', error)
      alert(error.response?.data?.error || 'Erro ao remover usuário')
    }
  }

  if (loading) {
    return <div className="usuarios-loading">Carregando usuários...</div>
  }

  return (
    <div className="usuarios">
      <div className="usuarios-header">
        <h1>Gerenciar Usuários</h1>
        <button className="btn-primary" onClick={abrirModalNovo}>
          + Novo Usuário
        </button>
      </div>

      <div className="usuarios-table-container">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>CPF</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Planos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="6" className="usuarios-empty">
                  Nenhum usuário cadastrado
                </td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.cpf}>
                  <td>{usuario.cpf}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email || '-'}</td>
                  <td>{usuario.telefone || '-'}</td>
                  <td>
                    {usuario.perfis?.map(p => p.nome_plano).join(', ') || '-'}
                  </td>
                  <td>
                    <div className="usuarios-actions">
                      <button
                        className="btn-edit"
                        onClick={() => abrirModalEditar(usuario)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(usuario.cpf)}
                      >
                        Remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingUsuario ? 'Editar Usuário' : 'Novo Usuário'}</h2>
              <button className="modal-close" onClick={fecharModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="usuarios-form">
              <div className="form-group">
                <label>CPF *</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleCPFChange}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  required
                  disabled={!!editingUsuario}
                />
              </div>
              <div className="form-group">
                <label>Nome *</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Senha {!editingUsuario && '*'}</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  placeholder={editingUsuario ? "Deixe em branco para não alterar" : ""}
                  required={!editingUsuario}
                />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={fecharModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingUsuario ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Usuarios

