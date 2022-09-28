import { writable } from 'svelte/store';

export const currentPlayerData = writable({
	singleItems: [
		{
			item: 'A',
			quantity: 0,
			score: 0
		},
		{
			item: 'B',
			quantity: 0,
			score: 0
		},
		{
			item: 'C',
			quantity: 0,
			score: 0
		},
		{
			item: 'D',
			quantity: 0,
			score: 0
		}
	],
	totalBonus: 0,
	totalScore: 0
});
