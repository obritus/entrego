import React from 'react'
import { LinkProps } from 'next/link'

const Index = () => {
	React.useEffect(() => {
		document.title = 'Painel | Sistema de Gestão'

		console.log(LinkProps)
	}, [])

	return (
		<div>
			<h1>Painel</h1>
		</div>
	)
}

export default Index