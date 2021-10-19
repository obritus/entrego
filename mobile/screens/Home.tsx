import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text, ImageBackground, Button } from 'react-native'
import styled from 'styled-components/native'
import { Tema } from '../Styles'

const Mapa = styled.View`
	flex: 1;
	background: ${(props) => props.theme.colors.secondary};
`
export default (props: any) => (
	<Mapa>
		<StatusBar style='dark' backgroundColor={Tema.colors.secondary} />
	</Mapa>
)
