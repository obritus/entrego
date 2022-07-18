import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, User } from './AuthContext'
import Nav from './components/Nav'
import UserHeader from './components/UserHeader'

const Header = () => {
	let navigate = useNavigate()
	const { setUser, user, setToken, token } = useAuth()
	const [title] = useState(document.title)

	return (
		<header className='text-light h-fit'>
			<div className='flex items-center gap-3 justify-items-stretch lg:text-md text-xs select-none h-full pl-6'>
				<Link to='/' className=''>
					<img src='logo192.png' className='h-8' alt='EntreGO' />
				</Link>
				<div>{title}</div>
				<Nav />
			</div>
			{user.nome && <UserHeader user={user} />}
		</header>
	)
}

export default Header
