import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Recipe } from './Recipe.jsx'

// Recipe list component - to list all the recipes in the database ============
export function RecipeList({ recipes = [] }) {
  return (
    <div>
      <h2>Click on one of the recipes below to see more information.</h2>
      <hr />
      {recipes.map((recipe) => (
        <Fragment key={recipe._id}>
          <Recipe {...recipe} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(Recipe.propTypes)).isRequired,
}
