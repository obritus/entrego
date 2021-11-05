import React, { useContext, createContext } from 'react'
import { Image, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Contexto } from './components/AuthContext'
import { ThemeProvider, Tema } from './Styles'

import Home from './screens/Home'
import Entregas from './screens/Entregas'
import Perfil from './screens/Perfil'
import Login from './screens/Login'

const Tab = createBottomTabNavigator()

export default () => {
	const [logged, setLogged] = React.useState(false)

	return (
		<ThemeProvider theme={Tema}>
			<Contexto.Provider value={{ logged, setLogged }}>
				{true ? (
					<NavigationContainer>
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
									tabBarItemStyle: {
										// borderBottomColor: '#FCCBCA',
										// borderBottomWidth: 8,
									},
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
												Entregas Disponíveis
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
					</NavigationContainer>
				) : (
					<Login />
				)}
			</Contexto.Provider>
		</ThemeProvider>
	)
}
