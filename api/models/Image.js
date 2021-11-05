import mongoose from 'mongoose'

const Image = new mongoose.Schema(
	{
		location: { type: String, required: true, unique: true },
		key: { type: String, required: true, unique: true },
		width: { type: Number },
		height: { type: Number },
		entregador: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "entregadores",
		},
	},
	{ timestamps: true }
)

export default mongoose.model('images', Image)