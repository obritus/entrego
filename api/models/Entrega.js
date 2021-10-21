import mongoose from 'mongoose'

export default mongoose.model('entregas',
	new mongoose.Schema(
		{
			usuario: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'usuarios'
			},
			cliente: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'clientes'
			},
			endereco: {
				longitude: {
					type: Number,
					required: true
				},
				latitude: {
					type: Number,
					required: true
				},
			},
			nome: { type: String },
			obs: { type: String },
			estado: {
				type: Number,
				required: true,
				default: 0
			}
		},
		{ timestamps: true }
	))