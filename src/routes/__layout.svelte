<script lang="ts">
	import AddItem from '$lib/components/AddItem.svelte';
	import AddModal from '$lib/components/AddModal.svelte';
	import DeleteInvoiceModal from '$lib/components/DeleteInvoiceModal.svelte';
	import DeleteItemModal from '$lib/components/DeleteItemModal.svelte';

	import '../app.scss';
	import '@kahi-ui/framework/dist/kahi-ui.framework.min.css';
</script>

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
