import { useContext,useEffect, useState} from 'react'
import {AuthContext} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import '../Pages/Dashboard.css'
import {
  Heart,
  Clock3,
  BookOpen,
  LogOut,
  Sparkles,
  Heading2
} from 'lucide-react'
const AiResponseComponent = () => {
    const navigate = useNavigate();
    const { user, signOut } = useContext(AuthContext);
    const [userInput, setUserInput] = useState('');
    const [recipeResponse, setRecipeResponse] = useState('');
    useEffect(() => {
  console.log("Dashboard user:", user);
}, [user]);
    const handleLogout = () => {
        signOut();
        navigate('/');
    };
    const handleGenerate = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: userInput })
        });

        if (!response.ok) {
      throw new Error(
        data.message ||
        'Failed to generate recipe'
      );
    }

        const data = await response.json();
        setRecipeResponse(data.recipe);
        console.log('AI recipe response:', data.recipe);
      } catch (error) {
        console.error('Error generating recipe:', error);
      }
    };
  return (
    <>
    <main className="dashboard-main">

        {/* Topbar */}

        <div className="dashboard-topbar">

          <div>
            <h1>
              Welcome Back 👋
            </h1>

            <p>
              What are you cooking today?
            </p>
          </div>

          <div className="topbar-right">

            <span className="user-email">
              {user ? user.email : 'User'}
            </span>

            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

        {/* AI Generate Box */}

        <div className="generate-box">

          <div className="generate-header">

            <Sparkles size={22} />

            <h2>
              Generate Recipe With AI
            </h2>

          </div>

          <div className="generate-input-wrapper">

            <input
              type="text"
              placeholder="Ask anything... like 'How to make chicken biryani?'"
              className="generate-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />

            <button className="generate-btn" onClick={handleGenerate}>
              Generate
            </button>

          </div>

        </div>

        {/* AI Response */}

        <div className="recipe-response">

          <h2>
            AI Recipe Response
          </h2>

          <div className="recipe-card ">

            {/* <pre>
              {recipeResponse || 'Your generated recipe will appear here...'}
            </pre> */}
            {recipeResponse ? (
              <>
             <h2>{recipeResponse.title}</h2>
              <p>{recipeResponse.description}</p>
              <h3>Ingredients:</h3>
              <ul>
                {recipeResponse.ingredients.map((ingredient, index) => (
                  <li key={index}>  
                    {ingredient.quantity} {ingredient.item}
                  </li>
                ))} 
              </ul>
              <h3>Instructions:</h3>
              <ol>
                {recipeResponse.instructions.map((instruction, index) => (  
                  <li key={index}>
                    {instruction}
                  </li>
                ))}
              </ol>
              <p>Cooking Time: {recipeResponse.cooking_time}</p>
              <p>Servings: {recipeResponse.servings}</p>

             </>
            ) : (
              <p>Your generated recipe will appear here...</p>
            )}
          </div>
          </div>

      
           
      </main>
    </>
  )
}

export default AiResponseComponent