import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, User } from './AuthContext'
import UserHeader from './components/UserHeader'

const Header = () => {
	let navigate = useNavigate()
	const { setUser, user, setToken, token } = useAuth()

	const HandleQuit = () => {
		localStorage.removeItem('token')
		setToken('')
		navigate('login', { replace: true })
		setUser({} as User) // LIMPA O
	}

	return (
		<header className='text-light h-12'>
			<div className='flex items-center gap-3 justify-items-stretch lg:text-md text-xs select-none h-12 pl-6'>
				<Link to='/' className=''>
					<img src='logo192.png' className='h-8' alt='EntreGO' />
				</Link>
				<div>{document.title}</div>
				<nav className='sm:flex items-center bg-terciary text-dark hidden h-12 grow font-bold'>
					{token && (
						<Link to='/mapa' className='p-4 hover:bg-danger/10'>
							Mapa
						</Link>
					)}
					{token && (
						<Link to='/painel' className='p-4 hover:bg-danger/10'>
							Painel
						</Link>
					)}
					{!token && (
						<Link to='/login' className='p-4 hover:bg-danger/10'>
							Entrar
						</Link>
					)}
					{token && (
						<button
							className='p-4 hover:bg-danger/10'
							onClick={HandleQuit}
						>
							Sair
						</button>
					)}
				</nav>
				<nav className='sm:hidden bg-danger min-w-12 h-12 grow justify-items-end items-center grid'>
					abc
				</nav>
			</div>
			{user.nome && <UserHeader user={user} />}
		</header>
	)
}

export default Header
