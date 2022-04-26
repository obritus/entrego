import React from 'react'
import { StatusBar, StatusBarProps } from 'react-native'
import { NavigationContainer, useIsFocused } from '@react-navigation/native'
import { AuthProvider } from './components/AuthContext'
import Routes from './Routes'
import Tema from './Styles'

export const BarraDeStatus = (props: StatusBarProps) => {
	const isFocused = useIsFocused()
	return isFocused ? <StatusBar {...props} /> : null
}
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
