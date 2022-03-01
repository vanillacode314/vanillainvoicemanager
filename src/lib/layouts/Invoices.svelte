<script lang="ts">
	import Invoice from '$lib/components/Invoice.svelte';
	import { invoices } from '$lib/stores/app';
</script>

<div>
	{#each $invoices as invoice}
		<Invoice {invoice} />
	{/each}
</div>

<style lang="scss">
	div {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 1rem;
	}
</style>
