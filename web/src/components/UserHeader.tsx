import React from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import { User } from '../AuthContext'

const UserBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div>{children}</div>
}

const Index: React.FC<{ user: User }> = ({ user }) => (
	<div className='bg-terciary text-primary'>
		<div className='flex flex-row justify-end items-center p-2'>
			<div className='pr-2'>
				<p className='text-md text-right font-bold'>
					{user.nome && <UserBox>Olá {user.nome}</UserBox>}
				</p>
				<p className='text-right text-xs'>{user.email}</p>
			</div>
			<div>
				{user.logotipo ? (
					<img
						src={user.logotipo}
						width={32}
						className=''
						alt='Avatar'
					/>
				) : (
					<IoPersonCircle className='h-full w-16 text-dark' />
				)}
			</div>
		</div>
	</div>
)

export default Index
