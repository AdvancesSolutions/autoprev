import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/identidade-visual', label: 'Identidade Visual', icon: '🎨' },
    { path: '/mensagens', label: 'Mensagens', icon: '💬' },
    { path: '/funcionalidades', label: 'Funcionalidades', icon: '⚙️' },
    { path: '/usuarios', label: 'Usuários', icon: '👥' },
    { path: '/integracao-apis', label: 'Integração / APIs', icon: '🔌' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar */}
      <aside style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: '256px',
        background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
        color: 'white',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: 50,
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <div style={{ padding: '24px', borderBottom: '1px solid #334155' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>Autoprev</h1>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px', margin: 0 }}>Administração</p>
          </div>

          {/* Navigation */}
          <nav style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: isActive ? 'white' : '#cbd5e1',
                    backgroundColor: isActive ? '#2563eb' : 'transparent',
                    boxShadow: isActive ? '0 10px 15px -3px rgba(37, 99, 235, 0.5)' : 'none',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.backgroundColor = '#334155'
                      e.target.style.color = 'white'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#cbd5e1'
                    }
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{ fontWeight: 500 }}>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div style={{ padding: '16px', borderTop: '1px solid #334155' }}>
            <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', margin: 0 }}>
              © 2025 Autoprev
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '256px', flex: 1, minHeight: '100vh' }}>
        <div style={{ padding: '32px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
