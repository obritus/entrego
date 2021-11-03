import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Api from '../Api.js'
import Logotipo from '../assets/logotipo.webp'

const Container = styled.div`
	display: flex;
	height: 100%;
	flex-direction: row;
	div {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	form {
		button {
			font-weight: 700;
		}
	}
`
const MessageBox = styled.div`
	color: #fff;
`

export default () => {
	const [message, setMessage] = React.useState('')

	const [load, setLoad] = React.useState(false)

	const formHandler = (e) => {
		e.preventDefault()
		const email = e.target[0].value
		const senha = e.target[1].value
		const keep = e.target[3].checked

		Api.login({ email, senha, keep })
			.then((res) => {
				if (res.data.auth === true) {
					localStorage.setItem('token', res.data.token)
					window.location.replace('/')
				} else {
					setMessage('Usuário ou senha incorretos')
				}
			})
			.catch((err) => {
				console.error(err)
			})
	}

	return (
		<Container>
			<div>
				<Image src={Logotipo} alt='EntreGO' width={128} height={92} />
			</div>
			<div className='bg-primary text-light'>
				<form
					onSubmit={formHandler}
					className='d-flex flex-column align-items-center'
				>
					{message !== '' && (
						<MessageBox className='bg-warning text-dark p-3'>
							{message}
						</MessageBox>
					)}
					<h1
						className='lead text-center my-3'
						style={{ fontSize: '2em' }}
					>
						Bem-vindo de volta!
					</h1>
					<p className='p-0 m-0 mb-2 text-left w-100'>Email</p>
					<input
						className='form-control mb-3'
						type='email'
						id='email'
						placeholder='Email'
						required
					/>
					<p className='p-0 m-0 mb-2 text-left w-100'>Senha</p>
					<input
						className='form-control mb-3'
						type='password'
						id='password'
						placeholder='Senha'
						required
					/>
					<button className='btn btn-dark w-100 mb-3'>Entrar</button>
					<div className='form-check d-block'>
						<input
							type='checkbox'
							className='form-check-input'
							id='keep_login'
						/>
						<label
							className='form-check-label'
							htmlFor='keep_login'
						>
							Lembrar-me
						</label>
					</div>
				</form>
			</div>
		</Container>
	)
}
