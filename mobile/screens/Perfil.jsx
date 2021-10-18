import React from 'react'
import { View, Text, Image, StatusBar, ImageBackground } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from 'styled-components/native'
import Api from '../Api'

const Tab = createBottomTabNavigator()

export default () => {
	const [usuario, setUsuario] = React.useState({})
	React.useEffect(() => {}, [])
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#4E71D9',
			}}
		>
			<StatusBar barStyle='dark-content' backgroundColor='#FFF' />
			{/* VIEW BRANCA */}
			<View
				style={{
					padding: 25,
					flex: 0.5,
					backgroundColor: '#FFF',
					borderBottomLeftRadius: 50,
					borderBottomRightRadius: 50,
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingBottom: 25,
					}}
				>
					<View
						style={{
							width: 120,
							height: 120,
							backgroundColor: '#999',
							borderRadius: 15,
						}}
					>
						<ImageBackground
							source={{
								uri: 'http://afernandes.adv.br/wp-content/uploads/Team-Member-3.jpg',
							}}
							style={{ flex: 1, borderRadius: 15 }}
						/>
					</View>
					<View
						style={{
							marginLeft: 20,
							flex: 1,
							flexDirection: 'column',
						}}
					>
						<Text style={{ color: '#808080', marginBottom: -8 }}>
							Olá,
						</Text>
						<Text
							style={{
								flexShrink: 1,
								fontSize: 30,
								fontWeight: 'bold',
							}}
						>
							Fulano da Silva
						</Text>
					</View>
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View>
						<Text style={{ color: '#808080', marginBottom: -13 }}>
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
								marginBottom: -13,
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
			</View>
			<View
				style={{
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text
					style={{
						textAlign: 'center',
						color: '#FFF',
						paddingTop: 10,
					}}
				>
					Editar Informações
				</Text>
				<Image
					source={require('../assets/arrow_down.png')}
					resizeMode='contain'
					style={{
						width: 40,
						height: 40,
					}}
				/>
			</View>
		</View>
	)
}
