import {
	PanGestureHandler,
	State,
	GestureHandlerRootView,
} from 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import {
	View,
	Text,
	StatusBar,
	ImageBackground,
	StyleSheet,
	Image,
	Animated,
} from 'react-native'
import Api from '../Api'
import { useAuth } from '../components/AuthContext'
import Tema from '../Styles'
import EditProfile from '../components/EditProfile'

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
		fontFamily: Tema.fonts.regular,
	},
	box: {
		flex: 1,
		paddingHorizontal: 30,
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
	const { user } = useAuth()
	const translateY = new Animated.Value(0)
	const [inputRange, setInputRange] = React.useState(0)
	let offset = 0

	const animatedEvent = Animated.event(
		[
			{
				nativeEvent: {
					translationY: translateY,
				},
			},
		],
		{ useNativeDriver: true }
	)

	const onHandlerStateChange = (event: any) => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			let opened = false
			const { translationY } = event.nativeEvent
			offset += translationY

			if (translationY >= 60) {
				opened = true
			} else {
				translateY.setValue(offset)
				translateY.setOffset(0)
				offset = 0
			}

			Animated.timing(translateY, {
				toValue: opened ? 500 : 0,
				duration: 200,
				useNativeDriver: true,
			}).start(() => {
				offset = opened ? 500 : 0
				translateY.setOffset(offset)
				translateY.setValue(0)
			})
		}
	}

	return (
		<GestureHandlerRootView
			onLayout={(event) => {
				setInputRange(event.nativeEvent.layout.height / 2)
				console.log(inputRange)
			}}
			style={{
				flex: 1,
				justifyContent: 'center',
				overflow: 'hidden',
				backgroundColor: Tema.colors.primary,
				borderBottomRightRadius: 15,
				borderBottomLeftRadius: 15,
			}}
		>
			<StatusBar
				barStyle='default'
				backgroundColor={Tema.colors.primary}
			/>
			<View style={styles.box}>
				<EditProfile translateY={translateY} />
				<Animated.View
					style={{
						...styles.swipeBox,
					}}
				>
					<Animated.View
						style={{
							...styles.avatarNome,
							opacity: translateY.interpolate({
								inputRange: [0, 100],
								outputRange: [1, 0],
								extrapolate: 'clamp',
							}),
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
									fontFamily: Tema.fonts.regular,
									fontSize: 12,
								}}
							>
								Olá,
							</Text>
							<Text
								style={{
									fontSize: 20,
									color: Tema.colors.light,
									fontFamily: Tema.fonts.bold,
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
					</Animated.View>
					<Animated.View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							width: '100%',
							opacity: translateY.interpolate({
								inputRange: [0, 100],
								outputRange: [1, 0],
								extrapolate: 'clamp',
							}),
						}}
					>
						<View>
							<Text
								style={{
									color: '#F1F1F1',
									marginBottom: -2,
									fontFamily: Tema.fonts.regular,
									fontSize: 12,
								}}
							>
								Dias restantes
							</Text>
							<Text
								style={{
									fontSize: 36,
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
									marginBottom: -2,
									fontFamily: Tema.fonts.regular,
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
									fontFamily: Tema.fonts.bold,
								}}
							>
								{user?.entregas || 0}
							</Text>
						</View>
					</Animated.View>
					<PanGestureHandler
						onGestureEvent={animatedEvent}
						onHandlerStateChange={onHandlerStateChange}
					>
						<Animated.View
							style={{
								width: '100%',
								transform: [
									{
										translateY: translateY.interpolate({
											inputRange: [0, inputRange],
											outputRange: [0, inputRange],
											extrapolate: 'clamp',
										}),
									},
								],
							}}
						>
							<Animated.Text
								style={{
									textAlign: 'center',
									color: Tema.colors.light,
									paddingTop: 30,
									alignSelf: 'center',
									fontFamily: Tema.fonts.regular,
									opacity: translateY.interpolate({
										inputRange: [0, 100],
										outputRange: [0.5, 1],
										extrapolate: 'clamp',
									}),
								}}
							>
								Editar Informações
							</Animated.Text>
							<Animated.Image
								source={require('../assets/arrow_down.png')}
								style={{
									width: 32,
									height: 32,
									alignSelf: 'center',
									opacity: translateY.interpolate({
										inputRange: [0, 100],
										outputRange: [0.5, 1],
										extrapolate: 'clamp',
									}),
									transform: [
										{
											rotate: translateY.interpolate({
												inputRange: [0, inputRange],
												outputRange: [
													`${0}deg`,
													`${-180}deg`,
												],
												extrapolate: 'clamp',
											}),
										},
									],
								}}
							/>
						</Animated.View>
					</PanGestureHandler>
				</Animated.View>
			</View>
		</GestureHandlerRootView>
	)
}

export default Perfil
