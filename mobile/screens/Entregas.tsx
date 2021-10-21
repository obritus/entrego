import React from 'react'
import styled from 'styled-components/native'
import { SafeAreaView, FlatList, Text, Button } from 'react-native'
import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Tema } from '../Styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Api from '../Api'

const Box = styled.View`
	padding: 15px;
	margin-bottom: 15px;
	border-radius: 15px;
	background: #fff;
`

const Teste = styled.SafeAreaView`
	flex: 1;
	background-color: red;
`

const Stack = createNativeStackNavigator()

export default () => {
	const [entregas, setEntregas] = React.useState([])
	React.useEffect(() => {
		Api.GetEntregas().then((data) => {
			alert(data)
		})
	}, [])

	return (
		<SafeAreaView>
			<StatusBar
				barStyle='light-content'
				backgroundColor={Tema.colors.primary}
			/>
			<TouchableOpacity onPress={() => alert('teste')}>
				<Text>Olá</Text>
			</TouchableOpacity>
			<Stack.Navigator>
				<Stack.Screen component={Teste} name='Entrega' />
			</Stack.Navigator>
		</SafeAreaView>
	)
}
