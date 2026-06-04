import dotenv from 'dotenv'
dotenv.config() // Load environment variables from .env file FIRST before other imports

import express from 'express'
import cors from 'cors'
import recipeRoutes from './routes/geminiRoutes.js'

app.use(cors({
  origin: process.env.FRONTEND_URL,   // allow only your Vercel frontend
  credentials: true       // if you’re using cookies/auth
}));

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/recipe', recipeRoutes)

app.get('/', (_req, res) => {
	res.json({ status: 'ok', message: 'ChefAI server' })
})

const server = app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on http://localhost:${PORT}`)
})

server.on('error', (error) => {
	if (error.code === 'EADDRINUSE') {
		console.error(`Port ${PORT} is already in use. Stop the existing server or choose a different PORT.`)
		process.exit(1)
	}
	throw error
})
