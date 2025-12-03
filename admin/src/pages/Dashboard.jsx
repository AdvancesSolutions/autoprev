import React from 'react'
import { Link } from 'react-router-dom'
import { Palette, MessageSquare, Settings, Users, Plug, TrendingUp, ArrowUpRight } from 'lucide-react'

const Dashboard = () => {
  const cards = [
    {
      path: '/identidade-visual',
      title: 'Identidade Visual',
      description: 'Configure logo, cores e nome do app',
      icon: Palette,
      color: '#8b5cf6',
      bgColor: '#f3f4f6'
    },
    {
      path: '/mensagens',
      title: 'Mensagens',
      description: 'Gerencie textos e mensagens do app',
      icon: MessageSquare,
      color: '#3b82f6',
      bgColor: '#eff6ff'
    },
    {
      path: '/funcionalidades',
      title: 'Funcionalidades',
      description: 'Habilite ou desabilite funcionalidades',
      icon: Settings,
      color: '#10b981',
      bgColor: '#f0fdf4'
    },
    {
      path: '/usuarios',
      title: 'Usuários',
      description: 'Gerencie usuários e participantes',
      icon: Users,
      color: '#f59e0b',
      bgColor: '#fffbeb'
    },
    {
      path: '/integracao-apis',
      title: 'Integração / APIs',
      description: 'Documentação e exemplos de integração',
      icon: Plug,
      color: '#6366f1',
      bgColor: '#eef2ff'
    },
  ]

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '30px', 
          fontWeight: '700', 
          color: '#1e293b', 
          marginBottom: '8px',
          letterSpacing: '-0.5px'
        }}>
          Dashboard
        </h1>
        <p style={{ 
          fontSize: '15px', 
          color: '#64748b',
          margin: 0
        }}>
          Bem-vindo ao painel de administração do Autoprev
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              backgroundColor: '#eff6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={24} color="#3b82f6" />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              backgroundColor: '#f0fdf4',
              borderRadius: '6px',
              color: '#10b981',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              <TrendingUp size={14} />
              <span>+12%</span>
            </div>
          </div>
          <h3 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1e293b',
            margin: '0 0 4px 0'
          }}>
            1,234
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            margin: 0,
            fontWeight: '500'
          }}>
            Total de Usuários
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              backgroundColor: '#f0fdf4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageSquare size={24} color="#10b981" />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              backgroundColor: '#fef2f2',
              borderRadius: '6px',
              color: '#ef4444',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              <TrendingUp size={14} />
              <span>-5%</span>
            </div>
          </div>
          <h3 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1e293b',
            margin: '0 0 4px 0'
          }}>
            567
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            margin: 0,
            fontWeight: '500'
          }}>
            Mensagens Enviadas
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              backgroundColor: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Settings size={24} color="#f59e0b" />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              backgroundColor: '#f0fdf4',
              borderRadius: '6px',
              color: '#10b981',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              <TrendingUp size={14} />
              <span>+8%</span>
            </div>
          </div>
          <h3 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1e293b',
            margin: '0 0 4px 0'
          }}>
            89
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            margin: 0,
            fontWeight: '500'
          }}>
            Funcionalidades Ativas
          </p>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          Acesso Rápido
        </h2>
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
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      backgroundColor: card.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={28} color={card.color} />
                    </div>
                    <ArrowUpRight size={18} color="#94a3b8" style={{ opacity: 0.5 }} />
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 8px 0'
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {card.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
