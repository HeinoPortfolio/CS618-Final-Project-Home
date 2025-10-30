import { Blog } from './pages/Blog.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { useLoaderData } from 'react-router-dom'
import { getRecipeById, getRecipes } from './api/recipes.js'
import { getUserInfo } from './api/users.js'
import { ViewRecipe } from './pages/ViewRecipe.jsx'
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'

import { ViewRecipeStats } from './pages/ViewRecipeStats.jsx'

export const routes = [
  {
    path: '/',
    loader: async () => {
      const queryClient = new QueryClient()
      const author = ''
      const sortBy = 'createdAt'
      const sortOrder = 'descending'
      const recipes = await getRecipes({ author, sortBy, sortOrder })
      await queryClient.prefetchQuery({
        queryKey: ['recipes', { author, sortBy, sortOrder }],
        queryFn: () => recipes,
      })
      const uniqueAuthors = recipes
        .map((post) => post.author)
        .filter((value, index, array) => array.indexOf(value) === index)
      for (const userId of uniqueAuthors) {
        await queryClient.prefetchQuery({
          queryKey: ['users', userId],
          queryFn: () => getUserInfo(userId),
        })
      }
      return dehydrate(queryClient)
    },
    Component() {
      const dehydratedState = useLoaderData()
      return (
        <HydrationBoundary state={dehydratedState}>
          <Blog />
        </HydrationBoundary>
      )
    },
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  // Recipe stats path ====
  { path: '/ViewRecipeStats', element: <ViewRecipeStats /> },
  {
    path: '/recipes/:recipeId/:slug?',
    loader: async ({ params }) => {
      const recipeId = params.recipeId
      const queryClient = new QueryClient()
      const recipe = await getRecipeById(recipeId)

      await queryClient.prefetchQuery({
        queryKey: ['recipe', recipeId],
        queryFn: () => getUserInfo(recipe.author),
      })
      if (recipe?.author) {
        await queryClient.prefetchQuery({
          queryKey: ['users', recipe.author],
          queryFn: () => getUserInfo(recipe.author),
        })
      }
      return { dehydratedState: dehydrate(queryClient), recipeId }
    },
    Component() {
      const { dehydratedState, recipeId } = useLoaderData()

      return (
        <HydrationBoundary state={dehydratedState}>
          <ViewRecipe recipeId={recipeId} />
        </HydrationBoundary>
      )
    },
  },
]
