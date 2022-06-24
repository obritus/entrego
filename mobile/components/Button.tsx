import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Tema from '../Styles'

interface Props {
	onPress: () => void
	children: React.ReactNode
	color?: string
	textColor?: string // COR DO TEXTO
	size?: 'small' | 'medium' | 'large'
}

export default ({ onPress, children, color, textColor, size }: Props) => {
	return (
		<TouchableOpacity
			style={{
				padding: size === 'small' ? 6 : size === 'medium' ? 10 : 14,
				backgroundColor: color || Tema.colors.light,
				borderRadius: 50,
				alignItems: 'center',
				marginBottom: 15,
			}}
			onPress={onPress}
		>
			<Text
				style={{
					color: textColor || Tema.colors.dark,
					fontFamily: Tema.fonts.bold,
					fontSize:
						size === 'small' ? 16 : size === 'medium' ? 20 : 24,
				}}
			>
				{children}
			</Text>
		</TouchableOpacity>
	)
}
