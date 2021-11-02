import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'
import { MdHomeFilled, MdInfo, MdLogin, MdDashboard } from 'react-icons/md'
import '../public/styles/App.css'

import Footer from '../components/Footer.jsx'
import React from 'react'

const Header = styled.header`
	border-bottom: 1px solid #00000015;
	width: 100%;
	background: #FFF;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`
const HeaderNav = styled.nav`
	display: flex;
	flex: 1;
	justify-content: space-evenly;
	align-items: center;
	a {
		color: #000;
		font-weight: 700;
		font-size: 1.2em;
		text-decoration: none;
		padding: 0;
	}
`
const Section = styled.section`
	flex: 1;
	padding-top: 66px;
`
const App = ({ Component, pageProps }) => {
	React.useEffect(() => {
		console.log(Component())
		console.log(pageProps)
	}, [Component, pageProps])

	return (
		<main>
			<Head>
				<title>EntreGO</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
			</Head>
			<Header className="">
				<div className="container">
					<HeaderNav className="p-4">
						<Link href="/" passHref={true}><MdHomeFilled size="36" color="#2C3D79" /></Link>
						<Link href="/sobre"><MdInfo size="36" color="#2C3D79" /></Link>
						<Link href="/entrar"><MdLogin size="36" color="#2C3D79" /></Link>
					</HeaderNav>
				</div>
			</Header>
			<Section className="h100">
				<Component {...pageProps} />
			</Section>
			<Footer />
		</main>
	)
}

export default App