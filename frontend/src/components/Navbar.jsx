import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const Navbar = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		id: '050',
		name: 'axel',
		lastname: 'gaona',
	});

	const getProfile = async () => {
		try {
			const res = await fetch('http://localhost:3000/api/profile', {
				credentials: 'include',
			});

			if (res.ok) {
				const data = await res.json();
				setUser(data.user);
			}
		} catch (e) {
			console.log('Error es:', e.message);
		}
	};

	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('http://localhost:3000/api/logout', {
				method: 'POST',
				credentials: 'include',
			});

			if (res.ok) {
				alert('Cerraste sesion con exito, seras redirigido');
				navigate('/login');
			}
		} catch (e) {
			console.log('error', e.message);
		}
	};

	useEffect(() => {
		getProfile();
	}, []);

	const userName = user.name;

	return (
		<nav className="bg-gray-900 text-white h-16 left-0 right-0 shadow-lg sticky top-0 z-50">
			<div className="container mx-auto px-4 h-full flex items-center justify-between">
				<div className="text-2xl font-bold">Superhéroes App</div>

				<div className="hidden md:flex items-center space-x-6">
					<span className="text-gray-300">
						Bienvenido, <span className="font-semibold text-white">{userName}</span>
					</span>

					<button
						onClick={handleLogout}
						className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors font-medium"
					>
						Cerrar Sesión
					</button>
				</div>
			</div>
		</nav>
	);
};
