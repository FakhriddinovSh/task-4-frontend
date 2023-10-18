import './tailwindcss.css';
import './app.css';
import { Register } from './pages/Register/Register';
import { Login } from './pages/Login/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { useEffect } from 'react';
import { BASE_URL } from './BASEURL';

export const App = () => {
	const token = localStorage.getItem('token');

	return (
		<>
			<Routes>
				<Route path="/" element={token ? <Home /> : <Register />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	);
};
