import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const cards = [
    {
      path: '/identidade-visual',
      title: 'Identidade Visual',
      description: 'Configure logo, cores e nome do app',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500'
    },
    {
      path: '/mensagens',
      title: 'Mensagens',
      description: 'Gerencie textos e mensagens do app',
      icon: '💬',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      path: '/funcionalidades',
      title: 'Funcionalidades',
      description: 'Habilite ou desabilite funcionalidades',
      icon: '⚙️',
      color: 'from-green-500 to-emerald-500'
    },
    {
      path: '/usuarios',
      title: 'Usuários',
      description: 'Gerencie usuários e participantes',
      icon: '👥',
      color: 'from-orange-500 to-red-500'
    },
    {
      path: '/integracao-apis',
      title: 'Integração / APIs',
      description: 'Documentação e exemplos de integração',
      icon: '🔌',
      color: 'from-indigo-500 to-purple-500'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao painel de administração do Autoprev</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            className="group block"
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:scale-105">
              <div className={`bg-gradient-to-r ${card.color} p-6`}>
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{card.icon}</span>
                  <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
