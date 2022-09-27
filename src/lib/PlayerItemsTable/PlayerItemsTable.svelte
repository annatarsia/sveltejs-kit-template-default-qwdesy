<script>
	import './PlayerItemsTable.css';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

	export let total = 0;

</script>

<section>
	<table class="player-items">
		<tr>
			<th>Item</th>
			<th>Qty</th>
			<th>Score</th>
		</tr>
		<tr>
			<td>Bonus</td>
			<td>30</td>
		</tr>
		<tr>
			<td>Total: {total}</td>
			<td>
			<button on:click={() => dispatch('reset')}>New game</button>
			</td>
		</tr>
	</table>
</section>