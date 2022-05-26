import React, { useContext } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import Api from '../Api'
import { useAuth } from '../components/AuthContext'
import Tema from '../Styles'

import EntregaCard from './EntregaCard'

interface Props {
	navigation: any
}

const EntregasList: React.FC<Props> = (props: any) => {
	const [entregas, setEntregas] = React.useState([])
	const [entregasRealizadas, setEntregasRealizadas] = React.useState([])
	const { user } = useAuth()

	React.useEffect(() => {
		const GetEntregas = async () => {
			const response = await Api.GetEntregas({ status: 0 })
			const data = await response.data
			setEntregas(data)
		}
		const GetEntregasRealizadas = async () => {
			const response = await Api.GetEntregas({
				status: 4,
				userId: user.id,
			})
			const data = await response.data
			setEntregasRealizadas(data)
		}
		GetEntregas()
		GetEntregasRealizadas()
	}, [])

	return (
		<View
			style={{ flex: 1, justifyContent: 'center', paddingVertical: 32 }}
		>
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
						{entregasRealizadas.length > 1 &&
						entregasRealizadas.length < 1
							? 'Entregas Realizadas'
							: 'Entrega Realizada'}
					</Text>
					<FlatList
						style={{
							flex: 1,
							paddingHorizontal: 15,
							maxHeight: 100,
							flexDirection: 'row',
						}}
						data={entregasRealizadas}
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
