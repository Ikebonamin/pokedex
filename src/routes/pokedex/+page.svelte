<script>
	import { removeFromPokedex, pokedexStore } from '../../stores/pokestore';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
</script>

<nav class="h-90 w-full flex flex-col space-y-2 mb-4 mt-4 items-center justify-end  md:flex-row">
	<div class="foto navbg  h-40  w-full" />
	<button class="bg-blue-400 w-72 h-20 text-3xl text-slate-200 font-bold rounded-lg">
		<a href="/">Voltar</a>
	</button>
</nav>
<h1
	class="text-3xl font-bold text-center md:text-left bg-slate-800 text-slate-100 pt-16 pb-16 pl-16"
>
	Meus Pokemóns
</h1>
<section
	class="wrapper bg-slate-800 flex flex-col items-center space-y-4 md:flex-row spacex-2 md:flex-wrap md:m-auto md:justify-center p-8 md:space-x-4 overflow-hidden"
>
	<br />

	{#each $pokedexStore.sort((a, b) => a.id - b.id) as poke (poke.id)}
		<animation2 animate:flip={{ duration: 500 }}>
			<animation1 out:fade|local={{ duration: 100 }}>
				<br />
				<div
					class="bgcard bg-slate-300 w-[44rem] h-[21rem] flex items-center justify-around p-1 space-x-4 rounded-2xl shadow-lg"
				>
					<div class="esquerdo  flex flex-col space-y-2 p-8 w-2/4 h-full relative ">
						<a href="/{poke.id}"><p class="font-bold text-3xl text-slate-200"># {poke.id}</p></a>
						<p class=" font-bold text-3xl  text-slate-200">{poke.name}</p>

						<div class="type flex space-x-4 h-auto p-4  ">
							{#each poke.types as type}
								<img src="/src/lib/tipos/{type.type.name}.png" alt="imagem_tipos" />
							{/each}
						</div>
						<a href="/{poke.id}" class="absolute bottom-5">detalhes</a>
					</div>
					<div class="direito flex flex-col  space-y-2 p-4 w-2/4 h-full relative">
						<img
							class="h-[18rem] w-[18rem absolute right-[0rem] top-[-4rem] z-0"
							src={poke.sprites.other['official-artwork'].front_default}
							alt="foto_pokemon"
						/>
						<button
							on:click={() => removeFromPokedex(poke.id)}
							class="bg-red-400 text-slate-200 w-48 h-[3rem] p-2 rounded-xl absolute bottom-[2rem] right-16 z-40 hover:scale-95 transition-all duration-100"
						>
							Excluir
						</button>
					</div>
				</div>
			</animation1>
		</animation2>
	{/each}
</section>

<!-- 
	{#each $pokedexStore.sort((a, b) => a.id - b.id) as poke}
	<p>{poke.name}, {poke.id}</p>
	<button on:click={() => removeFromPokedex(poke.id)}> remove from pokedex wallet </button>
{:else}
	<p>No pokemon captured yet</p>
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
