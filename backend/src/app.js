// Express setup file =========================================================
import express from 'express'
//import { recipesRoutes } from './routes/recipes.js'
//import { userRoutes } from './routes/users.js'
//import bodyParser from 'body-parser'
//import cors from 'cors'

const app = express()
//app.use(bodyParser.json())
//app.use(cors())

//recipesRoutes(app)

// User route ========================
//userRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express Live!  Using Nodemon')
})

// Export the app so it can be used in other files ====
export { app }
