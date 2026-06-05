import express from 'express'
import { generateRecipe } from '../controllers/aiServiceController.js'

const router = express.Router()

// POST /api/recipe
router.post('/', generateRecipe)

export default router
