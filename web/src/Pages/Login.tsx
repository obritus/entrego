import React from 'react'

import LoginForm from '../components/LoginForm'

const Index = () => {
	return (
		<div className='flex lg:flex-row lg:items-center w-full items-stretch'>
			<div className='hidden lg:flex lg:flex-1 bg-dark/25 h-full px-6'>
				{/* APRESENTAÇÃO DO APP */}
			</div>
			<div className='px-8 flex items-center justify-center w-full min-h-full lg:flex-1'>
				<LoginForm />
			</div>
		</div>
	)
}
export default Index
