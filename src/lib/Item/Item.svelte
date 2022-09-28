<script>
	import './Item.css';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let id = '';
  export let text = '';
  export let points = 0;
  export let mark = 0;
  export let bonus = 0;

  function calculateScore(event){
    dispatch('calculateScore', {
      bonus: bonus,
      item: text,
      mark: mark,
      unitPoints: points,
    })
  }

</script>

<button class="item-button" on:click={calculateScore}>
  <span class="item-button-text">{text}</span>
</button>