import React from 'react'

import { Swipeable } from 'react-native-gesture-handler'
import { View } from 'react-native'
import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tema from '../Styles'

import EntregasList from '../components/EntregasList'
import EntregaDetalhes from '../components/EntregaDetalhes'

const Stack = createNativeStackNavigator()

const Entregas: React.FC = () => {
	return (
		<View style={{ flex: 1 }}>
			<StatusBar
				barStyle='dark-content'
				backgroundColor={Tema.colors.light}
			/>
			<View style={{ flex: 1 }}>
				<Stack.Navigator>
					<Stack.Screen
						name='EntregasLista'
						component={EntregasList}
						options={{
							title: 'Entregas',
							headerStyle: {
								backgroundColor: Tema.colors.light,
							},
							statusBarStyle: 'light',
							statusBarAnimation: 'fade',
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='Detalhes'
						component={EntregaDetalhes}
						options={{
							headerShown: true,
						}}
					/>
				</Stack.Navigator>
			</View>
		</View>
	)
}

export default Entregas
