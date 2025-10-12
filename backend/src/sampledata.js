import { initDatabase } from './db/init.js'
import { Recipe } from './db/models/recipe.js'
import dotenv from 'dotenv'

dotenv.config()
await initDatabase()

const recipe = new Recipe({
  title: 'Chocolate Pudding',
  author: 'Julia Childs',
  ingredientList: '1/2 lb. of sugar \n1/4 chocolate powder \n1 tsp. of butter ',
  imageURL: 'http://someUrl1.com',
  tags: ['chocolate', 'pudding'],
})

await recipe.save()

const recipe2 = new Recipe({
  title: 'Fried Chicken',
  author: 'Vera Lynn',
  ingredientList:
    '1lb. of chicken thighs \n1/4 bread crumbs \n1 tsp. of butter',
  imageURL: 'http://someUrl2.com',
  tags: ['chicken', 'fried'],
})

await recipe2.save()

const recipe3 = new Recipe({
  title: 'Some Other Recipe',
  author: 'Steve Jones',
  ingredientList: '1lb. of beef cubes \n1/2 onion \n1 tsp. of butter',
  imageURL: 'http://someUrl3.com',
  tags: ['beef', 'onion', 'butter'],
})
await recipe3.save()

const recipe4 = new Recipe({
  title: 'Some Other Recipe Part 2',
  author: 'Rick Jones',
  ingredientList: '1lb. of beef cubes \n1/2 onion \n1 tsp. of broth',
  imageURL: 'http://someUrl4.com',
  tags: ['chocolate', 'butter', 'broth'],
})

await recipe4.save()

const recipes = await Recipe.find()

console.log(recipes)
