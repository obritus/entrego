import React from 'react'
import { TextInput, View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Tema } from '../Styles'

const Label = styled.View`
	font: monospace;
	font-size: 15px;
`

export default () => (
	<View>
		<Label>Email:</Label>
		<Label>Senha:</Label>
		<TouchableOpacity
			style={{ padding: 10, backgroundColor: Tema.colors.secondary }}
		>
			<Text>Entrar</Text>
		</TouchableOpacity>
	</View>
)
