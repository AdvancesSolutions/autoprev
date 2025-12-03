import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Autoprev Admin</h1>
        </div>
        <nav className="sidebar-nav">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Dashboard
          </Link>
          <Link 
            to="/identidade-visual" 
            className={location.pathname === '/identidade-visual' ? 'active' : ''}
          >
            Identidade Visual
          </Link>
          <Link 
            to="/mensagens" 
            className={location.pathname === '/mensagens' ? 'active' : ''}
          >
            Mensagens
          </Link>
          <Link 
            to="/funcionalidades" 
            className={location.pathname === '/funcionalidades' ? 'active' : ''}
          >
            Funcionalidades
          </Link>
          <Link 
            to="/usuarios" 
            className={location.pathname === '/usuarios' ? 'active' : ''}
          >
            Usuários
          </Link>
          <Link 
            to="/integracao-apis" 
            className={location.pathname === '/integracao-apis' ? 'active' : ''}
          >
            Integração / APIs
          </Link>
        </nav>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout
