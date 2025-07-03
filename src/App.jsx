import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'

// ===============================================
// CONFIGURAÇÕES E UTILITÁRIOS
// ===============================================

// Configuração da API
const API_CONFIG = {
  geminiKey: process.env.REACT_APP_GEMINI_API_KEY || '',
  databaseUrl: process.env.REACT_APP_DATABASE_URL || ''
}

// Utilitário para chamadas à API
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Call Error:', error)
    throw error
  }
}

// Simulador de IA para quando não há API configurada
const simulateAI = (message) => {
  const responses = {
    'ola': 'Olá! Sou sua assistente nutricional. Como posso ajudar você hoje?',
    'dieta': 'Posso criar um plano alimentar personalizado para você! Me conte sobre seus objetivos e preferências.',
    'receita': 'Tenho várias receitas saudáveis! Que tipo de prato você gostaria? Café da manhã, almoço ou jantar?',
    'peso': 'Para ajudar com o peso, é importante equilibrar alimentação e exercícios. Qual é seu objetivo específico?',
    'default': 'Entendi sua pergunta sobre nutrição. Baseado em evidências científicas, recomendo focar em uma alimentação equilibrada com frutas, vegetais, proteínas magras e grãos integrais. Gostaria de mais detalhes sobre algum aspecto específico?'
  }
  
  const key = Object.keys(responses).find(k => 
    message.toLowerCase().includes(k)
  ) || 'default'
  
  return responses[key]
}

