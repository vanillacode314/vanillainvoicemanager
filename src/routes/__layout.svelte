<script lang="ts">
	import AddItem from '$lib/components/AddItem.svelte';
	import AddModal from '$lib/components/AddModal.svelte';
	import DeleteInvoiceModal from '$lib/components/DeleteInvoiceModal.svelte';
	import DeleteItemModal from '$lib/components/DeleteItemModal.svelte';

	import '../app.scss';
</script>

<svelte:head>
	<title>VanillaInvoiceManager</title>
</svelte:head>

<main>
	<slot />
</main>

<AddModal />
<AddItem />
<DeleteItemModal />
<DeleteInvoiceModal />

<style lang="scss">
	main {
		height: 100%;
		margin-inline: auto;
		max-width: 1080px;
		padding: 0.5rem;
		display: flex;
		gap: 1rem;
		flex-direction: column;
	}
</style>
