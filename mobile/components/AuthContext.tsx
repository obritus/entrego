import React from 'react'
import { createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthContext {
	logged: boolean | false
	user: {}
	setLogged: (logged: boolean) => void
	setUser: (user: string) => void
}

const AuthContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider: React.FC = ({ children }) => {
	const [logged, setLogged] = React.useState(false)
	const [user, setUser] = React.useState({})

	AsyncStorage.getItem('user')
		.then((user) => {
			if (user) {
				setLogged(true)
			}
		})
		.catch((err) => {
			console.log(err)
		})

	return (
		<AuthContext.Provider
			value={{
				logged,
				user,
				setLogged,
				setUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
