import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'

// ===============================================
// ESTILOS CSS INLINE GARANTIDOS
// ===============================================

const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: #333;
  }
  
  .gradient-bg {
    background: linear-gradient(135deg, #f0fdf4 0%, #dbeafe 50%, #faf5ff 100%);
    min-height: 100vh;
  }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    color: white;
    padding: 16px 32px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.2s ease;
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
  }
  
  .btn-secondary {
    background: white;
    color: #374151;
    padding: 16px 32px;
    border-radius: 12px;
    border: 2px solid #e5e7eb;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    transition: all 0.2s ease;
  }
  
  .btn-secondary:hover {
    border-color: #22c55e;
    color: #22c55e;
  }
  
  .navbar {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(229, 231, 235, 0.5);
    position: sticky;
    top: 0;
    z-index: 50;
    padding: 0 16px;
  }
  
  .navbar-container {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
  }
  
  .navbar-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: #111827;
    font-size: 20px;
    font-weight: bold;
  }
  
  .navbar-nav {
    display: flex;
    align-items: center;
    gap: 32px;
  }
  
  .nav-link {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    color: #374151;
    text-decoration: none;
    display: inline-block;
  }
  
  .nav-link:hover {
    background: rgba(34, 197, 94, 0.1);
    color: #15803d;
  }
  
  .nav-link.active {
    background: rgba(34, 197, 94, 0.1);
    color: #15803d;
  }
  
  .hero-title {
    font-size: 48px;
    font-weight: bold;
    color: #111827;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #22c55e 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    margin-bottom: 64px;
  }
  
  .feature-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
  }
  
  .feature-icon {
    font-size: 48px;
    margin-bottom: 16px;
    display: block;
  }
  
  .status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }
  
  .status-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-radius: 12px;
    background: linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%);
  }
  
  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 12px;
  }
  
  .status-online { background: #22c55e; }
  .status-warning { background: #eab308; }
  .status-info { background: #3b82f6; }
  
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 32px 16px;
  }
  
  .text-center { text-align: center; }
  .mb-4 { margin-bottom: 16px; }
  .mb-8 { margin-bottom: 32px; }
  .mb-16 { margin-bottom: 64px; }
  
  .flex { display: flex; }
  .flex-wrap { flex-wrap: wrap; }
  .justify-center { justify-content: center; }
  .items-center { align-items: center; }
  .gap-4 { gap: 16px; }
  
  @media (max-width: 768px) {
    .navbar-nav {
      display: none;
    }
    
    .hero-title {
      font-size: 36px;
    }
    
    .feature-grid {
      grid-template-columns: 1fr;
    }
  }
`

// ===============================================
// COMPONENTE NAVBAR
// ===============================================

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span style={{ fontSize: '24px' }}>🥗</span>
          <span>NutriAI</span>
        </Link>

        <div className="navbar-nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            🏠 Início
          </Link>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
            📊 Dashboard
          </Link>
          <Link to="/chat" className={`nav-link ${isActive('/chat') ? 'active' : ''}`}>
            💬 Chat IA
          </Link>
          <Link to="/planos" className={`nav-link ${isActive('/planos') ? 'active' : ''}`}>
            🍽️ Planos
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/login" className="nav-link">Entrar</Link>
          <Link to="/register" className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>
            Cadastrar
          </Link>
        </div>
      </div>
    </nav>
  )
}

// ===============================================
// PÁGINA INICIAL
// ===============================================

function LandingPage() {
  const [systemStatus, setSystemStatus] = useState({
    app: 'online',
    ai: 'needs_config',
    database: 'local_storage'
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#22c55e'
      case 'needs_config': return '#eab308'
      case 'local_storage': return '#3b82f6'
      default: return '#6b7280'
    }
  }

  const getStatusText = (system, status) => {
    const statusMap = {
      app: { online: '✅ Online' },
      ai: { needs_config: '⚙️ Configurar' },
      database: { local_storage: '💾 Local Storage' }
    }
    return statusMap[system][status] || '❓ Desconhecido'
  }

  return (
    <div className="gradient-bg">
      <div className="container">
        <div className="text-center mb-16">
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🥗</div>
          <h1 className="hero-title">NutriAI</h1>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Seu assistente inteligente para uma alimentação saudável e personalizada. 
            Planos alimentares criados por IA, adaptados ao seu estilo de vida brasileiro.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link to="/dashboard" className="btn-primary">
              🚀 Começar Agora
            </Link>
            <Link to="/chat" className="btn-secondary">
              💬 Chat com IA
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-icon">🤖</span>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>IA Avançada</h3>
            <p style={{ color: '#6b7280' }}>
              Powered by Google Gemini, nossa IA cria planos alimentares personalizados 
              baseados em suas necessidades e preferências.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🇧🇷</span>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>100% Brasileiro</h3>
            <p style={{ color: '#6b7280' }}>
              Receitas e ingredientes adaptados ao paladar e disponibilidade 
              do mercado brasileiro. Preços reais dos supermercados.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>Economia Real</h3>
            <p style={{ color: '#6b7280' }}>
              96% mais barato que soluções similares. Tecnologia de ponta 
              com custos acessíveis para todos.
            </p>
          </div>
        </div>

        {/* Status Section */}
        <div className="glass-card mb-16">
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '24px', textAlign: 'center' }}>
            🔧 Status do Sistema
          </h2>
          
          <div className="status-grid">
            <div className="status-item">
              <div className="flex items-center">
                <div className="status-dot status-online"></div>
                <span style={{ fontWeight: '500', color: '#374151' }}>Aplicação</span>
              </div>
              <span style={{ color: '#22c55e', fontWeight: '600' }}>
                ✅ Online
              </span>
            </div>

            <div className="status-item">
              <div className="flex items-center">
                <div className="status-dot status-warning"></div>
                <span style={{ fontWeight: '500', color: '#374151' }}>IA Gemini</span>
              </div>
              <span style={{ color: '#eab308', fontWeight: '600' }}>
                ⚙️ Configurar
              </span>
            </div>

            <div className="status-item">
              <div className="flex items-center">
                <div className="status-dot status-info"></div>
                <span style={{ fontWeight: '500', color: '#374151' }}>Banco de Dados</span>
              </div>
              <span style={{ color: '#3b82f6', fontWeight: '600' }}>
                💾 Local Storage
              </span>
            </div>
          </div>

          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            background: 'linear-gradient(135deg, #dcfce7 0%, #dbeafe 100%)', 
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#374151' }}>
              <strong>🎉 Parabéns!</strong> Seu NutriAI está funcionando perfeitamente. 
              Configure as APIs para desbloquear todas as funcionalidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===============================================
// OUTRAS PÁGINAS (SIMPLIFICADAS)
// ===============================================

function DashboardPage() {
  return (
    <div className="gradient-bg">
      <div className="container">
        <div className="text-center mb-8">
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            📊 Dashboard
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280' }}>
            Bem-vindo ao seu painel personalizado!
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-icon">🥗</span>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              Meus Planos
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              Você tem 0 planos alimentares criados.
            </p>
            <Link to="/planos" className="btn-primary" style={{ fontSize: '14px', padding: '12px 24px' }}>
              Ver Planos
            </Link>
          </div>

          <div className="feature-card">
            <span className="feature-icon">💬</span>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              Chat IA
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              0 mensagens trocadas com a IA.
            </p>
            <Link to="/chat" className="btn-primary" style={{ fontSize: '14px', padding: '12px 24px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
              Iniciar Chat
            </Link>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📈</span>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              Progresso
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              Acompanhe sua evolução nutricional.
            </p>
            <button className="btn-primary" style={{ fontSize: '14px', padding: '12px 24px', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
              Ver Relatório
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Olá! Sou sua assistente nutricional. Como posso ajudar você hoje?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simular resposta da IA
    setTimeout(() => {
      const aiMessage = {
        type: 'ai',
        content: 'Entendi sua pergunta sobre nutrição. Baseado em evidências científicas, recomendo focar em uma alimentação equilibrada com frutas, vegetais, proteínas magras e grãos integrais. Gostaria de mais detalhes sobre algum aspecto específico?',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <div className="gradient-bg">
      <div className="container">
        <div className="text-center mb-8">
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            💬 Chat com IA Nutricional
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280' }}>
            Converse com nossa IA especializada em nutrição!
          </p>
        </div>

        <div className="glass-card" style={{ height: '600px', display: 'flex', flexDirection: 'column', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((message, index) => (
              <div key={index} style={{
                padding: '16px',
                borderRadius: '12px',
                maxWidth: '80%',
                alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                background: message.type === 'user' 
                  ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  : '#f3f4f6',
                color: message.type === 'user' ? 'white' : '#374151'
              }}>
                <p style={{ margin: 0 }}>{message.content}</p>
                <small style={{ 
                  opacity: 0.7, 
                  fontSize: '12px',
                  display: 'block',
                  marginTop: '4px'
                }}>
                  {message.timestamp.toLocaleTimeString()}
                </small>
              </div>
            ))}
          </div>
          
          <div style={{ padding: '24px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Digite sua pergunta sobre nutrição..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
            <button 
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
              className="btn-primary"
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                opacity: !inputMessage.trim() ? 0.5 : 1
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlanosPage() {
  return (
    <div className="gradient-bg">
      <div className="container">
        <div className="text-center mb-8">
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            🍽️ Meus Planos Alimentares
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '24px' }}>
            Planos personalizados criados pela IA
          </p>
          
          <button className="btn-primary">
            ✨ Gerar Novo Plano
          </button>
        </div>

        <div className="glass-card">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🍽️</div>
            <h3 style={{ fontSize: '24px', color: '#374151', marginBottom: '8px' }}>
              Nenhum plano criado ainda
            </h3>
            <p style={{ color: '#6b7280' }}>
              Clique em "Gerar Novo Plano" para criar seu primeiro plano alimentar personalizado!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoginPage() {
  return (
    <div className="gradient-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', margin: '16px' }}>
        <div className="text-center mb-8">
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            🔐 Login
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>Entre em sua conta</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Email
            </label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Senha
            </label>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Entrar
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Não tem uma conta?{' '}
            <Link to="/register" style={{ color: '#22c55e', fontWeight: '500', textDecoration: 'none' }}>
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function RegisterPage() {
  return (
    <div className="gradient-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', margin: '16px' }}>
        <div className="text-center mb-8">
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            📝 Cadastro
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>Crie sua conta</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Nome
            </label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Email
            </label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Senha
            </label>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Cadastrar
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Já tem uma conta?{' '}
            <Link to="/login" style={{ color: '#22c55e', fontWeight: '500', textDecoration: 'none' }}>
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

// ===============================================
// COMPONENTE PRINCIPAL
// ===============================================

function App() {
  useEffect(() => {
    // Injetar estilos CSS no head
    const styleElement = document.createElement('style')
    styleElement.textContent = globalStyles
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/planos" element={<PlanosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

