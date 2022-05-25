import React, { useContext } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import Api from '../Api'
import { BarraDeStatus } from '../App'
import Tema from '../Styles'

import EntregaCard from './EntregaCard'

interface Props {
	navigation: any
}

const EntregasList: React.FC<Props> = (props: any) => {
	const [entregas, setEntregas] = React.useState([])

	React.useEffect(() => {
		const GetEntregas = async () => {
			const response = await Api.GetEntregas({ status: 0 })
			const data = await response.data
			setEntregas(data)
		}
		GetEntregas()
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
									props.navigation.navigate('Detalhes', item)
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
									props.navigation.navigate('Detalhes', item)
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

export default EntregasList
