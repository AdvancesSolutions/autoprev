import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Palette, 
  MessageSquare, 
  Settings, 
  Users, 
  Plug,
  Menu,
  X,
  ChevronDown,
  Search,
  Bell,
  User
} from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Sidebar */}
      <aside style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: sidebarOpen ? '260px' : '80px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        zIndex: 1000,
        overflowY: 'auto',
        transition: 'width 0.3s ease',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Logo Section */}
          <div style={{ 
            padding: '24px 20px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '72px'
          }}>
            {sidebarOpen && (
              <div>
                <h1 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#1e293b',
                  margin: 0,
                  letterSpacing: '-0.5px'
                }}>
                  Autoprev
                </h1>
                <p style={{ 
                  fontSize: '11px', 
                  color: '#64748b', 
                  margin: '4px 0 0 0',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Admin Panel
                </p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9'
                e.currentTarget.style.color = '#1e293b'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#64748b'
              }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
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
                    padding: '12px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: isActive ? '#1e293b' : '#64748b',
                    backgroundColor: isActive ? '#f1f5f9' : 'transparent',
                    fontWeight: isActive ? '600' : '500',
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#f8fafc'
                      e.currentTarget.style.color = '#1e293b'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#64748b'
                    }
                  }}
                >
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3px',
                      height: '20px',
                      backgroundColor: '#3b82f6',
                      borderRadius: '0 2px 2px 0'
                    }} />
                  )}
                  <Icon 
                    size={20} 
                    style={{ 
                      strokeWidth: isActive ? 2.5 : 2,
                      color: isActive ? '#3b82f6' : '#64748b',
                      flexShrink: 0
                    }} 
                  />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          {sidebarOpen && (
            <div style={{ 
              padding: '20px',
              borderTop: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc'
            }}>
              <div style={{
                padding: '12px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <p style={{ 
                  fontSize: '11px', 
                  color: '#94a3b8', 
                  textAlign: 'center', 
                  margin: 0,
                  fontWeight: '500'
                }}>
                  © 2025 Autoprev
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        marginLeft: sidebarOpen ? '260px' : '80px',
        flex: 1, 
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Top Header */}
        <header style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          {/* Search */}
          <div style={{
            flex: 1,
            maxWidth: '400px',
            position: 'relative'
          }}>
            <Search 
              size={18} 
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }}
            />
            <input
              type="text"
              placeholder="Buscar..."
              style={{
                width: '100%',
                padding: '10px 12px 10px 40px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#1e293b',
                backgroundColor: '#f8fafc',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.backgroundColor = '#ffffff'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0'
                e.target.style.backgroundColor = '#f8fafc'
              }}
            />
          </div>

          {/* Right Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginLeft: '24px'
          }}>
            {/* Notifications */}
            <button style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: '#64748b',
              position: 'relative',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
            >
              <Bell size={20} />
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                border: '2px solid #ffffff'
              }} />
            </button>

            {/* User Menu */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                <User size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  Admin
                </span>
                <span style={{
                  fontSize: '12px',
                  color: '#64748b'
                }}>
                  Administrador
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: '32px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
