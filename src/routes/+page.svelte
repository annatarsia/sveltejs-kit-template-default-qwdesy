<script>
	import './index.css';
	import Item from '$lib/Item/Item.svelte';
	import PlayerItemsTable from '$lib/PlayerItemsTable/PlayerItemsTable.svelte';
	import { data } from './+page.js'
	import { currentPlayerData } from './../stores';

	function collectPoints({ detail }) {

		let currentItemData = {};
		let hasHitBonusMark = false; // The bonus mark has been hit

		switch (detail.item) {
			case 'A':
 				currentItemData = $currentPlayerData.singleItems.find(i => i.item === 'A');
				calculateScore(currentItemData, detail.unitPoints, detail.mark, detail.bonus);
				break;
			case 'B':
				currentItemData = $currentPlayerData.singleItems.find(i => i.item === 'B');
				calculateScore(currentItemData, detail.unitPoints, detail.mark, detail.bonus);
				break;
			case 'C':
				currentItemData = $currentPlayerData.singleItems.find(i => i.item === 'C');
				calculateScore(currentItemData, detail.unitPoints, detail.mark, detail.bonus);
				break;
			case 'D':
				currentItemData = $currentPlayerData.singleItems.find(i => i.item === 'D');
				calculateScore(currentItemData, detail.unitPoints, detail.mark, detail.bonus);
				break;
		}
	}

	function calculateScore(currentItemData, unitPoints, mark, bonus) {
			let hasHitBonusMark = currentItemData.quantity !== 0 && (currentItemData.quantity + 1) % mark === 0;
			
			if (bonus > 0 && hasHitBonusMark) {
				countWithBonus(currentItemData, unitPoints, bonus, mark);
			} else {
				simpleCount(currentItemData, unitPoints);
			}

			console.log(currentItemData);
	}

	// Function called if an item does not have bonuses or did not hit the bonus mark
	function simpleCount(currentStoreItem, points) {
		currentStoreItem.quantity++;
		currentStoreItem.score = currentStoreItem.score + points;
	}

		// Function called if an item does has hit the bonus mark
	function countWithBonus(currentStoreItem, points, bonus, mark) {
		currentStoreItem.quantity++;
		currentStoreItem.score = currentStoreItem.score + points + (bonus - points * mark);
		
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
