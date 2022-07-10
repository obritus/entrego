import React, { Suspense } from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import Footer from './Footer'
import Login from './Pages/Login'
import Header from './Header'
import Map from './Pages/Map'
import Painel from './Pages/Painel'
import NotFound from './Pages/404'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	const token = localStorage.getItem('token')
	console.log(token)
	// const token = true
	if (!token) {
		return <Navigate to='/login' />
	}
	return children
}

const Rotas: React.FC = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Carregando...</div>}>
				<main className='dark:bg-primary flex flex-col min-h-full'>
					<Header />
					<section className='flex justify-center items-stretch text-light grow w-full lg:flex-row'>
						<Routes>
							<Route path='/' element={<App />} />
							<Route path='login' element={<Login />} />
							<Route
								path='mapa'
								element={
									<PrivateRoute>
										<Map />
									</PrivateRoute>
								}
							/>
							<Route
								path='/painel'
								element={
									<PrivateRoute>
										<Painel />
									</PrivateRoute>
								}
							/>
							<Route path='*' element={<NotFound />} />
						</Routes>
					</section>
					<Footer />
				</main>
			</Suspense>
		</BrowserRouter>
	)
}

export default Rotas
