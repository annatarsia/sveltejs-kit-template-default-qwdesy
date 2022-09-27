<script>
	import './index.css';
	import Item from '$lib/Item/Item.svelte';
	import PlayerItemsTable from '$lib/PlayerItemsTable/PlayerItemsTable.svelte';
	import { data } from './+page.js'

	let totalScore = 0;

	function collectPoints(item) {
		totalScore++;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Game points system" />
</svelte:head>

<section>
	<table class="points-system">
		<thead>
			<tr class="points-system__headers">
				<th>Kahoot! Points</th>
				<th>Player Items</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="points-system__items-column">
					{#each data as item}
						<Item
							text={item.text}
							on:click={collectPoints(item)}
						/>
					{/each}
				</td>
				<td class="points-system__player-items-table">
					<PlayerItemsTable
						total={totalScore}
					/>
				</td>
			</tr>
		</tbody>
	</table>
</section>
