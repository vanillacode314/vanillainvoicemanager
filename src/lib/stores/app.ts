import type { Invoice, Item } from '$lib/utils/tasks';
import { writable as localStore } from 'svelte-local-storage-store';
import { writable } from 'svelte/store';

export const invoices = localStore<Invoice[]>('invoices', []);
export const selectedInvoice = writable<Invoice>(null);
export const selectedItem = writable<Item>(null);
