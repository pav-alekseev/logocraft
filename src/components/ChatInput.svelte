<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let prompt: string = '';
  const dispatch = createEventDispatcher<{ submit: { prompt: string } }>();

  function submitPrompt() {
    dispatch('submit', { prompt });
  }
</script>

<style>
  .button {
    margin-top: 16px;
  }

  .button:hover {
    opacity: 0.95;
  }
</style>

<div>
  <textarea on:submit={submitPrompt} class="pane editable" bind:value={prompt} placeholder="Сгенерируй квадрат, расположенный ..."></textarea>
  <button class="button" on:click={submitPrompt}>Сгенерировать</button>
</div>
