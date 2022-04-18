import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'

import api from './routes/index.js'
import avatars from './routes/avatars.js'
import logotipos from './routes/logotipos.js'
import entregadores from './routes/entregadores.js'
import clientes from './routes/clientes.js'
import login from './routes/login.js'
import entregas from './routes/entregas.js'

express()
	.use(morgan('dev'))
	.use(cors())
	.use(express.urlencoded({ extended: true }))
	.use(express.json())

	// ROTAS
	.use('/', api)
	.use('/avatars', avatars)
	.use('/entregadores', entregadores)
	.use('/clientes', clientes)
	.use('/login', login)
	.use('/entregas', entregas)

	.listen(process.env.PORT, () => {
		// BANCO DE DADOS
		mongoose.Promise = global.Promise
		mongoose.connect(
			process.env.MONGOOSE,
			{
				useNewUrlParser: true, useUnifiedTopology: true
			},
			() => console.log('--------- Conectado ao Banco de Dados ---------')
		)
	})