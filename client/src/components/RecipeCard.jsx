
import './RecipeCard.css'
import {
  Heart,
  Clock3,
  Users
} from 'lucide-react'

const RecipeCard = ({
  recipe = {},
  onFavoriteToggle
}) => {
  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : []

  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : []

  const getIngredientText = (ingredient) => {
    if (typeof ingredient === 'string') {
      return ingredient
    }

    return ingredient.item ?? ingredient.name ?? ingredient.ingredient ?? ingredient.text ?? String(ingredient)
  }

  const getInstructionText = (step) => {
    if (typeof step === 'string') {
      return step
    }

    return step.text ?? step.step ?? step.instruction ?? String(step)
  }

  return (
    <div className="recipe-card">

      <div className="recipe-card-top">

        <h2 className="recipe-title">
          {recipe.title || 'Untitled Recipe'}
        </h2>

        <button
          className={`favorite-btn ${
            recipe.is_favorite
              ? 'active'
              : ''
          }`}
          onClick={() => onFavoriteToggle?.(recipe.id)}
        >

          <Heart size={20} />

        </button>

      </div>

      <p className="recipe-description">
        {recipe.description || 'No description provided.'}
      </p>

      <div className="recipe-meta">

        <div className="meta-item">

          <Clock3 size={16} />

          <span>
            {recipe.cooking_time || 'N/A'}
          </span>

        </div>

        <div className="meta-item">

          <Users size={16} />

          <span>
            {recipe.servings || 'N/A'}
          </span>

        </div>

      </div>

      <div className="recipe-section">

        <h3>
          Ingredients
        </h3>

        <ul className="ingredients-list">
          {ingredients.length > 0 ? ingredients.map((ingredient, index) => {
            const quantity = typeof ingredient === 'object'
              ? ingredient.quantity ?? ingredient.qty ?? ingredient.amount ?? ''
              : ''
            const itemText = getIngredientText(ingredient)

            return (
              <li key={`${itemText}-${index}`}>
                {quantity ? (
                  <span>{quantity}</span>
                ) : null}
                {quantity ? ' ' : ''}
                {itemText}
              </li>
            )
          }) : (
            <li>No ingredients listed.</li>
          )}
        </ul>

      </div>

      <div className="recipe-section">

        <h3>
          Instructions
        </h3>

        <ol className="instructions-list">
          {instructions.length > 0 ? instructions.map((step, index) => {
            const stepText = getInstructionText(step)

            return (
              <li key={`${stepText}-${index}`}>
                {stepText}
              </li>
            )
          }) : (
            <li>No instructions listed.</li>
          )}
        </ol>

      </div>

    </div>
  )
}

export default RecipeCard
