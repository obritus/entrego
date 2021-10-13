import mongoose from 'mongoose'

export default mongoose.model('images', new mongoose.Schema(
	{
		location: { type: String, required: true, unique: true },
		key: { type: String, required: true, unique: true },
		width: { type: Number },
		height: { type: Number },
		usuario: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "usuarios",
		},
	},
	{ timestamps: true }
))