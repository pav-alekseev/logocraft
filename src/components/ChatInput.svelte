<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let prompt: string = '';
  const dispatch = createEventDispatcher<{ submit: { prompt: string } }>();

  function submitPrompt() {
    dispatch('submit', { prompt });
  }
</script>

<style>
  .buttons {
    margin-top: 16px;
  }

  .update-button {
    background-color: rgb(41, 41, 43);
    box-shadow: none;
  }
</style>

<div>
  <textarea on:submit={submitPrompt} class="pane editable" bind:value={prompt} placeholder="Сгенерируй квадрат, расположенный ..."></textarea>
  <div class="buttons">
    <button on:click={submitPrompt}>Сгенерировать</button>
    <button class="update-button" on:click={() => location.reload()}>Обновить картинку</button>
  </div>
</div>
