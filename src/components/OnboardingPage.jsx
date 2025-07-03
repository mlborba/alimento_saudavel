import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Dados pessoais
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    
    // Objetivos
    goal: '',
    targetWeight: '',
    timeframe: '',
    
    // Preferências
    dietType: '',
    allergies: [],
    dislikes: [],
    mealsPerDay: '3',
    budget: ''
  })

  const totalSteps = 3

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          [name]: [...(formData[name] || []), value]
        })
      } else {
        setFormData({
          ...formData,
          [name]: (formData[name] || []).filter(item => item !== value)
        })
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Simular processamento
    alert('Perfil criado com sucesso! Redirecionando para o dashboard...')
    window.location.href = '/dashboard'
  }

  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🥗</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vamos conhecer você melhor
          </h1>
          <p className="text-gray-600">
            Algumas perguntas rápidas para personalizar sua experiência
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Etapa {currentStep} de {totalSteps}</span>
            <span>{Math.round(progressPercentage)}% completo</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-600 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          {/* Step 1: Dados Pessoais */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📊 Dados Pessoais
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idade
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ex: 25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gênero
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ex: 170"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ex: 70"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível de Atividade Física
                </label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Selecione</option>
                  <option value="sedentario">Sedentário (pouco ou nenhum exercício)</option>
                  <option value="leve">Levemente ativo (exercício leve 1-3 dias/semana)</option>
                  <option value="moderado">Moderadamente ativo (exercício moderado 3-5 dias/semana)</option>
                  <option value="intenso">Muito ativo (exercício intenso 6-7 dias/semana)</option>
                  <option value="extremo">Extremamente ativo (exercício muito intenso, trabalho físico)</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Objetivos */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🎯 Seus Objetivos
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qual é seu objetivo principal?
                </label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Selecione</option>
                  <option value="perder-peso">Perder peso</option>
                  <option value="ganhar-peso">Ganhar peso</option>
                  <option value="manter-peso">Manter peso atual</option>
                  <option value="ganhar-massa">Ganhar massa muscular</option>
                  <option value="melhorar-saude">Melhorar saúde geral</option>
                </select>
              </div>

              {(formData.goal === 'perder-peso' || formData.goal === 'ganhar-peso') && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Peso desejado (kg)
                    </label>
                    <input
                      type="number"
                      name="targetWeight"
                      value={formData.targetWeight}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Ex: 65"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prazo desejado
                    </label>
                    <select
                      name="timeframe"
                      value={formData.timeframe}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Selecione</option>
                      <option value="1-mes">1 mês</option>
                      <option value="3-meses">3 meses</option>
                      <option value="6-meses">6 meses</option>
                      <option value="1-ano">1 ano</option>
                      <option value="sem-pressa">Sem pressa</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-700">
                  <strong>💡 Dica:</strong> Objetivos realistas e sustentáveis levam a melhores resultados a longo prazo.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Preferências */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🍽️ Preferências Alimentares
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de dieta
                </label>
                <select
                  name="dietType"
                  value={formData.dietType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Selecione</option>
                  <option value="tradicional">Tradicional (sem restrições)</option>
                  <option value="vegetariana">Vegetariana</option>
                  <option value="vegana">Vegana</option>
                  <option value="low-carb">Low Carb</option>
                  <option value="cetogenica">Cetogênica</option>
                  <option value="mediterranea">Mediterrânea</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Refeições por dia
                  </label>
                  <select
                    name="mealsPerDay"
                    value={formData.mealsPerDay}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="3">3 refeições</option>
                    <option value="4">4 refeições</option>
                    <option value="5">5 refeições</option>
                    <option value="6">6 refeições</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orçamento mensal para alimentação
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Selecione</option>
                    <option value="ate-300">Até R$ 300</option>
                    <option value="300-500">R$ 300 - R$ 500</option>
                    <option value="500-800">R$ 500 - R$ 800</option>
                    <option value="800-1200">R$ 800 - R$ 1.200</option>
                    <option value="acima-1200">Acima de R$ 1.200</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Alergias ou intolerâncias (marque todas que se aplicam)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Lactose', 'Glúten', 'Amendoim', 'Frutos do mar', 'Ovos', 'Soja'].map(allergy => (
                    <label key={allergy} className="flex items-center">
                      <input
                        type="checkbox"
                        name="allergies"
                        value={allergy.toLowerCase()}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{allergy}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300"
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300"
              >
                Finalizar
              </button>
            )}
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Link 
            to="/dashboard" 
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Pular por agora e ir para o dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

