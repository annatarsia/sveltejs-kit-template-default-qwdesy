<script>
	import './Item.css';

  export let id = '';
  export let text = '';
  export let points = 0;
  export let hasBonus = false;
  export let bonus = 0;

</script>

<button class="item-button" on:click>
  <span class="item-button-text">{text}</span>
</button>