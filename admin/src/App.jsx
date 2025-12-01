import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import IdentidadeVisual from './pages/IdentidadeVisual'
import Mensagens from './pages/Mensagens'
import Funcionalidades from './pages/Funcionalidades'
import IntegracaoApis from './pages/IntegracaoApis'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/identidade-visual" element={<IdentidadeVisual />} />
          <Route path="/mensagens" element={<Mensagens />} />
          <Route path="/funcionalidades" element={<Funcionalidades />} />
          <Route path="/integracao-apis" element={<IntegracaoApis />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

