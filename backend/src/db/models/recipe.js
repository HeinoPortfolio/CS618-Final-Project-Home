// Model for the recipe for the final project========================
import mongoose, { Schema } from 'mongoose'

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    ingredientList: String,
    imageURL: String,
    tags: [String],
  },
  { timestamps: true },
)

export const Recipe = mongoose.model('recipe', recipeSchema)
