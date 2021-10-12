import * as Styled from 'styled-components/native'

const Tema: Styled.DefaultTheme = {
	colors: {
		primary: '#1FB2F1',
		secondary: '#30D9A9',
		danger: '#d11827',
		light: '#FFF',
		dark: '#FFF',
	},
}

const {
	default: styled,
	css,
	ThemeProvider
} = Styled as Styled.ReactNativeThemedStyledComponentsModule<Styled.DefaultTheme>

export {css, ThemeProvider}

export default styled;