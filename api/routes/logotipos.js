import 'dotenv/config'
import express from 'express'
import sharp from 'sharp'
import multer from 'multer'
import aws from "aws-sdk"
import { resolve } from 'path'
import { unlink } from 'fs'

import { Autorize, UploadToS3, Upload } from '../functions.js'
import Logotipo from '../models/Logotipo.js' //ESTRUTURA DOS AVATARES

const s3 = new aws.S3()

export default express.Router()
	.get("/", (req, res) => {
		Logotipo.find()
			.then((data) => res.json(data))
			.catch((err) => res.json({ err }))
	})

	.get('/:id', (req, res) => {
		Logotipo.find({ _id: req.params._id })
			.select({ createdAt: false, updatedAt: false })
			.then((data) => res.json(data))
			.catch((err) => res.json({ err }))
	})

	// -----------------------------------------------------------------------------------------------------------------
	// -----------------------------------------------------------------------------------------------------------------

	.post("/", multer(Upload).single("image"), async (req, res) => {
		const _id = req.body._id // ID DO USUARIO OU EMPRESA
		const type = req.body.type // MODELO DO USUARIO OU EMPRESA

		const ExcluirLogotipomEnviada = () => {
			// EXCLUIR O ARQUIVO TEMPORÁRIO DEPOIS DE MOVER PRA PASTA
			unlink(req.file.path, (err) => {
				if (err) throw err
			})
		}

		if (_id != null && req.file.originalname != null && type != null) {
			const NewFile = resolve("tmp", "s3", req.file.filename)
			sharp(req.file.path)
				.jpeg({ quality: 80 })
				.resize(512)
				.toFile(NewFile)
				.then((info) => {
					// MANDA O ARQUIVO PARA O S3
					UploadToS3(req.file.filename, NewFile).then((data) => {
						// EXCLUIR O ARQUIVO TEMPORÁRIO DEPOIS DE MOVER PRA PASTA
						ExcluirLogotipomEnviada()

						unlink(NewFile, (err) => {
							if (err) throw err
						})

						const Uploaded = {
							location: data,
							key: req.file.filename,
							width: info.width,
							height: info.height,
							user: _id,
							type: type // CLIENTE OU ENTREGADOR
						}

						console.log('Uploaded do images:', Uploaded)

						new Logotipo(Uploaded)
							.save()
							.then((data) => res.json(data))
							.catch(error => res.json({ error }))
					})
				})
				.catch((err) => {
					// EXCLUIR O ARQUIVO TEMPORÁRIO
					ExcluirLogotipomEnviada()
					console.error(err)
					res.json({ err })
				})
		} else {
			// EXCLUIR O ARQUIVO TEMPORÁRIO
			ExcluirLogotipomEnviada()

			res.json({ msg: "O usuário precisa ser setado." })
		}
	})

	// -----------------------------------------------------------------------------------------------------------------
	// -----------------------------------------------------------------------------------------------------------------

	.put("/:id", multer(Upload).single("image"), async (req, res) => {
		const _id = req.params.id

		const ExcluirLogotipomEnviada = () => {
			// EXCLUIR O ARQUIVO TEMPORÁRIO DEPOIS DE MOVER PRA PASTA
			unlink(req.file.path, (err) => {
				if (err) throw err
			})
		}

		if (_id != null && req.file.originalname != null) {
			const NewFile = resolve("tmp", "s3", req.file.filename)
			sharp(req.file.path)
				.jpeg({ quality: 80 })
				.resize(512)
				.toFile(NewFile)
				.then((info) => {
					// MANDA O ARQUIVO PARA O S3
					UploadToS3(req.file.filename, NewFile).then((data) => {
						// EXCLUIR O ARQUIVO TEMPORÁRIO DEPOIS DE MOVER PRA PASTA
						ExcluirLogotipomEnviada()

						unlink(NewFile, (err) => {
							if (err) throw err
						})

						const Uploaded = {
							location: data,
							key: req.file.filename,
							width: info.width,
							height: info.height,
						}

						Logotipo.updateOne({ _id }, Uploaded)
							.then((data) => res.json(data))
							.catch(error => res.json({ error }))
					})
				})
				.catch((err) => {
					// EXCLUIR O ARQUIVO TEMPORÁRIO
					ExcluirLogotipomEnviada()

					res.json({ err })
				})
		} else {
			// EXCLUIR O ARQUIVO TEMPORÁRIO
			ExcluirLogotipomEnviada()

			res.json({ msg: "A imagem precisa ser setada." })
		}
	})

	.delete("/:id", async (req, res) => {
		Logotipo
			.findOneAndDelete({ _id: req.params.id })
			.then(data => {
				s3.deleteObject({
					Bucket: process.env.BUCKET_NAME,
					Key: data.key
				}, (err, data) => {
					if (err) console.error(err, err.stack)
				})
			})
			.then(() => res.json({ msg: "Logotipom excluída." }))
			.catch((err) => res.json({ err }))
	})