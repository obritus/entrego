import React from 'react'
import { NavLink } from 'react-router-dom'
import Styled from 'styled-components'
import { useConfigContext } from './providers/configs'
import { VscHome, VscSettingsGear } from 'react-icons/vsc'

const Footer = Styled.footer`
	height: 30px;
	background: #00000040;
	border-top: 1px solid #000;
	grid-area: 3 / 1 / 4 / 2;
	display: flex;
	justify-content: flex-end;
	font-size: .8em;
	line-height: 30px;
	.active {
		color: #FFF;
		background: #000000;
	}
	svg {
		vertical-align: 0;
	}
`

export default () => {
	const { setTitle } = useConfigContext()
	return (
		<Footer>
			<NavLink
				to="/"
				onClick={() => setTitle('')}
				exact
				className="px-1"
				activeClassName="active"
			>
				<VscHome
					style={{ fontSize: '.8rem', verticalAlign: '-1px' }}
					className="p-0 m-0"
				/>
			</NavLink>
			<NavLink
				to="/config"
				onClick={() => setTitle('Configurações')}
				className="px-1"
				activeClassName="active"
				title="Configurações do sistema"
			>
				<VscSettingsGear
					style={{ fontSize: '.7rem' }}
					className="p-0 m-0"
				/>
			</NavLink>
		</Footer>
	)
}
