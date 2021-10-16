import React from 'react'
import Styled from 'styled-components'
import HeaderButtons from './HeaderButtons'

const Header = Styled.header`
	height: 120px;
`
const Nav = Styled.nav`
	background: #00000040;
	border-top: 1px solid #000;
	border-bottom: 1px solid #000;
	height: 90px;
`

export default () => (
	<Header>
		<HeaderButtons />
		<Nav></Nav>
	</Header>
)
