import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NODE_ENV === 'development'
		? 'http://localhost:3005/'
		: process.env.REACT_APP_API_URL,
})

const Api = {
	login: data => api.post('login?model=cliente', data),
	logout: () => api.post('logout'),
}

export default Api