import React from 'react'
import Styled from 'styled-components'
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { ConfigContext } from './components/providers/configs'

import Header from './components/Header'
import Footer from './components/Footer'

import Index from './components/pages'
import Config from './components/pages/Config'

const Theme = {
	primary: '',
	secondary: '',
	danger: '',
	info: '',
	warning: '',
	light: '#FFF',
	dark: '#303030',
}

const Tema = createGlobalStyle`
	body {
		color: #FFF;
		background: #24292E;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 12pt;
	}
	a {
		color: #CCC;
		text-decoration: none;
		:hover {
			cursor: default;
			color: #FFF;
			text-shadow: 1px 1px 1px #FFFFFF25;
		}
	}
	h1, h2, h3, p, a {
		user-select: none;
	}
	h1 {
		font-size: 1.5em;
	}
	h2 {
		font-size: 1.2em;
	}
`

const Wrapper = Styled.div`
	display: grid;
	min-height: 100vh;
	grid-template-columns: 1fr;
	grid-template-rows: 120px 1fr 30px;
`
const Section = Styled.section`
	grid-area: 2 / 1 / 3 / 2;
`
export default () => {
	const [title, setTitle] = React.useState('')

	return (
		<ThemeProvider theme={Theme}>
			<Tema />
			<Wrapper>
				<Router>
					<ConfigContext.Provider value={{ title, setTitle }}>
						<Header />
						<Section>
							<Switch>
								<Route
									path="/"
									exact
									component={() => <Index />}
								/>
								<Route
									path="/config"
									exact
									component={() => <Config />}
								/>
							</Switch>
						</Section>
						<Footer />
					</ConfigContext.Provider>
				</Router>
			</Wrapper>
		</ThemeProvider>
	)
}
