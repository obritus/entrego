import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'
import { MdHomeFilled, MdLogin } from 'react-icons/md'
import '../public/styles/App.css'

import Footer from '../components/Footer.jsx'
import React from 'react'

const Header = styled.header`
	border-bottom: 1px solid #00000015;
	width: 100%;
	height: 50px;
	background: #FFF;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
`
const HeaderNav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	a {
		color: #000;
		font-weight: 700;
		font-size: 1.2rem;
		text-decoration: none;
		padding: 0;
	}
`
const Section = styled.section`
	flex: 1;
	padding-top: 50px;
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
			</Head>
			<Header>
				<div className="container">
					<HeaderNav className="px-4 py-2">
						<Link href="/" passHref={true}><MdHomeFilled style={{ fontSize: '24' }} /></Link>
						<Link href="/sobre">Sobre</Link>
						<Link href="/entrar"><MdLogin style={{ fontSize: '24' }} /></Link>
					</HeaderNav>
				</div>
			</Header>
			<Section>
				<Component {...pageProps} />
			</Section>
			<Footer />
		</main>
	)
}

export default App