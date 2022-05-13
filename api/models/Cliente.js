import mongoose from 'mongoose'

export default mongoose.model('clientes',
	new mongoose.Schema(
		{
			email: {
				type: String,
				required: true,
				unique: true,
				lowercase: true,
				trim: true,
			},
			senha: {
				type: String,
				required: true,
				select: false,
			},
			nome: {
				type: String,
				required: true,
				trim: true
			},
			telefone: {
				type: Number,
				required: true
			},
			endereco: {
				logradouro: {
					type: String,
					required: true,
					trim: true
				},
				longitude: { type: Number },
				latitude: { type: Number }
			},
			logotipo: {
				type: String,
				default: ''
			},
			region: {
				type: String,
			}
		},
		{ timestamps: true }
	))