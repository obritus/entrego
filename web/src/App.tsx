import React from 'react'
import Footer from './Footer'
import Header from './Header'

const App = () => {
	return (
		<main className='dark:bg-primary flex w-full h-[100vh]'>
			<section>
				<Header />
				<Footer />
			</section>
			<p className='text-slate-50'>Olá mundo!</p>
		</main>
	)
}

export default App
