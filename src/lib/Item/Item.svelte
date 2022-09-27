<script>
	import './Item.css';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let id = '';
  export let text = '';
  export let points = 0;
  export let bonus = 0;

  let hasBonus = bonus > 0 ? true : false;

  function calculatrScore(event){
    dispatch('calculateScore', {
      points: points,
    })
  }

</script>

<button class="item-button" on:click={calculateScore()}>
  <span class="item-button-text">{text}</span>
</button>