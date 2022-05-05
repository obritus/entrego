import React from 'react'
import Head from 'next/head'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

import boxEntrega from '../components/boxEntrega'

const Map = () => {
	const [map, setMap] = React.useState(null)
	const [marker, setMarker] = React.useState([])
	const [showBox, setShowBox] = React.useState(false)
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyDIvZg5hysrVjLYfT0KA87ZUuxf949LJWE',
	})

	const onLoad = React.useCallback((map) => {
		const bounds = new window.google.maps.LatLngBounds()
		map.fitBounds(bounds)
		setMap(map)
	}, [])

	const onUnmount = React.useCallback(() => {
		setMap(null)
	}, [])

	return isLoaded ? (
		<GoogleMap
			center={{
				lat: -21.5355,
				lng: -45.45152,
			}}
			zoom={15}
			onLoad={onLoad}
			onUnmount={onUnmount}
			mapContainerStyle={{
				width: '100%',
				height: 'calc(100vh - 130px)',
			}}
		>
			<Marker
				position={{
					lat: -21.5355,
					lng: -45.45152,
				}}
				draggable={true}
				label='teste teste teste'
			/>
		</GoogleMap>
	) : (
		<></>
	)
}

const Index = () => {
	return (
		<div className='bg-dark d-flex h-100'>
			<Head>
				<title>Entrego | O aplicativo de entrega...</title>
			</Head>
			<Map />
		</div>
	)
}

export default Index
