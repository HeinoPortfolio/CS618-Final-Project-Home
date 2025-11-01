import { Header } from '../components/Header.jsx'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useState /* useEffect */ } from 'react'

import { getLikesInfo } from '../api/events.js'
import { useQuery } from '@tanstack/react-query'
import { User } from '../components/User.jsx'

export function ViewRecipeStats() {
  /*const recipesStat = [
    {
      recipeId: 3,
      title: 'Post 4',
      author: 'Ava',
      ingredientList: 'Yet Another Post3 ',
      totalLikes: 2,
      imageURL:
        'https://github.com/HeinoPortfolio/images/blob/main/peach-cobbler.jpg?raw=false',
    },
    {
      recipeId: 2,
      title: 'Post 1',
      author: 'Dave',
      ingredientList: 'Some Post 2\nnewline',
      totalLikes: 121,
      imageURL:
        'https://github.com/HeinoPortfolio/images/blob/main/fried-chicken.jpg?raw=false',
    },
    {
      recipeId: 1,
      title: 'Post 2',
      author: 'Clark',
      ingredientList: 'Some Post',
      totalLikes: 6,
    },
    {
      recipeId: 12,
      title: 'Post 3',
      author: 'Matt',
      ingredientList: 'Another Post',
      totalLikes: 5,
    },
  ]
    */

  // Remove bullets from posts ====================
  const listStyle = {
    listStyleType: 'none',
  }

  const recipeInfoQuery = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getLikesInfo(),
  })

  const recipesStat = recipeInfoQuery.data ?? []

  // States for the sorting ===================================================
  const [recipes, setPosts] = useState(recipesStat)

  const sortAscending = () => {
    const sortedPosts = [...recipes].sort((a, b) => a.totalLikes - b.totalLikes)
    setPosts(sortedPosts)
  }

  const sortDescending = () => {
    const sortedPosts = [...recipes].sort((a, b) => b.totalLikes - a.totalLikes)
    setPosts(sortedPosts)
  }
  if (recipeInfoQuery.isLoading) {
    return <div>Loading recipe stats...</div>
  }
  return (
    <div
      style={{
        padding: 8,
        fontSize: 22,
      }}
    >
      <Helmet>
        <title>The Recipe Blog Recipe Stats</title>
      </Helmet>
      <Header />
      <hr />
      <Link to='/'>Back to main page</Link>
      <br />
      <br />
      <hr />
      <h1>The Ranked Recipe List </h1>
      <h2>Sort The Recipes By Number Of Likes</h2>
      <button onClick={sortAscending}>Sort By Least Liked</button> &nbsp;&nbsp;
      <button onClick={sortDescending}>Sort By Most Liked</button>
      <br />
      <br />
      <div
        style={{
          padding: 12,
          maxHeight: '500px',
          maxWidth: '1000px',
          overflowY: 'scroll',
          overflowX: 'scroll',
          border: '3px solid #ccc',
        }}
      >
        <ul style={listStyle}>
          {recipes.map((recipe) => (
            <li key={recipe.recipeId}>
              <b>Title:</b> {recipe.title}
              <br />
              <b>Author:</b> <User id={recipe.author} />
              <br />
              <b>Ingredient List:</b> <pre>{recipe.ingredientList}</pre>
              <b>Total Likes:</b> {recipe.totalLikes}
              <br />
              <br /> Image of recipe:
              <br />
              <br />
              <img
                src={recipe.imageURL}
                width='200'
                height='200'
                alt={recipe.title}
              />
              <br />
              <br />
              <hr />
            </li>
          ))}
        </ul>
      </div>
      <br />
    </div>
  )
}
