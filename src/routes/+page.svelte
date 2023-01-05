<script>
	import { addToPokedex, pokesStore, pokesFetching, pokedexStore } from '../stores/pokestore';
	import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	let bgLtGreen = '#729F92';
	let bGorange = '#EAAB7D';
	let bgBlue = '#71C3FF';
	let bgDkGreen = '#76A866';
	let bgBrown = '#BF9762';
	console.log(`pokedexStore: ${pokedexStore}`);
	let src = '/src/lib/tipos/grass.png';
</script>

<nav class="h-90 w-full flex flex-col space-y-2 mb-4 mt-4 items-center justify-end  md:flex-row">
	<div class="foto navbg  h-40  w-full" />
	<button class="bg-blue-400 w-72 h-20 text-3xl text-slate-200 font-bold rounded-lg">
		<a href="/pokedex" class="hover:scale-100">Pokedéx</a>
	</button>
</nav>

<h1
	class="text-3xl font-bold text-center md:text-left bg-slate-800 text-slate-100 pt-16 pb-16 pl-16"
>
	Todos os Pokemóns
</h1>
<class
	class="wrapper bg-slate-800 flex flex-col items-center space-y-8 md:flex-row spacex-2 md:flex-wrap md:m-auto md:justify-center p-8 md:space-x-8 overflow-hidden"
>
	<!-- {#if $pokesFetching}
		<p>fetching</p>
	{/if} -->
	<br />

	{#each $pokesStore.sort((a, b) => a.id - b.id) as poke (poke.id)}
		<animarion1 animate:flip={{ duration: 500 }}>
			<animation2 out:fade|local={{ duration: 100 }}>
				<br />
				<div
					class="bgcard w-[44rem] h-[21rem] flex items-center justify-around p-1 space-x-4 rounded-2xl shadow-lg"
				>
					<div class="esquerdo  flex flex-col space-y-2 p-8 w-2/4 h-full relative ">
						<a href="/{poke.id}"><p class="font-bold text-3xl text-slate-400"># {poke.id}</p></a>
						<p class=" font-bold text-3xl  text-slate-400">{poke.name}</p>
						<div class="type flex space-x-4 h-auto p-4  ">
							{#each poke.types as type}
								<img src="/src/lib/tipos/{type.type.name}.png" alt="poder" />
							{/each}
						</div>
						<a class="underline decoration-pink-50-500 absolute bottom-5" href="/{poke.id}"
							>detalhes</a
						>
					</div>
					<div class="direito flex flex-col  space-y-2 p-4 w-2/4 h-full relative">
						<img
							class="h-[18rem] w-[18rem absolute right-[0rem] top-[-4rem] z-0"
							src={poke.sprites.other['official-artwork'].front_default}
							alt="foto_pokemon"
						/>
						<button
							class="bg-slate-100  w-48 h-[3rem] p-2 rounded-xl absolute bottom-[2rem] right-16 z-40 hover:scale-95 transition-all duration-100"
							on:click={() => addToPokedex(poke.id)}>Capturar!</button
						>
					</div>
				</div>
			</animation2>
		</animarion1>
	{/each}
</class>

<!-- {#each poke.types as type}
<h4 class=" text-slate-400 text-2xl bg-purple-800 p-4 rounded-lg">
	{type.type.name}
</h4>
{/each} -->
<style>
	.bgcard {
		background-color: white;
	}
	.navbg {
		background-image: url($lib/logo/logo.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 230px 83px;
	}
</style>
