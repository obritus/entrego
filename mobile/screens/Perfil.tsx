import * as React from 'react'
import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	StatusBar,
	Button,
} from 'react-native'
import { useAuth, User } from '../components/AuthContext'
import Tema from '../Styles'
import EditProfile from '../components/EditProfile'

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 25,
	},
	box: {
		flex: 1,
		paddingHorizontal: 32,
		alignContent: 'space-between',
		background: Tema.colors.primary,
	},
})

interface Props {
	navigation: any
	user: User
}
const PerfilBox: React.FC<Props> = ({ user }) => (
	<View
		style={{
			height: 252,
			alignItems: 'center',
			paddingTop: 54,
			marginHorizontal: 32,
			marginBottom: 30,
		}}
	>
		<View
			style={{
				width: 90,
				height: 90,
				backgroundColor: '#999',
				borderRadius: 20,
			}}
		>
			{user.avatar.location && (
				<ImageBackground
					source={{
						uri: user?.avatar?.location,
					}}
					style={{
						flex: 1,
						borderRadius: 20,
						overflow: 'hidden',
					}}
				/>
			)}
		</View>
		<View
			style={{
				width: '100%',
				flexDirection: 'column',
				justifyContent: 'space-between',
				borderBottomColor: '#00000050',
				borderBottomWidth: 1,
				flex: 1,
				paddingTop: 26,
				paddingBottom: 30,
			}}
		>
			<Text
				style={{
					color: '#F1F1F1',
					fontFamily: Tema.fonts.regular,
					fontSize: 12,
					textAlign: 'center',
				}}
			>
				Olá,
			</Text>
			<Text
				style={{
					fontSize: 20,
					color: Tema.colors.light,
					fontFamily: Tema.fonts.bold,
					textAlign: 'center',
				}}
			>
				{user?.nome}
			</Text>
			<Text
				style={{
					color: '#F1F1F1',
					fontFamily: Tema.fonts.regular,
					fontSize: 12,
					textAlign: 'center',
				}}
			>
				{user?.email}
			</Text>
		</View>
	</View>
)

const Perfil: React.FC<{ navigation: any }> = ({ navigation }) => {
	const { user, logOut } = useAuth()

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				overflow: 'hidden',
				backgroundColor: Tema.colors.primary,
			}}
		>
			<StatusBar
				barStyle={'light-content'}
				backgroundColor={Tema.colors.primary}
			/>
			<PerfilBox user={user} />
			<View style={styles.box}>
				<View
					style={{
						height: 64,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View>
						<Text
							style={{
								color: '#F1F1F1',
								fontFamily: Tema.fonts.regular,
								fontSize: 12,
							}}
						>
							Dias restantes
						</Text>
						<Text
							style={{
								fontSize: 48,
								textAlign: 'left',
								color:
									user?.creditos > 0
										? Tema.colors.light
										: Tema.colors.danger,
								fontFamily: Tema.fonts.bold,
							}}
						>
							{user?.creditos}
						</Text>
					</View>
					<View>
						<Text
							style={{
								textAlign: 'right',
								color: '#F1F1F1',
								fontFamily: Tema.fonts.regular,
								fontSize: 12,
							}}
						>
							Entregas
						</Text>
						<Text
							style={{
								fontSize: 48,
								textAlign: 'right',
								color: Tema.colors.light,
								fontFamily: Tema.fonts.bold,
							}}
						>
							{user?.entregas || 0}
						</Text>
					</View>
				</View>
			</View>
			<View nativeID='Botão voltar'>
				<Button
					onPress={() => navigation.goBack()}
					title='Voltar'
				></Button>
			</View>
			<View nativeID='Botão sair'>
				<Button
					onPress={() => logOut(navigation)}
					title='Desconectar'
				></Button>
			</View>
		</View>
	)
}

export default Perfil
