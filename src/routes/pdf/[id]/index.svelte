<script lang="ts">
	import * as ntw from 'number-to-words';
	import { page } from '$app/stores';
	import { invoices } from '$lib/stores/app';
	import type { Invoice } from '$lib/utils/tasks';
	import { add } from '$lib/utils';
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
		{invoice.title}
	</h1>
	<h3>(ID: {invoice.id})</h3>
</header>
<main>
	<p>
		<strong>Date of Issue:</strong>
		{issueDate}
	</p>
	<div class="senders-info">
		<span class="label">Sender's Info</span>
		<p>
			<strong>Sender's Name:</strong>
			{invoice.senders_name}
		</p>
		<p>
			<strong>Sender's Address:</strong>
			{invoice.senders_address}
		</p>
	</div>
	<div class="recipients-info">
		<span class="label">Recipient's Info</span>
		<p>
			<strong>Recipient's Name:</strong>
			{invoice.recipients_name}
		</p>
		<p>
			<strong>Recipient's Address:</strong>
			{invoice.recipients_address}
		</p>
	</div>
	<table class="log">
		<thead>
			<tr>
				<td id="caption" colspan="7"> Items </td>
			</tr>
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
		<tbody>
			{#each invoice.items as item (item.id)}
				<tr>
					<td> {item.id} </td>
					<td> {item.type === 'good' ? 'Goods' : 'Services'} </td>
					<td> {item.title} </td>
					<td> {item.price} {item.currency} </td>
					<td> {item.amount} </td>
					<td> {item.price * item.amount} {item.currency} </td>
					<td class="break"> {item.description} </td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="bill-in-words">
		<em>
			{ntw.toWords(invoice.items.map((item) => item.price * item.amount).reduce(add, 0))}
			<strong>{invoice.items[0].currency}</strong>
		</em>
	</div>
</main>

<style lang="scss">
	p {
		margin: 0;
	}
	header {
		margin-bottom: 1rem;
		h3 {
			font-weight: normal;
			padding: 0;
			margin: 0;
		}
		h1 {
			padding: 0;
			margin: 0;
			text-decoration: underline;
		}
	}

	.bill-in-words {
		border: 1px solid black;
		margin-block: 1rem;
		padding: 1rem;
		box-sizing: border-box;
		font-size: x-large;
		text-transform: lowercase;
		strong {
			text-transform: uppercase;
		}
	}

	.senders-info,
	.recipients-info {
		position: relative;
		.label {
			position: absolute;
			top: -0.5rem;
			background-color: white;
			font-size: smaller;
		}
		border: 1px solid black;
		padding: 1rem;
		margin-block: 1rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		td {
			border: 1px solid black;
			padding: 0.3rem 0.5rem;
			margin: 0;
		}
		thead {
			#caption {
				font-size: x-large;
				text-align: center;
				font-weight: bold;
			}
			background-color: #aaa;
			color: #111;
		}
		tbody {
			td {
				&.break {
					overflow-wrap: anywhere;
				}
			}
		}
	}
</style>
