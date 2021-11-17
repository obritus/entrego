import React from 'react'
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native'
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
			<View style={s.container}>
				<ActivityIndicator size='large' color={Tema.colors.primary} />
			</View>
		)
	}

	// SE ESTIVER LOGADO
	if (auth) {
		return (
			<Tab.Navigator
				screenOptions={{
					tabBarStyle: {
						backgroundColor: Tema.colors.light,
						borderTopWidth: 0,
						height: 85,
						alignContent: 'center',
					},
					tabBarActiveBackgroundColor: '#FFFFFF15',
					tabBarActiveTintColor: Tema.colors.primary,
					tabBarItemStyle: {
						alignSelf: 'center',
					},
					tabBarShowLabel: false,
				}}
				initialRouteName='Home'
			>
				<Tab.Screen
					name='Mapa'
					component={Home}
					options={{
						header: () => false,
						tabBarIcon: ({ focused }) => (
							<Image
								source={require('./assets/home_icon.png')}
								style={{
									width: 24,
									height: 24,
								}}
							/>
						),
					}}
				/>

				<Tab.Screen
					name='Entregas'
					component={Entregas}
					options={{
						tabBarIcon: ({ focused }) => (
							<Image
								source={require('./assets/entregas_icon.png')}
								style={{
									width: 24,
									height: 24,
								}}
							/>
						),
						headerTitleAlign: 'center',
						headerStyle: {
							backgroundColor: Tema.colors.light,
						},
						headerTitle: (title) => (
							<View
								style={{
									flex: 1,
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Image
									source={require('./assets/entregas_icon.png')}
									style={{
										width: 16,
										height: 16,
										marginRight: 8,
									}}
								/>
								<Text
									style={{
										fontSize: 14,
										color: Tema.colors.primary,
										fontFamily: 'Ubuntu Bold',
									}}
								>
									Entregas
								</Text>
							</View>
						),
					}}
				/>

				<Tab.Screen
					name='Perfil'
					component={Perfil}
					options={{
						header: () => false,
						tabBarIcon: ({ focused }) => (
							<Image
								source={require('./assets/perfil_icon.png')}
								style={{
									width: 24,
									height: 24,
								}}
							/>
						),
					}}
				/>
			</Tab.Navigator>
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
