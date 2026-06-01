import React, { useEffect, useState } from 'react'
import RecipeCard from './RecipeCard'
import { getRecipes } from '../config/HandleRecipeData'

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadRecipes = async () => {
      try {
        setLoading(true)
        const fetchedRecipes = await getRecipes()

        if (isMounted) {
          setRecipes(fetchedRecipes)
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load recipes. Please try again.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadRecipes()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return <div>Loading recipes...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (recipes.length === 0) {
    return <div>No recipes found.</div>
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id ?? recipe.title} recipe={recipe} />
      ))}
    </div>
  )
}

export default AllRecipes