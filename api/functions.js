import 'dotenv/config'
import crypto from 'crypto'
import multer from 'multer'
import aws from 'aws-sdk'
import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'

export const autorize = (req, res, next) => {
	const AuthHeader = req.headers.authorization
	if (!AuthHeader)
		return res.status(401).json({ auth: false, msg: 'Não autorizado.' })

	const Token = req.headers.authorization.split(' ')[1]
	jwt.verify(Token, process.env.SECRET,
		(err, decoded) => {
			if (err) return res.status(500)
				.json({ auth: false, msg: 'Falha na autorização' })

			req.user_id = decoded.user_id
			next()
		})
}

export const UploadToS3 = async (fileName, filePath) => {
	const s3 = new aws.S3()
	const fileContent = fs.readFileSync(filePath)

	const params = {
		Bucket: process.env.BUCKET_NAME,
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

export const Upload = {
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