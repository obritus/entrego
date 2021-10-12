import 'styled-components'

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			primary: string;
			secondary: string;
			danger: string;
			light: string;
			dark: string;
		}
	}
}