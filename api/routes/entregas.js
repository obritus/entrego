import express from 'express'
import Clerobee from 'clerobee'
import { Autorize } from '../functions.js'

import Model from '../models/Entrega.js'

export default express.Router()
	.get('/', async (req, res) => {
		const active = req.query.active

		try {
			const Data = await Model
				.aggregate()
				.lookup({
					from: 'clientes',
					localField: '_id',
					foreignField: 'cliente',
				})
				.unwind({ path: '$cliente', preserveNullAndEmptyArrays: true })

			res.json(Data)
		} catch (error) {
			res.status(500).json(error)
		}

		// res.json([{
		// 	"id": "ENT2125",
		// 	"price": 6,
		// 	"cliente": {
		// 		"nome": "Carlinhos Hamburger",
		// 		"logotipo": "https://files.menudino.com/cardapios/605/logo.png",
		// 		"latitude": -21.572084,
		// 		"longitude": -45.417926,
		// 	},
		// 	"contato": {
		// 		"nome": "Pedrinho da Silva",
		// 		"telefone": 35998484545,
		// 		"latidude": -21.574,
		// 		"longitude": -45.417,
		// 		"endereco": "R. Estevam Biscaro, 659 - Jardim Sion"
		// 	},
		// 	"status": 0
		// },
		// {
		// 	"id": "ENT2126",
		// 	"price": 7,
		// 	"cliente": {
		// 		"nome": "Supermercado",
		// 		"logotipo": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/orange-and-green-grocery-logo-design-template-1985f1c821ec6fad47c5e6c1eb6a0f06_screen.jpg?ts=1602233368",
		// 		"latitude": -21.57429,
		// 		"longitude": -45.42319,
		// 	},
		// 	"contato": {
		// 		"nome": "",
		// 		"telefone": 35998484545,
		// 		"latidude": -21.574,
		// 		"longitude": -45.417,
		// 		"endereco": "R. Estevam Biscaro, 659 - Jardim Sion"
		// 	},
		// 	"status": 0
		// },
		// {
		// 	"id": "ENT2127",
		// 	"price": 5,
		// 	"cliente": {
		// 		"nome": "Varetão Materiais de Construção",
		// 		"logotipo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZdJiaVdvJR5YOZ9xraGLhiMqMNdswsL1Tg&usqp=CAU",
		// 		"latitude": -21.55962,
		// 		"longitude": -45.41973,
		// 	},
		// 	"contato": {
		// 		"nome": "Fernanda Fernandes",
		// 		"telefone": 35998484545,
		// 		"latidude": -21.5530664750116,
		// 		"longitude": -45.446286038271424,
		// 		"endereco": "Av. Plínio Salgado, 359-353 - Bom Pastor"
		// 	},
		// 	"status": 0
		// },
		// {
		// 	"id": "ENT2128",
		// 	"price": 6,
		// 	"cliente": {
		// 		"nome": "Damasio Motopeças",
		// 		"logotipo": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fdamasiomotopeca%2F&psig=AOvVaw3IVotIxBgFTrr-pYcTHQS5&ust=1636493251977000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCMjAlsraifQCFQAAAAAdAAAAABAP",
		// 		"latitude": -21.55715,
		// 		"longitude": -45.43719,
		// 	},
		// 	"contato": {
		// 		"nome": "José de Jesus",
		// 		"telefone": 35998484545,
		// 		"latidude": -21.574,
		// 		"longitude": -45.417,
		// 		"endereco": "R. Estevam Biscaro, 659 - Jardim Sion"
		// 	},
		// 	"status": 0
		// },
		// {
		// 	"id": "ENT2129",
		// 	"price": 6,
		// 	"cliente": {
		// 		"nome": "Supermercado da Esquina",
		// 		"logotipo": "https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2011%2F09%2F22%2F13%2FWDL-Logo-7184_11970_041315965_357422259.jpg",
		// 		"latitude": -21.53417351619092,
		// 		"longitude": -45.455719569985135,
		// 	},
		// 	"contato": {
		// 		"nome": "Geraldinho Maroto",
		// 		"telefone": 35998484545,
		// 		"latidude": -21.563562831230875,
		// 		"longitude": -45.42629654445493,
		// 		"endereco": "R. Francisco Pereira Crespo, 151 - Jardim Renata"
		// 	},
		// 	"status": 0
		// }
		// ])
	})

	// ADICIONAR ENTREGA
	.post('/', (req, res) => {
		try {
			const UniqueId = new Clerobee(10)
			req.body.id = 'ENT' + UniqueId.generate().toUpperCase()
			req.body.status = 1
			req.body.price = parseFloat(req.body.price)
			req.body.contato.latitude = parseFloat(req.body.contato.latitude)
			req.body.contato.longitude = parseFloat(req.body.contato.longitude)
			req.body.contato.endereco = req.body.contato.endereco.toUpperCase()

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
			const Data = await Model.updateOne(req.params.id, req.body)
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