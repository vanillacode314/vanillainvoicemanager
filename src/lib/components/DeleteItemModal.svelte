<script lang="ts">
	import { page } from '$app/stores';

	import { selectedItem, invoices } from '$lib/stores/app';

	import { Button, Overlay, Card, Text } from '@kahi-ui/framework';

	let logic_state: boolean = false;

	function remove() {
		let invoice = $invoices.find((i) => i.id === Number($page.params.id));
		invoice.items = invoice.items.filter((a) => a !== $selectedItem);
		$invoices = $invoices;
		logic_state = false;
	}
</script>

<Overlay.Container logic_id="item-delete-overlay" dismissible bind:logic_state>
	<Overlay.Backdrop />

	<Overlay.Section>
		<Card.Container palette="auto" max_width="75">
			<Card.Header>Delete Item</Card.Header>

			<Card.Section>
				<Text>Are you sure want to delete this item?</Text>
			</Card.Section>

			<Card.Footer>
				<Overlay.Button palette="inverse" variation="clear">Cancel</Overlay.Button>
				<Button palette="negative" on:click={remove}>Delete</Button>
			</Card.Footer>
		</Card.Container>
	</Overlay.Section>
</Overlay.Container>
