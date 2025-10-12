import { RecipeList } from './components/RecipeList.jsx'
import { CreateRecipe } from './components/CreateRecipe.jsx'
import { RecipeFilter } from './components/RecipeFilter.jsx'
import { RecipeSorting } from './components/RecipeSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from './api/recipes.js'

import { useState } from 'react'

// Create the frontend of the application =====================================
export function Blog() {
  // Create the states ========================================================
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  // Create the recipes query =================================================
  const recipesQuery = useQuery({
    queryKey: ['recipes', { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }),
  })

  // Get the data from the query ==============================================
  const recipes = recipesQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <CreateRecipe />
      <br />
      <hr />
      <b>Filter by:</b>
      <RecipeFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <RecipeSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <RecipeList recipes={recipes} />
    </div>
  )
}

export default Blog
