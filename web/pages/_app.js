import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'

import '../public/styles/App.css'

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import AuthProvider, { useAuth } from '../components/AuthContext'

const Section = styled.section`
	flex: 1;
	padding-top: 60px;
	height: calc(100vh - 60px);
`
const App = ({ Component, pageProps }) => {

	React.useEffect(() => {

	}, [])

	return (
		<AuthProvider>
			<main>
				<Head>
					<title>EntreGO</title>
					<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
					<link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
				</Head>
				<Header />
				<Section>
					<Component {...pageProps} />
				</Section>
				<Footer />
			</main>
		</AuthProvider>
	)
}

export default App