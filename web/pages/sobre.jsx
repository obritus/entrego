import React from 'react'
import Image from 'next/image'
import AppScreen from '../assets/app_screen.jpg'
import styled from 'styled-components'

const SobreContainer = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 1.2em;
`

const Sobre = () => {
	return (
		<SobreContainer>
			<div className='p-4 container'>
				<div>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Adipisci optio, tempora possimus doloribus autem odit,
					veritatis error magni exercitationem rerum nulla, maiores
					praesentium ea tempore accusamus nisi sapiente maxime
					minima.
				</div>
				<div>
					Pariatur vitae quod nihil totam ullam iure possimus ad rerum
					perspiciatis. Nam expedita ab officia aut debitis deserunt
					quidem dignissimos, non labore a autem totam quas amet porro
					nisi perferendis.
				</div>
				<div>
					Eligendi doloremque at quisquam, quam omnis voluptatibus
					debitis laudantium eaque quasi velit, dolorum aliquid? Totam
					necessitatibus voluptatibus voluptatum nisi, commodi
					voluptas illo, laborum quos cumque nobis debitis eaque
					consequuntur officiis.
				</div>
				<div>
					Accusantium distinctio, animi aliquid fugit laudantium
					dolorum doloremque praesentium iure velit debitis, quibusdam
					obcaecati! Officiis nesciunt, voluptas quibusdam,
					consectetur nostrum, ullam iste veritatis harum molestiae
					eum ab nisi quia facere.
				</div>
			</div>
			<Image src={AppScreen} alt='App Screen' className='m-0 p-0' />
			<div className='p-4 container'>
				<div>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Adipisci optio, tempora possimus doloribus autem odit,
					veritatis error magni exercitationem rerum nulla, maiores
					praesentium ea tempore accusamus nisi sapiente maxime
					minima.
				</div>
				<div>
					Pariatur vitae quod nihil totam ullam iure possimus ad rerum
					perspiciatis. Nam expedita ab officia aut debitis deserunt
					quidem dignissimos, non labore a autem totam quas amet porro
					nisi perferendis.
				</div>
			</div>
		</SobreContainer>
	)
}

export default Sobre
