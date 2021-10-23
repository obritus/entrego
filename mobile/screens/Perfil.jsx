import React from 'react'
import {
	View,
	Text,
	Image,
	StatusBar,
	ImageBackground,
	StyleSheet,
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from 'styled-components/native'
import Api from '../Api'
import { Tema } from '../Styles'

const Box = styled.View`
	flex: 1;
	padding: 30px;
	align-items: flex-start;
	justify-content: flex-start;
	background: ${(props) => props.theme.colors.primary};
`

const AvatarNome = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	overflow: hidden;
	padding-bottom: 60px;
`

const Tab = createBottomTabNavigator()

export default () => {
	const [usuario, setUsuario] = React.useState({})

	React.useEffect(() => {
		const GetUsuario = async () => {
			try {
				const Response = await Api.GetUsuario(
					'61675b2b93224cc1d1be7f9a'
				)
				const Data = Response.data
				setUsuario(Data)
			} catch (error) {
				console.error(error)
			}
		}

		GetUsuario()
	}, [])

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: Tema.colors.secondary,
				// paddingTop: StatusBar.currentHeight,
			}}
		>
			<StatusBar
				barStyle='light-content'
				backgroundColor={Tema.colors.primary}
			/>
			{Object.keys(usuario).length > 0 && (
				<Box>
					<AvatarNome>
						<View
							style={{
								width: 120,
								height: 120,
								backgroundColor: '#999',
								borderRadius: 20,
							}}
						>
							<ImageBackground
								source={{
									uri: usuario.avatar?.location,
								}}
								style={{
									flex: 1,
									borderRadius: 20,
									overflow: 'hidden',
								}}
							/>
						</View>
						<View
							style={{
								marginLeft: 20,
								flexDirection: 'column',
								justifyContent: 'center',
								height: 120,
								flex: 1,
							}}
						>
							<Text
								style={{
									color: '#F1F1F1',
									marginBottom: -3,
									fontFamily: 'Ubuntu_400Regular',
								}}
							>
								Olá,
							</Text>
							<Text
								style={{
									fontSize: 32,
									color: Tema.colors.light,
									fontFamily: 'Ubuntu_700Bold',
								}}
							>
								{usuario.name}
							</Text>
						</View>
					</AvatarNome>
					<Text
						style={{
							textAlign: 'center',
							color: Tema.colors.light,
							padding: 30,
							alignSelf: 'center',
							fontFamily: 'Ubuntu_400Regular',
						}}
					>
						{usuario.email}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<View>
							<Text
								style={{
									color: '#F1F1F1',
									marginBottom: -8,
									fontFamily: 'Ubuntu_400Regular',
								}}
							>
								Saldo
							</Text>
							<Text
								style={{
									fontSize: 48,
									textAlign: 'left',
									color: Tema.colors.light,
									fontFamily: 'Ubuntu_700Bold',
								}}
							>
								R$ {usuario.credits}
							</Text>
						</View>
						<View>
							<Text
								style={{
									textAlign: 'right',
									color: '#F1F1F1',
									marginBottom: -8,
									fontFamily: 'Ubuntu_400Regular',
								}}
							>
								Entregas
							</Text>
							<Text
								style={{
									fontSize: 48,
									textAlign: 'right',
									color: Tema.colors.light,
									fontFamily: 'Ubuntu_700Bold',
								}}
							>
								{usuario.entregas || 0}
							</Text>
						</View>
					</View>
				</Box>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 25,
	},
	editarInfo: {
		textAlign: 'center',
		color: Tema.colors.light,
		paddingTop: 10,
		fontFamily: 'Ubuntu_400Regular',
	},
})
