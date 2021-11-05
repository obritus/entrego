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
		const Model = req.query.model === 'cliente' ? Cliente : Entregador

		// VERIFICAR SE FOI INFORMADO O EMAIL E SENHA:
		if (!email || !senha) {
			return res.status(400).json({
				error: 'Email e senha são obrigatórios'
			})
		}

		// FAZ A BUSCA NO BANCO DE DADOS:
		const User = await Model.findOne({ email })
			.select('_id email senha')

		if (User) {
			if (await CheckPassword(senha, User.senha)) {
				const token = jwt.sign({ user_id: User._id }, process.env.SECRET, {
					expiresIn: keep ? '1y' : '1d'
				})
				const _id = User._id
				const nome = User.nome
				res.json({ auth: true, token, _id, nome })
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