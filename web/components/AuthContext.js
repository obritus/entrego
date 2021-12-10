import React, { useContext } from 'react'
import { setCookie, parseCookies } from 'nookies'

const AuthContext = React.createContext({})
const Provider = AuthContext.Provider

const AuthProvider = ({ children }) => {
	const [user, setUser] = React.useState(null)
	const [isAuthenticated, setIsAuthenticated] = React.useState(false)

	const handleLogin = (user) => {
		setUser(user)
		setCookie(undefined, 'entrego.token', user, {
			maxAge: 30 * 24 * 60 * 60,
		})
	}

	React.useEffect(() => {
		const cookies = parseCookies()
		const user = cookies.user
		if (user) {
			setUser(user)
		}
	}, [])

	return (
		<Provider value={{
			isAuthenticated: !!user,
			user: {
				id: '123',
				name: 'John Doe',
				email: ''
			},
			login: (email, password) => {
				setCookie(null, 'auth', {
					email,
					password
				})
			}
		}}>
			{children}
		</Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider