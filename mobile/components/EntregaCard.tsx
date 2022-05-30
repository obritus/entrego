import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Entregas } from '../screens/Home'
import Tema from '../Styles'

const s = StyleSheet.create({
	ContainerBox: {
		flex: 1,
		padding: 16,
	},
	ImageCaixa: {
		width: 65,
		height: 53,
		marginBottom: 8,
	},
	Valor: {
		fontSize: 18,
		fontFamily: 'Ubuntu Bold',
		color: Tema.colors.light,
		textAlign: 'center',
	},
	Title: {
		fontSize: 18,
		color: Tema.colors.light,
		fontFamily: 'Ubuntu Bold',
		textAlign: 'right',
	},
	Address: {
		fontSize: 12,
		color: Tema.colors.light,
		fontFamily: 'Ubuntu Regular',
		textAlign: 'right',
	},
})

interface Props {
	horizontal?: boolean | false
	item: Entregas
	onPress: () => void
}

const EntregaCard: React.FC<Props> = ({ horizontal, item, onPress }) => {
	React.useEffect(() => {}, [])

	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				marginRight: horizontal ? 16 : 0,
				marginBottom: horizontal ? 0 : 16,
				backgroundColor: horizontal
					? Tema.colors.secondary
					: Tema.colors.primary,
				height: 132,
				flexDirection: 'row',
				borderRadius: 5,
				overflow: 'hidden',
			}}
		>
			<View
				style={{
					width: 56,
					backgroundColor: '#00000075',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<View
					style={{
						width: 112,
						alignItems: 'center',
					}}
				>
					<Image
						source={require('../assets/package_icon.png')}
						style={s.ImageCaixa}
					/>
					<Text style={s.Valor}>R$ {item.price}</Text>
				</View>
			</View>
			<View
				style={{
					...s.ContainerBox,
					justifyContent: 'space-between',
					paddingEnd: 22,
				}}
			>
				<View>
					<Text
						style={{
							...s.Title,
							color: horizontal ? '#BD7E7D' : '#FFF',
							marginStart: 40,
						}}
					>
						{item.contato.nome}
					</Text>
					<Text
						style={{
							fontFamily: 'Ubuntu Regular',
							fontSize: 10,
							color: '#FFFFFF',
							textAlign: 'right',
							marginStart: 40,
						}}
					>
						{item.id}
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'column',
						alignItems: 'flex-end',
						marginStart: 40,
					}}
				>
					<Text
						style={{
							fontFamily: 'Ubuntu Bold',
							fontSize: 12,
							color: '#FFFFFF',
							textAlign: 'right',
							marginBottom: 0,
						}}
					>
						Entregar em
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
			</View>
		</TouchableOpacity>
	)
}

export default EntregaCard
