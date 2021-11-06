import React from 'react'
import { View, Image, Button, TouchableOpacity, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Tema } from '../Styles'

const s = StyleSheet.create({
	box: {
		height: 100,
		flexDirection: 'row',
		backgroundColor: Tema.colors.primary,
	},
})

const ContainerBox = styled.View`
	flex: 1;
	padding: 20px;
`
const Valor = styled.Text`
	font-size: 18px;
	font-family: 'Ubuntu Bold';
	color: ${Tema.colors.light};
	margin-right: 10px;
`
const Title = styled.Text`
	font-size: 16px;
	color: #fff;
	font-family: 'Ubuntu Light';
	text-align: right;
`
const Address = styled.Text`
	font-size: 11px;
	color: #fff;
	font-family: 'Ubuntu Bold';
	text-align: right;
`
const ImageCaixa = styled.Image`
	width: 50px;
	height: 50px;
`
export default (props: any) => {
	React.useEffect(() => {}, [])

	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{
				marginRight: props.horizontal ? 15 : 0,
				marginBottom: props.horizontal ? 0 : 15,
				backgroundColor: props.horizontal
					? Tema.colors.secondary
					: Tema.colors.primary,
				height: 100,
				flexDirection: 'row',
				borderRadius: 5,
				overflow: 'hidden',
			}}
		>
			<ContainerBox
				style={{
					justifyContent: 'center',
					maxWidth: 100,
					backgroundColor: '#252E4E',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Valor>R$ {props.item.price}</Valor>
				<ImageCaixa
					source={require('../assets/package_icon.png')}
					style={{
						marginRight: -50,
					}}
				/>
			</ContainerBox>
			<ContainerBox style={{ justifyContent: 'space-between' }}>
				<Title style={{ color: props.horizontal ? '#BD7E7D' : '#FFF' }}>
					{props.item.title}
				</Title>
				<Address
					style={{ color: props.horizontal ? '#BD7E7D' : '#FFF' }}
				>
					Rua Fulaninho, 1500 Jardim Andere
				</Address>
			</ContainerBox>
		</TouchableOpacity>
	)
}
