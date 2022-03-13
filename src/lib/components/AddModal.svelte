<script lang="ts">
	import { Form, TextInput, Button, Overlay, Card, Switch, NumberInput } from '@kahi-ui/framework';
	import { createInvoice } from '$lib/utils/tasks';
	let logic_state: boolean = false;
	let title: string = '';
	let senders_name: string = '';
	let senders_address: string = '';
	let recipients_name: string = '';
	let recipients_address: string = '';

	function update() {
		if (!(title && senders_address && senders_name && recipients_address && recipients_name))
			return;
		createInvoice({
			title,
			senders_name,
			senders_address,
			recipients_name,
			recipients_address
		});
		title = '';
		senders_name = '';
		senders_address = '';
		recipients_name = '';
		recipients_address = '';
		logic_state = false;
	}
</script>

<Overlay.Container logic_id="create-invoice-overlay" dismissible bind:logic_state>
	<Overlay.Backdrop />

	<Overlay.Section>
		<Card.Container palette="auto" width={['50', 'mobile:75']}>
			<Card.Header>Create Invoice</Card.Header>

			<Card.Section>
				<Form.Control>
					<Form.Label for="title">Title</Form.Label>
					<TextInput name="title" bind:value={title} required />
					<Form.Label for="sname">Sender's Name</Form.Label>
					<TextInput name="sname" bind:value={senders_name} />
					<Form.Label for="saddress">Sender's Address</Form.Label>
					<TextInput name="saddress" is="textarea" bind:value={senders_address} />
					<Form.Label for="rname">Recipient's Name</Form.Label>
					<TextInput name="rname" bind:value={recipients_name} />
					<Form.Label for="raddress">Recipient's Address</Form.Label>
					<TextInput name="raddress" is="textarea" bind:value={recipients_address} />
				</Form.Control>
			</Card.Section>

			<Card.Footer>
				<Overlay.Button palette="inverse" variation="clear">Cancel</Overlay.Button>

				<Button palette="affirmative" on:click={update}>Create</Button>
			</Card.Footer>
		</Card.Container>
	</Overlay.Section>
</Overlay.Container>
