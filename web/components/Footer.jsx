import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
	margin-top: auto;
	font-size: 0.8em;
	height: 70px;
`

const Default = () => {
	return (
		<Footer className='bg-black text-white'>
			<div className='container'>
				<div className='row'>
					<div className='col-12'>
						<p className='text-center py-4 m-0'>
							&copy; 2022 - {new Date().getFullYear()}. Todos os
							direitos reservados.
						</p>
					</div>
				</div>
			</div>
		</Footer>
	)
}

export default Default
