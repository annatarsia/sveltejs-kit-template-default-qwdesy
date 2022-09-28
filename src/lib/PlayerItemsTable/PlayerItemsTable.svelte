<script>
	import './PlayerItemsTable.css';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

	export let currentItems;

	$: {
		let total = 0;
		$currentItems.singleItems.forEach(item => {
				total += item.score;
		});
		$currentItems.totalScore = total;
	}

</script>

<section>
	<table class="player-items">
		<tr>
			<th>Item</th>
			<th>Qty</th>
			<th>Score</th>
		</tr>
		{#each $currentItems.singleItems as row}
			<tr>
				<td>{row.item}</td>
				<td>{row.quantity}</td>
				<td>{row.score}</td>
			</tr>
		{/each}
	</table>
	<div class="bonus-container">Bonuses: {$currentItems.totalBonus}</div>
	<div class="total-button-container">
		<span>Total: {$currentItems.totalScore}</span>
		<button on:click={() => dispatch('reset')}>New game</button>
</section>