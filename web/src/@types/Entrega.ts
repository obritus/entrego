export interface Entrega {
	_id: string
	price: number
	cliente: {
		_id: string
		nome: string | ''
		logotipo: string | ''
		telefone: string
		endereco: {
			latitude: number
			longitude: number
			logradouro: string
		}
	}
	contato: {
		nome: string
		telefone: string
		latitude: number
		longitude: number
		endereco: string
		obs?: string
	}
	status: number
}