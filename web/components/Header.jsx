import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { MdHomeFilled, MdInfo, MdLogin, MdDashboard } from 'react-icons/md'

const Container = styled.header`
	border-bottom: 1px solid #00000015;
	width: 100%;
	height: 60px;
	background: #fff;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	.container {
		display: flex;
		height: 100%;
		justify-content: space-between;
		align-items: center;
	}
`
const HeaderNav = styled.nav`
	display: flex;
	width: 320px;
	justify-content: space-around;
	align-items: center;
	a {
		color: #000;
		font-weight: 700;
		font-size: 1.2em;
		text-decoration: none;
		padding: 0;
	}
`

const Header = (props) => (
	<Container>
		<div className='container justify-content-center'>
			<HeaderNav>
				<Link href='/' passHref={true}>
					Mapa
				</Link>
				<div className='vr'></div>
				<Link href='/conheca'>Conheça</Link>
				<div className='vr'></div>
				{props.logged ? (
					<Link href='/painel'>Painel</Link>
				) : (
					<Link href='/entrar'>Entrar</Link>
				)}
			</HeaderNav>
		</div>
	</Container>
)

export default Header
