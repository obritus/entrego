import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../Api'
import { useAuth } from '../AuthContext'

const MessageBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className='py-3 px-5 mb-4 font-bold text-sm text-center bg-terciary text-dark'>
		{children}
	</div>
)

const Index = () => {
	const { setUser, setToken } = useAuth()
	const [message, setMessage] = useState<String>('')
	const formRef = useRef(null)
	const navigate = useNavigate()
	const HandleSubmit = async (e: any) => {
		e.preventDefault()
		setMessage('')
		const Email = e.target[0].value
		const Senha = e.target[1].value
		const Keep = e.target[3].checked
		const GetLogin = await Api.Login({
			email: Email,
			senha: Senha,
			keep: Keep,
		})

		if (GetLogin.data.auth) {
			navigate('/', { replace: true })
			const { email, nome, logotipo, endereco } = GetLogin.data.user
			setUser({
				nome,
				email,
				logotipo,
				endereco,
			})
			localStorage.setItem('token', GetLogin.data.token)
			setToken(GetLogin.data.token)
		} else {
			setMessage(GetLogin.data.msg)
		}
		return null
	}
	const handleModalRecuperarSenha = () => {
		return null
	}

	return (
		<form
			className='flex flex-col w-full sm:w-64'
			onSubmit={HandleSubmit}
			ref={formRef}
		>
			{message && <MessageBox>{message}</MessageBox>}

			<label htmlFor='email'>
				<p className='text-xs mb-1'>Seu email:</p>
				<input
					name='email'
					type='email'
					placeholder='Seu email'
					id='email'
					className='w-full mb-4 rounded-sm border-none text-dark'
				/>
			</label>
			<label htmlFor='senha'>
				<p className='text-xs mb-1'>Sua senha:</p>
				<input
					name='senha'
					type='password'
					placeholder='Sua senha'
					id='senha'
					className='w-full mb-4 rounded-sm border-none text-dark'
				/>
			</label>

			<button
				className='px-6 py-3 bg-secondary text-dark font-bold text-white rounded-sm mb-4'
				type='submit'
			>
				Entrar
			</button>
			<label htmlFor='keep' className='text-xs gap-2 flex'>
				<input type='checkbox' name='keep' id='keep' /> Continuar
				conectado?
			</label>
			<button
				onClick={handleModalRecuperarSenha}
				title='Clique aqui para redefinir sua senha.'
				className='text-xs text-center mt-4 font-bold'
				type='button'
			>
				Esqueci a senha
			</button>
		</form>
	)
}

export default Index
