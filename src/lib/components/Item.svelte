<script lang="ts">
	import type { Item } from '$lib/utils/tasks';
	import { selectedItem } from '$lib/stores/app';

	/// Components
	import { Card, Badge, Spacer, Button, Text } from '@kahi-ui/framework';

	/// State
	export let item: Item;
</script>

<Card.Container class="card-preview" palette="auto">
	<Card.Header>
		{item.id}
		<Spacer />
		{#if item.type === 'service'}
			<Badge shape="pill" palette="affirmative">Service</Badge>
		{:else}
			<Badge shape="pill" palette="affirmative">Goods</Badge>
		{/if}
	</Card.Header>

	<Card.Section>
		<Text>Title: <strong>{item.title}</strong></Text>
		<Text>Description: <strong>{item.description || 'None'}</strong></Text>
		<Text>Amount: <strong>{item.amount}</strong></Text>
		<Text>Price: <strong>{item.price} {item.currency}</strong></Text>
	</Card.Section>

	<Card.Footer>
		<!-- <Button -->
		<!-- 	palette="accent" -->
		<!-- 	on:click={() => ($selectedActivity = act)} -->
		<!-- 	for="comment-activity-overlay">Comment</Button -->
		<!-- > -->
		<Button palette="negative" for="item-delete-overlay" on:click={() => ($selectedItem = item)}
			>Delete</Button
		>
	</Card.Footer>
</Card.Container>
