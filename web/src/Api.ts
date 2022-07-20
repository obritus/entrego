import axios from 'axios'

const api = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development'
			? 'http://192.168.1.75:3005/'
			: process.env.REACT_APP_API,
})

api.interceptors.request.use(async (config: any) => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

interface Login {
	email: string
	senha: string
	keep?: boolean
}

const Api = {
	Login: (data: Login) => api.post('login/cliente', data),
	Logout: (data: {}) => api.post('logout', data),
	GetEnregas: (data: {}) => api.get('entregas'),
}

export default Api
