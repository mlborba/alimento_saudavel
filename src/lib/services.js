// Sistema de Fallback e Validação
// Garante que o app funcione mesmo sem todas as configurações

import { configManager } from './config.js'

// Serviço Gemini com fallback
export class GeminiService {
  constructor() {
    this.isConfigured = false
    this.fallbackResponses = this.loadFallbackResponses()
    this.init()
  }

  init() {
    const config = configManager.getConfig()
    this.isConfigured = config.gemini.isConfigured
    this.apiKey = config.gemini.apiKey
  }

  // Respostas de fallback para demonstração
  loadFallbackResponses() {
    return {
      dietPlan: {
        breakfast: [
          "2 fatias de pão integral com abacate e ovo",
          "1 xícara de café com leite desnatado",
          "1 banana média"
        ],
        lunch: [
          "150g de peito de frango grelhado",
          "1 xícara de arroz integral",
          "Salada verde com azeite",
          "1 porção de feijão"
        ],
        dinner: [
          "150g de peixe assado",
          "Legumes refogados",
          "1 batata doce média",
          "Salada de folhas verdes"
        ],
        snacks: [
          "1 iogurte natural com granola",
          "Mix de castanhas (30g)",
          "1 maçã com canela"
        ]
      },
      chatResponses: [
        "Ótima pergunta! Para uma alimentação saudável, recomendo focar em alimentos naturais e variados.",
        "É importante manter uma hidratação adequada, bebendo pelo menos 2 litros de água por dia.",
        "Inclua proteínas magras, carboidratos complexos e gorduras boas em suas refeições.",
        "Evite alimentos ultraprocessados e prefira preparações caseiras.",
        "Lembre-se: pequenas mudanças consistentes geram grandes resultados!"
      ]
    }
  }

  // Gerar plano alimentar
  async generateDietPlan(userProfile) {
    if (this.isConfigured) {
      try {
        return await this.generateRealDietPlan(userProfile)
      } catch (error) {
        console.warn('Erro na API Gemini, usando fallback:', error)
        return this.generateFallbackDietPlan(userProfile)
      }
    } else {
      return this.generateFallbackDietPlan(userProfile)
    }
  }

  // Gerar plano real com Gemini
  async generateRealDietPlan(userProfile) {
    const prompt = this.buildDietPrompt(userProfile)
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    const data = await response.json()
    const content = data.candidates[0].content.parts[0].text

    return this.parseDietPlanResponse(content, userProfile)
  }

  // Gerar plano de fallback
  generateFallbackDietPlan(userProfile) {
    const { age, weight, height, gender, goals, activityLevel } = userProfile
    
    // Cálculo básico de TMB
    let tmb
    if (gender === 'MASCULINO') {
      tmb = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    } else {
      tmb = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }

    // Fator de atividade
    const activityFactors = {
      'SEDENTARIO': 1.2,
      'LEVEMENTE_ATIVO': 1.375,
      'MODERADAMENTE_ATIVO': 1.55,
      'MUITO_ATIVO': 1.725,
      'EXTREMAMENTE_ATIVO': 1.9
    }

    const totalCalories = Math.round(tmb * (activityFactors[activityLevel] || 1.375))

    // Ajustar calorias baseado nos objetivos
    let targetCalories = totalCalories
    if (goals.includes('WEIGHT_LOSS')) {
      targetCalories = Math.round(totalCalories * 0.85) // Déficit de 15%
    } else if (goals.includes('WEIGHT_GAIN')) {
      targetCalories = Math.round(totalCalories * 1.15) // Superávit de 15%
    }

    return {
      id: Date.now().toString(),
      userId: userProfile.userId,
      title: `Plano Personalizado - ${targetCalories} kcal`,
      description: `Plano alimentar baseado no seu perfil e objetivos`,
      targetCalories,
      macros: {
        protein: Math.round(targetCalories * 0.25 / 4), // 25% proteína
        carbs: Math.round(targetCalories * 0.45 / 4),   // 45% carboidrato
        fat: Math.round(targetCalories * 0.30 / 9)      // 30% gordura
      },
      meals: this.fallbackResponses.dietPlan,
      shoppingList: this.generateShoppingList(),
      tips: [
        "Beba pelo menos 2 litros de água por dia",
        "Faça refeições a cada 3-4 horas",
        "Inclua vegetais em todas as refeições principais",
        "Evite alimentos ultraprocessados",
        "Pratique atividade física regularmente"
      ],
      createdAt: new Date().toISOString(),
      status: 'ACTIVE',
      source: 'fallback'
    }
  }

