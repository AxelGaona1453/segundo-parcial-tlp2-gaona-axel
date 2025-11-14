import { useState, useEffect } from 'react';

export const HomePage = () => {
	const [superheroes, setSuperheroes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchSuperheroes = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json',
			);
			if (!response.ok) {
				throw new Error('La respuesta de la API no fue exitosa');
			}
			const data = await response.json();
			const formattedData = data.map((hero) => ({
				id: hero.id,
				superhero: hero.name,
				image: hero.images.lg,
			}));

			const randomHeroes = formattedData.sort(() => 0.5 - Math.random()).slice(0, 6);

			setSuperheroes(randomHeroes);
		} catch (error) {
			console.error('Error al obtener los superhéroes:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchSuperheroes();
	}, []);

	return (
		<div className="container mx-auto px-4 pb-8">
			<h1 className="text-4xl font-bold text-center mt-8 mb-4 text-gray-800">
				Galería de Superhéroes
			</h1>

			<div className="flex justify-center mb-8">
				<button
					onClick={fetchSuperheroes}
					className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
					disabled={isLoading}
				>
					{isLoading ? 'Cargando...' : 'Recargar'}
				</button>
			</div>

			{isLoading && superheroes.length === 0 ? (
				<p className="text-center text-xl text-gray-600">Cargando héroes...</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{superheroes.map((hero) => (
						<div
							key={hero.id}
							className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
						>
							<img
								src={hero.image}
								alt={hero.superhero}
								className="h-64 object-cover w-full"
							/>

							<div className="p-4">
								<h3 className="text-xl font-semibold text-gray-800">{hero.superhero}</h3>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
