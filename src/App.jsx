import React from 'react'

// ===============================================
// APP NUTRIAI - VERSÃO FINAL GARANTIDA
// CSS EMBUTIDO DIRETAMENTE NOS COMPONENTES
// ===============================================

function App() {
  // Estilos inline diretos - GARANTIDO que funciona
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 50%, #faf5ff 100%)',
      minHeight: '100vh'
    },
    navbar: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0 16px'
    },
    navContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    },
    navBrand: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none',
      color: '#111827',
      fontSize: '20px',
      fontWeight: 'bold'
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px'
    },
    navLink: {
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      textDecoration: 'none',
      transition: 'all 0.2s ease'
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px 16px'
    },
    hero: {
      textAlign: 'center',
      marginBottom: '64px'
    },
    heroTitle: {
      fontSize: '48px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '16px'
    },
    heroSubtitle: {
      fontSize: '20px',
      color: '#6b7280',
      marginBottom: '32px',
      maxWidth: '600px',
      margin: '0 auto 32px'
    },
    buttonContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '16px',
      marginBottom: '64px'
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      color: 'white',
      padding: '16px 32px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: '600',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'transform 0.2s ease'
    },
    btnSecondary: {
      background: 'white',
      color: '#374151',
      padding: '16px 32px',
      borderRadius: '12px',
      border: '2px solid #e5e7eb',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: '600',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.2s ease'
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '32px',
      marginBottom: '64px'
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'center'
    },
    featureIcon: {
      fontSize: '48px',
      marginBottom: '16px',
      display: 'block'
    },
    featureTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '12px'
    },
    featureText: {
      color: '#6b7280'
    },
    statusCard: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '64px'
    },
    statusTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '24px',
      textAlign: 'center'
    },
    statusGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px'
    },
    statusItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%)'
    },
    statusDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      marginRight: '12px'
    },
    statusSuccess: {
      background: '#22c55e'
    },
    statusWarning: {
      background: '#eab308'
    },
    statusInfo: {
      background: '#3b82f6'
    },
    congratsBox: {
      marginTop: '24px',
      padding: '16px',
      background: 'linear-gradient(135deg, #dcfce7 0%, #dbeafe 100%)',
      borderRadius: '12px',
      textAlign: 'center'
    }
  }

  // Aplicar estilos ao body
  React.useEffect(() => {
    Object.assign(document.body.style, styles.body)
    return () => {
      // Cleanup se necessário
    }
  }, [])

  return (
    <div>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <a href="/" style={styles.navBrand}>
            <span style={{ fontSize: '24px' }}>🥗</span>
            <span>NutriAI</span>
          </a>

          <div style={styles.navLinks}>
            <a href="/" style={styles.navLink}>🏠 Início</a>
            <a href="/dashboard" style={styles.navLink}>📊 Dashboard</a>
            <a href="/chat" style={styles.navLink}>💬 Chat IA</a>
            <a href="/planos" style={styles.navLink}>🍽️ Planos</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="/login" style={styles.navLink}>Entrar</a>
            <a 
              href="/register" 
              style={{
                ...styles.btnPrimary,
                padding: '8px 16px',
                fontSize: '14px'
              }}
            >
              Cadastrar
            </a>
          </div>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <div style={styles.container}>
        {/* HERO SECTION */}
        <div style={styles.hero}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🥗</div>
          <h1 style={styles.heroTitle}>NutriAI</h1>
          <p style={styles.heroSubtitle}>
            Seu assistente inteligente para uma alimentação saudável e personalizada. 
            Planos alimentares criados por IA, adaptados ao seu estilo de vida brasileiro.
          </p>
          
          <div style={styles.buttonContainer}>
            <a href="/dashboard" style={styles.btnPrimary}>
              🚀 Começar Agora
            </a>
            <a href="/chat" style={styles.btnSecondary}>
              💬 Chat com IA
            </a>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🤖</span>
            <h3 style={styles.featureTitle}>IA Avançada</h3>
            <p style={styles.featureText}>
              Powered by Google Gemini, nossa IA cria planos alimentares personalizados 
              baseados em suas necessidades e preferências.
            </p>
          </div>

          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🇧🇷</span>
            <h3 style={styles.featureTitle}>100% Brasileiro</h3>
            <p style={styles.featureText}>
              Receitas e ingredientes adaptados ao paladar e disponibilidade 
              do mercado brasileiro. Preços reais dos supermercados.
            </p>
          </div>

          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>💰</span>
            <h3 style={styles.featureTitle}>Economia Real</h3>
            <p style={styles.featureText}>
              96% mais barato que soluções similares. Tecnologia de ponta 
              com custos acessíveis para todos.
            </p>
          </div>
        </div>

        {/* STATUS SECTION */}
        <div style={styles.statusCard}>
          <h2 style={styles.statusTitle}>
            🔧 Status do Sistema
          </h2>
          
          <div style={styles.statusGrid}>
            <div style={styles.statusItem}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ ...styles.statusDot, ...styles.statusSuccess }}></div>
                <span style={{ fontWeight: '500', color: '#374151' }}>Aplicação</span>
              </div>
              <span style={{ color: '#22c55e', fontWeight: '600' }}>
                ✅ Online
              </span>
            </div>

            <div style={styles.statusItem}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ ...styles.statusDot, ...styles.statusWarning }}></div>
                <span style={{ fontWeight: '500', color: '#374151' }}>IA Gemini</span>
              </div>
              <span style={{ color: '#eab308', fontWeight: '600' }}>
                ⚙️ Configurar
              </span>
            </div>

            <div style={styles.statusItem}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ ...styles.statusDot, ...styles.statusInfo }}></div>
                <span style={{ fontWeight: '500', color: '#374151' }}>Banco de Dados</span>
              </div>
              <span style={{ color: '#3b82f6', fontWeight: '600' }}>
                💾 Local Storage
              </span>
            </div>
          </div>

          <div style={styles.congratsBox}>
            <p style={{ color: '#374151', margin: 0 }}>
              <strong>🎉 Parabéns!</strong> Seu NutriAI está funcionando perfeitamente. 
              Configure as APIs para desbloquear todas as funcionalidades.
            </p>
          </div>
        </div>

        {/* CTA FINAL */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            Pronto para transformar sua alimentação?
          </h2>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px' }}>
            Junte-se a milhares de brasileiros que já melhoraram sua saúde com o NutriAI
          </p>
          <a href="/dashboard" style={styles.btnPrimary}>
            🥗 Começar Minha Jornada
          </a>
        </div>
      </div>
    </div>
  )
}

export default App

