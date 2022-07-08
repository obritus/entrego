import React from 'react'
import Footer from './Footer'
import Header from './Header'

const App = () => {
	return (
		<main className='dark:bg-primary flex flex-col min-h-screen'>
			<Header />
			<section className='flex justify-center items-center text-light grow w-full h-full lg:flex-row'>
				<div className='bg-danger lg:w-1/2 lg:h-screen'></div>
				<div className='lg:w-1/2 flex justify-center items-center'>
					<form
						className='flex flex-col'
						action='#'
						onSubmit={() => null}
					>
						<label htmlFor='email'>
							<p className='text-xs mb-1'>Seu email:</p>
							<input
								name='email'
								type='email'
								placeholder='Seu email'
								id='email'
								className='w-full mb-4 rounded-sm border-none'
							/>
						</label>
						<label htmlFor='senha'>
							<p className='text-xs mb-1'>Sua senha:</p>
							<input
								name='senha'
								type='password'
								placeholder='Sua senha'
								id='senha'
								className='w-full mb-4 rounded-sm border-none'
							/>
						</label>

						<button className='px-6 py-3 bg-secondary text-dark font-bold text-white rounded-sm mb-4'>
							Entrar
						</button>
						<label htmlFor='keep' className='text-xs gap-2 flex'>
							<input type='checkbox' name='keep' id='keep' />{' '}
							Continuar conectado?
						</label>
						<a
							href='#'
							title='Clique aqui para redefinir sua senha.'
							className='text-xs text-right mt-4'
						>
							Esqueci a senha
						</a>
					</form>
				</div>
			</section>
			<Footer />
		</main>
	)
}

export default App
