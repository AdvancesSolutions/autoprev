import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Palette, 
  MessageSquare, 
  Settings, 
  Users, 
  Plug 
} from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/identidade-visual', label: 'Identidade Visual', icon: Palette },
    { path: '/mensagens', label: 'Mensagens', icon: MessageSquare },
    { path: '/funcionalidades', label: 'Funcionalidades', icon: Settings },
    { path: '/usuarios', label: 'Usuários', icon: Users },
    { path: '/integracao-apis', label: 'Integração / APIs', icon: Plug },
  ]

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Sidebar */}
      <aside style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: '240px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        zIndex: 50,
        overflowY: 'auto',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <div style={{ 
            padding: '24px 20px', 
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#fafafa'
          }}>
            <h1 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              color: '#111827', 
              margin: 0,
              letterSpacing: '-0.5px'
            }}>
              Autoprev
            </h1>
            <p style={{ 
              fontSize: '12px', 
              color: '#6b7280', 
              marginTop: '4px', 
              margin: 0,
              fontWeight: '500'
            }}>
              Administração
            </p>
          </div>

          {/* Navigation */}
          <nav style={{ 
            flex: 1, 
            padding: '16px 12px',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '4px'
          }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: isActive ? '#111827' : '#6b7280',
                    backgroundColor: isActive ? '#f3f4f6' : 'transparent',
                    fontWeight: isActive ? '600' : '500',
                    fontSize: '14px',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#f9fafb'
                      e.currentTarget.style.color = '#111827'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#6b7280'
                    }
                  }}
                >
                  <Icon 
                    size={18} 
                    style={{ 
                      strokeWidth: isActive ? 2.5 : 2,
                      color: isActive ? '#111827' : '#6b7280'
                    }} 
                  />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div style={{ 
            padding: '16px 20px', 
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#fafafa'
          }}>
            <p style={{ 
              fontSize: '11px', 
              color: '#9ca3af', 
              textAlign: 'center', 
              margin: 0,
              fontWeight: '500'
            }}>
              © 2025 Autoprev
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        marginLeft: '240px', 
        flex: 1, 
        minHeight: '100vh',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ 
          padding: '32px',
          maxWidth: '1400px'
        }}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
