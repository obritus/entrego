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

// TIPAGEM DO CONTEXTO
interface AuthContextTypes {
	token: string
	setToken: (token: string) => void
	user: User
	setUser: (user: User) => void
}

// CRIANDO O CONTEXTO
const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes)

const Index: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [token, setToken] = useState<string>('')
	const [user, setUser] = useState<User>({} as User)

	useEffect(() => {
		return () => {}
	}, [])

	return (
		<AuthContext.Provider value={{ token, setToken, user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

// EXPORTANDO O CONTEXTO
export default Index

// EXPORTANDO O HOOK DO CONTEXTO
export const useAuth = (): AuthContextTypes => useContext(AuthContext)
