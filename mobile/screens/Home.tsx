import React from 'react'
import {
	View,
	Text,
	ImageBackground,
	Button,
	Dimensions,
	StatusBar,
} from 'react-native'
import MapView from 'react-native-maps'
import styled from 'styled-components/native'
import * as Permissions from 'expo-permissions'

import { Tema } from '../Styles'

const Mapa = styled.View`
	flex: 1;
	background: ${(props) => props.theme.colors.light};
`
export default (props: any) => {
	async function alertIfRemoteNotificationsDisabledAsync() {
		const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
		if (status !== 'granted') {
			alert(
				'Hey! You might want to enable notifications for my app, they are good.'
			)
		}
	}

	async function checkMultiPermissions() {
		const { status, expires, permissions } = await Permissions.getAsync(
			Permissions.CALENDAR,
			Permissions.CONTACTS
		)
		if (status !== 'granted') {
			alert('Hey! You have not enabled selected permissions')
		}
	}
	React.useEffect(() => {}, [])
	return (
		<Mapa>
			{/* <StatusBar
			barStyle='light-content'
			backgroundColor={Tema.colors.primary}
		/> */}
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: -21.572084,
					longitude: -45.417926,
					latitudeDelta: 0.008,
					longitudeDelta: 0.008,
				}}
				userLocationUpdateInterval={2000}
				showsUserLocation={true}
				showsPointsOfInterest={false}
				showsMyLocationButton={true}
				showsBuildings={false}
				key='AIzaSyDIvZg5hysrVjLYfT0KA87ZUuxf949LJWE'
			></MapView>
			<Button
				title='Checar Localização'
				onPress={() => alertIfRemoteNotificationsDisabledAsync()}
			/>
		</Mapa>
	)
}
