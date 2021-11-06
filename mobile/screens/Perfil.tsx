import React, { useEffect } from 'react'
import {
	View,
	Text,
	StatusBar,
	ImageBackground,
	StyleSheet,
	ActivityIndicator,
	Image,
	Animated,
} from 'react-native'
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
		flexDirection: 'row',
		justifyContent: 'space-between',
		overflow: 'hidden',
		paddingBottom: 30,
	},
	separador: {
		width: 300,
		height: 10,
	},
})

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

	useEffect(() => {
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
				justifyContent: 'center',
				overflow: 'hidden',
				backgroundColor: Tema.colors.primary,
			}}
		>
			<StatusBar
				barStyle='light-content'
				backgroundColor={Tema.colors.primary}
			/>
			{Object.keys(usuario).length > 0 ? (
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
								height: 90,
								flex: 1,
							}}
						>
							<Text
								style={{
									color: '#F1F1F1',
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
							<Text
								style={{
									color: '#F1F1F1',
									fontFamily: 'Ubuntu Italic',
									fontSize: 12,
								}}
							>
								{usuario.email}
							</Text>
						</View>
					</View>
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
								Dias restantes
							</Text>
							<Text
								style={{
									fontSize: 36,
									textAlign: 'left',
									color:
										usuario.creditos > 0
											? Tema.colors.light
											: Tema.colors.danger,
									fontFamily: 'Ubuntu Bold',
								}}
							>
								{usuario.creditos}
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
					<Text
						style={{
							textAlign: 'center',
							color: Tema.colors.light,
							paddingTop: 30,
							alignSelf: 'center',
							fontFamily: 'Ubuntu Regular',
						}}
					>
						Editar Informações
					</Text>
					<Image
						source={require('../assets/arrow_down.png')}
						style={{
							width: 32,
							height: 32,
							alignSelf: 'center',
						}}
					/>
				</View>
			) : (
				<ActivityIndicator size='large' color={Tema.colors.light} />
			)}
		</View>
	)
}
