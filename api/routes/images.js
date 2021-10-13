import express from 'express'
import sharp from 'sharp'
import multer from 'multer'

import { Autorize, UploadToS3, Upload } from '../functions.js'
import Image from '../models/Image.js' //ESTRUTURA DAS IMAGENS NO DB

export default express.Router()
	.get("/", (req, res) => {
		Image.find()
			.then((data) => res.json(data))
			.catch((err) => res.json({ err }))
	})

	.get("/:id", (req, res) => {
		Image.find({ empreendimento: req.params.id })
			.select({ createdAt: false, updatedAt: false })
			.then((data) => res.json(data))
			.catch((err) => res.json({ err }))
	})

	.put("/:id", (req, res) => {
		Image.updateOne({ _id: req.params.id }, req.body)
			.then(() => res.sendStatus(202))
			.catch((err) => res.json({ err }))
	})

	.post("/", multer(Upload).single("image"), async (req, res) => {
		const _id = req.body._id

		if (_id != null && req.file.originalname != null) {
			const NewFile = path.resolve("tmp", "s3", req.file.filename)
			sharp(req.file.path)
				.jpeg({ quality: 50 })
				.resize(1080)
				.toFile(NewFile)
				.then((info) => {
					// MANDA O ARQUIVO PARA O S3
					UploadToS3(req.file.filename, NewFile).then((data) => {
						// EXCLUIR O ARQUIVO TEMPORÁRIO DEPOIS DE MOVER PRA PASTA
						fs.unlink(req.file.path, (err) => {
							if (err) throw err
						})
						fs.unlink(NewFile, (err) => {
							if (err) throw err
						})

						const Uploaded = {
							location: data,
							width: info.width,
							height: info.height
						}

						new Image(Uploaded).save().then((data) => res.json(data))
					})
				})
				.catch((err) => res.json({ err }))
		} else {
			res.json({ msg: "O usuário precisa ser setado." })
		}
	})

	.delete("/:id", (req, res) => {
		Image.findOneAndDelete({ _id: req.params.id })
			.then(() => res.json({ msg: "Imagem excluída." }))
			.catch((err) => res.json({ err }))
	})