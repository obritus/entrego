import mongoose from 'mongoose'

const Image = new mongoose.Schema(
	{
		location: { type: String, required: true, unique: true },
		key: { type: String, required: true, unique: true },
		width: { type: Number },
		height: { type: Number },
	},
	{ timestamps: true }
)

export default mongoose.model('images', Image)