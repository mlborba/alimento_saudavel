import React, { useState } from 'react'

export default function ConfigPage() {
  const [geminiKey, setGeminiKey] = useState('')
  const [databaseUrl, setDatabaseUrl] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Salvar no localStorage para demonstração
    if (geminiKey) localStorage.setItem('VITE_GEMINI_API_KEY', geminiKey)
    if (databaseUrl) localStorage.setItem('DATABASE_URL', databaseUrl)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Configuração do NutriAI
          </h1>
          <p className="text-gray-600">
            Configure suas APIs para ativar todas as funcionalidades do NutriAI
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            APIs e Integrações
          </h2>
          
          <div className="space-y-6">
            {/* Google Gemini API */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chave API do Google Gemini
              </label>
              <input 
                type="password" 
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Obtenha sua chave em: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Google AI Studio</a>
              </p>
            </div>
            
            {/* Neon Database */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL do Banco Neon PostgreSQL
              </label>
              <input 
                type="password" 
                value={databaseUrl}
                onChange={(e) => setDatabaseUrl(e.target.value)}
                placeholder="postgresql://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Obtenha sua URL em: <a href="https://neon.tech" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Neon Console</a>
              </p>
            </div>
            
            <button 
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Salvar Configurações
            </button>
            
            {saved && (
              <div className="text-green-600 text-sm font-medium">
                ✅ Configurações salvas com sucesso!
              </div>
            )}
          </div>
        </div>

        {/* Status das APIs */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Status das Integrações
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-sm font-medium text-gray-700">Google Gemini IA</span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                geminiKey ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {geminiKey ? 'Configurado' : 'Modo Demo'}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-sm font-medium text-gray-700">Banco de Dados</span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                databaseUrl ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {databaseUrl ? 'Conectado' : 'Local Storage'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

