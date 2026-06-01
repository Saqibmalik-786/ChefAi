// FeaturesSection.jsx
import './Features.css'
import { Sparkles, Bookmark, ShieldCheck} from 'lucide-react'
const Features = () => {
  return (
    <section className="features-section">
      <div className="features-header">
        <h2>Why Choose ChefAI?</h2>
        <p>
          Smart AI recipes, secure accounts, and your favorite meals saved
          forever.
        </p>
      </div>

      <div className="features-container">

        {/* Card 1 */}
        <div className="feature-card">
          <div className="icon-box">
            <Sparkles size={42} />
          </div>

          <h3>AI Recipe Generator</h3>

          <p>
            Ask ChefAI anything like
            <span> “How to make Chicken Biryani?” </span>
            and get detailed recipes with ingredients, quantities,
            and step-by-step cooking instructions instantly.
          </p>
        </div>

        {/* Card 2 */}
        <div className="feature-card">
          <div className="icon-box">
            <Bookmark size={42} />
          </div>

          <h3>Save Recipes</h3>

          <p>
            Save your favorite recipes securely to your account and
            access them anytime from your dashboard with recent and
            favorite recipe management.
          </p>
        </div>

        {/* Card 3 */}
        <div className="feature-card">
          <div className="icon-box">
            <ShieldCheck size={42} />
          </div>

          <h3>Secure Google Login</h3>

          <p>
            Fast and secure authentication using Google Sign-In powered
            by Supabase authentication for a smooth and reliable user experience.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Features