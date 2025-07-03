import { useState } from 'react'
import { useConfig } from '../contexts/ConfigContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { CheckCircle, AlertCircle, Settings, Database, Bot, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

export default function ConfigPage() {
  const { config, status, loading, configure, testConfiguration, isReady } = useConfig()
  const [geminiKey, setGeminiKey] = useState('')
  const [databaseUrl, setDatabaseUrl] = useState('')
  const [testing, setTesting] = useState({ gemini: false, database: false })

  // Configurar Gemini
  const handleConfigureGemini = async () => {
    if (!geminiKey.trim()) {
      toast.error('Digite uma chave API válida')
      return
    }

    const result = await configure('gemini', geminiKey.trim())
    if (result.success) {
      toast.success(result.message)
      setGeminiKey('')
    } else {
      toast.error(result.message)
    }
  }

  // Configurar Database
  const handleConfigureDatabase = async () => {
    if (!databaseUrl.trim()) {
      toast.error('Digite uma URL de banco válida')
      return
    }

    const result = await configure('database', databaseUrl.trim())
    if (result.success) {
      toast.success(result.message)
      setDatabaseUrl('')
    } else {
      toast.error(result.message)
    }
  }

  // Testar configuração
  const handleTest = async (service) => {
    setTesting(prev => ({ ...prev, [service]: true }))
    const result = await testConfiguration(service)
    
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
    
    setTesting(prev => ({ ...prev, [service]: false }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Settings className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Configuração do NutriAI</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Configure as APIs para desbloquear todas as funcionalidades do seu assistente de nutrição
          </p>
        </div>

        {/* Status geral */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              {isReady ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
              )}
              Status da Configuração
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Bot className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium">Gemini AI</span>
                </div>
                <Badge variant={status.gemini === 'configured' ? 'default' : 'secondary'}>
                  {status.gemini === 'configured' ? 'Configurado' : 'Pendente'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">Banco de Dados</span>
                </div>
                <Badge variant={status.database === 'configured' ? 'default' : 'secondary'}>
                  {status.database === 'configured' ? 'Configurado' : 'Pendente'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="font-medium">Status Geral</span>
                </div>
                <Badge variant={isReady ? 'default' : 'secondary'}>
                  {isReady ? 'Pronto' : 'Configuração Parcial'}
                </Badge>
              </div>
            </div>
            
            {!isReady && (
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  O app está funcionando em modo demonstração. Configure as APIs para funcionalidades completas.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Configurações */}
        <Tabs defaultValue="gemini" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gemini">Google Gemini</TabsTrigger>
            <TabsTrigger value="database">Banco de Dados</TabsTrigger>
          </TabsList>

          {/* Configuração Gemini */}
          <TabsContent value="gemini">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 text-blue-500 mr-2" />
                  Google Gemini AI
                </CardTitle>
                <CardDescription>
                  Configure a API do Google Gemini para funcionalidades de IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status atual */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge variant={status.gemini === 'configured' ? 'default' : 'secondary'}>
                      {status.gemini === 'configured' ? 'Configurado' : 'Não configurado'}
                    </Badge>
                  </div>
                  {status.gemini === 'configured' && (
                    <p className="text-sm text-gray-600 mt-2">
                      ✅ Chave API configurada e funcionando
                    </p>
                  )}
                </div>

                {/* Instruções */}
                <div className="space-y-3">
                  <h4 className="font-medium">Como obter sua chave API:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>Acesse o Google AI Studio</li>
                    <li>Faça login com sua conta Google</li>
                    <li>Clique em "Create API key"</li>
                    <li>Copie a chave gerada (começa com AIzaSy...)</li>
                  </ol>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('https://aistudio.google.com/app/apikey', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir Google AI Studio
                  </Button>
                </div>

                {/* Formulário */}
                <div className="space-y-3">
                  <Label htmlFor="gemini-key">Chave API do Gemini</Label>
                  <Input
                    id="gemini-key"
                    type="password"
                    placeholder="AIzaSy..."
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleConfigureGemini}
                      disabled={loading || !geminiKey.trim()}
                    >
                      {loading ? 'Configurando...' : 'Configurar'}
                    </Button>
                    {status.gemini === 'configured' && (
                      <Button 
                        variant="outline"
                        onClick={() => handleTest('gemini')}
                        disabled={testing.gemini}
                      >
                        {testing.gemini ? 'Testando...' : 'Testar Conexão'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuração Database */}
          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 text-green-500 mr-2" />
                  Banco de Dados (Neon PostgreSQL)
                </CardTitle>
                <CardDescription>
                  Configure o banco de dados para persistência de dados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status atual */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge variant={status.database === 'configured' ? 'default' : 'secondary'}>
                      {status.database === 'configured' ? 'Configurado' : 'Usando localStorage'}
                    </Badge>
                  </div>
                  {status.database !== 'configured' && (
                    <p className="text-sm text-gray-600 mt-2">
                      📱 Dados sendo salvos localmente no navegador
                    </p>
                  )}
                </div>

                {/* Instruções */}
                <div className="space-y-3">
                  <h4 className="font-medium">Como configurar o Neon:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>Acesse o Neon e crie uma conta</li>
                    <li>Crie um novo projeto</li>
                    <li>Copie a connection string</li>
                    <li>Cole aqui para configurar</li>
                  </ol>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('https://neon.tech/', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir Neon
                  </Button>
                </div>

                {/* Formulário */}
                <div className="space-y-3">
                  <Label htmlFor="database-url">Connection String</Label>
                  <Input
                    id="database-url"
                    type="password"
                    placeholder="postgresql://user:pass@ep-xxx.neon.tech/..."
                    value={databaseUrl}
                    onChange={(e) => setDatabaseUrl(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleConfigureDatabase}
                      disabled={loading || !databaseUrl.trim()}
                    >
                      {loading ? 'Configurando...' : 'Configurar'}
                    </Button>
                    {status.database === 'configured' && (
                      <Button 
                        variant="outline"
                        onClick={() => handleTest('database')}
                        disabled={testing.database}
                      >
                        {testing.database ? 'Testando...' : 'Testar Conexão'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Informações adicionais */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Informações Importantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">🔒 Segurança</h4>
                <p className="text-sm text-blue-800">
                  Suas chaves são armazenadas localmente no navegador e nunca enviadas para nossos servidores.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">💰 Custos</h4>
                <p className="text-sm text-green-800">
                  Gemini: ~$1/mês • Neon: Gratuito (0.5GB) • Total: ~$1/mês
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">🚀 Funcionalidades</h4>
                <p className="text-sm text-purple-800">
                  Com as APIs configuradas: IA real, dados persistentes, chat inteligente.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">📱 Modo Demo</h4>
                <p className="text-sm text-yellow-800">
                  Sem configuração: App funciona com dados locais e respostas de exemplo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

