import { invoices } from '$lib/stores/app';
type Timestamp = number;

export interface Item {
	id: number;
	title: string;
	description: string;
	type: 'service' | 'good';
	amount?: number;
	price: number;
	currency: string;
}

export interface Invoice {
	id: number;
	title: string;
	paid: boolean;
	date_of_issue: Timestamp;
	senders_name: string;
	senders_address: string;
	recipients_name: string;
	recipients_address: string;
	items: Item[];
}

export function getId(ids: number[]): number {
	let id = 0;
	while (id === 0 || ids.includes(id)) {
		id = Math.floor(Math.random() * 10000);
	}
	return id;
}

export function createInvoice({
	title = '',
	senders_name = '',
	senders_address = '',
	recipients_name = '',
	recipients_address = ''
} = {}) {
	if (!(title && senders_address && senders_name && recipients_address && recipients_name)) return;
	invoices.update((val) => {
		const id = getId(val.map((invoice) => invoice.id));
		const invoice: Invoice = {
			id,
			title,
			date_of_issue: Date.now(),
			senders_name,
			senders_address,
			paid: false,
			recipients_name,
			recipients_address,
			items: []
		};
		val.push(invoice);
		return val;
	});
}

export function removeInvoice(id: number) {
	invoices.update((val) => {
		return val.filter((invoice) => invoice.id != id);
	});
}

export function addItem(
	invoice: Invoice,
	{ title = '', description = '', type = '', price = 0, currency = 'USD', amount = 1 } = {}
) {
	if (!(title && currency && type && price)) return;
	const id = getId(invoice.items.map((item) => item.id));
	const item: Item = {
		id,
		title,
		description,
		type,
		amount,
		price,
		currency
	};
	invoice.items.push(item);
	invoices.update((val) => val);
	return item;
}

// export function removeItem(item: Item) {
// 	invoice.update((val) => val);
// 	return activity;
// }
