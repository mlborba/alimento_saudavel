import { createContext, useContext, useState, useEffect } from 'react'
import { configManager } from '../lib/config'

const ConfigContext = createContext()

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(configManager.getConfig())
  const [status, setStatus] = useState(configManager.getStatus())
  const [loading, setLoading] = useState(false)

  // Atualizar configuração
  const updateConfig = () => {
    setConfig(configManager.getConfig())
    setStatus(configManager.getStatus())
  }

  // Configurar serviço
  const configure = async (service, value) => {
    setLoading(true)
    try {
      if (service === 'gemini') {
        const success = await configManager.configureGemini(value)
        if (success) {
          updateConfig()
          return { success: true, message: 'Gemini configurado com sucesso!' }
        } else {
          return { success: false, message: 'Erro ao configurar Gemini. Verifique a chave.' }
        }
      } else if (service === 'database') {
        const success = await configManager.configureDatabase(value)
        if (success) {
          updateConfig()
          return { success: true, message: 'Banco de dados configurado com sucesso!' }
        } else {
          return { success: false, message: 'Erro ao configurar banco. Verifique a URL.' }
        }
      }
    } catch (error) {
      return { success: false, message: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Testar configuração
  const testConfiguration = async (service) => {
    setLoading(true)
    try {
      if (service === 'gemini') {
        const success = await configManager.testGeminiConnection()
        return { success, message: success ? 'Conexão com Gemini OK!' : 'Erro na conexão com Gemini' }
      } else if (service === 'database') {
        const success = await configManager.testDatabaseConnection()
        return { success, message: success ? 'Conexão com banco OK!' : 'Erro na conexão com banco' }
      }
    } catch (error) {
      return { success: false, message: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Reset configuração
  const resetConfig = () => {
    configManager.reset()
    updateConfig()
  }

  // Verificar se está pronto para produção
  const isProductionReady = () => {
    return configManager.isProductionReady()
  }

  // Obter issues de configuração
  const getIssues = () => {
    return configManager.validateConfiguration()
  }

  const value = {
    config,
    status,
    loading,
    configure,
    testConfiguration,
    updateConfig,
    resetConfig,
    isProductionReady,
    getIssues,
    isReady: status.ready
  }

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig deve ser usado dentro de ConfigProvider')
  }
  return context
}

