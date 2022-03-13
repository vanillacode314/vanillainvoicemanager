<script lang="ts">
	import { goto } from '$app/navigation';

	import { selectedInvoice, invoices } from '$lib/stores/app';

	import { Button, Overlay, Card, Text } from '@kahi-ui/framework';

	let logic_state: boolean = false;

	function remove() {
		goto('/').then(() => {
			$invoices = $invoices.filter((i) => i.id !== $selectedInvoice.id);
		});
		logic_state = false;
	}
</script>

<Overlay.Container logic_id="invoice-delete-overlay" dismissible bind:logic_state>
	<Overlay.Backdrop />

	<Overlay.Section>
		<Card.Container palette="auto" width={['50', 'mobile:75']}>
			<Card.Header>Delete Invoice</Card.Header>

			<Card.Section>
				<Text>Are you sure want to delete this invoice?</Text>
			</Card.Section>

			<Card.Footer>
				<Overlay.Button palette="inverse" variation="clear">Cancel</Overlay.Button>
				<Button palette="negative" on:click={remove}>Delete</Button>
			</Card.Footer>
		</Card.Container>
	</Overlay.Section>
</Overlay.Container>
