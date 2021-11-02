import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NODE_ENV === 'development'
		? 'http://localhost:3005/'
		: `https://api-ux3p6ca4ia-rj.a.run.app/`
})

const Api = {
	login: data => api.post('login?model=cliente', data),
	logout: () => api.post('logout'),
}

export default Api