  // Chat com IA
  async chat(message, context = []) {
    if (this.isConfigured) {
      try {
        return await this.realChat(message, context)
      } catch (error) {
        console.warn('Erro no chat Gemini, usando fallback:', error)
        return this.fallbackChat(message)
      }
    } else {
      return this.fallbackChat(message)
    }
  }

  // Chat real com Gemini
  async realChat(message, context) {
    const prompt = this.buildChatPrompt(message, context)
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    const data = await response.json()
    return {
      message: data.candidates[0].content.parts[0].text,
      timestamp: new Date().toISOString(),
      source: 'gemini'
    }
  }

  // Chat de fallback
  fallbackChat(message) {
    const responses = this.fallbackResponses.chatResponses
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    return {
      message: randomResponse,
      timestamp: new Date().toISOString(),
      source: 'fallback',
      note: 'Esta é uma resposta de demonstração. Configure a API do Gemini para respostas personalizadas.'
    }
  }

  // Construir prompt para dieta
  buildDietPrompt(userProfile) {
    return `
Você é um nutricionista especializado em alimentação brasileira. Crie um plano alimentar personalizado para:

Perfil:
- Idade: ${userProfile.age} anos
- Peso: ${userProfile.weight} kg
- Altura: ${userProfile.height} cm
- Gênero: ${userProfile.gender}
- Nível de atividade: ${userProfile.activityLevel}
- Objetivos: ${userProfile.goals.join(', ')}
- Restrições: ${userProfile.restrictions?.join(', ') || 'Nenhuma'}
- Alergias: ${userProfile.allergies?.join(', ') || 'Nenhuma'}

Crie um plano com:
1. Café da manhã
2. Almoço
3. Jantar
4. 2 lanches
5. Lista de compras
6. Dicas nutricionais

Use ingredientes brasileiros e receitas práticas. Formate em JSON.
`
  }

  // Construir prompt para chat
  buildChatPrompt(message, context) {
    const contextStr = context.length > 0 
      ? `Contexto da conversa:\n${context.map(c => `${c.role}: ${c.message}`).join('\n')}\n\n`
      : ''
    
    return `
${contextStr}Você é um nutricionista brasileiro especializado. Responda de forma clara e prática sobre nutrição, sempre considerando a realidade brasileira.

Pergunta: ${message}

Responda de forma educativa e motivadora, com no máximo 200 palavras.
`
  }

  // Gerar lista de compras
  generateShoppingList() {
    return [
      { item: 'Pão integral', quantidade: '1 pacote', categoria: 'Padaria' },
      { item: 'Ovos', quantidade: '1 dúzia', categoria: 'Laticínios' },
      { item: 'Peito de frango', quantidade: '1 kg', categoria: 'Carnes' },
      { item: 'Arroz integral', quantidade: '1 kg', categoria: 'Grãos' },
      { item: 'Feijão', quantidade: '500g', categoria: 'Grãos' },
      { item: 'Batata doce', quantidade: '1 kg', categoria: 'Hortifruti' },
      { item: 'Alface', quantidade: '1 pé', categoria: 'Hortifruti' },
      { item: 'Tomate', quantidade: '500g', categoria: 'Hortifruti' },
      { item: 'Banana', quantidade: '1 cacho', categoria: 'Hortifruti' },
      { item: 'Maçã', quantidade: '1 kg', categoria: 'Hortifruti' }
    ]
  }

  // Analisar resposta da dieta
  parseDietPlanResponse(content, userProfile) {
    try {
      // Tentar parsear JSON
      const parsed = JSON.parse(content)
      return {
        ...parsed,
        id: Date.now().toString(),
        userId: userProfile.userId,
        createdAt: new Date().toISOString(),
        status: 'ACTIVE',
        source: 'gemini'
      }
    } catch (error) {
      // Se não for JSON válido, usar fallback
      console.warn('Resposta não é JSON válido, usando fallback')
      return this.generateFallbackDietPlan(userProfile)
    }
  }
}

