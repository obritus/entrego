import express from 'express'
import { Autorize } from "../functions"

import Model from '../models/Entrega'

export default express.Router()
	.get('/', Autorize, (req, res) => {
		res.json({})
	})

	.get('/:id/show', (req, res) => {
		res.sendStatus(200)
	})

	.get('/efetuadas', (req, res) => {
		res.send('Entregas efetuadas')
	})