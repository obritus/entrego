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
import { useNavigation } from '@react-navigation/native'
import Tema from '../Styles'
import MapStyle from '../MapStyle.json'

export interface Entregas {
	_id: string
	price: number
	cliente: {
		_id: string
		nome: string | ''
		logotipo: string | ''
		telefone: string
		endereco: {
			latitude: number
			longitude: number
			logradouro: string
		}
	}
	contato: {
		nome: string
		telefone: string
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

	const navigation = useNavigation()

	React.useEffect(() => {
		ObterPermissao()
		Api.GetEntregas({ status: 0 })
			.then((response) => {
				const Filter = response.data.filter((data: Entregas) => {
					return data.cliente._id === '62a12fe8176132e9211f00c5'
				})
				console.warn('Total de entregas:', Filter.length)
				setEntregas(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [setEntregas])

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: Tema.colors.light,
			}}
		>
			<StatusBar
				barStyle={'light-content'}
				backgroundColor={Tema.colors.dark}
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
				customMapStyle={MapStyle}
			>
				{entregas.length > 0 &&
					entregas.map((entrega: Entregas) => (
						<Marker
							key={entrega._id}
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
									navigation.navigate('Entregas', {
										screen: 'EntregaDetalhes',
										params: entregas,
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
												fontFamily: Tema.fonts.regular,
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
		</View>
	)
}

const s = StyleSheet.create({
	Marker: {
		padding: 20,
		width: 260,
	},
	Title: {
		fontSize: 16,
		fontFamily: Tema.fonts.bold,
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
