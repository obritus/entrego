import mongoose from 'mongoose'

export default mongoose.model('entregadores',
	new mongoose.Schema(
		{
			email: {
				type: String,
				required: true,
				unique: true
			},
			senha: {
				type: String,
				required: true,
				select: false
			},
			nome: {
				type: String,
				required: true
			},
			cpf: {
				type: Number,
				unique: true
			},
			cnh: {
				type: Number,
				unique: true
			},
			creditos: {
				type: Number,
				required: true,
				default: 0
			}
		},
		{ timestamps: true }
	))