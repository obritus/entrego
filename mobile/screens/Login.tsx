import React, { useState, useContext, useEffect } from 'react'
import {
	TextInput,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Keyboard,
	ActivityIndicator,
	ImageBackground,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Tema from '../Styles'
import Api from '../Api'

import { useAuth } from '../components/AuthContext'

const s = StyleSheet.create({
	loginContainer: {
		flex: 3,
		padding: 50,
		paddingBottom: 60,
		justifyContent: 'flex-end',
	},
	label: {
		marginBottom: 15,
	},
	input: {
		fontFamily: Tema.fonts.regular,
		color: Tema.colors.light,
		backgroundColor: Tema.colors.primary,
		borderWidth: 0,
		borderBottomWidth: 2,
		padding: 0,
		paddingBottom: 10,
		fontSize: 18,
		borderColor: Tema.colors.light,
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
	const [email, setEmail] = useState('fulaninho@gmail.com')
	const [senha, setSenha] = useState('123456')
	const [message, setMessage] = useState('' as string)
	const [loading, setLoading] = useState(true)

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

	React.useEffect(() => {
		AsyncStorage.getItem('token')
			.then((token) => {
				if (token) {
					setAuth(true)
				} else {
					setLoading(false)
				}
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<ImageBackground
			style={{
				flex: 1,
				backgroundColor: Tema.colors.primary,
				padding: 0,
				paddingBottom: 30,
			}}
			imageStyle={{
				top: undefined,
				width: '100%',
				height: 92,
				resizeMode: 'stretch',
			}}
			source={require('../assets/bg.png')}
		>
			{loading ? (
				<ActivityIndicator
					animating={loading}
					color={Tema.colors.rosa}
					size='large'
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				/>
			) : (
				<View style={s.loginContainer}>
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<ImageBackground
							source={require('../assets/logotipo.png')}
							resizeMode='contain'
							style={{
								width: '100%',
								height: '60%',
								justifyContent: 'center',
							}}
						></ImageBackground>
					</View>
					<Text
						style={{
							fontSize: 26,
							fontFamily: 'Ubuntu Bold',
							color: Tema.colors.light,
							marginBottom: 15,
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
									fontSize: 18,
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
							defaultValue='fulaninho@gmail.com'
							onChangeText={(text) => setEmail(text)}
						/>
					</View>
					<View style={s.label}>
						<TextInput
							style={{ ...s.input, marginBottom: 20 }}
							placeholder='Senha'
							defaultValue='123456'
							textContentType='password'
							secureTextEntry={true}
							onChangeText={(text) => setSenha(text)}
						/>
					</View>
					<TouchableOpacity
						style={{
							padding: 10,
							backgroundColor: Tema.colors.secondary,
							borderRadius: 50,
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
								fontSize: 24,
							}}
						>
							Entrar
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							padding: 10,
							borderRadius: 4,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'flex-end',
						}}
						// onPress={handleLogin}
						onPress={() => navigation.navigate('@RecuperarSenha')}
					>
						<Text
							style={{
								color: Tema.colors.light,
								fontFamily: 'Ubuntu Regular',
							}}
						>
							Não consegue entrar?{' '}
						</Text>
						<Text
							style={{
								color: Tema.colors.light,
								fontFamily: 'Ubuntu Bold',
								textDecorationLine: 'underline',
							}}
						>
							Recuperar senha
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</ImageBackground>
	)
}

export default Login
