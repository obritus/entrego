import 'dotenv/config'
import { verify } from 'jsonwebtoken'

const autorize = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1]
	if (!token)
		return res.status(401).json({ auth: false, msg: 'Não autorizado.' })

	return verify(token, process.env.SECRET, (err, decoded) => {
		if (err)
			return res.status(500).json({ auth: false, msg: 'Falha na autorização' })

		req.userId = decoded.id
		return next()
	})
}

export default autorize