// ===============================================
// COMPONENTE NAVBAR
// ===============================================

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
    position: 'sticky',
    top: 0,
    zIndex: 50
  }

  const linkStyle = (active) => ({
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    background: active ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
    color: active ? '#15803d' : '#374151',
    textDecoration: 'none',
    display: 'inline-block'
  })

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <span style={{ fontSize: '24px' }}>🥗</span>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>NutriAI</span>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link to="/" style={linkStyle(isActive('/'))}>🏠 Início</Link>
            <Link to="/dashboard" style={linkStyle(isActive('/dashboard'))}>📊 Dashboard</Link>
            <Link to="/chat" style={linkStyle(isActive('/chat'))}>💬 Chat IA</Link>
            <Link to="/planos" style={linkStyle(isActive('/planos'))}>🍽️ Planos</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/login" style={{ ...linkStyle(false), padding: '8px 12px' }}>Entrar</Link>
            <Link 
              to="/register" 
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Cadastrar
            </Link>
          </div>
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
    ai: 'checking',
    database: 'checking'
  })

  useEffect(() => {
    // Verificar status dos sistemas
    const checkSystems = async () => {
      try {
        // Verificar IA
        const aiStatus = API_CONFIG.geminiKey ? 'configured' : 'needs_config'
        
        // Verificar banco
        const dbStatus = API_CONFIG.databaseUrl ? 'connected' : 'local_storage'
        
        setSystemStatus({
          app: 'online',
          ai: aiStatus,
          database: dbStatus
        })
      } catch (error) {
        console.error('Error checking systems:', error)
      }
    }

    checkSystems()
  }, [])

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 50%, #faf5ff 100%)'
  }

  const heroStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '64px 16px',
    textAlign: 'center'
  }

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
      case 'connected':
      case 'configured':
        return '#22c55e'
      case 'needs_config':
        return '#eab308'
      case 'local_storage':
        return '#3b82f6'
      default:
        return '#6b7280'
    }
  }

  const getStatusText = (system, status) => {
    const statusMap = {
      app: { online: '✅ Online' },
      ai: { 
        configured: '✅ Configurado',
        needs_config: '⚙️ Configurar',
        checking: '🔄 Verificando'
      },
      database: {
        connected: '✅ Conectado',
        local_storage: '💾 Local Storage',
        checking: '🔄 Verificando'
      }
    }
    return statusMap[system][status] || '❓ Desconhecido'
  }

  return (
    <div style={containerStyle}>
      <div style={heroStyle}>
        <div style={{ marginBottom: '64px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🥗</div>
          <h1 style={titleStyle}>NutriAI</h1>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Seu assistente inteligente para uma alimentação saudável e personalizada. 
            Planos alimentares criados por IA, adaptados ao seu estilo de vida brasileiro.
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '64px' }}>
            <Link 
              to="/dashboard" 
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              🚀 Começar Agora
            </Link>
            <Link 
              to="/chat" 
              style={{
                background: 'white',
                color: '#374151',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                border: '2px solid #e5e7eb'
              }}
            >
              💬 Chat com IA
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '64px' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>IA Avançada</h3>
            <p style={{ color: '#6b7280' }}>
              Powered by Google Gemini, nossa IA cria planos alimentares personalizados 
              baseados em suas necessidades e preferências.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🇧🇷</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>100% Brasileiro</h3>
            <p style={{ color: '#6b7280' }}>
              Receitas e ingredientes adaptados ao paladar e disponibilidade 
              do mercado brasileiro. Preços reais dos supermercados.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💰</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>Economia Real</h3>
            <p style={{ color: '#6b7280' }}>
              96% mais barato que soluções similares. Tecnologia de ponta 
              com custos acessíveis para todos.
            </p>
          </div>
        </div>

        {/* Status Section */}
        <div style={{ ...cardStyle, marginBottom: '64px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
            🔧 Status do Sistema
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  background: getStatusColor(systemStatus.app), 
                  borderRadius: '50%', 
                  marginRight: '12px' 
                }}></div>
                <span style={{ fontWeight: '500', color: '#374151' }}>Aplicação</span>
              </div>
              <span style={{ color: getStatusColor(systemStatus.app), fontWeight: '600' }}>
                {getStatusText('app', systemStatus.app)}
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  background: getStatusColor(systemStatus.ai), 
                  borderRadius: '50%', 
                  marginRight: '12px' 
                }}></div>
                <span style={{ fontWeight: '500', color: '#374151' }}>IA Gemini</span>
              </div>
              <span style={{ color: getStatusColor(systemStatus.ai), fontWeight: '600' }}>
                {getStatusText('ai', systemStatus.ai)}
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  background: getStatusColor(systemStatus.database), 
                  borderRadius: '50%', 
                  marginRight: '12px' 
                }}></div>
                <span style={{ fontWeight: '500', color: '#374151' }}>Banco de Dados</span>
              </div>
              <span style={{ color: getStatusColor(systemStatus.database), fontWeight: '600' }}>
                {getStatusText('database', systemStatus.database)}
              </span>
            </div>
          </div>

          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            background: 'linear-gradient(135deg, #dcfce7 0%, #dbeafe 100%)', 
            borderRadius: '12px' 
          }}>
            <p style={{ textAlign: 'center', color: '#374151' }}>
              <strong>🎉 Parabéns!</strong> Seu NutriAI está funcionando. 
              {systemStatus.ai === 'needs_config' && ' Configure a API do Gemini para funcionalidades completas.'}
              {systemStatus.database === 'local_storage' && ' Conecte um banco Neon para dados persistentes.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===============================================
// DASHBOARD
// ===============================================

function DashboardPage() {
  const [userStats, setUserStats] = useState({
    plansCreated: 0,
    chatMessages: 0,
    lastActivity: null
  })

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 50%, #faf5ff 100%)'
  }

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            📊 Dashboard
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280' }}>
            Bem-vindo ao seu painel personalizado!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🥗</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              Meus Planos
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              Você tem {userStats.plansCreated} planos alimentares criados.
            </p>
            <Link 
              to="/planos" 
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Ver Planos
            </Link>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              Chat IA
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              {userStats.chatMessages} mensagens trocadas com a IA.
            </p>
            <Link 
              to="/chat" 
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Iniciar Chat
            </Link>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📈</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              Progresso
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              Acompanhe sua evolução nutricional.
            </p>
            <button 
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Ver Relatório
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===============================================
// CHAT IA
// ===============================================

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Olá! Sou sua assistente nutricional. Como posso ajudar você hoje?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      let aiResponse
      
      if (API_CONFIG.geminiKey) {
        // Usar API real do Gemini
        const response = await apiCall('chat', {
          method: 'POST',
          body: JSON.stringify({ message: inputMessage })
        })
        aiResponse = response.message
      } else {
        // Usar simulador
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simular delay
        aiResponse = simulateAI(inputMessage)
      }

      const aiMessage = {
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        type: 'ai',
        content: 'Desculpe, ocorreu um erro. Tente novamente.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 50%, #faf5ff 100%)'
  }

  const chatContainerStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    height: '600px',
    display: 'flex',
    flexDirection: 'column'
  }

  const messagesStyle = {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }

  const messageStyle = (type) => ({
    padding: '16px',
    borderRadius: '12px',
    maxWidth: '80%',
    alignSelf: type === 'user' ? 'flex-end' : 'flex-start',
    background: type === 'user' 
      ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
      : '#f3f4f6',
    color: type === 'user' ? 'white' : '#374151'
  })

  const inputContainerStyle = {
    padding: '24px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    gap: '8px'
  }

  const inputStyle = {
    flex: 1,
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none'
  }

  const sendButtonStyle = {
    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500'
  }

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            💬 Chat com IA Nutricional
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280' }}>
            Converse com nossa IA especializada em nutrição!
          </p>
        </div>

        <div style={chatContainerStyle}>
          <div style={messagesStyle}>
            {messages.map((message, index) => (
              <div key={index} style={messageStyle(message.type)}>
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
            {isLoading && (
              <div style={messageStyle('ai')}>
                <p style={{ margin: 0 }}>🤔 Pensando...</p>
              </div>
            )}
          </div>
          
          <div style={inputContainerStyle}>
            <input 
              type="text" 
              placeholder="Digite sua pergunta sobre nutrição..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              style={inputStyle}
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              style={{
                ...sendButtonStyle,
                opacity: isLoading || !inputMessage.trim() ? 0.5 : 1
              }}
            >
              {isLoading ? '⏳' : 'Enviar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===============================================
// PLANOS ALIMENTARES
// ===============================================

function PlanosPage() {
  const [planos, setPlanos] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePlan = async () => {
    setIsGenerating(true)
    
    try {
      let planData
      
      if (API_CONFIG.geminiKey) {
        // Usar API real
        const response = await apiCall('generate-plan', {
          method: 'POST',
          body: JSON.stringify({
            preferences: 'Dieta equilibrada brasileira',
            goals: 'Manter peso saudável'
          })
        })
        planData = response.plan
      } else {
        // Usar dados simulados
        await new Promise(resolve => setTimeout(resolve, 2000))
        planData = {
          title: 'Plano Equilibrado Brasileiro',
          description: 'Plano alimentar balanceado com ingredientes típicos brasileiros',
          meals: [
            {
              type: 'Café da manhã',
              items: ['Aveia com banana', 'Café com leite', 'Pão integral'],
              calories: 350
            },
            {
              type: 'Almoço',
              items: ['Arroz integral', 'Feijão preto', 'Frango grelhado', 'Salada verde'],
              calories: 520
            },
            {
              type: 'Jantar',
              items: ['Peixe assado', 'Batata doce', 'Brócolis refogado'],
              calories: 420
            }
          ],
          totalCalories: 1290
        }
      }

      const newPlan = {
        id: Date.now(),
        ...planData,
        createdAt: new Date()
      }

      setPlanos(prev => [newPlan, ...prev])
    } catch (error) {
      console.error('Error generating plan:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 50%, #faf5ff 100%)'
  }

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    marginBottom: '24px'
  }

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            🍽️ Meus Planos Alimentares
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '24px' }}>
            Planos personalizados criados pela IA
          </p>
          
          <button
            onClick={generatePlan}
            disabled={isGenerating}
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: '600',
              opacity: isGenerating ? 0.5 : 1
            }}
          >
            {isGenerating ? '🔄 Gerando...' : '✨ Gerar Novo Plano'}
          </button>
        </div>

        {planos.length === 0 && !isGenerating && (
          <div style={cardStyle}>
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
        )}

        {planos.map(plano => (
          <div key={plano.id} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                  {plano.title}
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '8px' }}>
                  {plano.description}
                </p>
                <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                  Criado em: {plano.createdAt.toLocaleDateString()}
                </p>
              </div>
              <div style={{ 
                background: 'linear-gradient(135deg, #dcfce7 0%, #dbeafe 100%)',
                padding: '8px 16px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#15803d' }}>
                  {plano.totalCalories}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  calorias/dia
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {plano.meals?.map((meal, index) => (
                <div key={index} style={{
                  background: '#f9fafb',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    {meal.type}
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '16px', color: '#6b7280' }}>
                    {meal.items?.map((item, itemIndex) => (
                      <li key={itemIndex} style={{ marginBottom: '4px' }}>{item}</li>
                    ))}
                  </ul>
                  <div style={{ 
                    marginTop: '8px', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#22c55e' 
                  }}>
                    {meal.calories} cal
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===============================================
// PÁGINAS DE AUTENTICAÇÃO
// ===============================================

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implementar lógica de login
    console.log('Login attempt:', formData)
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 50%, #faf5ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const formContainerStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '32px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    width: '100%',
    maxWidth: '400px',
    margin: '16px'
  }

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            🔐 Login
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>Entre em sua conta</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
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

          <button 
            type="submit" 
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
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
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implementar lógica de cadastro
    console.log('Register attempt:', formData)
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 50%, #faf5ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const formContainerStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '32px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    width: '100%',
    maxWidth: '400px',
    margin: '16px'
  }

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            📝 Cadastro
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Nome
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
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

          <button 
            type="submit" 
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
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
    // Adicionar Tailwind via CDN se não estiver carregado
    if (!document.querySelector('script[src*="tailwindcss"]')) {
      const script = document.createElement('script')
      script.src = 'https://cdn.tailwindcss.com'
      document.head.appendChild(script)
    }
  }, [])

  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
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

