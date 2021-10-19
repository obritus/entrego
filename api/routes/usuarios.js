import express from 'express'
import mongoose from 'mongoose'
import { GeneratePassword } from '../functions.js'
import Model from '../models/Usuario.js'

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default express.Router()
	.get('/', async (req, res) => {
		try {
			const Data = await Model
				.aggregate()
				.lookup({
					from: "images",
					localField: "_id",
					foreignField: "usuario",
					as: "avatar",
				})
				.unwind({ path: '$avatar', preserveNullAndEmptyArrays: true })


			res.json(Data)
		} catch (error) {
			console.error(error)
			res.json({ error })
		}
	})

	// -------------------------------------------------------------------------

	.get('/:id', async (req, res) => {
		try {
			const Data = await Model
				.aggregate()
				.lookup({
					from: "images",
					localField: "_id",
					foreignField: "usuario",
					as: "avatar",
				})
				.match({ _id: mongoose.Types.ObjectId(req.params.id) })
				//REMOVER ARRAY DO AVATAR, RESULTADO ÚNICO
				.unwind({ path: '$avatar', preserveNullAndEmptyArrays: true })

			res.json(Data[0])
		} catch (error) {
			console.error(error)
			res.json({ error })
		}
	})

	// -------------------------------------------------------------------------

	.put('/:id', async (req, res) => {
		try {
			if (req.body.password) {
				req.body.password = await GeneratePassword(req.body.password)
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
		req.body.password = await GeneratePassword(req.body.password)
		new Model(req.body)
			.save()
			.then(data => {
				res.json(data)
			})
			.catch(error => {
				res.json({ error })
			})
	})