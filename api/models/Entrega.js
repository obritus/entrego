import mongoose from 'mongoose'

export default mongoose.model('entregas',
	new mongoose.Schema(
		{
			id: {
				type: String,
				required: true,
				unique: true
			},
			price: {
				type: Number,
				required: true
			},
			entregador: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'entregadores'
			},
			cliente: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'clientes'
			},
			contato: {
				nome: {
					type: String,
					required: true
				},
				telefone: {
					type: String,
				},
				endereco: {
					type: String,
					required: true
				},
				latitude: {
					type: Number,
					required: true
				},
				longitude: {
					type: Number,
					required: true
				},
				obs: {
					type: String,
				}
			},
			status: {
				type: Number,
				required: true,
				default: 0
			}
		},
		{ timestamps: true }
	))
