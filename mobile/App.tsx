import React from 'react'
import { Image, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
	useFonts,
	Ubuntu_400Regular,
	Ubuntu_700Bold,
} from '@expo-google-fonts/ubuntu'

import { ThemeProvider, Tema } from './Styles'

import Home from './screens/Home'
import Entregas from './screens/Entregas'
import Perfil from './screens/Perfil.jsx'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default () => {
	const [fontsLoaded] = useFonts({
		Ubuntu_400Regular,
		Ubuntu_700Bold,
	})
	return (
		<ThemeProvider theme={Tema}>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={{
						tabBarStyle: {
							backgroundColor: Tema.colors.primary,
							borderTopWidth: 0,
							height: 90,
						},
						tabBarActiveBackgroundColor: '#FFFFFF15',
						tabBarItemStyle: {
							height: 90,
						},
						tabBarLabelStyle: {
							fontSize: 12,
							color: Tema.colors.light,
							marginBottom: 15,
						},
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
									resizeMode='contain'
									style={{
										width: 40,
										height: 40,
										marginTop: 15,
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
									resizeMode='contain'
									style={{
										width: 40,
										height: 40,
										marginTop: 10,
									}}
								/>
							),
							headerTitleAlign: 'center',
							headerStyle: {
								backgroundColor: Tema.colors.primary,
							},
							headerTitleStyle: {
								fontFamily: 'Ubuntu_700Bold',
								color: Tema.colors.light,
							},
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
									resizeMode='contain'
									style={{
										width: 40,
										height: 40,
										marginTop: 10,
									}}
								/>
							),
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
			)
		</ThemeProvider>
	)
}
