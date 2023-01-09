<script>
	// @ts-nocheck
	import { get, writable } from 'svelte/store';
	export let data;
	const { pokemon } = data;
	import { addToPokedex, removeFromPokedex, pokedexStore } from '../../stores/pokestore';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import Modal from '$lib/components/modal.svelte';
	import ModalB from '$lib/components/modal.svelte';
	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};
	const toggleModalB = () => {
		showModal = !showModal;
	};

	// tween do power stats //
	function tween(node, { value, easing, delay = 0 }) {
		const tStore = tweened(0, { duration: 1500, easing });

		const unsubscribe = tStore.subscribe((v) => {
			node.style.width = `${v}%`;
		});

		setTimeout(() => tStore.set(value), delay);

		return {
			destroy() {
				unsubscribe();
			}
		};
	}
	// final tween do power stats //

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
	// function to check if pokemon is in pokedex

	let check = function checkPokedex() {
		let $pokedex = $pokedexStore;
		let id = pokemon.id;
		let result = $pokedex.find((item) => item.id === id);
		if (result) {
			return true;
		} else {
			return false;
		}
	};
</script>

<ModalB
	head="Oh No!"
	body="O Pokémon foi removido de sua Pokedéx."
	{showModal}
	on:click={toggleModal}
/>

<nav
	class="h-90 w-full flex flex-col space-y-2 mb-4 mt-4 items-center justify-end md:flex-row md:space-x-4 bg-white  "
>
	<br />
	<button class="bg-blue-400 w-72 h-20 text-3xl text-slate-200 font-bold rounded-lg">
		<a href="/" class="hover:scale-100">voltar</a>
	</button>

	{#if check() == true}
		<button
			on:click={toggleModalB}
			on:click={() => removeFromPokedex(pokemon.id)}
			class="bg-red-400 w-72 h-20 text-3xl text-slate-200 font-bold rounded-lg"
		>
			Excluir
		</button>
	{/if}

	<button class="bg-blue-400 w-72 h-20 text-3xl text-slate-200 font-bold rounded-lg">
		<a href="/pokedex" class="hover:scale-100">Pokedéx</a>
	</button>
	<div class="foto navbg  h-40  w-full" />
</nav>

<!-- /////////////////////////////////////////////// -->

<section
	class="greewrapper h-1/3  flex flex-col items-center space-y-8 md:flex-row  spacex-2 md:flex md:m-auto md:justify-center  p-48 md:space-x-8 rounded-3xl "
>
	<!-- grid container -->
	<section class="gridContainer grid gap-6 grid-cols-1 md:grid-cols-4   md:grid-rows-2">
		<!-- box1 imagem 1  -->
		<div
			class="BOX1 p-10 rounded-xl bg-slate-900  text-slate-800 flex flex-col items-center justify-center md:min-w-full"
		>
			<!-- box imagem -->
			<img
				class=""
				src={pokemon.sprites.other['official-artwork'].front_default}
				alt="foto_pokemon"
			/>
		</div>
		<!-- box2 imagem-->
		<div class="basestats p-10 rounded-xl bg-slate-100 text-slate-800 md:row-span-2 flex flex-col">
			<h1 class="text-4xl font-bold">Base Stats:</h1>
			<section class="PowerContainer flex  justify-center items-center space-y mt-16 p-2">
				<section
					class="PowerTitlemt flex flex-col space-y-4 items-end w-5/6 justify-right p-2  text-slate-800 text-xl"
				>
					{#each pokemon.stats as power}
						<h4 class="p-2  p-x-4">{power.stat.name}</h4>
					{/each}
				</section>
				<ber />
				<section
					class="PowerValue flex flex-col space-y-4 items-left w-5/6   justify-left  p-2 text-xl "
				>
					{#each pokemon.stats as power, i}
						<h2
							class="bar rounded-r-xl   text-slate-200 text-left p-2 "
							style="background-color: {getRandomColor()}"
							use:tween={{ value: power.base_stat, easing: cubicOut, delay: i * 100 }}
						>
							{power.base_stat}
						</h2>
					{/each}
				</section>
			</section>
		</div>
		<!-- box3 -->

		<div
			class="BOX1 flex flex-col  space-y-8 p-10 rounded-xl  bg-slate-100 text-slate-800 md:row-span-2 overflow-clip "
		>
			<section class="h-64 rounded-xl bg-slate-100 ">
				<h2 class="text-2xl font-bold">#{pokemon.id}</h2>
				<h2 class="text-4xl font-bold">{pokemon.name}</h2>
				{#each pokemon.types as type}
					<br />
					<img src="/src/lib/tipos/{type.type.name}.png" alt="" />
				{/each}
			</section>
			<div
				class=" flex flex-col space-y-2 flex-wrap md:flex-row md:space-x-4 items-center justify-center"
			>
				<section class="MOVESPOKEMON ">
					<h2 class=" text-4xl font-bold p-4">Moves:</h2>
					<section
						class="h-full p-10 flex space-x-4 flex-wrap space-y-1 items-center justify-center md:flex-row md:space-x-6 md:space-y-6 md:flex-wrap md:p-2  "
					>
						<br />

						{#each pokemon.moves as move, i}
							{#if i < 15}
								<h4
									class=" text-slate-800 font-bold text-center p-5 rounded-lg"
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
		<div
			class="BOX4 fotodireita hidden p-10   text-slate-800 md:row-span-2 md:flex flex-col relative"
		>
			<img
				class=" hidden absolute h-[30rem] w-[30rem] top-[-20rem] right-[-3rem] md:block"
				src={pokemon.sprites.other['official-artwork'].front_default}
				alt="foto_pokemon"
			/>
		</div>

		<div
			class="p-10 rounded-xl bg-slate-100 text-slate-800 flex flex-col items-center justify-center"
		>
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
		background-color: #178f6d;
		background-image: url($lib/marcadagua/pngwing2l.png);
		background-repeat: no-repeat;
		background-position: right 0px top 0px;
		background-size: 50%, 50%;
		z-index: 20;
	}
	.bar {
		height: auto;
		background-color: orangered;
	}
</style>
