import React from 'react'
import {
	Text,
	View,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
} from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import Api from '../Api'
import { BarraDeStatus } from '../App'
import { useAuth } from '../components/AuthContext'

import Tema from '../Styles'

interface Entregas {
	id: number
	price: number
	status: number
	cliente: {
		nome: string
		logotipo: string | ''
		latitude: number
		longitude: number
	}
	contato: {
		nome: string
		telefone: number
		latitude: number
		longitude: number
		endereco: string
		observacoes?: string
	}
}

export default (props: any) => {
	const [entregas, setEntregas] = React.useState([])
	const { logOut, user } = useAuth()

	React.useEffect(() => {
		const getEntregas = async () => {
			const Response = await Api.GetEntregas()
			const Data = Response.data
			setEntregas(Data)
		}
		getEntregas()
	}, [setEntregas])

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: Tema.colors.light,
			}}
		>
			<ImageBackground
				source={{
					uri: user?.avatar?.location,
				}}
				style={s.ProfileIcon}
			/>
			<MapView
				style={{
					flex: 1,
					borderBottomRightRadius: 15,
					borderBottomLeftRadius: 15,
				}}
				provider={PROVIDER_GOOGLE}
				region={{
					latitude: -21.572084,
					longitude: -45.417926,
					latitudeDelta: 0.115,
					longitudeDelta: 0.1121,
				}}
				userLocationPriority='passive'
				userLocationUpdateInterval={2000}
				showsUserLocation={true}
				showsPointsOfInterest={false}
				showsMyLocationButton={true}
				showsBuildings={false}
				showsIndoors={false}
			>
				{entregas.length > 0 &&
					entregas.map((entrega: Entregas) => (
						<Marker
							key={entrega.id}
							title={entrega.cliente.nome}
							tracksViewChanges={false}
							coordinate={{
								latitude: entrega.cliente.latitude,
								longitude: entrega.cliente.longitude,
							}}
							icon={require('../assets/marker.png')}
						>
							<Callout
								onPress={() =>
									props.navigation.navigate('Entregas', {
										screen: 'Detalhes da entrega',
										entrega,
									})
								}
							>
								<View style={s.Marker}>
									<Text style={s.Title}>
										{entrega.cliente.nome}
									</Text>
									<TouchableOpacity
										style={{
											flexDirection: 'row',
											justifyContent: 'center',
											backgroundColor:
												Tema.colors.secondary,
											padding: 5,
										}}
									>
										<Text
											style={{
												fontFamily: 'Ubuntu Regular',
												color: Tema.colors.primary,
												marginEnd: 4,
											}}
										>
											2 ENTREGAS DISPONÍVEIS
										</Text>
									</TouchableOpacity>
								</View>
							</Callout>
						</Marker>
					))}
			</MapView>
		</SafeAreaView>
	)
}

const s = StyleSheet.create({
	Marker: {
		padding: 10,
		width: 260,
	},
	Title: {
		fontSize: 12,
		fontFamily: 'Ubuntu Bold',
		textAlign: 'center',
		marginBottom: 5,
		color: Tema.colors.primary,
	},
	Description: {
		fontSize: 10,
		fontFamily: 'Ubuntu Italic',
		textAlign: 'center',
		marginBottom: 5,
	},
	Icon: {
		width: 40,
		height: 40,
	},
	ProfileIcon: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: Tema.colors.primary,
		position: 'absolute',
		overflow: 'hidden',
		top: 30,
		right: 30,
		zIndex: 1100,
	},
})
