import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// import MapIcon from '../assets/map_icon.svg'
// import EntregasIcon from '../assets/entregas_icon.svg'
// import PerfilIcon from '../assets/profile_icon.svg'

import Mapa from '../screens/Home'
import Entregas from '../screens/Entregas'
import Perfil from '../screens/Perfil'

const Nav = styled.View`
	display: flex;
	align-items: center;
	height: 15%;
	background: #1fb2f1;
`

const NavItem = styled.TouchableOpacity`
	justify-content: center;
	display: flex;
	background: white;
`

const Icon = styled.Image`
	width: 50px;
	height: 50px;
`

const Tab = createBottomTabNavigator()

export default () => (
	<Tab.Navigator>
		<Tab.Screen name='Mapa' component={Mapa} />
		<Tab.Screen name='Entregas' component={Entregas} />
		<Tab.Screen name='Perfil' component={Perfil} />
		{/* <Nav>
			<NavItem>
				<Text style={{ fontSize: 12 }}>Mapa</Text>
			</NavItem>
			<NavItem>
				<Icon source={EntregasIcon} />
				<Text style={{ fontSize: 12 }}>Entregas</Text>
			</NavItem>
			<NavItem>
				<Icon source={PerfilIcon} />
				<Text style={{ fontSize: 12 }}>Perfil</Text>
			</NavItem>
		</Nav> */}
	</Tab.Navigator>
)
