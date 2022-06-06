import React from 'react'
import {
	Text,
	View,
	StatusBar,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	ImageBackground,
	PermissionsAndroid,
} from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import Api from '../Api'
import { useAuth } from '../components/AuthContext'

import Tema from '../Styles'

export interface Entregas {
	id: string
	price: number
	cliente: {
		nome: string | ''
		logotipo: string | ''
		endereco: {
			latitude: number
			longitude: number
			logradouro: string
		}
	}
	contato: {
		nome: string
		telefone: number
		latitude: number
		longitude: number
		endereco: string
		obs?: string
	}
	status: number
}

const ObterPermissao = async () => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: 'Permissão de localização',
				message:
					'Precisamos de sua permissão para acessar sua localização',
				buttonNeutral: 'Pergunte-me depois',
				buttonNegative: 'Cancelar',
				buttonPositive: 'OK',
			}
		)
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('Você pode usar a localização')
		} else {
			console.table('A permissão de uso da localização foi negada')
		}
	} catch (err) {
		console.warn(err)
	}
}

export default (props: any) => {
	const [entregas, setEntregas] = React.useState([])
	const { logOut, user } = useAuth()

	React.useEffect(() => {
		ObterPermissao()
		setTimeout(() => {
			Api.GetEntregas({ status: 0 })
				.then((response) => {
					setEntregas(response.data)
				})
				.catch((error) => {
					console.log(error)
				})
		}, 1000)

		console.log(props.navigation)
	}, [setEntregas])

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: Tema.colors.light,
			}}
		>
			<StatusBar
				barStyle={'dark-content'}
				backgroundColor={Tema.colors.light}
				animated
			/>
			<View
				style={{
					width: 64,
					height: 64,
					borderRadius: 32,
					backgroundColor: '#999',
					position: 'absolute',
					overflow: 'hidden',
					top: 30,
					left: 30,
					zIndex: 1100,
				}}
				nativeID={'FotoPerfilTopo'}
			>
				<TouchableOpacity
					onPress={() => props.navigation.navigate('Perfil')}
					style={{ width: 64, height: 64 }}
				>
					<ImageBackground
						source={
							user.avatar.location
								? { uri: user.avatar.location }
								: require('../assets/capacete.png')
						}
						style={s.ProfileIcon}
					/>
				</TouchableOpacity>
			</View>

			<View style={s.EntregasIcon} nativeID='IconeEntrega'>
				<TouchableOpacity
					onPress={() =>
						props.navigation.navigate('Entregas', {
							entregas: entregas,
						})
					}
					style={{
						width: 100,
						height: 100,
						borderRadius: 50,
					}}
				>
					<ImageBackground
						source={require('../assets/entregas_icon.png')}
						style={{
							width: '100%',
							height: 100,
							borderRadius: 50,
						}}
						imageStyle={{
							width: 42,
							height: 42,
							top: 29,
							left: 29,
						}}
					/>
				</TouchableOpacity>
			</View>

			<MapView
				style={{ flex: 1 }}
				provider={PROVIDER_GOOGLE}
				region={{
					latitude: -21.5698,
					longitude: -45.4367,
					latitudeDelta: 0.08,
					longitudeDelta: 0.08,
				}}
				userLocationPriority='passive'
				userLocationUpdateInterval={2000}
				showsUserLocation={true}
				showsPointsOfInterest={false}
				showsMyLocationButton={true}
				showsBuildings={false}
				showsIndoors={false}
				zoomControlEnabled={true}
			>
				{entregas.length > 0 &&
					entregas.map((entrega: Entregas) => (
						<Marker
							key={entrega.id}
							title={entrega.cliente?.nome}
							tracksViewChanges={false}
							coordinate={{
								latitude: entrega.cliente.endereco.latitude,
								longitude: entrega.cliente.endereco.longitude,
							}}
							icon={require('../assets/marker.png')}
							description='Lorem ipsum'
						>
							<Callout
								onPress={() =>
									props.navigation.navigate(
										'Entregas',
										entrega
									)
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
										></Text>
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
		padding: 20,
		width: 260,
	},
	Title: {
		fontSize: 18,
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
	ProfileIcon: { width: 64, height: 64 },
	EntregasIcon: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: Tema.colors.light,
		position: 'absolute',
		overflow: 'hidden',
		bottom: 30,
		alignSelf: 'center',
		zIndex: 1100,
		borderColor: '#00000015',
		borderWidth: 2,
	},
})
