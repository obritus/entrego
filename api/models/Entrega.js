import mongoose from 'mongoose'

export default mongoose.model('entregas', new mongoose.Schema(
	{
		usuario: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'usuarios' },
		cliente: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'clientes' },
		longitude: { type: Number, required: true },
		latitude: { type: Number, required: true },
		nome: { type: String },
		obs: { type: String },
	},
	{ timestamps: true }
))