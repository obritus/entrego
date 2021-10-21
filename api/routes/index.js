import express from 'express'
import { CheckPassword } from '../functions.js'

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default express.Router()
	.get("/", async (req, res) => {
		try {
			res.send('OK')
		} catch (error) {
			res.json({ error })
		}
	})