import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
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

	return (
		<div className="App">
			<h1>Pokemons</h1>
			<PokemonList pokemon={pokemon} />
		</div>
	);
}

export default App;
