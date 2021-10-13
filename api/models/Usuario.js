import mongoose from 'mongoose'

export default mongoose.model('usuarios', new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		name: { type: String, required: true },
		cpf: { type: Number, unique: true },
		credits: { type: Number }
	},
	{ timestamps: true }
))