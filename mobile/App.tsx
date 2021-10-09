import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ImageBackground,
} from 'react-native'
import Styled from 'styled-components/native'

const cores = {
	primary: '#24292E',
	secondary: 'red',
	light: '#FFF',
}

const Wrapper = Styled.View`
	flex: 1;
	background: ${cores.primary};
`

const Section = Styled.View`
	height: 45vh;
	background: #00000040;
	font-size: 15pt;
	padding-top: 24;
	padding-right: 24;
	padding-left: 24;
`

const Button = Styled.TouchableOpacity`
	width: 100px;
	background: ${cores.light};
`
const Mapa = Styled.View`
	height: 55vh;
	background: #333;
`
const Label = Styled.Text`
	color: #FFF;
	margin-bottom: 12;
`
export default function App() {
	const [value, onChangeText] = React.useState('')
	const [userData, setUserData] = React.useState({})

	React.useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((json) => {
				setUserData(json)
			})
	}, [])

	return (
		<Wrapper>
			<Mapa>
				<ImageBackground
					source={require('./assets/map.png')}
					style={{ flex: 1 }}
				/>
			</Mapa>
			<Section>
				<Label>Email:</Label>
				<TextInput
					onChangeText={(text) => onChangeText(text)}
					value={value}
					style={{
						padding: 10,
						backgroundColor: '#FFF',
						marginBottom: 12,
					}}
				/>
				<Label>Senha:</Label>
				<TextInput
					onChangeText={(text) => onChangeText(text)}
					value={value}
					style={{
						padding: 10,
						backgroundColor: '#FFF',
						marginBottom: 12,
					}}
				/>
				<Button onPress={() => alert(`Olá!`)}>
					<Text style={{ padding: 12, textAlign: 'center' }}>
						Entrar
					</Text>
				</Button>
			</Section>
			<StatusBar style='dark' />
		</Wrapper>
	)
}
