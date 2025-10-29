// Express setup file =========================================================
import express from 'express'
import { recipesRoutes } from './routes/recipes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { userRoutes } from './routes/users.js'

import { eventRoutes } from './routes/events.js'

const app = express()
app.use(bodyParser.json())
app.use(cors())

// Recipe routes ==============================================================
recipesRoutes(app)

// User routes ================================================================
userRoutes(app)

// Event routes ===============================================================
eventRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express Live!  Using Nodemon!!')
})

// Export the app so it can be used in other files ====
export { app }
