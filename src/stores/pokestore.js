import { get, writable } from 'svelte/store';

export const pokesStore = writable([]);
export const pokedexStore = writable([]);
export const pokesFetching = writable(false);
export const pokesFetched = writable(false);

export const fetchPokes = async () => {
	if (get(pokesFetching) || get(pokesFetched)) {
		return false;
	}
	pokesFetching.set(true);
	let pokemons = [];
	let calls = [];
	for (let i = 1; i < 22; i++) {
		const call = async () => {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
			const data = await res.json();
			pokemons = [data, ...pokemons];
		};
		calls.push(call());
	}
	await Promise.all(calls);
	pokesStore.set(pokemons);
	pokesFetched.set(true);
};

export const addToPokedex = (id) => {
	const poke = get(pokesStore).find((poke) => poke.id == id);
	if (poke) {
		pokedexStore.update((pokedex) => [...pokedex, poke]);
		// remove from todos array (which copied content from pokeStore)
		pokesStore.update((pokemons) => pokemons.filter((poke) => poke.id != id));
	}
};

// Just the opposite of addToPokedex
export const removeFromPokedex = (id) => {
	const poke = get(pokedexStore).find((poke) => poke.id == id);
	if (poke) {
		pokesStore.update((pokemons) => [...pokemons, poke]);
		pokedexStore.update((pokedex) => pokedex.filter((poke) => poke.id != id));
	}
};
