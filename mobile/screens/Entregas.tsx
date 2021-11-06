import React from 'react'

import { Swipeable } from 'react-native-gesture-handler'
import {
	SafeAreaView,
	FlatList,
	Text,
	View,
	Image,
	Permission,
} from 'react-native'
import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Tema } from '../Styles'

import EntregasList from '../components/EntregasList'
import EntregaDetalhes from '../components/EntregaDetalhes'
import Login from './Login'

const Stack = createNativeStackNavigator()

export default () => {
	return (
		<View style={{ flex: 1 }}>
			<StatusBar
				barStyle='dark-content'
				backgroundColor={Tema.colors.light}
			/>
			<View style={{ flex: 1 }}>
				<Stack.Navigator>
					<Stack.Screen
						name='Entregas Lista'
						component={EntregasList}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='Detalhes da entrega'
						component={EntregaDetalhes}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</View>
		</View>
	)
}
