<script lang="ts">
	import type { Invoice } from '$lib/utils/tasks';

	// Icons
	import { Tile, Text, Badge } from '@kahi-ui/framework';
	import { goto } from '$app/navigation';
	export let invoice: Invoice;

	export function gotoInvoice() {
		goto(`/invoice/${invoice.id}`);
	}
</script>

<Tile.Container palette="auto" on:click={gotoInvoice} style="cursor: pointer;">
	<Tile.Section>
		<Tile.Header
			>{invoice.title}<Badge palette="informative" radius="tiny">{invoice.id}</Badge><Badge
				palette={invoice.paid ? 'affirmative' : 'negative'}
				radius="tiny">{invoice.paid ? 'Paid' : 'Unpaid'}</Badge
			></Tile.Header
		>
		<Text is="small">
			Date Issued: <strong>{new Date(invoice.date_of_issue).toLocaleString()}</strong>
		</Text>
		<Text is="small">
			From: <strong>{invoice.senders_name}, {invoice.senders_address}</strong>
		</Text>
		<Text is="small">
			To: <strong>{invoice.recipients_name}, {invoice.recipients_address}</strong>
		</Text>
	</Tile.Section>

	<Tile.Footer>
		<!-- <Button variation="clear" on:click={gotoInvoice}>More</Button> -->
	</Tile.Footer>
</Tile.Container>
