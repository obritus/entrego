import React from 'react'
import { ScrollView, Text } from 'react-native'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'

const Box = styled.View`
	padding: 15px;
	margin-bottom: 15px;
	border-radius: 15px;
	background: #fff;
`

export default () => (
	<ScrollView
		style={{
			flex: 1,
			padding: StatusBar.currentHeight,
			backgroundColor: '#1FB2F1',
		}}
	>
		<Box>
			<Text>Entrega 1</Text>
			<Text>Endereço</Text>
			<Text>Valor</Text>
		</Box>
		<Box>
			<Text>Entrega 1</Text>
			<Text>Endereço</Text>
			<Text>Valor</Text>
		</Box>
		<Box>
			<Text>Entrega 1</Text>
			<Text>Endereço</Text>
			<Text>Valor</Text>
		</Box>
		<Box>
			<Text>Entrega 1</Text>
			<Text>Endereço</Text>
			<Text>Valor</Text>
		</Box>
		<Box>
			<Text>Entrega 1</Text>
			<Text>Endereço</Text>
			<Text>Valor</Text>
		</Box>
		<Box>
			<Text>Entrega 1</Text>
			<Text>Endereço</Text>
			<Text>Valor</Text>
		</Box>
		<Box>
			<Text>Entrega 1</Text>
			<Text>Endereço</Text>
			<Text>Valor</Text>
		</Box>
		<Box>
			<Text>Entrega 1</Text>
			<Text>Endereço</Text>
			<Text>Valor</Text>
		</Box>
		<Box>
			<Text>Entrega 1</Text>
			<Text>Endereço</Text>
			<Text>Valor</Text>
		</Box>
		<Box>
			<Text>Entrega 1</Text>
			<Text>Endereço</Text>
			<Text>Valor</Text>
		</Box>
		<Box>
			<Text>Entrega 1</Text>
			<Text>Endereço</Text>
			<Text>Valor</Text>
		</Box>
	</ScrollView>
)
