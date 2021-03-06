import React, { useState } from 'react'
import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
} from 'react-native'
import { useAuth } from './AuthContext'
import Tema from '../Styles'
import { ScrollView } from 'react-native-gesture-handler'

const s = StyleSheet.create({
	container: {
		width: '100%',
		height: 480,
		flexDirection: 'column',
		alignItems: 'stretch',
		backgroundColor: Tema.colors.light,
		position: 'absolute',
		left: 30,
		top: 30,
		opacity: 0.0,
		borderRadius: 10,
		zIndex: 10,
	},
	button: {
		padding: 15,
	},
	buttonText: {
		fontSize: 12,
		color: Tema.colors.dark,
		fontFamily: Tema.fonts.regular,
		textAlign: 'center',
	},
	label: {},

	input: {
		padding: 15,
	},
})

export default (props: any) => {
	const [email, setEmail] = useState('')
	const [telefone, setTelefone] = useState('')
	const { logOut } = useAuth()

	return (
		<Animated.View
			style={{
				...s.container,
				opacity: props.translateY.interpolate({
					inputRange: [0, 320],
					outputRange: [0, 1],
					extrapolate: 'clamp',
				}),
				transform: [
					{
						translateY: props.translateY.interpolate({
							inputRange: [0, 320],
							outputRange: [-480, 30],
							extrapolate: 'clamp',
						}),
					},
				],
			}}
		>
			<ScrollView
				style={{
					padding: 15,
					flex: 1,
					flexDirection: 'column',
				}}
			>
				<Text
					style={{
						fontFamily: Tema.fonts.bold,
						color: Tema.colors.dark,
						fontSize: 14,
						textAlign: 'center',
					}}
				>
					Editar Perfil
				</Text>
				<View>
					<Text>E-mail:</Text>
					<TextInput
						style={s.input}
						placeholder='E-mail'
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>
				</View>
				<View>
					<Text>Celular:</Text>
					<TextInput
						style={s.input}
						placeholder='Celular'
						value={telefone}
						onChangeText={(text) => setTelefone(text)}
					/>
				</View>
				<TouchableOpacity onPress={logOut} style={s.button}>
					<Text style={s.buttonText}>Desconectar-se</Text>
				</TouchableOpacity>
			</ScrollView>
		</Animated.View>
	)
}
