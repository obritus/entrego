import React from 'react'
import { TextInput, View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Tema } from '../Styles'

const Label = styled.View`
	font: monospace;
	font-size: 15px;
`
const Input = styled.TextInput`
	padding: 10px;
	border-radius: 5px;
	border-width: 1px;
	border-color: ${Tema.colors.primary};
`

export default () => (
	<View>
		<Label>
			Email:
			<Input placeholder='Email' />
		</Label>
		<Label>
			Senha:
			<Input placeholder='Senha' />
		</Label>
		<TouchableOpacity
			style={{ padding: 10, backgroundColor: Tema.colors.secondary }}
		>
			<Text>Entrar</Text>
		</TouchableOpacity>
	</View>
)
