import React, { createContext, useState, useEffect, useContext } from 'react'

// TIPAGEM DO USUARIO
export interface User {
	nome: string
	email: string
	logotipo: string
	endereco: {
		latitude: number
		longitude: number
	}
}

// TIPAGEM DAS ENTREGAS
export interface Entregas {
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

// TIPAGEM DO CONTEXTO
interface AuthContextTypes {
	token: string
	setToken: (token: string) => void
	user: User
	setUser: (user: User) => void
	entregasPendentes: Entregas[]
	setEntregasPendentes: (entrega: Entregas[]) => void
}

// CRIANDO O CONTEXTO
const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes)

const Index: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [token, setToken] = useState<string>(
		localStorage.getItem('token') || ''
	)
	const [user, setUser] = useState<User>(
		// @ts-ignore
		JSON.parse(localStorage.getItem('user')) || ({} as User)
	)
	const [entregasPendentes, setEntregasPendentes] = useState<Entregas[] | []>(
		[]
	)

	useEffect(() => {
		console.log('Montado o AuthContext.tsx')
	}, [])

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,
				user,
				setUser,
				entregasPendentes,
				setEntregasPendentes,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

// EXPORTANDO O CONTEXTO
export default Index

// EXPORTANDO O HOOK DO CONTEXTO
export const useAuth = (): AuthContextTypes => useContext(AuthContext)
