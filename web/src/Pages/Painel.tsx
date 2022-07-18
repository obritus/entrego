import React, { useEffect } from 'react'

const Index = () => {
	useEffect(() => {
		document.title = 'Painel de controle'
	}, [])

	return (
		<section>
			<h1>Painel de controle</h1>
		</section>
	)
}

export default Index
