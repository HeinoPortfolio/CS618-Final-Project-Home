import { initDatabase } from './db/init.js'
import dotenv from 'dotenv'
dotenv.config()

import { app } from './app.js'

const PORT = process.env.PORT
await initDatabase()

app.listen(PORT)

console.info(`Express server running on http://localhost:${PORT}`)
