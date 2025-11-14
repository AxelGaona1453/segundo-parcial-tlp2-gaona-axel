import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export const Navbar = () => {
	const [userName, setUserName] = useState('Usuario');

	const navigate = useNavigate();
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await fetch('http://localhost:3000/api/profile', {
					method: 'GET',
					credentials: 'include',
				});

				if (response.ok) {
					const userData = await response.json();
					setUserName(userData.name || userData.username || 'Usuario');
				} else {
					console.error('No se pudo obtener el perfil del usuario.');
				}
			} catch (error) {
				console.error('Error de red al obtener perfil:', error);
			}
		};

		fetchProfile();
	}, []);

	const handleLogout = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/logout', {
				method: 'POST',
				credentials: 'include',
			});
			if (response.ok) {
				navigate('/login');
			} else {
				console.error('Error al cerrar sesión:', await response.text());
				alert('No se pudo cerrar la sesión. Inténtalo de nuevo.');
			}
		} catch (error) {
			console.error('Error de red al cerrar sesión:', error);
			alert('Error de red. No se pudo cerrar la sesión.');
		}
	};

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
