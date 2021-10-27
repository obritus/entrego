import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.sass'

import Page from './components/Page'

import Home from './components/Index'
import Sobre from './components/Sobre.jsx'
import NotFound from './components/404.jsx'

import Painel from './components/painel/Painel'

const App = (props) => (
	<Router>
		<Switch>
			<Route
				path='/'
				exact
				component={() => (
					<Page>
						<Home />
					</Page>
				)}
			/>
			<Route
				path='/sobre'
				component={() => (
					<Page bg={true}>
						<Sobre />
					</Page>
				)}
			/>
			<Route path='/painel' exact component={() => <Painel />} />
			<Route path='/painel/*' exact component={() => <Painel />} />
			<Route
				path='*'
				component={() => (
					<Page>
						<NotFound />
					</Page>
				)}
			/>
		</Switch>
	</Router>
)

export default App