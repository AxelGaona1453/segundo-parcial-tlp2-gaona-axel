import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from '../hooks/useForm';

export const LoginPage = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { formState, handleChange, username, password } = useForm({
		username: '',
		password: '',
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch('http://localhost:3000/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formState),
				credentials: 'include',
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Credenciales incorrectas.');
			}

			navigate('/home', { replace: true });
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
			<div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
				<h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
					Iniciar Sesión
				</h2>

				{error && (
					<div className="bg-red-100 text-red-700 p-3 rounded mb-4">
						<p className="text-sm">{error}</p>
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="username" className="block text-gray-700 font-medium mb-2">
							Usuario
						</label>
						<input
							type="text"
							id="username"
							name="username"
							value={username}
							onChange={handleChange}
							placeholder="Ingresa tu usuario"
							className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div className="mb-6">
						<label htmlFor="password" className="block text-gray-700 font-medium mb-2">
							Contraseña
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={handleChange}
							placeholder="Ingresa tu contraseña"
							className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors disabled:bg-gray-400"
						disabled={isLoading}
					>
						{isLoading ? 'Ingresando...' : 'Ingresar'}
					</button>
				</form>

				<p className="text-center text-sm text-gray-600 mt-4">
					¿No tienes cuenta?{' '}
					<Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
						Regístrate aquí
					</Link>
				</p>
			</div>
		</div>
	);
};
