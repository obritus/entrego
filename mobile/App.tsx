import { StatusBar, StatusBarProps } from 'expo-status-bar'
import React from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ImageBackground,
	StyleSheet,
	Appearance,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import styled, { css } from 'styled-components/native'

// import Nav from './components/Nav'

import Mapa from './screens/Home'
import Entregas from './screens/Entregas'
import Perfil from './screens/Profile'

const Wrapper = styled.View`
	flex: 1;
	padding-top: 10;
`

const Section = styled.View`
	height: 85%;
	padding-top: 24;
`

const Tab = createBottomTabNavigator()

export default () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarActiveTintColor: 'black',
				})}
			>
				<Tab.Screen name='Mapa' component={Mapa} />
				<Tab.Screen name='Entregas' component={Entregas} />
				<Tab.Screen name='Perfil' component={Perfil} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}
