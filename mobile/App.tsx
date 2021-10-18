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
						backgroundColor: '#4E71D9',
						borderTopWidth: 0,
						height: 120,
					},
					tabBarActiveBackgroundColor: '#FFFFFF25',
					tabBarItemStyle: {
						height: 120,
					},
					tabBarLabelStyle: {
						color: '#FFF',
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
							<Image
								source={require('./assets/home_icon.png')}
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
}
