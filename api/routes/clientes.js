import express from 'express'
import { GeneratePassword } from '../functions.js'
import Model from '../models/Cliente.js'

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default express.Router()
	.get('/', async (req, res) => {
		try {
			const Data = await Model.find({})
			res.json(Data)
		} catch (error) {
			console.error(error)
			res.json({ error })
		}
	})

	// -------------------------------------------------------------------------

	.get('/:id', async (req, res) => {
		try {
			const Data = await Model.findOne({ _id: req.params.id })

			res.json(Data)
		} catch (error) {
			console.error(error)
			res.json({ error })
		}
	})

	// -------------------------------------------------------------------------

	.put('/:id', async (req, res) => {
		try {
			if (req.body.senha) {
				req.body.senha = await GeneratePassword(req.body.senha)
			}
			const data = req.body
			const Data = await Model.updateOne({ _id: req.params.id }, data)

			res.json(Data)
		} catch (error) {
			console.error(error)
			res.json({ error })
		}
	})

	// -------------------------------------------------------------------------

	.delete('/:id', async (req, res) => {
		try {
			const Data = await Model.deleteOne({ _id: req.params.id })

			res.json(Data)
		} catch (error) {
			console.error(error)
			res.json({ error })
		}
	})

	// -------------------------------------------------------------------------

	.post('/', async (req, res) => {
		req.body.senha = await GeneratePassword(req.body.senha)

		new Model(req.body)
			.save()
			.then(data => {
				res.json(data)
			})
			.catch(error => {
				res.json({ error })
			})
	})