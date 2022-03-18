<script lang="ts">
	import { page } from '$app/stores';
	import { invoices } from '$lib/stores/app';
	import type { Invoice } from '$lib/utils/tasks';
	import { onMount } from 'svelte';

	/// State
	$: id = $page.params.id;
	$: invoice = $invoices.find((i) => i.id === +id) || ({ items: [] } as Invoice);
	$: issueDate = new Date(invoice.date_of_issue).toLocaleString(undefined, {
		dateStyle: 'full'
	});

	onMount(() => {
		const reloaded = window.localStorage.getItem('reloaded');
		if (+reloaded) {
			window.print();
			window.localStorage.setItem('reloaded', '0');
		} else {
			window.localStorage.setItem('reloaded', '1');
			window.location.reload();
		}
	});
</script>

<header>
	<h1>
		{invoice.title} ({invoice.id})
	</h1>
	<p>
		<strong>Date of Issue:</strong>
		{issueDate}
	</p>
	<p>
		<strong>Sender's Name:</strong>
		{invoice.senders_name}
	</p>
	<p>
		<strong>Sender's Address:</strong>
		{invoice.senders_address}
	</p>
	<p>
		<strong>Recipient's Name:</strong>
		{invoice.recipients_name}
	</p>
	<p>
		<strong>Recipient's Address:</strong>
		{invoice.recipients_address}
	</p>
</header>
<main>
	<h2>Items</h2>
	<table class="log">
		<thead>
			<tr>
				<td> ID </td>
				<td> Type </td>
				<td> Title </td>
				<td> Price </td>
				<td> Amount </td>
				<td> Total </td>
				<td> Description </td>
			</tr>
		</thead>
		<tbody />
		{#each invoice.items as item (item.id)}
			<tr>
				<td> {item.id} </td>
				<td> {item.type === 'good' ? 'Goods' : 'Services'} </td>
				<td> {item.title} </td>
				<td> {item.price} {item.currency} </td>
				<td> {item.amount} </td>
				<td> {item.price * item.amount} {item.currency} </td>
				<td> {item.description} </td>
			</tr>
		{/each}
	</table>
</main>

<style lang="scss">
	header {
		p {
			margin: 0;
		}
	}
</style>
