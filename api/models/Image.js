import mongoose from 'mongoose'

const Image = new mongoose.Schema(
	{
		location: { type: String, required: true, unique: true },
		key: { type: String, required: true, unique: true },
		width: { type: Number, required: true },
		height: { type: Number, required: true },
		entregador: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'entregadores',
			trim: true,
			unique: true,
			required: false,
		},
		cliente: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'clientes',
			trim: true,
			unique: true,
			required: false,
		},
	},
	{ timestamps: true }
)

export default mongoose.model('images', Image)