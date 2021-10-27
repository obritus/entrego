import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:3005/'
})

const Api = {
	login: data => api.post('login', data),
}

export default Api