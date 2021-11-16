import { PanGestureHandler } from 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import {
	View,
	Text,
	StatusBar,
	ImageBackground,
	StyleSheet,
	Button,
	Image,
	Animated,
} from 'react-native'
import Api from '../Api'
import { useAuth, User } from '../components/AuthContext'
import { Tema } from '../Styles'

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 25,
	},
	editarInfo: {
		textAlign: 'center',
		color: Tema.colors.light,
		paddingTop: 10,
		fontFamily: 'Ubuntu Regular',
	},
	box: {
		flex: 1,
		paddingHorizontal: 30,

		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		background: Tema.colors.primary,
	},
	avatarNome: {
		height: 150,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		overflow: 'hidden',
	},
	separador: {
		width: 300,
		height: 10,
	},
	swipeBox: {},
})

const Perfil: React.FC = () => {
	const { logOut, user } = useAuth()

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
				barStyle='default'
				backgroundColor={Tema.colors.primary}
			/>
			<View style={styles.box}>
				<Animated.View style={styles.swipeBox}>
					<View style={styles.avatarNome}>
						<View
							style={{
								width: 90,
								height: 90,
								backgroundColor: '#999',
								borderRadius: 20,
							}}
						>
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
						</View>
						<View
							style={{
								marginLeft: 20,
								flexDirection: 'column',
								justifyContent: 'center',
								height: 150,
								flex: 1,
							}}
						>
							<Text
								style={{
									color: '#F1F1F1',
									fontFamily: 'Ubuntu Regular',
									fontSize: 12,
								}}
							>
								Olá,
							</Text>
							<Text
								style={{
									fontSize: 20,
									color: Tema.colors.light,
									fontFamily: 'Ubuntu Bold',
								}}
							>
								{user?.nome}
							</Text>
							<Text
								style={{
									color: '#F1F1F1',
									fontFamily: 'Ubuntu Italic',
									fontSize: 12,
								}}
							>
								{user?.email}
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<View>
							<Text
								style={{
									color: '#F1F1F1',
									marginBottom: -2,
									fontFamily: 'Ubuntu Regular',
									fontSize: 12,
								}}
							>
								Dias restantes
							</Text>
							<Text
								style={{
									fontSize: 36,
									textAlign: 'left',
									// color:
									// 	user?.creditos > 0
									// 		? Tema.colors.light
									// 		: Tema.colors.danger,
									color: Tema.colors.light,
									fontFamily: 'Ubuntu Bold',
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
									marginBottom: -2,
									fontFamily: 'Ubuntu Regular',
									fontSize: 12,
								}}
							>
								Entregas
							</Text>
							<Text
								style={{
									fontSize: 36,
									textAlign: 'right',
									color: Tema.colors.light,
									fontFamily: 'Ubuntu Bold',
								}}
							>
								{user?.entregas || 0}
							</Text>
						</View>
					</View>
					<Text
						style={{
							textAlign: 'center',
							color: Tema.colors.light,
							paddingTop: 30,
							alignSelf: 'center',
							fontFamily: 'Ubuntu Regular',
							opacity: 0.5,
						}}
					>
						Editar Informações
					</Text>
					<Image
						source={require('../assets/arrow_down.png')}
						style={{
							width: 32,
							height: 32,
							alignSelf: 'center',
							opacity: 0.5,
						}}
					/>
				</Animated.View>
				<Button
					onPress={logOut}
					title='Sair'
					color={Tema.colors.primary}
				/>
			</View>
		</View>
	)
}

export default Perfil
