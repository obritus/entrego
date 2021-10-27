import React from 'react'
import styled from 'styled-components'
import Api from '../Api.js'

const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	form {
		button {
			font-weight: 700;
		}
	}
`

const LoginBox = () => {
	const formHandler = (e) => {
		e.preventDefault()
		const email = e.target[0].value
		const senha = e.target[1].value

		Api.login({ email, senha })
			.then((res) => {
				if (res.data.auth === true) {
					localStorage.setItem('token', res.data.token)
					window.location.replace('/')
				}
			})
			.catch((err) => {
				console.error(err)
			})
	}

	return (
		<Container>
			<form onSubmit={formHandler}>
				<p className='p-0 m-0'>Email</p>
				<input
					className='form-control mb-3'
					type='email'
					id='email'
					placeholder='Email'
					required
				/>
				<p className='p-0 m-0'>Senha</p>
				<input
					className='form-control mb-3'
					type='password'
					id='password'
					placeholder='Senha'
					required
				/>
				<button className='btn btn-dark w-100'>Entrar</button>
			</form>
		</Container>
	)
}

export default LoginBox
