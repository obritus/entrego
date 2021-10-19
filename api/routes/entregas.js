import express from 'express'
import { Autorize } from "../functions"

import Model from '../models/Entrega'

export default express.Router()
	.get('/', Autorize, (req, res) => {
		res.json({})
	})

	.get('/:id', (req, res) => {
		res.sendStatus(200)
	})