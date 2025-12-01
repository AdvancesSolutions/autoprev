import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="dashboard-subtitle">Bem-vindo ao painel de administração do Autoprev</p>
      
      <div className="dashboard-grid">
        <Link to="/identidade-visual" className="dashboard-card-link">
          <div className="dashboard-card">
            <h3>Identidade Visual</h3>
            <p>Configure logo, cores e nome do app</p>
          </div>
        </Link>
        
        <Link to="/mensagens" className="dashboard-card-link">
          <div className="dashboard-card">
            <h3>Mensagens</h3>
            <p>Gerencie textos e mensagens do app</p>
          </div>
        </Link>
        
        <Link to="/funcionalidades" className="dashboard-card-link">
          <div className="dashboard-card">
            <h3>Funcionalidades</h3>
            <p>Habilite ou desabilite funcionalidades</p>
          </div>
        </Link>
        
        <Link to="/integracao-apis" className="dashboard-card-link">
          <div className="dashboard-card">
            <h3>Integração / APIs</h3>
            <p>Documentação e exemplos de integração</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard

