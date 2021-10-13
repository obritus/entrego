import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'

import api from './routes/index.js'
import images from './routes/images.js'
import usuarios from './routes/usuarios.js'
import clientes from './routes/clientes.js'

const porta = process.env.PORT || 3005
const mongodb_url = process.env.MONGOOSE

const app = express()

app
	// .use(morgan('dev'))
	.use(cors())
	.use(express.urlencoded({ extended: true }))
	.use(express.json())

	// ROTAS
	.use('/', api)
	.use('/images', images)
	.use('/usuarios', usuarios)
	.use('/clientes', clientes)

	.listen(porta, () => {
		// BANCO DE DADOS
		mongoose.Promise = global.Promise
		mongoose.connect(
			mongodb_url,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			() => console.log('--------- Conectado ao Banco de Dados ---------')
		)
	})
