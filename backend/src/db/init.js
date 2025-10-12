import mongoose from 'mongoose'

// Initialize the databae =====================================================
export function initDatabase() {
  const DATABASE_URL = 'mongodb://localhost:27017/recipes-blog'

  //const DATABASE_URL = process.env.DATABASE_URL

  mongoose.connection.on('open', () => {
    console.info('Successfully connected to the  database:', DATABASE_URL)
  })

  const connection = mongoose.connect(DATABASE_URL)

  return connection
}
