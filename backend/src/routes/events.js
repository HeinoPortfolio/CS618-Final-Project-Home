import { trackEvent } from '../services/events.js'
import { getRecipeById } from '../services/recipes.js'

//  Create the route ==========================================================
export function eventRoutes(app) {
  app.post('/api/v1/events', async (req, res) => {
    try {
      const { recipeId, session, action } = req.body
      const post = await getRecipeById(recipeId)

      if (post === null) return res.status(400).end()

      const event = await trackEvent({ recipeId, session, action })

      return res.json({ session: event.session })
    } catch (err) {
      console.error('error tracking action', err)

      return res.status(500).end()
    }
  })
}
