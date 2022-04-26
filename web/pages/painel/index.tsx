import React from 'react'
import Api from '../../Api'

const Index = () => {
	React.useEffect(() => {
		const getEntregas = async () => {
			const response = await Api.logout()
		}
	}, [])
	return (
		<div>
			<h1>Painel</h1>
		</div>
	)
}

export default Index
