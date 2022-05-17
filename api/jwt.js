import 'dotenv/config'
import { verify } from 'jsonwebtoken'

export default (req, res, next) => {
	// PEGA O TOKEN
	const token = req.headers.authorization.split(' ')[1]
	if (!token)
		return res.status(401).json({ auth: false, msg: 'Não autorizado.' })

	// VERIFICA O TOKEN
	return verify(token, process.env.SECRET, (err, decoded) => {
		if (err)
			return res.status(500).json({ auth: false, msg: 'Falha na autorização' })

		req.userId = decoded.id
		return next()
	})
}

