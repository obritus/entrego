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
		setUser({} as User)
	}

	return (
		<header className='container text-light'>
			<div className='mx-auto flex gap-3 justify-center items-center lg:justify-start lg:text-md text-xs p-6 select-none'>
				<Link to='/'>
					<img src='logo192.png' className='h-8' alt='EntreGO' />
				</Link>
				{document.title}
			</div>
			<nav className='px-6 flex gap-3 justify-center'>
				{token && <Link to='/mapa'>Mapa</Link>}
				{token && <Link to='/painel'>Painel</Link>}
				{!token && <Link to='/login'>Entrar</Link>}
				{token && (
					<button className='' onClick={HandleQuit}>
						Sair
					</button>
				)}
			</nav>
			{user.nome && <UserHeader user={user} />}
		</header>
	)
}

export default Header
