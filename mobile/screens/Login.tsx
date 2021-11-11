import React, { useState, useContext } from 'react'
import {
	TextInput,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Keyboard,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Tema } from '../Styles'
import Api from '../Api'

import AuthContext from '../components/AuthContext'

const s = StyleSheet.create({
	label: {
		marginBottom: 15,
	},
	input: {
		fontFamily: 'Ubuntu Regular',
		color: Tema.colors.dark,
		backgroundColor: Tema.colors.light,
		borderRadius: 4,
		padding: 15,
	},
	labelText: {
		fontFamily: 'Ubuntu Regular',
		color: Tema.colors.light,
		marginBottom: 5,
		fontSize: 10,
	},
	messageBox: {
		padding: 15,
		marginBottom: 15,
		borderRadius: 4,
		backgroundColor: Tema.colors.info,
	},
})

interface Props {
	navigation: StackNavigationProp<any, any>
}

const Login: React.FC<Props> = ({ navigation }) => {
	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')
	const [message, setMessage] = useState('' as string)

	const { logged, setLogged, setUser } = useContext(AuthContext)

	const handleLogin = () => {
		Keyboard.dismiss()
		Api.Login({ email, senha })
			.then((res) => {
				if (res.data.auth) {
					AsyncStorage.setItem('token', res.data.token)
					AsyncStorage.setItem('user', JSON.stringify(res.data.user))
					setUser(res.data.user)
					setLogged(true)
				} else {
					setMessage(res.data.msg)
				}
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<View
			style={{
				flex: 1,
				padding: 50,
				justifyContent: 'center',
				backgroundColor: Tema.colors.secondary,
			}}
		>
			<Text
				style={{
					fontSize: 23,
					fontFamily: 'Ubuntu Bold',
					color: Tema.colors.primary,
					marginBottom: 15,
					textAlign: 'center',
				}}
			>
				Bem-vindo!
			</Text>
			{message !== '' && (
				<View style={s.messageBox}>
					<Text
						style={{
							fontFamily: 'Ubuntu Regular',
							color: Tema.colors.dark,
						}}
					>
						{message}
					</Text>
				</View>
			)}
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
					backgroundColor: Tema.colors.primary,
					borderRadius: 4,
					alignItems: 'center',
					marginBottom: 15,
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
			<TouchableOpacity
				style={{
					padding: 10,
					backgroundColor: Tema.colors.info,
					borderRadius: 4,
					alignItems: 'center',
				}}
				// onPress={handleLogin}
				onPress={() => navigation.navigate('@senha')}
			>
				<Text
					style={{
						color: Tema.colors.dark,
						fontFamily: 'Ubuntu Bold',
					}}
				>
					Esqueci a senha
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Login
