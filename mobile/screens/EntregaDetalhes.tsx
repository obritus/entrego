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
	ImageBackground,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Entregas } from '../screens/Home'
import Tema from '../Styles'

const s = StyleSheet.create({
	Box: {
		flex: 1,
		backgroundColor: Tema.colors.light,
		padding: 36,
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
	avatarNome: {
		height: 90,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		overflow: 'hidden',
		marginBottom: 30,
	},
	separador: {
		width: 300,
		height: 10,
	},
	swipeBox: {},
})

interface Props {
	navigation: StackNavigationProp<any, any>
	route: {
		params: Entregas
	}
}

const EntregaDetalhes: React.FC<Props> = ({ navigation, route }) => {
	return (
		<ScrollView style={s.Box}>
			<View style={{ ...s.avatarNome }}>
				<View
					style={{
						width: 90,
						height: 90,
						backgroundColor: '#999',
						borderRadius: 20,
					}}
				>
					<ImageBackground
						source={
							route.params?.cliente?.logotipo
								? { uri: route.params.cliente.logotipo }
								: require('../assets/capacete.png')
						}
						style={{
							width: 90,
							height: 90,
						}}
					/>
				</View>
				<View
					style={{
						marginLeft: 20,
						flexDirection: 'column',
						justifyContent: 'center',
						height: 150,
						flex: 1,
					}}
				>
					<Text
						style={{
							fontSize: 20,
							color: Tema.colors.dark,
							fontFamily: Tema.fonts.bold,
						}}
					>
						{route.params.cliente.nome}
					</Text>
					<Text
						style={{
							fontFamily: 'Ubuntu Italic',
							fontSize: 12,
						}}
					>
						{route.params.cliente.nome}
					</Text>
				</View>
			</View>
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
						`https://wa.me/55${route.params.contato.telefone}`
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
				{route.params.contato.obs}
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
