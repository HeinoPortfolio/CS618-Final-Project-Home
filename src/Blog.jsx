import { RecipeList } from './components/RecipeList.jsx'
import { CreateRecipe } from './components/CreateRecipe.jsx'
import { RecipeFilter } from './components/RecipeFilter.jsx'
import { RecipeSorting } from './components/RecipeSorting.jsx'

// Create some test recipes =============================================

const recipes = [
  {
    title: 'This is a test recipe title',
    ingredientList: 'Some ingredients go here. \nSome others go here.',
    author: 'Matthew Heino',
    imageURL: 'http://someUrl1.com',
  },
  {
    title: 'This is another test recipe title',
    ingredientList: 'Some other ingredients go here. \nMore go here.',
    author: 'Claudia Heino',
    imageURL: 'http://someUrl1.com',
  },
]

// Create the frontend of the application =====================================
export function Blog() {
  //return <RecipeList recipes={recipes} />
  //return <CreateRecipe />
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
