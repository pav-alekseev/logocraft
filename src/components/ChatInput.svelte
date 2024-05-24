<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let prompt: string = '';
  const dispatch = createEventDispatcher<{ submit: { prompt: string } }>();

  function submitPrompt() {
    dispatch('submit', { prompt });
  }
</script>

<div>
  <textarea bind:value={prompt} placeholder="Введите запрос к ChatGPT"></textarea>
  <button on:click={submitPrompt}>Отправить</button>
</div>
