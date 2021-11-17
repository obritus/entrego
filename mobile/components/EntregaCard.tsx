import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Tema from '../Styles'

const s = StyleSheet.create({
	box: {
		height: 100,
		flexDirection: 'row',
		backgroundColor: Tema.colors.primary,
	},
	ContainerBox: {
		flex: 1,
		padding: 20,
	},
	Valor: {
		fontSize: 18,
		fontFamily: 'Ubuntu Bold',
		color: Tema.colors.light,
		marginRight: 10,
	},
	Title: {
		fontSize: 16,
		color: Tema.colors.light,
		fontFamily: 'Ubuntu Light',
		textAlign: 'right',
	},
	Address: {
		fontSize: 11,
		color: Tema.colors.light,
		fontFamily: 'Ubuntu Bold',
		textAlign: 'right',
	},
	ImageCaixa: {
		width: 50,
		height: 50,
		marginEnd: -35,
	},
})

interface Props {
	horizontal?: boolean | false
	item: {
		cliente: {
			nome: string
			longitude: number
			latitude: number
		}
		contato: {
			endereco: string
		}
		price: number
	}
	onPress: () => void
}

const EntregaCard: React.FC<Props> = ({ horizontal, item, onPress }) => {
	React.useEffect(() => {}, [])

	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				marginRight: horizontal ? 15 : 0,
				marginBottom: horizontal ? 0 : 15,
				backgroundColor: horizontal
					? Tema.colors.secondary
					: Tema.colors.primary,
				height: 100,
				flexDirection: 'row',
				borderRadius: 5,
				overflow: 'hidden',
			}}
		>
			<View
				style={{
					...s.ContainerBox,
					justifyContent: 'center',
					maxWidth: 100,
					backgroundColor: '#252E4E',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Text style={s.Valor}>R$ {item.price}</Text>
				<Image
					source={require('../assets/package_icon.png')}
					style={s.ImageCaixa}
				/>
			</View>
			<View
				style={{
					...s.ContainerBox,
					justifyContent: 'space-between',
					paddingStart: 55,
				}}
			>
				<Text
					style={{
						...s.Title,
						color: horizontal ? '#BD7E7D' : '#FFF',
					}}
				>
					{item.cliente.nome}
				</Text>
				<Text
					style={{
						...s.Address,
						color: horizontal ? '#BD7E7D' : '#FFF',
					}}
				>
					{item.contato.endereco}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export default EntregaCard
