import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'
import { CheckPassword } from '../functions.js'

import Entregador from '../models/Entregador.js'
import Cliente from '../models/Cliente.js'

export default express.Router()
	.post('/', async (req, res) => {
		const email = req.body.email
		const senha = req.body.senha
		const keep = req.body.keep

		// ESCOLHER QUAL MODEL USAR:
		const Model = req.body.model === 'cliente' ? Cliente : Entregador

		// VERIFICAR SE FOI INFORMADO O EMAIL E SENHA:
		if (!email || !senha) {
			return res.status(400).json({
				error: 'Email e senha são obrigatórios'
			})
		}

		// FAZ A BUSCA NO BANCO DE DADOS:
		const User = await Model
			.aggregate()
			.lookup({
				from: 'images',
				localField: '_id',
				foreignField: req.query.model === 'cliente' ? 'cliente' : 'entregador',
				as: req.query.model === 'cliente' ? 'logotipo' : 'avatar',
			})
			.match({ email })
			//REMOVER ARRAY DO AVATAR, RESULTADO ÚNICO
			.unwind({ path: '$avatar', preserveNullAndEmptyArrays: true })

		if (User[0]) {
			if (await CheckPassword(senha, User[0].senha)) {
				const token = jwt.sign({ user_id: User[0]._id },
					process.env.SECRET, {
					expiresIn: keep ? '1y' : '1d'
				})
				delete User[0].senha
				res.json({ auth: true, token, user: User[0] })
			} else {
				res.json({ auth: false, msg: 'Senha incorreta.' })
			}
		} else {
			res.json({ auth: false, msg: 'Usuário não cadastrado.' })
		}
	})

	.post('/logout', (req, res) => {
		res.json({ auth: false })
	})