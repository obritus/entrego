import express from 'express'
import { Autorize } from "../functions.js"

import Model from '../models/Entrega.js'

export default express.Router()
	.get('/', (req, res) => {
		const active = req.query.active

		res.json([{
			"title": "Empresa A",
			"latitude": -21.572084,
			"longitude": -45.417926,
			"price": 6
		},
		{
			"title": "Empresa B",
			"latitude": -21.57429,
			"longitude": -45.42319,
			"price": 7
		},
		{
			"title": "Empresa Nova",
			"latitude": -21.55962,
			"longitude": -45.41973,
			"price": 5
		},
		{
			"title": "Empresa Fulana",
			"latitude": -21.55715,
			"longitude": -45.43719,
			"price": 6
		}
		])
	})

	.get('/:id/show', (req, res) => {
		res.sendStatus(200)
	})

	.get('/efetuadas', (req, res) => {
		res.send('Entregas efetuadas')
	})