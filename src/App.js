import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./Components/Pagination";
import PokemonList from "./Components/PokemonList";

function App() {
	const [pokemon, setPokemon] = useState([]);
	const [currentPageUrl, setCurrentPageUrl] = useState(
		"https://pokeapi.co/api/v2/pokemon"
	);
	const [nextPageUrl, setNextPageUrl] = useState("");
	const [PrevPageUrl, setPrevPageUrl] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		let cancel;
		Axios.get(currentPageUrl, {
			cancelToken: new Axios.CancelToken((c) => (cancel = c)),
		}).then((res) => {
			setIsLoading(false);
			setPokemon(
				res.data.results.map((poke) => {
					return poke.name;
				})
			);
			setPrevPageUrl(res.data.previous);
			setNextPageUrl(res.data.next);
		});

		return () => {
			cancel();
		};
	}, [currentPageUrl]);

	if (isLoading) {
		return "Loading...";
	}
	const goToNextPage = () => {
		setCurrentPageUrl(nextPageUrl);
	};

	const goToPrevPage = () => {
		setCurrentPageUrl(PrevPageUrl);
	};

	return (
		<div className="App">
			<a
				href="https://seeklogo.net/?p=44822"
				target="_blank"
				without
				rel="noopener noreferrer"
			>
				<img
					src="https://seeklogo.net/wp-content/uploads/2013/04/pokemon-eps-vector-logo-400x400.png"
					alt="Pokemon (.EPS) vector logo free download"
				/>
			</a>
			<PokemonList pokemon={pokemon} />
			<Pagination
				goToNextPage={nextPageUrl ? goToNextPage : null}
				goToPrevPage={PrevPageUrl ? goToPrevPage : null}
			/>
		</div>
	);
}

export default App;
