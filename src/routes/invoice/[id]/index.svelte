<script lang="ts">
	import { page } from '$app/stores';
	import { invoices, selectedInvoice } from '$lib/stores/app';

	/// Components
	import { Button } from '@kahi-ui/framework';
	// import ActivityCard from '$lib/components/Activity.svelte';
	import InvoiceDashboard from '$lib/components/InvoiceDashboard.svelte';
	import IconBack from '~icons/mdi/arrow-back';
	import Item from '$lib/components/Item.svelte';

	/// State
	$: id = $page.params.id;
	$: invoice = $invoices.find((i) => i.id === +id) || { items: [] };

	$: $selectedInvoice = invoice;
</script>

<nav>
	<a href="/">
		<Button palette="accent">
			<IconBack />
		</Button>
	</a>
</nav>
<div class="content">
	<!-- <TaskDashboard {invoice} /> -->
	<InvoiceDashboard {invoice} />
	<div class="log">
		{#each invoice.items as item}
			<Item {item} />
		{/each}
	</div>
</div>

<style lang="scss">
	.content {
		display: grid;
		grid-template-rows: auto auto;
		gap: 1rem;
	}
	.log {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
	}
</style>
