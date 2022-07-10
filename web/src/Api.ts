import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NODE_ENV === 'development'
	? 'http://192.168.1.75:3005/'
	: `https://api-ux3p6ca4ia-rj.a.run.app/`
})

api.interceptors.request.use(async (config:any) => {
	const token = ''
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

interface Login {
	email: string
	senha: string
	keep?: boolean
	model: 'cliente'
}

const Api = {
	Login: (data: Login) => api.post('login', data),
	Logout: (data: {}) => api.post('logout', data)
}

export default Api