import { useState } from 'react'
import './Hero.css'

function Hero() {
  const [prompt, setPrompt] = useState('')

  const handleGenerate = () => {
    // Demo button - doesn't do anything
    console.log('This is a demo button')
  }

  const handleInputChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleKeyPress = (e) => {
    // Demo - do nothing on Enter
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <section className="hero" id="home">
      <div className="hero-center">
        <h1 className="hero-title">ChefAI</h1>
        <p className="hero-subtitle">Your AI-Powered Chef</p>
        <p className="hero-description">
          Create amazing recipes with the power of AI. Get personalized cooking suggestions, 
          expert tips, and culinary inspiration at your fingertips.
        </p>
        
        <div className="demo-section">
          <div className="demo-input-wrapper">
            <input
              type="text"
              className="demo-input"
              placeholder="Try: 'Create a healthy pasta recipe with garlic and olive oil'"
              value={prompt}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="generate-btn"
              onClick={handleGenerate}
            >
              ✨ Generate
            </button>
          </div>
          <p className="demo-hint">💡 Tip: Be specific with ingredients and dietary preferences</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
