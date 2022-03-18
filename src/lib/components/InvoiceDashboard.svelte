<script lang="ts">
	import { exportToJsonFile } from '$lib/utils';
	import { addItem, type Invoice } from '$lib/utils/tasks';

	/// Components
	import { Badge, Text, Spacer, Card, Button, Switch } from '@kahi-ui/framework';

	/// State
	import { invoices, selectedInvoice } from '$lib/stores/app';
	import { tick } from 'svelte';
	export let invoice: Invoice;
	$: issueDate = new Date(invoice.date_of_issue).toLocaleString(undefined, {
		dateStyle: 'full'
	});

	// /// Methods
	// function toggle() {
	// 	if (running) {
	// 		endActivity(task.activities.find((act) => act.done === false));
	// 	} else {
	// 		startActivity(task);
	// 	}
	// }
	//
	function exportInvoice() {
		exportToJsonFile(invoice, `${invoice.id}-${invoice.title}`.replace(/\s/g, '-'));
	}

	function add() {
		$selectedInvoice = invoice;
	}

	function onPaidChanged() {
		$invoices = $invoices;
	}
</script>

<Card.Container class="card-preview" palette={invoice.paid ? 'affirmative' : 'negative'}>
	<Card.Header>
		{invoice.title}
		<Spacer />
		<Badge radius="tiny" palette="informative">{invoice.paid ? 'Paid' : 'Unpaid'}</Badge>
		<Badge radius="tiny" palette="informative">ID: {invoice.id}</Badge>
	</Card.Header>

	<Card.Section>
		<Text>
			Date of Issue: <strong>{issueDate}</strong>
		</Text>
		<Text>
			Sender's Name: <strong>{invoice.senders_name}</strong>
		</Text>
		<Text>
			Sender's Address: <strong>{invoice.senders_address}</strong>
		</Text>
		<Text>
			Recipients's Name: <strong>{invoice.recipients_name}</strong>
		</Text>
		<Text>
			Recipients's Address: <strong>{invoice.recipients_address}</strong>
		</Text>
	</Card.Section>

	<Card.Footer style="flex-wrap: wrap">
		<Button is="label" on:click={add} palette="accent" for="add-item-overlay">Add Item</Button>
		<!-- <Button on:click={() => ($selectedTask = task)} for="task-edit-overlay">Edit</Button> -->
		<Button is="a" palette="auto" href="/pdf/{invoice.id}">Print</Button>
		<Button on:click={exportInvoice}>Export</Button>
		<Button
			is="label"
			palette="negative"
			on:click={() => ($selectedInvoice = invoice)}
			for="invoice-delete-overlay">Delete</Button
		>
		<Switch bind:state={invoice.paid} on:change={onPaidChanged} palette="auto">Paid</Switch>
	</Card.Footer>
</Card.Container>
