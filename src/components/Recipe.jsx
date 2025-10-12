import PropTypes from 'prop-types'

// Recipe component ===========================================================
export function Recipe({ title, author, ingredientList, imageURL }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>
        <pre>{ingredientList}</pre>
      </div>
      {author && (
        <em>
          Written by: <strong>{author}</strong>
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
