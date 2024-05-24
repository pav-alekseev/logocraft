<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let styles: string = '';
  const dispatch = createEventDispatcher<{ submit: { styles: string } }>();

  function submitStyles() {
    dispatch('submit', { styles });
  }
</script>

<div>
  <textarea bind:value={styles} placeholder="Введите дополнительные стили"></textarea>
  <button on:click={submitStyles}>Применить стили</button>
</div>
