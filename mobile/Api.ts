import axios from 'axios'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const api = axios.create({
	baseURL: process.env.NODE_ENV === 'development'
	? 'http://192.168.1.75:3005/'
	: `https://api-ux3p6ca4ia-rj.a.run.app/`
})

api.interceptors.request.use(async (config:any) => {
	const token = useAsyncStorage('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

interface Login {
	email: string
	senha: string
}

const Api = {
	Login: (data: Login) => api.post('login', data),
	Logout: (data: {}) => api.post('logout', data),
	
	GetEntregador: (_id:string) => api.get(`entregadores/${_id}`),
	GetEntregas: (query?: {}) => api.get('entregas', { params: query }),
	GetEntrega: (_id: string) => api.get('entregas' + _id),
}

export default Api