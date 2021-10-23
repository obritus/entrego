import express from 'express'
import { Autorize } from "../functions.js"

import Model from '../models/Entrega.js'

export default express.Router()
	.get('/', (req, res) => {
		res.json([])
	})

	.get('/:id/show', (req, res) => {
		res.sendStatus(200)
	})

	.get('/efetuadas', (req, res) => {
		res.send('Entregas efetuadas')
	})