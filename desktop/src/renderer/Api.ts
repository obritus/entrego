import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NODE_ENV === 'development'
	? 'http://localhost:3005/'
	: `http://34.95.150.227:3005/`
})

api.interceptors.request.use(async (config:any) => {
	const token = sessionStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

const Api =  {
	GetClientes: () => api.get(`/clientes`),
	GetCliente: (_id:string) => api.get(`/clientes/${_id}`),
	AddCliente: (data:object) => api.post(`/clientes`, data),
	EditCliente: (data: { _id:string }) => api.put(`/clientes/${data._id}`, data),
	DeleteCliente: (_id:string) => api.delete(`/clientes/${_id}`),

	AddUsuario: (data:object) => api.post(`/usuarios`, data),
	GetUsuarios: (query:string) => api.get(`/usuarios${query && query}`),
	EditUsuario: (data: {_id:string}) => api.put(`/usuarios/${data._id}`, data),
	DeleteUsuario: (_id:string) => api.delete(`/usuarios/${_id}`),

	Login: (data:object) => api.post('/login', data),
	Logout: (data:object) => api.post('/logout', data),
}

export default Api