<script>
	// @ts-nocheck
	export let head;
	export let body;
	export let showModal = true;
</script>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="backdrop w-full h-full fixed bg-gray-900/90 z-50 text-center" on:click|self>
		<div
			class="modal mt-96 h-48 w-[35rem] rounded-2xl text-center  mx-auto  bg-white flex flex-col items-center justify-center space-y-4 px-4 "
		>
			<p class="text-4xl font-bold">{head}</p>
			<p class="text-xl semi-bold">{body}</p>
		</div>
	</div>
{/if}
