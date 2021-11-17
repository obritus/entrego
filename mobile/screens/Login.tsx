import React, { useState, useContext, useEffect } from 'react'
import {
	TextInput,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Keyboard,
	ActivityIndicator,
	StatusBar,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Tema from '../Styles'
import Api from '../Api'

import { useAuth } from '../components/AuthContext'

const s = StyleSheet.create({
	loginContainer: {
		flex: 1,
		justifyContent: 'center',
	},
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
	const [loading, setLoading] = useState(false)

	const { setAuth, setUser } = useAuth()

	const handleLogin = () => {
		// CHECAR SE OS CAMPOS ESTÃO PREENCHIDOS
		if (email.length === 0 || senha.length === 0)
			return setMessage('Preencha todos os campos')

		// TUDO OKAY, ENVIAR PARA API
		Keyboard.dismiss()
		setLoading(true)
		Api.Login({ email, senha })
			.then((res) => {
				if (res.data.auth) {
					AsyncStorage.multiSet([
						['token', res.data.token],
						['user', JSON.stringify(res.data.user)],
					])
						.then(() => {
							setLoading(false)
							setUser(res.data.user)
							setAuth(true)
						})
						.catch((err) => {
							setLoading(false)
							console.log(err)
						})
				} else {
					setLoading(false)
					setMessage(res.data.msg)
				}
			})
			.catch((err) => {
				setLoading(false)
				console.log(err)
			})
	}

	return (
		<View
			style={{
				flex: 1,
				padding: 50,
				justifyContent: 'center',
				backgroundColor: Tema.colors.primary,
			}}
		>
			<StatusBar
				barStyle='light-content'
				backgroundColor={Tema.colors.primary}
			/>
			{loading ? (
				<ActivityIndicator
					animating={loading}
					color={Tema.colors.light}
					size='large'
				/>
			) : (
				<View style={s.loginContainer}>
					<Text
						style={{
							fontSize: 26,
							fontFamily: 'Ubuntu Light',
							color: Tema.colors.light,
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
							backgroundColor: Tema.colors.secondary,
							borderRadius: 4,
							alignItems: 'center',
							marginBottom: 15,
							paddingVertical: 20,
						}}
						onPress={handleLogin}
					>
						<Text
							style={{
								color: Tema.colors.dark,
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
						onPress={() => navigation.navigate('@RecuperarSenha')}
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
			)}
		</View>
	)
}

export default Login
