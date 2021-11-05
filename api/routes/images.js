import 'dotenv/config'
import express from 'express'
import sharp from 'sharp'
import multer from 'multer'
import aws from "aws-sdk"
import { resolve } from 'path'
import { unlink } from 'fs'

import { Autorize, UploadToS3, Upload } from '../functions.js'
import Image from '../models/Image.js' //ESTRUTURA DAS IMAGENS NO DB

const s3 = new aws.S3()

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

	.post("/", multer(Upload).single("image"), async (req, res) => {
		const _id = req.body._id

		const ExcluirImagemEnviada = () => {
			// EXCLUIR O ARQUIVO TEMPORÁRIO DEPOIS DE MOVER PRA PASTA
			unlink(req.file.path, (err) => {
				if (err) throw err
			})
		}

		if (_id != null && req.file.originalname != null) {
			const NewFile = resolve("tmp", "s3", req.file.filename)
			sharp(req.file.path)
				.jpeg({ quality: 50 })
				.resize(1080)
				.toFile(NewFile)
				.then((info) => {
					// MANDA O ARQUIVO PARA O S3
					UploadToS3(req.file.filename, NewFile).then((data) => {
						// EXCLUIR O ARQUIVO TEMPORÁRIO DEPOIS DE MOVER PRA PASTA
						ExcluirImagemEnviada()

						unlink(NewFile, (err) => {
							if (err) throw err
						})

						const Uploaded = {
							location: data,
							key: req.file.filename,
							width: info.width,
							height: info.height,
							entregador: _id
						}

						new Image(Uploaded)
							.save()
							.then((data) => res.json(data))
							.catch(error => res.json({ error }))
					})
				})
				.catch((err) => {
					// EXCLUIR O ARQUIVO TEMPORÁRIO
					ExcluirImagemEnviada()

					res.json({ err })
				})
		} else {
			// EXCLUIR O ARQUIVO TEMPORÁRIO
			ExcluirImagemEnviada()

			res.json({ msg: "O usuário precisa ser setado." })
		}
	})

	.put("/:id", multer(Upload).single("image"), async (req, res) => {
		const _id = req.params.id

		const ExcluirImagemEnviada = () => {
			// EXCLUIR O ARQUIVO TEMPORÁRIO DEPOIS DE MOVER PRA PASTA
			unlink(req.file.path, (err) => {
				if (err) throw err
			})
		}

		if (_id != null && req.file.originalname != null) {
			const NewFile = resolve("tmp", "s3", req.file.filename)
			sharp(req.file.path)
				.jpeg({ quality: 50 })
				.resize(1080)
				.toFile(NewFile)
				.then((info) => {
					// MANDA O ARQUIVO PARA O S3
					UploadToS3(req.file.filename, NewFile).then((data) => {
						// EXCLUIR O ARQUIVO TEMPORÁRIO DEPOIS DE MOVER PRA PASTA
						ExcluirImagemEnviada()

						unlink(NewFile, (err) => {
							if (err) throw err
						})

						const Uploaded = {
							location: data,
							key: req.file.filename,
							width: info.width,
							height: info.height,
						}

						Image.updateOne({ _id }, Uploaded)
							.then((data) => res.json(data))
							.catch(error => res.json({ error }))
					})
				})
				.catch((err) => {
					// EXCLUIR O ARQUIVO TEMPORÁRIO
					ExcluirImagemEnviada()

					res.json({ err })
				})
		} else {
			// EXCLUIR O ARQUIVO TEMPORÁRIO
			ExcluirImagemEnviada()

			res.json({ msg: "A imagem precisa ser setada." })
		}
	})

	.delete("/:id", async (req, res) => {
		Image
			.findOneAndDelete({ _id: req.params.id })
			.then(data => {
				s3.deleteObject({
					Bucket: process.env.BUCKET_NAME,
					Key: data.key
				}, (err, data) => {
					if (err) console.error(err, err.stack)
				})
			})
			.then(() => res.json({ msg: "Imagem excluída." }))
			.catch((err) => res.json({ err }))
	})