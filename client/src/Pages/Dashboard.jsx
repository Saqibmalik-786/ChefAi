// 
// Dashboard.jsx
import { useContext,useEffect, useState} from 'react'
import AiResponseComponent from '../components/AiResponseComponent'
import AllRecipes from '../components/AllRecipes'
import Favorites from '../components/Favorites'
import './Dashboard.css'
import {
  Heart,
  Clock3,
  BookOpen,
  LogOut,
  Sparkles
} from 'lucide-react'

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('AiResponseComponent');

  return (
    <section className="dashboard">

      {/* Sidebar */}

      <aside className="sidebar">

        <div className="sidebar-top">

          <h2 className="logo">
            ChefAI
          </h2>

          <p className="sidebar-text">
            Smart AI Recipe Generator
          </p>

        </div>

        <nav className="sidebar-links">

          <button className="nav-item active" onClick={() => setActiveTab('AiResponseComponent')}>
            <Sparkles size={20} />
            AI Recipe Generator
          </button>

          <button className="nav-item " onClick={() => setActiveTab('AllRecipes')}>
            <BookOpen size={20} />
            All Recipes
          </button>

          <button className="nav-item" onClick={() => setActiveTab('Favorites')}>
            <Heart size={20} />
            Favorite Recipes
          </button>

          <button className="nav-item" onClick={() => setActiveTab('RecentRecipes')}>
            <Clock3 size={20} />
            Recent Recipes
          </button>

        </nav>

      </aside>

      {/* Main Content Area */}

      <main className="main-content">

        {activeTab === 'AiResponseComponent' && <AiResponseComponent />}

        {activeTab === 'AllRecipes' && <AllRecipes />}

        {activeTab === 'Favorites' && <Favorites />}

      </main>

    </section>
  )
}

export default Dashboard