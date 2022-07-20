import React, { useState } from 'react'
import { useAuth, User } from '../AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoClose, IoMenu } from 'react-icons/io5'

const Nav = () => {
	let navigate = useNavigate()
	const { setUser, setToken, token } = useAuth()
	const [menu, setMenu] = useState(false)

	const HandleQuit = async () => {
		const RemoverEstados = async () => {
			setMenu(false)
			setToken('')
			setUser({} as User) // LIMPA O ESTADO DO USUÁRIO
			localStorage.removeItem('token')
		}
		await RemoverEstados()
		navigate('login', { replace: true })
	}

	return (
		<div className='sm:flex items-center justify-end text-primary h-full grow font-bold'>
			<div
				className={`flex justify-end items-center h-16 pr-6 sm:hidden`}
			>
				<button onClick={() => setMenu(!menu)}>
					{menu && <IoClose className='text-4xl text-secondary' />}
					{menu === false && (
						<IoMenu className='text-4xl text-secondary' />
					)}
				</button>
			</div>
			<nav
				className={`bg-secondary flex flex-col w-full absolute top-16 right-0 text-center z-50 ${
					!menu &&
					'hidden sm:flex sm:top-0 sm:static sm:flex-row sm:justify-end'
				}`}
			>
				{token && (
					<NavLink
						to='/mapa'
						className='bg-secondary p-4 hover:text-dark hover:text-shadow-1 hover:bg-opacity-75 text-lg'
						onClick={() => setMenu(false)}
					>
						{({ isActive }) => (
							<span className={isActive ? '' : undefined}>
								Mapa
							</span>
						)}
					</NavLink>
				)}
				{token && (
					<NavLink
						to='/painel'
						className='bg-secondary p-4 hover:text-dark hover:text-shadow-1 hover:bg-opacity-75 text-lg'
						onClick={() => setMenu(false)}
					>
						{({ isActive }) => (
							<span className={isActive ? '' : undefined}>
								Painel
							</span>
						)}
					</NavLink>
				)}
				{!token && (
					<NavLink
						to='/login'
						className='bg-secondary p-4 hover:text-dark hover:text-shadow-1 hover:bg-opacity-75 text-lg'
						onClick={() => setMenu(false)}
					>
						{({ isActive }) => (
							<span className={isActive ? '' : undefined}>
								Entrar
							</span>
						)}
					</NavLink>
				)}
				{!token && (
					<NavLink
						to='/login'
						className='bg-secondary p-4 hover:text-dark hover:text-shadow-1 hover:bg-opacity-75 text-lg'
						onClick={() => setMenu(false)}
					>
						{({ isActive }) => (
							<span className={isActive ? '' : undefined}>
								Conheça
							</span>
						)}
					</NavLink>
				)}
				{token && (
					<button
						className='bg-secondary p-4 hover:text-dark hover:text-shadow-1 hover:bg-opacity-75 text-lg'
						onClick={HandleQuit}
					>
						Sair
					</button>
				)}
			</nav>
		</div>
	)
}

export default Nav
