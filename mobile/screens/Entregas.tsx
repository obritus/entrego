import React from 'react'
import { SafeAreaView, FlatList, Text } from 'react-native'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { Tema } from '../Styles'

const Box = styled.View`
	padding: 15px;
	margin-bottom: 15px;
	border-radius: 15px;
	background: #fff;
`

export default () => (
	<SafeAreaView>
		<StatusBar
			barStyle='light-content'
			backgroundColor={Tema.colors.primary}
		/>
	</SafeAreaView>
)
