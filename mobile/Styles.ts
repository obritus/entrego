import * as Styled from 'styled-components/native'

export const Tema: Styled.DefaultTheme = {
	colors: {
		// primary: '#2A2773',
		primary: '#141e30',
		secondary: '#FCCBCA',
		danger: '#d42252',
		success: '#2a2773',
		light: '#FFFFFF',
		dark: '#303030',
	},
}

const {
	default: styled,
	css,
	ThemeProvider
} = Styled as Styled.ReactNativeThemedStyledComponentsModule<Styled.DefaultTheme>

export {css, ThemeProvider}

export default styled