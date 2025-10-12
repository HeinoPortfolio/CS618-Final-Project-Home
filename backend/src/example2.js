import { initDatabase } from './db/init.js'
import { Recipe } from './db/models/recipe.js'

import dotenv from 'dotenv'
dotenv.config()

// Initialize the database =======================
await initDatabase()

// Create a sample recipe and save the recipe to the database =================
const recipe = new Recipe({
  title: 'Another simple recipe',
  author: 'Archie Heino',
  ingredientList: 'This is another a simple recipe. \n With a new line.',
  imageURL: 'http://someurl.com',
  tags: ['chocolate', 'pudding'],
})

// Save the recipe to the database ============================================
await recipe.save()

// Display the recipes to the console =========================================
const recipes = await Recipe.find()

// Console output =============================
console.log(recipes)
