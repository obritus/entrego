import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NODE_ENV === 'development'
	? 'http://localhost:3005/'
	: `http://34.95.150.227:3005/`
})

// api.interceptors.request.use(async (config:any) => {
// 	const token = sessionStorage.getItem('token')
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`
// 	}
// 	return config
// })

const Api = {
	Login: (data: {}) => api.post('login', data),
	Logout: (data: {}) => api.post('logout', data),
	
	GetUsuario: (_id:string) => api.get(`usuarios/${_id}`),
	GetEntregas: () => api.get('entregas'),
}

export default Api