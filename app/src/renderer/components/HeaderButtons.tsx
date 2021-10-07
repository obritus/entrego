import React from 'react'
import styled from 'styled-components'
import {
	VscChromeMinimize,
	VscChromeClose,
	VscChromeMaximize,
} from 'react-icons/vsc'
import { ipcRenderer as ipc } from 'electron'
import { useConfigContext } from './providers/configs'
import Favicon from '../img/favicon.svg'

const HeaderButtonsContainer = styled.div`
	width: 100%;
	height: 30px;
	display: flex;
	justify-content: space-between;
	color: #fff;
	height: 30px;
	font-size: 9pt;
	div:first-child {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		user-select: none;
		-webkit-app-region: drag;
		z-index: 1110;
		div {
			width: 30px;
			height: 30px;
			background: url(${Favicon}) no-repeat 50% 50%;
			background-size: 17px;
		}

		p {
			font-size: 0.8em;
			line-height: 30px;
			padding: 0;
			margin: 0;
		}
	}
	#buttons {
		height: 30px;
		display: flex;
		justify-content: flex-end;
		color: #ffffff;
		button,
		a {
			min-width: 46px;
			height: 30px;
			padding: 0;
			margin: 0;
			background: none;
			border: none;
			color: inherit;
			svg {
				vertical-align: -1px;
				height: 30px;
				width: 15px;
			}
			span {
				vertical-align: super;
				font-size: 0.8em;
			}
			&:hover {
				background: rgba(255, 255, 255, 0.4);
				cursor: default;
				color: #fff;
				:last-child {
					background: #d43535;
				}
			}
		}
	}
`

const HeaderButtons = () => {
	const { title } = useConfigContext()
	const GetTitle = title ? title + ' - App' : 'App'

	React.useEffect(() => {
		document.title = GetTitle
	}, [title])

	return (
		<HeaderButtonsContainer>
			<div>
				<div></div>
				<p>{GetTitle}</p>
			</div>
			<div id="buttons">
				<button
					className="btn rounded-0"
					title="Minimizar"
					onClick={() => ipc.send('mini')}
				>
					<VscChromeMinimize />
				</button>
				<button
					className="btn rounded-0"
					title="Fechar aplicativo"
					onClick={() => ipc.send('maxi')}
				>
					<VscChromeMaximize />
				</button>
				<button
					className="btn rounded-0"
					title="Fechar aplicativo"
					onClick={() => ipc.send('sair')}
				>
					<VscChromeClose />
				</button>
			</div>
		</HeaderButtonsContainer>
	)
}

export default HeaderButtons
