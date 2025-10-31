import { RecipeList } from '../components/RecipeList.jsx'
import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeFilter } from '../components/RecipeFilter.jsx'
import { RecipeSorting } from '../components/RecipeSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'
import { useState } from 'react'
import { Header } from '../components/Header.jsx'
import { Helmet } from 'react-helmet-async'

import { useNavigate } from 'react-router-dom'

// Create the frontend of the application =====================================
export function Blog() {
  // Create the states ========================================================
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  // Button states ============================================================
  const [likeStatText] = useState('Click Here To View Recipe Like Statistics')

  // Create a navigate to page
  const navigate = useNavigate()

  // Function to handle the button click ===========
  const handleLikeClick = () => {
    // Go to the recipe statistics page
    navigate('/ViewRecipeStats')
  }

  // Create the recipes query =================================================
  const recipesQuery = useQuery({
    queryKey: ['recipes', { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }),
  })

  // Get the data from the query ==============================================
  const recipes = recipesQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>The Recipe Blog</title>
      </Helmet>
      <Header />
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
      <br />
      <br />
      <button onClick={handleLikeClick}> {likeStatText}</button>
      <br />
      <hr />
      <div
        style={{
          maxHeight: '600px',
          maxWidth: '800px',
          overflowY: 'scroll',
          overflowX: 'scroll',
          border: '3px solid #ccc',
          padding: '50px',
        }}
      >
        <RecipeList recipes={recipes} />
      </div>
    </div>
  )
}
