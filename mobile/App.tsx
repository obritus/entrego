import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './components/AuthContext'
import { ThemeProvider, Tema } from './Styles'
import Routes from './Routes'

const App: React.FC = () => {
	return (
		<ThemeProvider theme={Tema}>
			<AuthProvider>
				<NavigationContainer>
					<Routes />
				</NavigationContainer>
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
