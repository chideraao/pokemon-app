import React from "react";

function PokemonList({ pokemon }) {
	return (
		<div>
			{pokemon.map((poke) => {
				return <h3 key={poke}>{poke}</h3>;
			})}
		</div>
	);
}

export default PokemonList;
