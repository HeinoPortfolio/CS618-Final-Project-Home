//import { Recipe } from './components/Recipe.jsx'
import { RecipeList } from './components/RecipeList.jsx'

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

function App() {
  return <RecipeList recipes={recipes} />
}

export default App
