import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Tema } from '../Styles'

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
		<StatusBar
			barStyle='dark-content'
			backgroundColor={Tema.colors.secondary}
		/>
	)
}
