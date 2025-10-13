import PropTypes from 'prop-types'
import { User } from './User.jsx'

// Recipe component ===========================================================
export function Recipe({ title, author: userId, ingredientList, imageURL }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>
        <pre>{ingredientList}</pre>
      </div>
      {userId && (
        <em>
          Written by: &nbsp;
          <strong>
            <User id={userId} />
          </strong>
        </em>
      )}
      <div>
        <br />
        Image of recipe: {imageURL}
        <br />
        <br />
      </div>
    </article>
  )
} // end Recipe

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredientList: PropTypes.string,
  author: PropTypes.string,
  imageURL: PropTypes.string,
}
