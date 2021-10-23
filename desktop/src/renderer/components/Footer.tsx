import React from 'react'
import { NavLink } from 'react-router-dom'
import Styled from 'styled-components'
import { useConfigContext } from './providers/configs'
import { VscHome, VscSettingsGear } from 'react-icons/vsc'

const Footer = Styled.footer`
	height: 30px;
	padding: 0;
	background: #00000040;
	border-top: 1px solid #000;
	grid-area: 3 / 1 / 4 / 2;
	display: flex;
	justify-content: space-between;
	font-size: .8em;
	line-height: 30px;
	div {
		display: flex;
		p {
			font-size: .8em;
			line-height: 27px;
			border-right: 1px solid #000000;
		}
		.active {
			color: #FFF;
			background: #000000;
		}
	}
`

export default () => {
	const { setTitle } = useConfigContext()
	return (
		<Footer>
			<div className="p-0 m-0">
				<p className="p-0 px-1 m-0">
					Entregadores Online: <b>33</b>
				</p>
			</div>
			<div className="">
				<NavLink
					to="/"
					onClick={() => setTitle('')}
					exact
					className="p-0 px-1"
					activeClassName="active"
				>
					<VscHome
						style={{ fontSize: '.85rem', verticalAlign: '-3px' }}
						className="p-0 m-0"
					/>
				</NavLink>
				<NavLink
					to="/logar"
					onClick={() => setTitle('Configurações')}
					className="p-0 px-1"
					activeClassName="active"
					title="Configurações do sistema"
				>
					<VscSettingsGear
						style={{ fontSize: '.75rem', verticalAlign: '-2px' }}
						className="p-0 m-0"
					/>
				</NavLink>
			</div>
		</Footer>
	)
}
