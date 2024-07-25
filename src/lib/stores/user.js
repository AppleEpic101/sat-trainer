import { writable } from 'svelte/store';

export const user = writable(null);
export const userEmail = writable(null);
export const userBasic = writable(null);