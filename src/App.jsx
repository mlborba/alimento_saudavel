import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import './App.css'

// Componentes
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import OnboardingPage from './components/OnboardingPage'
import DashboardPage from './components/DashboardPage'
import ChatPage from './components/ChatPage'
import ConfigPage from './components/ConfigPage'
import SettingsPage from './components/SettingsPage'

// Contextos e hooks
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ConfigProvider } from './contexts/ConfigContext'

// Componente de rota protegida
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  return user ? children : <Navigate to="/login" />
}

// Componente principal da aplicação
function AppContent() {
  const { user } = useAuth()
  const [showConfigBanner, setShowConfigBanner] = useState(false)

  useEffect(() => {
    // Verificar se precisa mostrar banner de configuração
    const config = JSON.parse(localStorage.getItem('nutri-ai-config') || '{}')
    const hasGemini = config.gemini?.isConfigured
    const hasDatabase = config.database?.isConfigured
    
    if (!hasGemini || !hasDatabase) {
      setShowConfigBanner(true)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Banner de configuração */}
      {showConfigBanner && (
        <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-yellow-800">
                🚀 App funcionando em modo demonstração. Configure APIs para funcionalidades completas.
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.location.href = '/config'}
                className="text-xs bg-yellow-200 hover:bg-yellow-300 px-3 py-1 rounded-full text-yellow-800 transition-colors"
              >
                Configurar
              </button>
              <button
                onClick={() => setShowConfigBanner(false)}
                className="text-yellow-600 hover:text-yellow-800"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navegação */}
      <Navbar />

      {/* Conteúdo principal */}
      <main className="pt-16">
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/config" element={<ConfigPage />} />

          {/* Rotas protegidas */}
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />

          {/* Redirecionamento padrão */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Notificações */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          },
        }}
      />
    </div>
  )
}

// Componente raiz
function App() {
  return (
    <Router>
      <ConfigProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ConfigProvider>
    </Router>
  )
}

export default App

