<script lang="ts">
	import {
		Form,
		TextInput,
		Button,
		Overlay,
		Card,
		NumberInput,
		Radio,
		Spacer
	} from '@kahi-ui/framework';
	import { addItem } from '$lib/utils/tasks';
	import { selectedInvoice } from '$lib/stores/app';

	let logic_state: boolean = false;
	let type: 'good' | 'service' = 'good';
	let title: string = '';
	let description: string = '';
	let amount: number = 1;
	let price: number = 0;
	let currency: string = 'USD';

	function update() {
		if (!(title && type && price && currency)) return;
		addItem($selectedInvoice, {
			title,
			type,
			description,
			amount,
			price,
			currency
		});
		type = 'good';
		title = '';
		description = '';
		amount = 1;
		price = 0;
		currency = 'USD';
		logic_state = false;
	}
</script>

<Overlay.Container logic_id="add-item-overlay" dismissible bind:logic_state>
	<Overlay.Backdrop />

	<Overlay.Section>
		<Card.Container palette="auto" width={['50', 'mobile:75']}>
			<Card.Header>Create Item</Card.Header>

			<Card.Section>
				<Form.Group bind:logic_state={type}>
					<Form.Label for="good">Goods</Form.Label>
					<Radio value="good" />
					<Form.Label for="service">Services</Form.Label>
					<Radio value="service" />
				</Form.Group>
				<Spacer />
				<Form.Control>
					<Form.Label for="title">Title</Form.Label>
					<TextInput name="title" bind:value={title} required />
					<Form.Label for="description">Description</Form.Label>
					<TextInput is="textarea" name="description" bind:value={description} required />
				</Form.Control>
				<Form.Control>
					<Form.Label for="amount">Amount</Form.Label>
					<NumberInput name="amount" bind:value={amount} required />
					<Form.Label for="price">Price</Form.Label>
					<NumberInput name="price" bind:value={price} required />
					<Form.Label for="currency">Currency</Form.Label>
					<TextInput name="currency" bind:value={currency} required />
				</Form.Control>
			</Card.Section>

			<Card.Footer>
				<Overlay.Button palette="inverse" variation="clear">Cancel</Overlay.Button>

				<Button palette="affirmative" on:click={update}>Create</Button>
			</Card.Footer>
		</Card.Container>
	</Overlay.Section>
</Overlay.Container>
