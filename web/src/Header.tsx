import React from 'react'
const Header = () => {
	return (
		<header className='text-light'>
			<div className='container flex gap-3 justify-center items-center lg:justify-start text-sm p-6 select-none'>
				<img src='logo192.png' className='h-8' alt='EntreGO' />
				{document.title}
			</div>
		</header>
	)
}

export default Header
