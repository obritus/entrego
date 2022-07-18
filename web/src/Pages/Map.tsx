import React, { useState, useEffect } from 'react'
import {
	GoogleMap,
	LoadScript,
	useJsApiLoader,
	Marker,
} from '@react-google-maps/api'

const Index = () => {
	useEffect(() => {
		document.title = 'Mapa'
	}, [])

	const containerStyle = {
		width: '100%',
	}
	return (
		<LoadScript googleMapsApiKey='AIzaSyDIvZg5hysrVjLYfT0KA87ZUuxf949LJWE'>
			<GoogleMap
				zoom={14}
				options={{}}
				mapContainerStyle={containerStyle}
				center={{
					lat: -21.576043,
					lng: -45.439044,
				}}
			>
				<Marker
					title='TEsasdasdaste'
					position={{ lat: -21.576043, lng: -45.439044 }}
				>
					asdasdsad
				</Marker>
			</GoogleMap>
		</LoadScript>
	)
}

export default Index
