import React from 'react'
import { View, Text, ImageBackground, Button } from 'react-native'
import styled from 'styled-components/native'

const Mapa = styled.View`
	flex: 1;
	background: #333;
`
export default (props: any) => (
	<View style={{ flex: 2, backgroundColor: 'red' }}>
		<Mapa>
			<ImageBackground
				source={require('../assets/map.png')}
				style={{ flex: 1 }}
			/>
		</Mapa>
	</View>
)
