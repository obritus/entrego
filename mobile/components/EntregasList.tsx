import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from 'react-native'
import Api from '../Api'
import { Tema } from '../Styles'

import EntregaCard from './EntregaCard'

export default (props: any) => {
	const [entregas, setEntregas] = React.useState([])

	React.useEffect(() => {
		Api.GetEntregas().then((data) => {
			setEntregas(data.data)
		})
	}, [])

	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			{entregas.length > 0 ? (
				<View style={{ flex: 1 }}>
					<FlatList
						style={{
							flex: 1,
							marginHorizontal: 30,
						}}
						data={entregas}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<EntregaCard
								item={item}
								onPress={() =>
									props.navigation.navigate(
										'Detalhes da entrega'
									)
								}
							/>
						)}
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
							<EntregaCard
								item={item}
								horizontal={true}
								onPress={() =>
									props.navigation.navigate({
										name: 'Detalhes da entrega',
									})
								}
							/>
						)}
					/>
				</View>
			) : (
				<ActivityIndicator size='large' color={Tema.colors.primary} />
			)}
		</View>
	)
}
