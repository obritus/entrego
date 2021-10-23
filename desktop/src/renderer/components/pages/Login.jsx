import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import HeaderButtons from '../HeaderButtons'
import styled from 'styled-components'
import Api from '../../Api'
import logo from '../../../../assets/logotipo.svg'

const Container = styled.div`
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1111;
`

const Logar = () => {
	const [loadRedirect, setLoadRedirect] = useState(false)
	const [message, setMessage] = useState('Por favor, entre.')

	const handleSubmit = async (e) => {
		e.preventDefault()
		const login = e.target[0].value
		const password = e.target[1].value

		const GetLogin = await Api.Login({ login, password })

		if (GetLogin.data.auth) {
			setMessage('Carregando dados...')
			sessionStorage.setItem('token', GetLogin.data.token)

			const GetClientes = await Api.GetClientes()
			const GetVendas = await Api.GetVendas()
			const GetVendasAbertas = await Api.GetVendas(true)
			const GetPendentes = await Api.GetVendas(true)

			sessionStorage.setItem('atendente', GetLogin.data.nome)
			localStorage.setItem('last_login', login)
			sessionStorage.setItem('user_id', GetLogin.data._id)
			sessionStorage.setItem('admin', GetLogin.data.admin)
			sessionStorage.setItem('clientes', JSON.stringify(GetClientes.data))
			sessionStorage.setItem('total_clientes', GetClientes.data.length)
			sessionStorage.setItem('vendas', JSON.stringify(GetVendas.data))
			sessionStorage.setItem(
				'vendas_abertas',
				JSON.stringify(GetVendasAbertas.data)
			)
			sessionStorage.setItem('total_vendas', GetVendas.data.length)
			sessionStorage.setItem('pendentes', GetPendentes.data.length)

			setMessage('Bem vindo(a)...')

			setLoadRedirect(true)
		} else {
			setMessage(GetLogin.data.msg)
		}
	}

	return (
		<Container className="bg-dark text-light">
			{loadRedirect ? <Redirect to="/clientes" /> : null}
			<HeaderButtons title="Entrar" />
			<img
				className="mb-3 mt-5 mx-auto d-block"
				src={logo}
				alt=""
				width="120"
				height="120"
			/>
			<h1 className="h3 mb-3 text-center fw-normal">{message}</h1>
			<form className="position-relative px-5" onSubmit={handleSubmit}>
				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="login"
						placeholder="Login"
						defaultValue={localStorage.getItem('last_login')}
						required
					/>
					<label htmlFor="login" className="text-dark">
						Seu login
					</label>
				</div>

				<div className="form-floating mb-3">
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Senha"
						required
					/>
					<label htmlFor="password" className="text-dark">
						Sua senha
					</label>
				</div>

				<button
					className="w-100 btn btn-lg btn-primary text-light"
					type="submit"
				>
					Entrar
				</button>
			</form>
		</Container>
	)
}

export default Logar
