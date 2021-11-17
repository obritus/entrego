import React, { useEffect, useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface User {
	_id: string | ''
	nome: string | ''
	email: string | ''
	cpf: number | 0
	creditos: number | 0
	avatar: {
		location: string | ''
	}
	entregas: number | 0
}

interface AuthContext {
	auth: boolean | false
	user: User
	setAuth: (auth: boolean) => void
	setUser: (user: User) => void
	logOut: () => void
	setLoading: (auth: boolean) => void
	loading: boolean
}

const AuthContext = createContext<AuthContext>({} as AuthContext)

const InitialState: User = {
	_id: '',
	nome: '',
	email: '',
	cpf: 0,
	creditos: 0,
	avatar: {
		location: '',
	},
	entregas: 0,
}

export const AuthProvider: React.FC = ({ children }) => {
	const [auth, setAuth] = useState(false)
	const [user, setUser] = useState<User>(InitialState)
	const [loading, setLoading] = useState(true)

	const logOut = async () => {
		try {
			await AsyncStorage.clear()
			setAuth(false)
			setUser(InitialState)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		AsyncStorage.getItem('user')
			.then((user: string | null) => {
				setLoading(false)
				const Parseado = user && JSON.parse(user)
				if (Parseado) {
					setAuth(true)
					setUser(Parseado)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	return (
		<AuthContext.Provider
			value={{
				auth,
				user,
				setAuth,
				setUser,
				logOut,
				loading,
				setLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = (): AuthContext => {
	const context = React.useContext(AuthContext)
	return context
}
