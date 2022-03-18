<script lang="ts">
	import { invoices } from '$lib/stores/app';
	import { exportToJsonFile } from '$lib/utils';
	import { getId } from '$lib/utils/tasks';

	import { Button } from '@kahi-ui/framework';
	function exportAllInvoices() {
		if ($invoices?.length) {
			exportToJsonFile($invoices);
		} else {
			alert('No invoices to export :(');
		}
	}

	function importInvoice() {
		const c = confirm('This will overwrite all your invoices.');
		if (c) {
			async function handleFiles() {
				const file = this.files[0];
				const data = await file.text();
				$invoices = JSON.parse(data);
				input.removeEventListener('change', handleFiles);
			}
			const input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.addEventListener('change', handleFiles);
			input.click();
		}
	}

	function importSingleInvoice() {
		async function handleFiles() {
			const file = this.files[0];
			const data = await file.text();
			const invoice = JSON.parse(data);
			const alreadyHasID = $invoices.some((i) => i.id === invoice.id);
			if (alreadyHasID) {
				alert(
					'The ID of the imported invoice conflicts with an existing invoice. Assigning new ID to the imported invoice.'
				);
				invoice.id = getId($invoices.map((t) => t.id));
			}
			$invoices.push(invoice);
			$invoices = $invoices;
			input.removeEventListener('change', handleFiles);
		}
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.addEventListener('change', handleFiles);
		input.click();
	}
</script>

<nav aria-label="toolbar">
	<Button is="label" palette="accent" for="create-invoice-overlay">Create Invoice</Button>
	<Button on:click={exportAllInvoices}>Export All Invoices</Button>
	<Button on:click={importInvoice}>Import Invoices</Button>
	<Button on:click={importSingleInvoice}>Import Single Invoices</Button>
</nav>

<style lang="scss">
	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}
</style>
