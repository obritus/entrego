import React from 'react'
import { User } from '../AuthContext'

const UserBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div>{children}</div>
}

const Index: React.FC<{ user: User }> = ({ user }) => (
	<div className='px-6 py-2 bg-secondary text-primary text-9xl'>
		<p className='text-sm text-center font-bold'>
			{user.nome && <UserBox>Olá {user.nome}</UserBox>} &bull;{' '}
			{user.email}
		</p>
	</div>
)

export default Index
