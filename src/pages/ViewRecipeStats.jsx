import { Header } from '../components/Header.jsx'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function ViewRecipeStats() {
  const recipesStat = [
    {
      recipeId: 2,
      title: 'Post 1',
      author: 'Dave',
      ingredientList: 'Some Post 2\nnewline',
      totalLikes: 121,
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
    {
      recipeId: 3,
      title: 'Post 4',
      author: 'Ava',
      ingredientList: 'Yet Another Post3 ',
      totalLikes: 2,
    },
  ]

  // Remove bullets from posts ====================
  const listStyle = {
    listStyleType: 'none',
  }

  const [recipes, setPosts] = useState(recipesStat)

  const sortAscending = () => {
    const sortedPosts = [...recipes].sort((a, b) => a.totalLikes - b.totalLikes)
    setPosts(sortedPosts)
  }

  const sortDescending = () => {
    const sortedPosts = [...recipes].sort((a, b) => b.totalLikes - a.totalLikes)
    setPosts(sortedPosts)
  }

  return (
    <div
      style={{
        padding: 8,
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
      <button onClick={sortAscending}>Sort Likes Ascending</button> &nbsp;&nbsp;
      <button onClick={sortDescending}>Sort Likes Descending</button>
      <br />
      <br />
      <div
        style={{
          padding: 8,
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
              Title: {recipe.title}
              <br />
              Author: {recipe.author}
              <br />
              Ingredient List: <pre>{recipe.ingredientList}</pre>
              <br />
              Total Likes: {recipe.totalLikes}
              <br />
              <br /> Image of recipe:
              <br />
              <img
                src={recipe.imageURL}
                width='200'
                height='200'
                alt={recipe.title}
              />
              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
      <br />
    </div>
  )
}
