import mongoose from 'mongoose'

export default mongoose.model('clientes', new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		name: { type: String },
		empresa: { type: String },
		telefone: { type: Number },
		address: { type: Object }
	},
	{ timestamps: true }
))