// Serviço de Database com fallback
export class DatabaseService {
  constructor() {
    this.isConfigured = false
    this.localData = this.loadLocalData()
    this.init()
  }

  init() {
    const config = configManager.getConfig()
    this.isConfigured = config.database.isConfigured
    this.url = config.database.url
  }

  // Carregar dados locais
  loadLocalData() {
    try {
      const data = localStorage.getItem('nutri-ai-local-db')
      return data ? JSON.parse(data) : {
        users: [],
        dietPlans: [],
        conversations: []
      }
    } catch (error) {
      return {
        users: [],
        dietPlans: [],
        conversations: []
      }
    }
  }

  // Salvar dados locais
  saveLocalData() {
    try {
      localStorage.setItem('nutri-ai-local-db', JSON.stringify(this.localData))
    } catch (error) {
      console.warn('Erro ao salvar dados locais:', error)
    }
  }

  // Salvar usuário
  async saveUser(userData) {
    if (this.isConfigured) {
      try {
        return await this.saveUserToDatabase(userData)
      } catch (error) {
        console.warn('Erro no banco, usando localStorage:', error)
        return this.saveUserLocally(userData)
      }
    } else {
      return this.saveUserLocally(userData)
    }
  }

  // Salvar usuário localmente
  saveUserLocally(userData) {
    const user = {
      ...userData,
      id: userData.id || Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    
    const existingIndex = this.localData.users.findIndex(u => u.email === user.email)
    if (existingIndex >= 0) {
      this.localData.users[existingIndex] = user
    } else {
      this.localData.users.push(user)
    }
    
    this.saveLocalData()
    return user
  }

  // Buscar usuário
  async findUser(email) {
    if (this.isConfigured) {
      try {
        return await this.findUserInDatabase(email)
      } catch (error) {
        return this.findUserLocally(email)
      }
    } else {
      return this.findUserLocally(email)
    }
  }

  // Buscar usuário localmente
  findUserLocally(email) {
    return this.localData.users.find(u => u.email === email) || null
  }

  // Salvar plano alimentar
  async saveDietPlan(planData) {
    if (this.isConfigured) {
      try {
        return await this.saveDietPlanToDatabase(planData)
      } catch (error) {
        return this.saveDietPlanLocally(planData)
      }
    } else {
      return this.saveDietPlanLocally(planData)
    }
  }

  // Salvar plano localmente
  saveDietPlanLocally(planData) {
    const plan = {
      ...planData,
      id: planData.id || Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    
    this.localData.dietPlans.push(plan)
    this.saveLocalData()
    return plan
  }

  // Buscar planos do usuário
  async getUserDietPlans(userId) {
    if (this.isConfigured) {
      try {
        return await this.getUserDietPlansFromDatabase(userId)
      } catch (error) {
        return this.getUserDietPlansLocally(userId)
      }
    } else {
      return this.getUserDietPlansLocally(userId)
    }
  }

  // Buscar planos localmente
  getUserDietPlansLocally(userId) {
    return this.localData.dietPlans.filter(p => p.userId === userId)
  }

  // Métodos de banco real (implementar quando configurado)
  async saveUserToDatabase(userData) {
    // Implementar com Prisma/Neon quando configurado
    throw new Error('Database não configurado')
  }

  async findUserInDatabase(email) {
    // Implementar com Prisma/Neon quando configurado
    throw new Error('Database não configurado')
  }

  async saveDietPlanToDatabase(planData) {
    // Implementar com Prisma/Neon quando configurado
    throw new Error('Database não configurado')
  }

  async getUserDietPlansFromDatabase(userId) {
    // Implementar com Prisma/Neon quando configurado
    throw new Error('Database não configurado')
  }
}

// Instâncias globais
export const geminiService = new GeminiService()
export const databaseService = new DatabaseService()

// Hook para usar serviços
export function useServices() {
  const [geminiStatus, setGeminiStatus] = useState(geminiService.isConfigured)
  const [databaseStatus, setDatabaseStatus] = useState(databaseService.isConfigured)

  const updateStatus = () => {
    geminiService.init()
    databaseService.init()
    setGeminiStatus(geminiService.isConfigured)
    setDatabaseStatus(databaseService.isConfigured)
  }

  return {
    gemini: geminiService,
    database: databaseService,
    status: {
      gemini: geminiStatus,
      database: databaseStatus
    },
    updateStatus
  }
}

