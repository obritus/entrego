import React from 'react'
import { View, Text, Image, StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Api from '../Api'

const Tab = createBottomTabNavigator()

export default () => {
	const [usuario, setUsuario] = React.useState({})
	React.useEffect(() => {}, [])
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#1FB2F1',
			}}
		>
			<StatusBar barStyle='dark-content' backgroundColor='#FFF' />
			<View
				style={{
					padding: 25,
					height: 350,
					backgroundColor: '#FFF',
					borderBottomLeftRadius: 50,
					borderBottomRightRadius: 50,
				}}
			>
				<Text style={{ color: '#808080', marginBottom: -10 }}>
					Olá,
				</Text>
				<Text
					style={{
						fontSize: 32,
						fontWeight: 'bold',
						marginBottom: 25,
					}}
				>
					Fulano da Silva
				</Text>

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View>
						<Text style={{ color: '#808080', marginBottom: -15 }}>
							Saldo
						</Text>
						<Text
							style={{
								fontSize: 48,
								fontWeight: 'bold',
								textAlign: 'left',
							}}
						>
							R$ 25
						</Text>
					</View>
					<View>
						<Text
							style={{
								textAlign: 'right',
								color: '#808080',
								marginBottom: -15,
							}}
						>
							Entregas
						</Text>
						<Text
							style={{
								fontSize: 48,
								fontWeight: 'bold',
							}}
						>
							42
						</Text>
					</View>
				</View>
				<Text style={{ textAlign: 'center', color: '#808080' }}>
					Editar Informações
				</Text>
			</View>
		</View>
	)
}
