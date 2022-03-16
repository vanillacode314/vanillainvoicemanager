<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Invoice from '$lib/components/Invoice.svelte';
	import { invoices } from '$lib/stores/app';
</script>

<div>
	{#each $invoices as invoice (invoice.id)}
		<div animate:flip={{ duration: 300 }} transition:fade|local>
			<Invoice {invoice} />
		</div>
	{/each}
</div>

<style lang="scss">
	div {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 1rem;
	}
</style>
