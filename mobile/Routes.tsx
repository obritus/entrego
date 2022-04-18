import React from 'react'
import {
	View,
	Text,
	Image,
	SafeAreaView,
	ActivityIndicator,
	StyleSheet,
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Tema from './Styles'
import { useAuth } from './components/AuthContext'

import Home from './screens/Home'
import Entregas from './screens/Entregas'
import Perfil from './screens/Perfil'
import Senha from './screens/Senha'
import Login from './screens/Login'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const s = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Tema.colors.primary,
	},
})

interface Props {}

const Routes: React.FC<Props> = () => {
	const { auth, loading } = useAuth()

	if (loading) {
		return (
			<SafeAreaView style={s.container}>
				<ActivityIndicator size='large' color={Tema.colors.primary} />
			</SafeAreaView>
		)
	}

	// SE ESTIVER LOGADO
	if (auth) {
		return (
			<Stack.Navigator screenOptions={{}} initialRouteName='Home'>
				<Stack.Screen
					name='Mapa'
					component={Home}
					options={{ header: () => false }}
				/>

				<Stack.Screen
					name='Entregas'
					component={Entregas}
					options={{ header: () => false }}
				/>

				<Stack.Screen
					name='Perfil'
					component={Perfil}
					options={{ header: () => false }}
				/>
			</Stack.Navigator>
		)
	}

	// SE NÃO ESTIVER LOGADO
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Login'
				component={Login}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='@RecuperarSenha'
				component={Senha}
				options={{
					headerShown: true,
					title: 'Recuperar Senha',
					headerStyle: {
						backgroundColor: Tema.colors.secondary,
					},
				}}
			/>
		</Stack.Navigator>
	)
}

export default Routes
