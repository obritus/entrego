import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Button,
	Image,
	Linking,
} from 'react-native'
import { Tema } from '../Styles'

const s = StyleSheet.create({
	Box: {
		flex: 1,
		backgroundColor: Tema.colors.light,
		padding: 30,
	},
	Text: {
		color: Tema.colors.dark,
		fontFamily: 'Ubuntu Regular',
		fontSize: 20,
		marginBottom: 10,
		textAlign: 'center',
	},
	TextBold: {
		color: Tema.colors.dark,
		fontFamily: 'Ubuntu Bold',
		textAlign: 'center',
		fontSize: 10,
	},
})

export default (props: any) => {
	return (
		<ScrollView style={s.Box}>
			<Text
				style={{
					...s.TextBold,
					fontSize: 24,
					textAlign: 'center',
					marginBottom: 15,
				}}
			>
				Detalhes da entrega
			</Text>
			<Image
				source={{
					uri: 'https://github.com/google.png',
				}}
				style={{
					width: 100,
					height: 100,
					marginBottom: 15,
					alignSelf: 'center',
				}}
			/>
			<Text style={{ ...s.Text, marginBottom: 30 }}>
				Empresa Fulaninha
			</Text>
			<Text style={s.TextBold}>Endereço da Entrega</Text>
			<Text style={s.Text}>Rua do Abacaxi, 123</Text>
			<Text style={s.TextBold}>Falar com</Text>
			<Text style={{ ...s.Text }}>Dona Maria da Silva</Text>
			<TouchableOpacity
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: 15,
				}}
				onPress={() => {
					Linking.openURL(
						'https://api.whatsapp.com/send?phone=5535998407250'
					)
				}}
			>
				<Text style={{ ...s.Text, marginEnd: 10, marginBottom: 0 }}>
					(35) 99999 9999
				</Text>
				<Image
					source={require('../assets/whatsapp_icon.png')}
					style={{ width: 32, height: 32 }}
				/>
			</TouchableOpacity>
			<Text style={s.TextBold}>Observações</Text>
			<Text style={{ ...s.Text, marginBottom: 30 }}>
				Apartamento 21, Bloco A
			</Text>
			<Button
				title='Entregar'
				onPress={() => props.navigation.navigate('Entregas')}
				color={Tema.colors.primary}
			/>
			<Button
				title='Voltar'
				onPress={() => props.navigation.navigate('Entregas')}
				color={Tema.colors.dark}
			/>
		</ScrollView>
	)
}
