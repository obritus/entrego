import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BarraDeStatus } from '../App'
import Tema from '../Styles'

const s = StyleSheet.create({
	box: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: Tema.colors.secondary,
	},
	text: {
		color: Tema.colors.primary,
		fontSize: 30,
	},
})
export default () => {
	return (
		<BarraDeStatus
			barStyle='light-content'
			backgroundColor='#000'
			translucent={false}
		/>
	)
}
