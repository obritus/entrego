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
						backgroundColor: '#ffffff',
						borderTopWidth: 0,
						height: 120,
					},
					tabBarActiveBackgroundColor: '#afafaf',
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
							<Image
								source={require('./assets/icon.png')}
								resizeMode='contain'
								style={{
									width: 60,
									height: 60,
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
								source={require('./assets/icon.png')}
								resizeMode='contain'
								style={{
									width: 60,
									height: 60,
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
								source={require('./assets/icon.png')}
								resizeMode='contain'
								style={{
									width: 60,
									height: 60,
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
