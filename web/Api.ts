import axios from 'axios'

interface Login {
	email: string
	password: string
}

const api = axios.create({
	baseURL: process.env.NODE_ENV === 'development'
		? 'http://localhost:3005/'
		: process.env.REACT_APP_API_URL,
})

const Api = {
	login: (data: Login) => api.post('login?model=cliente', data),
	logout: () => api.post('logout'),
}

export default Api