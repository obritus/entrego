import React from 'react'
import { View, Text, Image, StatusBar, StyleSheet } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import styled from 'styled-components/native'
import Api from '../Api'

import { Tema } from '../Styles'

const Mapa = styled.View`
	flex: 1;
	background: ${(props) => props.theme.colors.light};
`
export default (props: any) => {
	const [entregas, setEntregas] = React.useState([])

	React.useEffect(() => {
		const getEntregas = async () => {
			const Response = await Api.GetEntregas()
			const Data = Response.data
			setEntregas(Data)
		}
		getEntregas()
	}, [])

	return (
		<Mapa>
			<StatusBar
				barStyle='light-content'
				backgroundColor={Tema.colors.primary}
			/>
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: -21.572084,
					longitude: -45.417926,
					latitudeDelta: 0.012,
					longitudeDelta: 0.012,
				}}
				userLocationPriority='passive'
				userLocationUpdateInterval={2000}
				showsUserLocation={true}
				showsPointsOfInterest={false}
				showsMyLocationButton={true}
				showsBuildings={false}
				showsIndoors={false}
				cacheEnabled={true}
			>
				{entregas.length > 0 &&
					entregas.map((entrega: any) => (
						<Marker
							key={entrega.title}
							flat={true}
							draggable
							coordinate={{
								latitude: entrega.latitude,
								longitude: entrega.longitude,
							}}
							image={require('../assets/marker.png')}
							style={{ borderRadius: 20 }}
						>
							<Callout onPress={() => alert('teste')}>
								<View style={s.Marker}>
									<Text style={s.Title}>{entrega.title}</Text>
									<Image
										source={require('../assets/marker.png')}
										style={{ width: 64, height: 64 }}
										resizeMode='contain'
									/>
								</View>
							</Callout>
							<MapViewDirections
								origin={{
									latitude: entrega.latitude,
									longitude: entrega.longitude,
								}}
								destination={{
									latitude: -21.57209,
									longitude: -45.41793,
								}}
								apikey='AIzaSyDIvZg5hysrVjLYfT0KA87ZUuxf949LJWE'
								strokeWidth={3}
								strokeColor={Tema.colors.primary}
							/>
						</Marker>
					))}
			</MapView>
		</Mapa>
	)
}

const s = StyleSheet.create({
	Marker: {
		padding: 10,
		borderRadius: 5,
		height: 128,
	},
	Title: {
		fontSize: 18,
	},
	Icon: {
		width: 40,
		height: 40,
	},
})
