import * as Styled from 'styled-components/native'

export const Tema: Styled.DefaultTheme = {
	colors: {
		// primary: '#2A2773',
		primary: '#2C3D79',
		secondary: '#272727',
		danger: '#d11827',
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

export default styled;

// /* Color Theme Swatches in Hex */
// $Festival-Internacional-de-Cine-2015-1-hex: #71F235;
// $Festival-Internacional-de-Cine-2015-2-hex: #85F238;
// $Festival-Internacional-de-Cine-2015-3-hex: #7AD936;
// $Festival-Internacional-de-Cine-2015-4-hex: #D9D9D9;
// $Festival-Internacional-de-Cine-2015-5-hex: #595959;