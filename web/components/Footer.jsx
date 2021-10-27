import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
	margin-top: auto;
`

const Default = (props) => {
	return (
		<Footer className='bg-dark text-light'>
			<div className='container'>
				<div className='row'>
					<div className='col-12'>
						<p className='text-center py-4 m-0'>
							&copy; {new Date().getFullYear()}. Todos os direitos
							reservados.
						</p>
					</div>
				</div>
			</div>
		</Footer>
	)
}

export default Default
