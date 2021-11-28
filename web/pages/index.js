import React from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

import boxEntrega from '../components/boxEntrega'

const Map = () => {
	const [map, setMap] = React.useState(null)
	const [marker, setMarker] = React.useState([])
	const [showBox, setShowBox] = React.useState(false)

	return (
		<GoogleMap
			ref={(map) => setMap(map)}
			defaultZoom={16}
			defaultCenter={{ lat: -21.535458801711265, lng: -45.451711755654436 }}
			defaultOptions={{
			}}
			onClick={(e) => {
				const lat = e.latLng.lat()
				const lng = e.latLng.lng()

				setMarker([
					...marker,
					{
						lat: lat,
						lng: lng
					}
				])
			}}
		>
			{marker.length > 0 && marker.map((marker, index) => (
				<Marker
					key={index}
					position={{ lat: marker.lat, lng: marker.lng }}
				/>
			))}
		</GoogleMap>
	)
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

const Index = () => {
	React.useEffect(() => {
		console.log(window.innerHeight)
	}, [])

	return (
		<div className='bg-dark d-flex h-100'>
			<WrappedMap
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ flex: 1, minHeight: '100%' }} />}
				mapElement={<div style={{ height: `100%` }} />}
				googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDIvZg5hysrVjLYfT0KA87ZUuxf949LJWE"}
			/>
		</div>
	)
}

export default Index