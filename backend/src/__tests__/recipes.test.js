// There are currently 15 tests in this file ==================================
import mongoose from 'mongoose'
import { describe, expect, test, beforeEach, beforeAll } from '@jest/globals'
import {
  createRecipe,
  listAllRecipes,
  listRecipesByAuthor,
  listRecipesByTag,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from '../services/recipes.js'
import { Recipe } from '../db/models/recipe.js'
import { createUser } from '../services/users.js'

// Initialize the test use and the sample recipes =============================
let testUser = null
let sampleRecipes = []

// Before All to create the use and the sample recipes ========================
beforeAll(async () => {
  testUser = await createUser({ username: 'sample', password: 'user' })

  sampleRecipes = [
    {
      title: 'Sample Recipe 1',
      author: testUser._id,
      ingredientList: 'Some ingredients go here!!!!',
      imageURL: 'http://someUrl1.com',
      tags: ['beef'],
    },
    {
      title: 'Sample Recipe 2',
      author: testUser._id,
      ingredientList: 'Some ingredients go here again!!!!',
      imageURL: 'http://someUrl2.com',
      tags: ['onions', 'beef'],
    },
    {
      title: 'Sample Recipe 3',
      author: testUser._id,
      ingredientList: 'Some ingredients go here again with ingredients!!!!',
      imageURL: 'http://someUrl3.com',
      tags: ['fried'],
    },
  ]
})

// Before each  ===================================================================
// To be executed to create items for the database =================================
let createdSampleRecipes = []

beforeEach(async () => {
  await Recipe.deleteMany({})

  createdSampleRecipes = []

  for (const recipe of sampleRecipes) {
    const createdRecipe = new Recipe(recipe)

    createdSampleRecipes.push(await createdRecipe.save())
  }
})

// Tests for Recipe application ===============================================
// =============================================================================
describe('Creating recipes', () => {
  // Test for all the parameters set ============================================
  test('With all the parameters succeed', async () => {
    const recipe = {
      title: 'A Test Recipe',
      ingredientList: 'Some ingredients go here!!!!',
      imageURL: 'http://someUrl.com',
      tags: ['beef', 'onion'],
    }

    const createdRecipe = await createRecipe(testUser._id, recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundRecipe = await Recipe.findById(createdRecipe._id)
    expect(foundRecipe).toEqual(expect.objectContaining(recipe))
    expect(foundRecipe.createdAt).toBeInstanceOf(Date)
    expect(foundRecipe.updatedAt).toBeInstanceOf(Date)
  })

  // Test without the title information =====================================
  test('Without title should fail', async () => {
    const recipe = {
      ingredientList: 'Some additional ingredients go here!!!!',
      imageURL: 'http://someUrl.com',
      tags: ['empty'],
    }
    try {
      await createRecipe(testUser._id, recipe)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  // Test with minimum parameters ===========================================
  test('With minimal parameters should succeed', async () => {
    const recipe = {
      title: 'Only a simple title',
    }

    const createdRecipe = await createRecipe(testUser._id, recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

// Tests for listing recipes ==================================================
describe('Listing recipes', () => {
  test('Should return all recipes', async () => {
    const recipes = await listAllRecipes()
    expect(recipes.length).toEqual(createdSampleRecipes.length)
  })
  test('Should return all recipes sorted by creation date in descending order', async () => {
    const recipes = await listAllRecipes()
    const sortedSampleRecipes = createdSampleRecipes.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(recipes.map((recipe) => recipe.createdAt)).toEqual(
      sortedSampleRecipes.map((recipe) => recipe.createdAt),
    )
  })
  test('Should take into account the sorting options', async () => {
    const recipes = await listAllRecipes({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSampleRecipes = createdSampleRecipes.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(recipes.map((recipe) => recipe.updatedAt)).toEqual(
      sortedSampleRecipes.map((recipe) => recipe.updatedAt),
    )
  })
  test('Should be able to filter recipes by the author', async () => {
    const recipes = await listRecipesByAuthor(testUser.username)
    expect(recipes.length).toBe(3)
  })
  test('Should be able filter recipes by tag', async () => {
    const recipes = await listRecipesByTag('beef')
    expect(recipes.length).toBe(2)
  })
})

// Tests for getting a single recipe ==========================================
describe('Getting a post', () => {
  test('Should return the full recipe', async () => {
    const recipe = await getRecipeById(createdSampleRecipes[0]._id)
    expect(recipe.toObject()).toEqual(createdSampleRecipes[0].toObject())
  })
  test('Should fail if the id does not exist', async () => {
    const recipe = await getRecipeById('000000000000000000000000')
    expect(recipe).toEqual(null)
  })
})

// Tests for updating a recipe ================================================
describe('Updating recipes', () => {
  test('Should update the specified property', async () => {
    await updateRecipe(testUser._id, createdSampleRecipes[0]._id, {
      ingredientList: 'Updated ingredient list',
    })
    const updatedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    expect(updatedRecipe.ingredientList).toEqual('Updated ingredient list')
  })

  test('should not update other properties', async () => {
    await updateRecipe(testUser._id, createdSampleRecipes[0]._id, {
      ingredientList: 'Updated ingredient list',
    })
    const updatedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    expect(updatedRecipe.title).toEqual('Sample Recipe 1')
  })

  test('should update the updatedAt timestamp', async () => {
    await updateRecipe(testUser._id, createdSampleRecipes[0]._id, {
      ingredientList: 'Updated ingredient list',
    })
    const updatedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    expect(updatedRecipe.updatedAt.getTime()).toBeGreaterThan(
      createdSampleRecipes[0].updatedAt.getTime(),
    )
  })

  test('should fail if the id does not exist', async () => {
    const recipe = await updateRecipe(
      testUser._id,
      '000000000000000000000000',
      {
        ingredientList: 'Updated ingredient list',
      },
    )
    expect(recipe).toEqual(null)
  })
})

// Tests for deleting a recipe ================================================
describe('Deleting recipe', () => {
  test('Should remove the recipe from the database', async () => {
    const result = await deleteRecipe(testUser._id, createdSampleRecipes[0]._id)
    expect(result.deletedCount).toEqual(1)

    const deletedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    expect(deletedRecipe).toEqual(null)
  })

  test('Should fail if the id does not exist', async () => {
    const result = await deleteRecipe('000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
})
