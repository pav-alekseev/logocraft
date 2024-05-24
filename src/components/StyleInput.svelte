<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import CodeMirror from "svelte-codemirror-editor";
  //@ts-ignore
  import { oneDark } from "@codemirror/theme-one-dark";
  import { css } from '@codemirror/lang-css';

  let styles: string = '';
  const dispatch = createEventDispatcher<{ submit: { styles: string } }>();

  function submitStyles() {
    dispatch('submit', { styles });
  }
</script>

<div>
  <CodeMirror lineWrapping={true} lang={css()} theme={oneDark} placeholder={'Введите стили'} useTab={true}></CodeMirror>
  <textarea bind:value={styles} placeholder="Введите дополнительные стили"></textarea>
  <button on:click={submitStyles}>Применить стили</button>
</div>
