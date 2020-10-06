import React from "react";

function PokemonList({ pokemon }) {
	return (
		<div>
			{pokemon.map((poke) => {
				return <div key={poke}>{poke}</div>;
			})}
		</div>
	);
}

export default PokemonList;
