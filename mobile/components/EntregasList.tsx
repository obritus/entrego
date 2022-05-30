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
		console.log(props)
		const GetEntregas = async () => {
			const response = await Api.GetEntregas({ status: 0 })
			const data = await response.data
			setEntregas(data)
		}
		const GetEntregasRealizadas = async () => {
			const response = await Api.GetEntregas({
				status: 4,
				userId: user._id,
			})
			const data = await response.data
			setEntregasRealizadas(data)
		}
		GetEntregas()
		GetEntregasRealizadas()
	}, [])

	return (
		<View style={{ flex: 1, paddingVertical: 32 }}>
			<Text
				style={{
					fontFamily: 'Ubuntu Bold',
					fontSize: 18,
					textAlign: 'center',
					color: Tema.colors.primary,
				}}
			>
				Entregas disponíveis
			</Text>
			<Text
				style={{
					fontFamily: 'Ubuntu Regular',
					fontSize: 14,
					textAlign: 'center',
					marginBottom: 16,
					color: Tema.colors.primary,
				}}
			>
				Entregas disponíveis
			</Text>
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
				</View>
			) : (
				<ActivityIndicator size='large' color={Tema.colors.primary} />
			)}
		</View>
	)
}

export default EntregasList
