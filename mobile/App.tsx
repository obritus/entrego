import React from 'react'
import { Image, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from './screens/Home'
import Entregas from './screens/Entregas'
import Perfil from './screens/Perfil.jsx'

import Icon from './components/Icon'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					tabBarStyle: {
						backgroundColor: '#1FB2F1',
						borderTopWidth: 0,
						height: 120,
					},
					tabBarActiveBackgroundColor: '#30D9A9',
					tabBarItemStyle: {
						height: 120,
					},
					tabBarLabelStyle: {
						color: '#000',
						fontSize: 12,
						paddingBottom: 15,
					},
				}}
			>
				<Tab.Screen
					name='Mapa'
					component={Home}
					options={{
						header: () => false,
						tabBarIcon: ({ focused }) => (
							<View
								style={{
									width: 50,
									height: 50,
									backgroundColor: '#000',
									borderRadius: 50,
								}}
							/>
							// <Image
							// 	source={require('./assets/map_icon.svg')}
							// 	resizeMode='contain'
							// 	style={{
							// 		width: 60,
							// 		height: 60,
							// 		tintColor: '#ffffff',
							// 	}}
							// />
						),
					}}
				/>
				<Tab.Screen
					name='Entregas'
					component={Entregas}
					options={{
						tabBarIcon: ({ focused }) => (
							<View
								style={{
									width: 50,
									height: 50,
									backgroundColor: '#000',
									borderRadius: 50,
								}}
							/>
							// <Image
							// 	source={require('./assets/entregas_icon.svg')}
							// 	resizeMode='contain'
							// 	style={{
							// 		width: 60,
							// 		height: 60,
							// 		tintColor: '#FFF',
							// 	}}
							// />
						),
					}}
				/>
				<Tab.Screen
					name='Perfil'
					component={Perfil}
					options={{
						header: () => false,
						tabBarIcon: ({ focused }) => (
							<View
								style={{
									width: 50,
									height: 50,
									backgroundColor: '#000',
									borderRadius: 50,
								}}
							/>
							// <Image
							// 	source={require('./assets/perfil_icon.svg')}
							// 	resizeMode='contain'
							// 	style={{
							// 		width: 60,
							// 		height: 60,
							// 		tintColor: '#FFF',
							// 	}}
							// />
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}
