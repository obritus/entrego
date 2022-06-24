import express from 'express'
import Clerobee from 'clerobee'
import { Autorize } from '../functions.js'

import Model from '../models/Entrega.js'

export default express.Router()
	.get('/', async (req, res) => {
		const status = req.query.status
		const Find = status ? { status } : {}
		const Limit = req.query.limit && parseInt(req.query.limit)

		// { 'cliente.endereco.latitude': { $gt: -21.555575, $lt: -21.553675 } }
		try {
			const Data = await Model
				.find({ 'endereco.latitude': { $lte: -21.555575, $gte: -21.553675 } })
				.limit(Limit)
				.populate('cliente')

			res.json(Data)
		} catch (error) {
			res.status(500).json(error)
		}
	})

	// ADICIONAR ENTREGA
	.post('/', (req, res) => {
		try {
			const UniqueId = new Clerobee(10) // Gerar ID único
			req.body.id = 'ENT' + UniqueId.generate().toUpperCase()
			req.body.status = 0
			req.body.price = parseFloat(req.body.price)
			req.body.contato.latitude = parseFloat(req.body.contato.latitude)
			req.body.contato.longitude = parseFloat(req.body.contato.longitude)

			new Model(req.body).save()
				.then(data => res.json(data))
				.catch(err => res.json(err))
		} catch (error) {
			res.status(400).json({ error: error.message })
		}
	})

	// ATUALIZAR ENTREGA
	.patch('/:id', async (req, res) => {
		try {
			const Data = await Model.updateOne({ _id: req.params.id }, req.body)
			res.json(Data)
		}
		catch (error) {
			res.status(400).json({ error: error.message })
		}
	})

	// VER ENTREGA
	.get('/:id/show', (req, res) => {
		res.sendStatus(200)
	})

	.get('/efetuadas', (req, res) => {
		res.send('Entregas efetuadas: 10')
	})

	.delete('/:id', async (req, res) => {
		try {
			const _id = req.params.id
			const Data = await Model.deleteOne({ _id })

			res.status(200).json(Data)
		} catch (error) {
			console.error(error)

			res.status().json(error)
		}
	})