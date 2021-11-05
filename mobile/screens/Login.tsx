import React, { useState } from 'react'
import {
	TextInput,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	Keyboard,
} from 'react-native'
import { Tema } from '../Styles'
import Api from '../Api'

const s = StyleSheet.create({
	label: {
		marginBottom: 15,
	},
	input: {
		fontFamily: 'Ubuntu Regular',
		color: Tema.colors.dark,
		backgroundColor: Tema.colors.light,
		borderRadius: 4,
		padding: 10,
	},
	labelText: {
		fontFamily: 'Ubuntu Regular',
		color: Tema.colors.light,
		marginBottom: 5,
		fontSize: 10,
	},
})

export default () => {
	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')
	const [message, setMessage] = useState('')

	const handleLogin = () => {
		Keyboard.dismiss()
		Api.Login({ email, senha })
			.then((res) => {
				if (res.data.auth) {
					// AsyncStorage.setItem('token', res.data.token)
					// AsyncStorage.setItem('user', JSON.stringify(res.data.user))
					// props.logged(true)
				}
			})
			.catch((err) => {
				console.log(err)
			})
	}

	React.useEffect(() => {}, [])

	return (
		<View
			style={{
				flex: 1,
				padding: 50,
				justifyContent: 'center',
				backgroundColor: Tema.colors.primary,
			}}
		>
			<Text
				style={{
					fontSize: 23,
					fontFamily: 'Ubuntu Bold',
					color: Tema.colors.light,
					marginBottom: 15,
					textAlign: 'center',
				}}
			>
				Bem-vindo de volta!
			</Text>
			<View style={s.label}>
				<TextInput
					style={s.input}
					placeholder='Email'
					textContentType='emailAddress'
					onChangeText={(text) => setEmail(text)}
				/>
			</View>
			<View style={s.label}>
				<TextInput
					style={s.input}
					placeholder='Senha'
					textContentType='password'
					secureTextEntry={true}
					onChangeText={(text) => setSenha(text)}
				/>
			</View>
			<TouchableOpacity
				style={{
					padding: 10,
					backgroundColor: Tema.colors.danger,
					borderRadius: 4,
					alignItems: 'center',
				}}
				onPress={handleLogin}
			>
				<Text
					style={{
						color: Tema.colors.light,
						fontFamily: 'Ubuntu Bold',
					}}
				>
					Entrar
				</Text>
			</TouchableOpacity>
		</View>
	)
}
