<script>
	import './PlayerItemsTable.css';

	export let total = 0;

	$: total;
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
			<button>New game</button>
			</td>
		</tr>
	</table>
</section>