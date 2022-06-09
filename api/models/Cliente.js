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
				type: String,
				required: true
			},
			endereco: {
				logradouro: {
					type: String,
					required: true,
					trim: true
				},
				latitude: { type: Number },
				longitude: { type: Number }
			},
			logotipo: {
				type: String,
				default: ''
			},
			region: {
				type: Number,
				required: true,
			}
		},
		{ timestamps: true }
	))