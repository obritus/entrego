import React from 'react'
import {
	View,
	Text,
	StatusBar,
	ImageBackground,
	StyleSheet,
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Api from '../Api'
import { Tema } from '../Styles'

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
		fontFamily: 'Ubuntu Regular',
	},
	box: {
		flex: 1,
		padding: 30,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		background: Tema.colors.primary,
	},
	avatarNome: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		overflow: 'hidden',
		paddingBottom: 60,
	},
	separador: {
		width: 300,
		height: 10,
		background: Tema.colors.light,
		marginVertical: 40,
	},
})

const Tab = createBottomTabNavigator()

type user = {
	_id: string
	nome: string
	email: string
	cpf: number
	creditos: number
	avatar: {
		location: string
	}
	entregas: number
}

export default () => {
	const [usuario, setUsuario] = React.useState({} as user)

	React.useEffect(() => {
		const GetEntregador = async () => {
			try {
				const Response = await Api.GetEntregador(
					'61675b2b93224cc1d1be7f9a'
				)
				const Data = Response.data
				setUsuario(Data)
			} catch (error) {
				console.error(error)
			}
		}

		GetEntregador()
	}, [])

	return (
		<View
			style={{
				flex: 1,
				borderBottomEndRadius: 30,
				borderBottomStartRadius: 30,
				overflow: 'hidden',
				backgroundColor: Tema.colors.primary,
			}}
		>
			<StatusBar
				barStyle='light-content'
				backgroundColor={Tema.colors.primary}
			/>
			{Object.keys(usuario).length > 0 && (
				<View style={styles.box}>
					<View style={styles.avatarNome}>
						<View
							style={{
								width: 90,
								height: 90,
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
								height: 85,
								flex: 1,
							}}
						>
							<Text
								style={{
									color: '#F1F1F1',
									marginBottom: -3,
									fontFamily: 'Ubuntu Regular',
									fontSize: 12,
								}}
							>
								Olá,
							</Text>
							<Text
								style={{
									fontSize: 20,
									color: Tema.colors.light,
									fontFamily: 'Ubuntu Bold',
								}}
							>
								{usuario.nome}
							</Text>
						</View>
					</View>
					<View style={styles.separador} />
					<Text
						style={{
							textAlign: 'center',
							color: Tema.colors.light,
							padding: 30,
							alignSelf: 'center',
							fontFamily: 'Ubuntu Regular',
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
									marginBottom: -2,
									fontFamily: 'Ubuntu Regular',
									fontSize: 12,
								}}
							>
								Saldo
							</Text>
							<Text
								style={{
									fontSize: 36,
									textAlign: 'left',
									color: Tema.colors.light,
									fontFamily: 'Ubuntu Bold',
								}}
							>
								R$ {usuario.creditos}
							</Text>
						</View>
						<View>
							<Text
								style={{
									textAlign: 'right',
									color: '#F1F1F1',
									marginBottom: -2,
									fontFamily: 'Ubuntu Regular',
									fontSize: 12,
								}}
							>
								Entregas
							</Text>
							<Text
								style={{
									fontSize: 36,
									textAlign: 'right',
									color: Tema.colors.light,
									fontFamily: 'Ubuntu Bold',
								}}
							>
								{usuario.entregas || 0}
							</Text>
						</View>
					</View>
				</View>
			)}
		</View>
	)
}
