<script>
	export let data;
	const { pokemon } = data;
	import { tweened } from 'svelte/motion';
	// import { addToPokedex, pokesStore, pokesFetching, pokedexStore } from '/stores/pokestore' -> error defining correct directory. Asure that it will load once click back button in browser. //

	// @ts-ignore
	let colors = [];

	function getRandomColor() {
		let letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		colors = [...colors, color];
		return color;
	}
	const tweenedA = tweened(0, { duration: 300 });
</script>

<nav class="h-90 w-full flex flex-col space-y-2 mb-4 mt-4 items-center justify-end md:flex-row">
	<button class="bg-blue-400 w-72 h-20 text-3xl text-slate-200 font-bold rounded-lg">
		<a href="/" class="hover:scale-100">voltar</a>
	</button>
	<button
		class="bg-slate-100  w-48 h-[3rem] p-2 rounded-xl  z-40 hover:scale-95 transition-all duration-100"
		on:click={() => addToPokedex(poke.id)}>Capturar!</button
	>
	<button
		on:click={() => removeFromPokedex(poke.id)}
		class="bg-red-400 text-slate-200 w-48 h-[3rem] p-2 rounded-xl z-40 hover:scale-95 transition-all duration-100"
	>
		Excluir
	</button>
	<div class="foto navbg  h-40  w-full" />
	<!-- <button class="bg-blue-400 w-72 h-20 text-3xl text-slate-200 font-bold rounded-lg">
		<a href="/pokedex" class="hover:scale-100">Pokedéx</a>
	</button> -->
</nav>
<section
	class="greewrapper h-1/3  flex flex-col items-center space-y-8 md:flex-row spacex-2 md:flex-wrap md:m-auto md:justify-center p-8 md:space-x-8 rounded-3xl"
>
	<!-- grid container -->
	<section class="gridContainer grid gap-6 grid-cols-1 md:grid-cols-4 md:grid-rows-2">
		<!-- box1 imagem 1  -->
		<div
			class="BOX1 p-10 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center"
		>
			<!-- box image -->
			<img
				class=""
				src={pokemon.sprites.other['official-artwork'].front_default}
				alt="foto_pokemon"
			/>
		</div>
		<!-- box2 imagem-->
		<div class="basestats p-10 rounded-xl bg-purple-500 text-white md:row-span-2 flex flex-col">
			<h1>Base Stats</h1>
			<section class="PowerContainer flex space-x-12 space-y mt-16 p-8 bg-slate-400">
				<section class="PowerTitlemt-1 flex flex-col space-y-4 items-end w-32 ">
					{#each pokemon.stats as power}
						<h1>{power.stat.name}</h1>
					{/each}
				</section>
				<section class="PowerValue flex flex-col space-y-4 items-left w-72 ">
					{#each pokemon.stats as power}
						<div class="bar" style="width:{tweenedA}%; background-color:{getRandomColor()}">
							<h1>{power.base_stat}</h1>
						</div>
					{/each}
				</section>
			</section>
		</div>
		<!-- box3 -->

		<div
			class="BOX1 flex flex-col  space-y-8 p-10 rounded-xl bg-slate-500 text-white md:row-span-2 overflow-clip "
		>
			<h2># {pokemon.id}</h2>
			<h2>{pokemon.name}</h2>

			<div
				class=" flex flex-col space-y-2 flex-wrap md:flex-row md:space-x-4 items-center justify-center"
			>
				{#each pokemon.types as type}
					<br />

					<img src="/src/lib/tipos/{type.type.name}.png" alt="" />
				{/each}

				<section class="MOVESPOKEMON ">
					<h2 class="text-slate-200 p-4">Moves</h2>
					<section
						class="h-full p-10 flex space-x-4 flex-wrap space-y-1 items-center justify-center md:flex-row md:space-x-6 md:space-y-6 md:flex-wrap md:p-2  "
					>
						<br />

						{#each pokemon.moves as move, i}
							{#if i < 15}
								<h4
									class=" text-slate-100 font-bold text-center p-5 rounded-lg"
									style="background-color:{getRandomColor()}"
								>
									{move.move.name}
								</h4>
							{/if}
						{/each}
					</section>
				</section>
			</div>
		</div>
		<div class="BOX4 fotodireita hidden p-10  text-white md:row-span-2 md:flex flex-col relative">
			<img
				class=" hidden absolute h-64 w-64 top-[-10rem] right-[-3rem] md:block"
				src={pokemon.sprites.other['official-artwork'].front_default}
				alt="foto_pokemon"
			/>
		</div>

		<div class="p-10 rounded-xl bg-slate-400 text-white flex flex-col items-center justify-center">
			<img
				class=""
				src={pokemon.sprites.other['official-artwork'].front_default}
				alt="foto_pokemon"
			/>
		</div>
	</section>
</section>

<style>
	.navbg {
		background-image: url($lib/logo/logo.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 230px 83px;
	}
	.greewrapper {
		background-color: #729f92;
	}
	.bar {
		height: auto;
		background-color: orangered;
	}
</style>
