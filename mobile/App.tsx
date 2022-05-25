import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './components/AuthContext'
import Routes from './Routes'

const App: React.FC = () => {
	return (
		<AuthProvider>
			<NavigationContainer>
				<Routes />
			</NavigationContainer>
		</AuthProvider>
	)
}

export default App
