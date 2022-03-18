<script lang="ts">
	import Invoices from '$lib/layouts/Invoices.svelte';
	import Toolbar from '$lib/layouts/Toolbar.svelte';
	import '@kahi-ui/framework/dist/kahi-ui.framework.min.css';
	import '@kahi-ui/framework/dist/kahi-ui.theme.default.min.css';
</script>

<div class="wrapper">
	<Invoices />
	<Toolbar />
</div>

<style lang="scss">
	.wrapper {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
	}
</style>
