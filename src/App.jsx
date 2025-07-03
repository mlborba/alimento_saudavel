import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import OnboardingPage from './components/OnboardingPage'
import ConfigPage from './components/ConfigPage'
import DashboardPage from './components/DashboardPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </div>
    </Router>
  )
}

// Componente Chat Page
function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        💬 Chat com IA Nutricional
      </h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-600 mb-4">
          Converse com nossa IA especializada em nutrição!
        </p>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-2">Você:</p>
            <p>Olá! Como posso melhorar minha alimentação?</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 mb-2">NutriAI:</p>
            <p>Olá! Fico feliz em ajudar com sua alimentação. Para dar sugestões personalizadas, me conte sobre seus objetivos e preferências alimentares!</p>
          </div>
        </div>
        <div className="mt-6">
          <input 
            type="text" 
            placeholder="Digite sua pergunta..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente Forgot Password Page
function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔑</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recuperar Senha
          </h1>
          <p className="text-gray-600">
            Digite seu email para receber instruções de recuperação
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="seu@email.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300"
            >
              Enviar Instruções
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Lembrou da senha?{' '}
              <a href="/login" className="text-green-600 hover:text-green-700 font-medium">
                Fazer login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente Terms Page
function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        📋 Termos de Uso
      </h1>
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">1. Aceitação dos Termos</h2>
          <p className="mb-4">
            Ao utilizar o NutriAI, você concorda com estes termos de uso. 
            Se não concordar, não utilize nossos serviços.
          </p>

          <h2 className="text-xl font-semibold mb-4">2. Descrição do Serviço</h2>
          <p className="mb-4">
            O NutriAI é uma plataforma de inteligência artificial que oferece 
            sugestões nutricionais personalizadas. Nossos serviços são apenas 
            informativos e não substituem orientação médica profissional.
          </p>

          <h2 className="text-xl font-semibold mb-4">3. Responsabilidades do Usuário</h2>
          <p className="mb-4">
            Você é responsável por fornecer informações precisas e manter 
            a confidencialidade de sua conta. Consulte sempre um profissional 
            de saúde antes de fazer mudanças significativas em sua dieta.
          </p>

          <h2 className="text-xl font-semibold mb-4">4. Limitação de Responsabilidade</h2>
          <p className="mb-4">
            O NutriAI não se responsabiliza por resultados específicos ou 
            efeitos adversos decorrentes do uso de nossas sugestões. 
            Use sempre o bom senso e consulte profissionais qualificados.
          </p>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Última atualização:</strong> Janeiro de 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente Privacy Page
function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        🔒 Política de Privacidade
      </h1>
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">1. Coleta de Informações</h2>
          <p className="mb-4">
            Coletamos informações que você nos fornece diretamente, como dados 
            pessoais, preferências alimentares e objetivos de saúde. Também 
            coletamos dados de uso da plataforma para melhorar nossos serviços.
          </p>

          <h2 className="text-xl font-semibold mb-4">2. Uso das Informações</h2>
          <p className="mb-4">
            Utilizamos suas informações para personalizar recomendações 
            nutricionais, melhorar nossos algoritmos de IA e fornecer 
            suporte ao cliente. Não vendemos seus dados pessoais.
          </p>

          <h2 className="text-xl font-semibold mb-4">3. Compartilhamento de Dados</h2>
          <p className="mb-4">
            Não compartilhamos suas informações pessoais com terceiros, 
            exceto quando necessário para fornecer nossos serviços ou 
            quando exigido por lei.
          </p>

          <h2 className="text-xl font-semibold mb-4">4. Segurança</h2>
          <p className="mb-4">
            Implementamos medidas de segurança técnicas e organizacionais 
            para proteger suas informações contra acesso não autorizado, 
            alteração, divulgação ou destruição.
          </p>

          <h2 className="text-xl font-semibold mb-4">5. Seus Direitos</h2>
          <p className="mb-4">
            Você tem o direito de acessar, corrigir ou excluir suas 
            informações pessoais. Entre em contato conosco para exercer 
            esses direitos.
          </p>

          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>Conformidade LGPD:</strong> Esta política está em 
              conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

