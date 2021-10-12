import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import Styled from 'styled-components/native'

const Mapa = Styled.View`
	height: 100%;
	background: #333;
`

export default () => (
	<View style={{ height: '100%' }}>
		<Mapa>
			<ImageBackground
				source={require('../assets/map.png')}
				style={{ flex: 1 }}
			/>
		</Mapa>
	</View>
)
