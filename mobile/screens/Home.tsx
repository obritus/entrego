import React from 'react'
import {
	View,
	Text,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import Api from '../Api'

import { Tema } from '../Styles'

export default (props: any) => {
	const [entregas, setEntregas] = React.useState([])

	React.useEffect(() => {
		const getEntregas = async () => {
			const Response = await Api.GetEntregas()
			const Data = Response.data
			setEntregas(Data)
		}
		getEntregas()
	}, [setEntregas])

	return (
		<View style={{ flex: 1, backgroundColor: Tema.colors.light }}>
			<StatusBar
				barStyle='light-content'
				backgroundColor={Tema.colors.primary}
			/>
			<MapView
				style={{ flex: 1 }}
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
					entregas.map((entrega: any) => (
						<Marker
							key={entrega.title}
							title={entrega.title}
							tracksViewChanges={false}
							coordinate={{
								latitude: entrega.latitude,
								longitude: entrega.longitude,
							}}
							//icon={require('../assets/marker.png')}
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
									<Text style={s.Title}>{entrega.title}</Text>
									<Text style={s.Description}>
										Entregar na Rua do Abacaxi, 123.
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
											ENTREGAR
										</Text>
										<Text
											style={{
												fontFamily: 'Ubuntu Bold',
												color: Tema.colors.primary,
											}}
										>
											R$ {entrega.price}
										</Text>
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
		padding: 10,
		borderRadius: 5,
		width: 160,
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
})
