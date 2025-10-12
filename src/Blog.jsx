import { RecipeList } from './components/RecipeList.jsx'
import { CreateRecipe } from './components/CreateRecipe.jsx'
import { RecipeFilter } from './components/RecipeFilter.jsx'
import { RecipeSorting } from './components/RecipeSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from './api/recipes.js'

// Create the frontend of the application =====================================
export function Blog() {
  const recipesQuery = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  })

  // Get the data from the query ==============================================
  const recipes = recipesQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <CreateRecipe />
      <br />
      <hr />
      <b>Filter by:</b>
      <RecipeFilter field='author' />
      <br />
      <RecipeSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <RecipeList recipes={recipes} />
    </div>
  )
}

export default Blog
