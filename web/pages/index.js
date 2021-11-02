import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logotipo from '../assets/logotipo.webp'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

const Map = () => {
	const [map, setMap] = React.useState(null)
	return (
		<GoogleMap
			ref={(map) => setMap(map)}
			defaultZoom={17}
			defaultCenter={{ lat: -21.535458801711265, lng: -45.451711755654436 }}
			onClick={(e) => console.log(e.latLng)}
		>
			<Marker position={{ lat: -21.535458801711265, lng: -45.451711755654436 }} />
		</GoogleMap>
	)
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

const Index = () => {
	return (
		<div className='bg-dark'>
			<WrappedMap
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `100vh` }} />}
				mapElement={<div style={{ height: `100%` }} />}
				googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDIvZg5hysrVjLYfT0KA87ZUuxf949LJWE"}
			/>
		</div>
	)
}

export default Index