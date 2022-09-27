<script>
	import './index.css';
	import Item from '$lib/Item/Item.svelte';
	import PlayerItemsTable from '$lib/PlayerItemsTable/PlayerItemsTable.svelte';
	import { data } from './+page.js'
	import { currentPlayerData } from './../stores';

	function collectPoints({ detail }) {

		let currentItemData = {};

		switch (detail.item) {
			case 'A':
				calculatePoints('A', detail.unitPoints, detail.mark, detail.bonus);
				break;
			case 'B':
				calculatePoints('B', detail.unitPoints, detail.mark, detail.bonus);
				break;
			case 'C':
				calculatePoints('C', detail.unitPoints, detail.mark, detail.bonus);
				break;
			case 'D':
				calculatePoints('D', detail.unitPoints, detail.mark, detail.bonus);
				break;
		}
	}

	function calculatePoints(item, unitPoints, mark, bonus) {
			let currentItemData = $currentPlayerData.singleItems.find(i => i.item === item);
			let hasHitBonusMark = currentItemData.quantity !== 0 && (currentItemData.quantity + 1) % mark === 0; // The bonus mark has been hit
			
			if (bonus > 0 && hasHitBonusMark) {
				countWithBonus(item, unitPoints, bonus, mark);
			} else {
				simpleCount(item, unitPoints);
			}
	}

	// Function called if an item does not have bonuses or did not hit the bonus mark
	function simpleCount(item, points) {
		let currentStoreItem =  $currentPlayerData.singleItems.find(i => i.item === item);

		currentPlayerData.update(data => {
			data.singleItems.find(i => i.item === item).quantity++;
			data.singleItems.find(i => i.item === item).score = currentStoreItem.score + points;

			return data;
		});
	}

		// Function called if an item does has hit the bonus mark
	function countWithBonus(item, points, bonus, mark) {
		let currentStoreItem =  $currentPlayerData.singleItems.find(i => i.item === item);

		currentPlayerData.update(data => {
			data.singleItems.find(i => i.item === item).quantity++;
			data.singleItems.find(i => i.item === item).score = currentStoreItem.score + points + (bonus - points * mark);

			return data;
		});
		
		$currentPlayerData.totalBonus += bonus - points * mark; // Update total that is bonuses
	}

	function resetGame() {
		currentPlayerData.update(data => {
			data.singleItems.forEach(item => {
				item.quantity = 0;
				item.score = 0;
			});
			data.totalBonus = 0;
			data.totalScore = 0;

			return data;
		});
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
							points={item.unitPoints}
							mark={item.mark}
							bonus={item.bonus}
							on:calculateScore={collectPoints}
						/>
					{/each}
				</td>
				<td class="points-system__player-items-table">
					<PlayerItemsTable
						currentItems={currentPlayerData}
						on:reset={resetGame}
					/>
				</td>
			</tr>
		</tbody>
	</table>
</section>
