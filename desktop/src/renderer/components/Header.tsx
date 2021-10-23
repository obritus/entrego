import React from 'react'
import Styled from 'styled-components'
import HeaderButtons from './HeaderButtons'

import logotipo from '../../../assets/logotipo.svg'

const Header = Styled.header`
	height: 120px;
`
const Nav = Styled.nav`
	height: 90px;
	display: flex;
	justify-content: flex-end;
	background: #00000040;
	border-top: 1px solid #000;
	border-bottom: 1px solid #000;
`
const Logo = Styled.div`
	width: 80px;
	height: 89px;
	background: url(${logotipo}) no-repeat 50% 50%;
	background-size: contain;
`
export default () => (
	<Header>
		<HeaderButtons />
		<Nav>
			<Logo className="me-2" />
		</Nav>
	</Header>
)
