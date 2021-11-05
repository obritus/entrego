import React from 'react'

import { Swipeable } from 'react-native-gesture-handler'
import {
	SafeAreaView,
	FlatList,
	Text,
	View,
	Image,
	Permission,
} from 'react-native'
import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Tema } from '../Styles'
import Api from '../Api'

import EntregaCard from '../components/EntregaCard'

const Stack = createNativeStackNavigator()

export default () => {
	const [entregas, setEntregas] = React.useState([])

	React.useEffect(() => {
		Api.GetEntregas().then((data) => {
			setEntregas(data.data)
		})
	}, [])

	return (
		<View style={{ flex: 1 }}>
			<StatusBar
				barStyle='dark-content'
				backgroundColor={Tema.colors.light}
			/>
			{entregas.length > 0 && (
				<View style={{ flex: 1 }}>
					<FlatList
						style={{
							flex: 1,
							marginHorizontal: 30,
						}}
						data={entregas}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => <EntregaCard item={item} />}
					/>
					<Text
						style={{
							textAlign: 'center',
							fontFamily: 'Ubuntu Bold',
							fontSize: 14,
							paddingVertical: 15,
							color: Tema.colors.primary,
						}}
					>
						{entregas.length} Entregas finalizadas
					</Text>
					<FlatList
						style={{
							flex: 1,
							paddingHorizontal: 15,
							maxHeight: 100,
							flexDirection: 'row',
						}}
						data={entregas}
						horizontal={true}
						renderItem={({ item }) => (
							<EntregaCard item={item} horizontal={true} />
						)}
					/>
				</View>
			)}
		</View>
	)
}
