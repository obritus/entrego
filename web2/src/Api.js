import axios from 'axios'
const api = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}` })

const Api = {
	GetImages: _id => api.get('/images/' + _id),
	CreateImage: data => api.post('/images/', data),
	DeleteImage: _id => api.delete('/images/' + _id),

	GetSettings: () => api.get('/settings'),
	EditSettings: data => api.put('/settings', data),

	GetUsuarios: () => api.get('/usuarios/'),
	GetUsuario: _id => api.get('/usuarios/' + _id),
	AddUsuario: _id => api.post('/usuarios/' + _id),
	EditUsuario: _id => api.put('/usuarios/' + _id),
	DeleteUsuario: _id => api.delete('/usuarios/' + _id),

	Login: data => api.post('/login', data)
}

export default Api