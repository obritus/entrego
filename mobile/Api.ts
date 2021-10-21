import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NODE_ENV === 'development'
	? 'http://192.168.1.10:3005/'
	: `https://api-ux3p6ca4ia-rj.a.run.app/`
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
	GetEntrega: (_id: string) => api.get('entregas' + _id),
}

export default Api