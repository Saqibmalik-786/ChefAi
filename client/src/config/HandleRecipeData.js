import { supabase } from "./Supabaseclient";

const parseList = (value) => {
  if (Array.isArray(value)) {
    return value.filter((item) => item !== null && item !== undefined);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item) => item !== null && item !== undefined);
      }
    } catch (error) {
      // Ignore malformed JSON and fall back to newline splitting
    }

    return value
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeIngredient = (ingredient) => {
  if (typeof ingredient === 'string') {
    return {
      quantity: '',
      item: ingredient.trim()
    };
  }

  if (ingredient && typeof ingredient === 'object') {
    return {
      quantity: ingredient.quantity ?? ingredient.qty ?? ingredient.amount ?? '',
      item: ingredient.item ?? ingredient.name ?? ingredient.ingredient ?? ingredient.text ?? String(ingredient)
    };
  }

  return {
    quantity: '',
    item: String(ingredient ?? '')
  };
};

const normalizeInstruction = (instruction) => {
  if (typeof instruction === 'string') {
    return instruction.trim();
  }

  return String(instruction ?? '').trim();
};

export const normalizeRecipe = (recipe = {}) => ({
  ...recipe,
  id: recipe.id ?? recipe._id,
  title: recipe.title ?? recipe.name ?? 'Untitled Recipe',
  description: recipe.description ?? recipe.summary ?? recipe.notes ?? 'No description provided.',
  cooking_time: recipe.cooking_time ?? recipe.cook_time ?? recipe.time ?? 'N/A',
  servings: recipe.servings ?? recipe.portions ?? 'N/A',
  is_favorite: Boolean(recipe.is_favorite),
  ingredients: parseList(recipe.ingredients).map(normalizeIngredient),
  instructions: parseList(recipe.instructions).map(normalizeInstruction)
});

const getRecipes = async () => {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*');

    if (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }

    return (data ?? []).map(normalizeRecipe);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

const saveRecipe = async (recipe) => {
  try {
    const normalizedRecipe = normalizeRecipe(recipe);

    const { data, error } = await supabase
      .from('recipes')
      .insert([
        {
          title: normalizedRecipe.title,
          description: normalizedRecipe.description,
          ingredients: normalizedRecipe.ingredients,
          instructions: normalizedRecipe.instructions,
          cooking_time: normalizedRecipe.cooking_time,
          servings: normalizedRecipe.servings,
          is_favorite: normalizedRecipe.is_favorite
        }
      ]);

    if (error) {
      console.error('Error saving recipe:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error saving recipe:', error);
    return null;
  }
};

const getFavoriteRecipes = async () => {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('is_favorite', true);

    if (error) {
      console.error('Error fetching favorite recipes:', error);
      return [];
    }

    return (data ?? []).map(normalizeRecipe);
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    return [];
  }
};

const GetRecentRecipes = async () => {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching recent recipes:', error);
      return [];
    }

    return (data ?? []).map(normalizeRecipe);
  } catch (error) {
    console.error('Error fetching recent recipes:', error);
    return [];
  }
};

export { getRecipes, saveRecipe, getFavoriteRecipes, GetRecentRecipes };