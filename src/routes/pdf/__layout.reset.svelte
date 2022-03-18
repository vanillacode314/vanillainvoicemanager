<script lang="ts">
	import '../../print.scss';
</script>

<main>
	<slot />
</main>

<style lang="scss">
	main {
		height: 100%;
		margin-inline: auto;
		max-width: 1080px;
		padding: 0.5rem;
		display: flex;
		gap: 1rem;
		flex-direction: column;
	}
</style>
