import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	TextInput,
} from 'react-native'
import Tema from '../Styles'

const s = StyleSheet.create({
	box: {
		flex: 1,
		backgroundColor: Tema.colors.secondary,
		padding: 32,
	},
	text: {
		color: Tema.colors.primary,
		fontSize: 24,
		textAlign: 'center',
		fontFamily: Tema.fonts.bold,
		marginBottom: 32,
	},
	input: {
		backgroundColor: Tema.colors.light,
		padding: 10,
		borderRadius: 3,
		marginBottom: 32,
		fontSize: 20,
	},
})

export default () => {
	const [CPF, setCPF] = React.useState('')
	const HandleSubmit = () => {}

	return (
		<View style={s.box}>
			<StatusBar
				barStyle={'dark-content'}
				backgroundColor={Tema.colors.secondary}
			/>
			<Text style={s.text}>Digite seu CPF:</Text>
			<TextInput
				placeholder='CPF'
				textContentType='telephoneNumber'
				keyboardType='numeric'
				style={s.input}
				onChangeText={(text) => setCPF(text)}
				defaultValue={CPF}
			/>
			<TouchableOpacity
				style={{
					padding: 10,
					backgroundColor: Tema.colors.primary,
					borderRadius: 50,
					alignItems: 'center',
					paddingVertical: 20,
					width: '75%',
					alignSelf: 'center',
				}}
				onPress={HandleSubmit}
			>
				<Text
					style={{
						color: Tema.colors.light,
						fontFamily: 'Ubuntu Bold',
						fontSize: 24,
					}}
				>
					Enviar nova senha
				</Text>
			</TouchableOpacity>
		</View>
	)
}
