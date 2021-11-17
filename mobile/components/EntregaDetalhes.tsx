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
	Alert,
} from 'react-native'
import Tema from '../Styles'
import { StackNavigationProp } from '@react-navigation/stack'

const s = StyleSheet.create({
	Box: {
		flex: 1,
		backgroundColor: Tema.colors.light,
		padding: 30,
		paddingTop: 0,
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
		fontSize: 11,
	},
})

interface Props {
	navigation: StackNavigationProp<any, any>
	route: {
		params: {
			id: number
			price: number
			status: number
			cliente: {
				nome: string
				logotipo: string | ''
				latitude: number
				longitude: number
			}
			contato: {
				nome: string
				telefone: number
				latitude: number
				longitude: number
				endereco: string
				observacoes?: string
			}
		}
	}
}

const EntregaDetalhes: React.FC<Props> = ({ navigation, route }) => {
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
					uri:
						route.params.cliente.logotipo ||
						'https://github.com/google.png',
				}}
				style={{
					width: 100,
					height: 100,
					marginBottom: 15,
					alignSelf: 'center',
				}}
			/>
			<Text style={{ ...s.Text, marginBottom: 30 }}>
				{route.params.cliente.nome}
			</Text>
			<Text style={s.TextBold}>Endereço da Entrega</Text>
			<TouchableOpacity
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: 15,
				}}
				onPress={() => {
					Linking.openURL(
						`http://maps.google.com/?ie=UTF8&hq=&ll=${route.params.contato.latitude},${route.params.contato.longitude}&z=13`
					)
				}}
			>
				<Image
					source={require('../assets/home_icon.png')}
					style={{ width: 32, height: 32 }}
				/>
				<Text
					style={{
						...s.Text,
						marginStart: 10,
						marginBottom: 0,
						maxWidth: '70%',
					}}
				>
					{route.params.contato.endereco}
				</Text>
			</TouchableOpacity>
			<Text style={s.TextBold}>Falar com</Text>
			<Text style={{ ...s.Text }}>{route.params.contato.nome}</Text>
			<TouchableOpacity
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: 15,
				}}
				onPress={() => {
					Linking.openURL(
						`https://api.whatsapp.com/send?phone=55${route.params.contato.telefone}`
					)
				}}
			>
				<Text style={{ ...s.Text, marginEnd: 10, marginBottom: 0 }}>
					{route.params.contato.telefone}
				</Text>
				<Image
					source={require('../assets/whatsapp_icon.png')}
					style={{ width: 32, height: 32 }}
				/>
			</TouchableOpacity>
			<Text style={s.TextBold}>Observações</Text>
			<Text style={{ ...s.Text, marginBottom: 30 }}>
				{route.params.contato.observacoes}
			</Text>
			<Button title='Entregar' color={Tema.colors.primary} />
			<Button
				title='Voltar'
				onPress={() => navigation.pop(1)}
				color={Tema.colors.dark}
			/>
		</ScrollView>
	)
}

export default EntregaDetalhes
