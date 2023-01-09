<script>
	// @ts-nocheck
	import { removeFromPokedex, pokedexStore } from '../../stores/pokestore';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	let bgLtGreen = '#729F92';
	let bGorange = '#EAAB7D';
	let bgBlue = '#71C3FF';
	let bgDkGreen = '#76A866';
	let bgBrown = '#BF9762';
	import Modal from '$lib/components/modal.svelte';
	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};
</script>

<!-- svelte-ignore missing-declaration -->

<Modal
	head="Oh No!"
	body="O Pokémon foi removido de sua Pokedéx."
	{showModal}
	on:click={toggleModal}
/>
<nav class="h-90 w-full flex flex-col space-y-2 mb-4 mt-4 items-center justify-end  md:flex-row">
	<div class="foto navbg  h-40  w-full" />
	<button class="bg-blue-400 w-72 h-20 text-3xl text-slate-200 font-bold rounded-lg">
		<a href="/">Voltar</a>
	</button>
</nav>
{#if $pokedexStore.length === 0}
	<h1
		class="text-xl font-bold text-centertext-center md:text-left bg-gray-600 text-slate-100 pt-16 pb-16 pl-16"
	>
		Você não possui na sua pokedex
	</h1>
{:else}
	<h1
		class="text-7xl font-bold text-centertext-center md:text-left bg-gray-600 text-slate-100 pt-16 pb-16 pl-16"
	>
		Meus Pokemóns
	</h1>
	<section
		class="wrapper bg-gray-600 h-4/5 flex flex-col items-center space-y-4 md:flex-row spacex-2 md:flex-wrap md:m-auto md:justify-center p-8 md:space-x-4 overflow-hidden"
	>
		<br />

		{#each $pokedexStore.sort((a, b) => a.id - b.id) as poke (poke.id)}
			<animation2 animate:flip={{ duration: 500 }}>
				<animation1 out:fade|local={{ duration: 100 }}>
					<br />
					<div
						class="bgcard w-[44rem] h-[21rem] flex items-center justify-around p-1 space-x-4 rounded-2xl shadow-lg"
						style:background-color={poke.types[0].type.name === 'grass'
							? bgLtGreen
							: poke.types[0].type.name === 'fire'
							? bGorange
							: poke.types[0].type.name === 'water'
							? bgBlue
							: poke.types[0].type.name === 'poison'
							? bgDkGreen
							: poke.types[0].type.name === 'ground'
							? bgBrown
							: poke.types[0].type.name === 'normal'
							? bgBrown
							: poke.types[0].type.name === 'bug'
							? bgDkGreen
							: 'white'}
					>
						<div class="esquerdo  flex flex-col space-y-2 p-8 w-2/4 h-full relative ">
							<a href="/{poke.id}"><p class="font-bold text-3xl text-slate-00"># {poke.id}</p></a>
							<p class=" font-bold text-3xl  text-slate-200">{poke.name}</p>

							<div class="type flex space-x-4 h-auto p-4  ">
								{#each poke.types as type}
									<img src="/src/lib/tipos/{type.type.name}.png" alt="imagem_tipos" />
								{/each}
							</div>
							<a
								class="text-slate-200  text-xl absolute bottom-5 underline slate-500 font-bold  underline-offset-4"
								href="/{poke.id}">Detalhes</a
							>
						</div>
						<div class="direito flex flex-col  space-y-2 p-4 w-2/4 h-full relative">
							<img
								class="h-[18rem] w-[18rem absolute right-[0rem] top-[-4rem] z-0"
								src={poke.sprites.other['official-artwork'].front_default}
								alt="foto_pokemon"
							/>
							<button
								class="bg-red-400 text-slate-200 w-48 h-[3rem] p-2 rounded-xl absolute bottom-[2rem] right-16 z-40 hover:scale-95 transition-all duration-100"
								on:click={toggleModal}
								on:click={() => removeFromPokedex(poke.id)}
							>
								Excluir
							</button>
						</div>
					</div>
				</animation1>
			</animation2>
		{/each}
	</section>
{/if}

<!-- 
	{#each $pokedexStore.sort((a, b) => a.id - b.id) as poke}
	<p>{poke.name}, {poke.id}</p>
	<button on:click={() => removeFromPokedex(poke.id)}> remove from pokedex wallet </button>
{:else}
	<p>No pokemon captured yet</p>
{/each} -->
<style>
	.bgcard {
		background-image: url(/pngwing2.png);
		background-repeat: no-repeat;
		background-position: right 0px top 0px;
		background-size: 60%, 60%;
		z-index: 20;
	}
	.navbg {
		background-image: url(/logo.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 230px 83px;
	}
</style>
