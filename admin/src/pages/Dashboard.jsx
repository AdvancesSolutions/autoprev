import React from 'react'
import { Link } from 'react-router-dom'
import { Palette, MessageSquare, Settings, Users, Plug } from 'lucide-react'

const Dashboard = () => {
  const cards = [
    {
      path: '/identidade-visual',
      title: 'Identidade Visual',
      description: 'Configure logo, cores e nome do app',
      icon: Palette,
      color: '#8b5cf6'
    },
    {
      path: '/mensagens',
      title: 'Mensagens',
      description: 'Gerencie textos e mensagens do app',
      icon: MessageSquare,
      color: '#3b82f6'
    },
    {
      path: '/funcionalidades',
      title: 'Funcionalidades',
      description: 'Habilite ou desabilite funcionalidades',
      icon: Settings,
      color: '#10b981'
    },
    {
      path: '/usuarios',
      title: 'Usuários',
      description: 'Gerencie usuários e participantes',
      icon: Users,
      color: '#f59e0b'
    },
    {
      path: '/integracao-apis',
      title: 'Integração / APIs',
      description: 'Documentação e exemplos de integração',
      icon: Plug,
      color: '#6366f1'
    },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#111827', 
          marginBottom: '8px',
          letterSpacing: '-0.5px'
        }}>
          Dashboard
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280',
          margin: 0
        }}>
          Bem-vindo ao painel de administração do Autoprev
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.path}
              to={card.path}
              style={{
                textDecoration: 'none',
                display: 'block'
              }}
            >
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    backgroundColor: `${card.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} color={card.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#111827',
                      margin: 0,
                      marginBottom: '4px'
                    }}>
                      {card.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: '1.5'
                    }}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
