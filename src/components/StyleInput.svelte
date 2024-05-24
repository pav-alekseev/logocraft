<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let styles: string = '';
  const dispatch = createEventDispatcher<{ change: { styles: string } }>();

  function submitStyles() {
    dispatch('change', { styles });
  }
</script>

<div>
  <textarea on:input={submitStyles} class="pane editable" bind:value={styles} placeholder={".customProperty {}"}></textarea>
</div>
