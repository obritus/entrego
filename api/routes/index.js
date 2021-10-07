import 'dotenv/config'
import express from 'express'
import crypto from 'crypto'
import multer from 'multer'
import aws from 'aws-sdk'
import sharp from 'sharp'
import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'

import Image from '../models/Image.js' //ESTRUTURA DAS IMAGENS NO DB
import Setting from '../models/Setting.js' //ESTRUTURA DAS CONFIGURAÇÕES NO DB

const autorize = (req, res, next) => {
	const AuthHeader = req.headers.authorization
	if (!AuthHeader)
		return res.status(401).json({ auth: false, msg: 'Não autorizado.' })

	const Token = req.headers.authorization.split(' ')[1]
	jwt.verify(Token, process.env.IMOB_SECRET,
		(err, decoded) => {
			if (err) return res.status(500)
				.json({ auth: false, msg: 'Falha na autorização' })

			req.user_id = decoded.user_id
			next()
		})
}

const UploadToS3 = async (fileName, filePath) => {
	const s3 = new aws.S3()
	const fileContent = fs.readFileSync(filePath)

	const params = {
		Bucket: process.env.IMOB_BUCKET_NAME,
		Key: fileName,
		Body: fileContent,
		ACL: 'public-read',
	}

	const data = await s3.upload(params).promise()
	return data.Location
}

const Storage = {
	local: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, upld.dest)
		},
		filename: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) cb(err)
				let extension = file.originalname.slice(-4)
				let filename = `${hash.toString('hex') + extension}`

				cb(null, filename)
			})
		}
	})
}

const upld = {
	dest: path.resolve('tmp'),
	storage: Storage.local,
	fileFilter: (req, file, cb) => {
		const allowedMimes = ['image/jpeg']
		if (allowedMimes.includes(file.mimetype)) {
			cb(null, true)
		} else {
			cb(new Error("Tipo de arquivo inválido"))
		}
	}
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default express.Router()
	.get("/", (req, res) => {
		res.sendStatus(200)
	})

	.get("/images", (req, res) => {
		Image.find()
			.then((data) => res.json(data))
			.catch((err) => res.json({ err }))
	})

	.get("/images/:id", (req, res) => {
		Image.find({ empreendimento: req.params.id })
			.select({ createdAt: false, updatedAt: false })
			.then((data) => res.json(data))
			.catch((err) => res.json({ err }))
	})

	.put("/images/:id", (req, res) => {
		Image.updateOne({ _id: req.params.id }, req.body)
			.then(() => res.sendStatus(202))
			.catch((err) => res.json({ err }))
	})

	.post("/images", multer(upld).single("image"), async (req, res) => {
		const _id = req.body._id

		if (_id != null && req.file.originalname != null) {
			const NewFile = path.resolve("tmp", "s3", req.file.filename)
			sharp(req.file.path)
				.jpeg({ quality: 50 })
				.resize(1366)
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
							height: info.height,
							empreendimento: _id,
						}

						new Image(Uploaded).save().then((data) => res.json(data))
					})
				})
				.catch((err) => res.json({ err }))
		} else {
			res.json({ msg: "O empreendimento precisa ser setado." })
		}
	})

	.delete("/images/:id", (req, res) => {
		Image.findOneAndDelete({ _id: req.params.id })
			.then(() => res.json({ msg: "Imagem excluída." }))
			.catch((err) => res.json({ err }))
	})

	// -----------------------------------------------------------------------------
	// -----------------------------------------------------------------------------

	.get("/settings", (req, res) => {
		Setting.findOne()
			.populate([
				{
					path: "default_banner",
					select: "title type price",
					populate: { path: "default_image", select: "location" },
				},
				{
					path: "destaques",
					select: "title type price cidade bairro",
					populate: [
						{ path: "default_image", select: "location" },
						{ path: "cidade", select: "name" },
						{ path: "bairro", select: "name" },
					],
				},
			])
			.then((data) => res.json(data))
			.catch((err) => {
				console.error(err)
				res.json({ erro: "1" })
			})
	})

	.post("/settings", (req, res) => {
		new Setting(req.body)
			.save()
			.then((data) => res.json({ msg: "Salvo.", data }))
			.catch((err) => res.json({ err }))
	})

	.put("/settings", (req, res) => {
		Setting.updateOne({}, req.body)
			.then((data) => res.json({ msg: "Alterações salvas.", data }))
			.catch((err) => res.json({ err }))
	})