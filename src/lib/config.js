// Sistema de Configuração Automática de APIs
// Este arquivo gerencia automaticamente as chaves API e configurações

class ConfigManager {
  constructor() {
    this.config = {
      gemini: {
        apiKey: null,
        isConfigured: false,
        fallbackEnabled: true
      },
      database: {
        url: null,
        isConfigured: false,
        fallbackEnabled: true
      },
      jwt: {
        secret: null,
        isConfigured: false
      }
    }
    
    this.init()
  }

  // Inicialização automática
  init() {
    this.loadFromEnvironment()
    this.loadFromLocalStorage()
    this.validateConfiguration()
  }

  // Carregar configurações do ambiente
  loadFromEnvironment() {
    // Gemini API
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (geminiKey && geminiKey !== 'sua_chave_gemini_aqui') {
      this.config.gemini.apiKey = geminiKey
      this.config.gemini.isConfigured = true
    }

    // Database
    const dbUrl = import.meta.env.VITE_DATABASE_URL || import.meta.env.DATABASE_URL
    if (dbUrl && !dbUrl.includes('sua_string_neon')) {
      this.config.database.url = dbUrl
      this.config.database.isConfigured = true
    }

    // JWT Secret
    const jwtSecret = import.meta.env.VITE_JWT_SECRET
    if (jwtSecret && jwtSecret !== 'sua_chave_jwt_super_secreta_aqui') {
      this.config.jwt.secret = jwtSecret
      this.config.jwt.isConfigured = true
    } else {
      // Gerar JWT secret automaticamente se não configurado
      this.config.jwt.secret = this.generateJWTSecret()
      this.config.jwt.isConfigured = true
    }
  }

  // Carregar configurações do localStorage (para desenvolvimento)
  loadFromLocalStorage() {
    try {
      const savedConfig = localStorage.getItem('nutri-ai-config')
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig)
        
        // Aplicar configurações salvas se não estiverem no ambiente
        if (!this.config.gemini.isConfigured && parsed.gemini?.apiKey) {
          this.config.gemini.apiKey = parsed.gemini.apiKey
          this.config.gemini.isConfigured = true
        }
        
        if (!this.config.database.isConfigured && parsed.database?.url) {
          this.config.database.url = parsed.database.url
          this.config.database.isConfigured = true
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar configuração do localStorage:', error)
    }
  }

  // Salvar configurações no localStorage
  saveToLocalStorage() {
    try {
      const configToSave = {
        gemini: {
          apiKey: this.config.gemini.apiKey,
          isConfigured: this.config.gemini.isConfigured
        },
        database: {
          url: this.config.database.url,
          isConfigured: this.config.database.isConfigured
        },
        timestamp: Date.now()
      }
      localStorage.setItem('nutri-ai-config', JSON.stringify(configToSave))
    } catch (error) {
      console.warn('Erro ao salvar configuração no localStorage:', error)
    }
  }

  // Validar configuração atual
  validateConfiguration() {
    const issues = []
    
    if (!this.config.gemini.isConfigured) {
      issues.push({
        type: 'warning',
        service: 'Gemini AI',
        message: 'Chave API não configurada. Funcionalidades de IA estarão limitadas.',
        action: 'configure_gemini'
      })
    }
    
    if (!this.config.database.isConfigured) {
      issues.push({
        type: 'warning',
        service: 'Database',
        message: 'Banco de dados não configurado. Usando armazenamento local.',
        action: 'configure_database'
      })
    }
    
    return issues
  }

  // Gerar JWT secret automaticamente
  generateJWTSecret() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let result = ''
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Configurar Gemini API
  configureGemini(apiKey) {
    if (!apiKey || apiKey.length < 30) {
      throw new Error('Chave API do Gemini inválida')
    }
    
    this.config.gemini.apiKey = apiKey
    this.config.gemini.isConfigured = true
    this.saveToLocalStorage()
    
    return this.testGeminiConnection()
  }

  // Configurar Database
  configureDatabase(url) {
    if (!url || !url.includes('postgresql://')) {
      throw new Error('URL do banco de dados inválida')
    }
    
    this.config.database.url = url
    this.config.database.isConfigured = true
    this.saveToLocalStorage()
    
    return this.testDatabaseConnection()
  }

  // Testar conexão com Gemini
  async testGeminiConnection() {
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + this.config.gemini.apiKey)
      return response.ok
    } catch (error) {
      console.error('Erro ao testar conexão Gemini:', error)
      return false
    }
  }

  // Testar conexão com Database (simulado)
  async testDatabaseConnection() {
    // Em produção, isso faria uma conexão real
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 1000)
    })
  }

  // Obter configuração atual
  getConfig() {
    return { ...this.config }
  }

  // Verificar se está pronto para produção
  isProductionReady() {
    return this.config.gemini.isConfigured && 
           this.config.database.isConfigured && 
           this.config.jwt.isConfigured
  }

  // Obter status resumido
  getStatus() {
    return {
      gemini: this.config.gemini.isConfigured ? 'configured' : 'pending',
      database: this.config.database.isConfigured ? 'configured' : 'pending',
      jwt: this.config.jwt.isConfigured ? 'configured' : 'pending',
      ready: this.isProductionReady()
    }
  }

  // Reset configuração
  reset() {
    localStorage.removeItem('nutri-ai-config')
    this.config = {
      gemini: { apiKey: null, isConfigured: false, fallbackEnabled: true },
      database: { url: null, isConfigured: false, fallbackEnabled: true },
      jwt: { secret: null, isConfigured: false }
    }
    this.init()
  }
}

// Instância global
export const configManager = new ConfigManager()

// Hook React para usar configuração
export function useConfig() {
  const [config, setConfig] = useState(configManager.getConfig())
  const [status, setStatus] = useState(configManager.getStatus())

  const updateConfig = () => {
    setConfig(configManager.getConfig())
    setStatus(configManager.getStatus())
  }

  const configure = async (service, value) => {
    try {
      if (service === 'gemini') {
        await configManager.configureGemini(value)
      } else if (service === 'database') {
        await configManager.configureDatabase(value)
      }
      updateConfig()
      return true
    } catch (error) {
      console.error(`Erro ao configurar ${service}:`, error)
      return false
    }
  }

  return {
    config,
    status,
    configure,
    updateConfig,
    isReady: status.ready,
    issues: configManager.validateConfiguration()
  }
}

