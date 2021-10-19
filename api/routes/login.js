import 'dotenv/config'
import express from 'express'

export default express.Router()
	.post('/', (req, res) => {
		res.json({ auth: true, token: 'abcDEF123' })
	})