import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Navbar corrigido inline
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  
  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🥗</span>
              <span className="text-xl font-bold text-gray-900">NutriAI</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                🏠 Início
              </a>
              
              <a
                href="/dashboard"
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                📊 Dashboard
              </a>
              
              <a
                href="/chat"
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                💬 Chat IA
              </a>
              
              <a
                href="/config"
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                ⚙️ Configuração
              </a>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/login"
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Entrar
            </a>
            <a
              href="/register"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
            >
              Cadastrar
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Abrir menu principal</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
            >
              🏠 Início
            </a>
            
            <a
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
            >
              📊 Dashboard
            </a>
            
            <a
              href="/chat"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
            >
              💬 Chat IA
            </a>
            
            <a
              href="/config"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
            >
              ⚙️ Configuração
            </a>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-gray-200 space-y-2">
              <a
                href="/login"
                className="block w-full text-center text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Entrar
              </a>
              <a
                href="/register"
                className="block w-full text-center bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-md text-base font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
              >
                Cadastrar
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

// Landing Page
function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* Logo e Título */}
          <div className="mb-8">
            <div className="text-6xl mb-4">🥗</div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              NutriAI
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Seu assistente inteligente para uma alimentação saudável e personalizada. 
              Planos alimentares criados por IA, adaptados ao seu estilo de vida brasileiro.
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="/dashboard" 
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🚀 Começar Agora
            </a>
            <a 
              href="/config" 
              className="bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ⚙️ Configurar APIs
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">IA Avançada</h3>
            <p className="text-gray-600">
              Powered by Google Gemini, nossa IA cria planos alimentares personalizados 
              baseados em suas necessidades e preferências.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🇧🇷</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">100% Brasileiro</h3>
            <p className="text-gray-600">
              Receitas e ingredientes adaptados ao paladar e disponibilidade 
              do mercado brasileiro. Preços reais dos supermercados.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Economia Real</h3>
            <p className="text-gray-600">
              96% mais barato que soluções similares. Tecnologia de ponta 
              com custos acessíveis para todos.
            </p>
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🔧 Status do Sistema
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-medium text-gray-700">Aplicação</span>
              </div>
              <span className="text-green-600 font-semibold">✅ Online</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-medium text-gray-700">IA Gemini</span>
              </div>
              <span className="text-yellow-600 font-semibold">⚙️ Configurar</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-medium text-gray-700">Banco de Dados</span>
              </div>
              <span className="text-blue-600 font-semibold">💾 Local Storage</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-medium text-gray-700">Deploy</span>
              </div>
              <span className="text-purple-600 font-semibold">🚀 Vercel</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
            <p className="text-center text-gray-700">
              <strong>🎉 Parabéns!</strong> Seu NutriAI está funcionando perfeitamente. 
              Configure as APIs para desbloquear todas as funcionalidades.
            </p>
          </div>
        </div>

        {/* Call to Action Final */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para transformar sua alimentação?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Junte-se a milhares de brasileiros que já melhoraram sua saúde com o NutriAI
          </p>
          <a 
            href="/dashboard" 
            className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-4 rounded-xl text-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            🥗 Começar Minha Jornada
          </a>
        </div>
      </div>
    </div>
  )
}

// Outras páginas simples
function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">📊 Dashboard</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-600">Bem-vindo ao seu dashboard personalizado!</p>
      </div>
    </div>
  )
}

function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">💬 Chat com IA</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-600">Chat com IA nutricional em desenvolvimento...</p>
      </div>
    </div>
  )
}

function ConfigPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">⚙️ Configurações</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-600">Configure suas APIs e preferências aqui.</p>
      </div>
    </div>
  )
}

function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">🔐 Login</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-600 text-center">Página de login em desenvolvimento...</p>
      </div>
    </div>
  )
}

function RegisterPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">📝 Cadastro</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-600 text-center">Página de cadastro em desenvolvimento...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

