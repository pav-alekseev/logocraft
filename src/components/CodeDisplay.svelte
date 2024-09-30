<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import Prism from 'prismjs';
  import 'prismjs/components/prism-markup';
  import 'prismjs/components/prism-css';

  export let htmlCode: string = '';

  function highlightCode() {
    const htmlElement = document.querySelector('.language-html code') as HTMLElement;
    if (htmlElement) {
      htmlElement.textContent = htmlCode;
      Prism.highlightElement(htmlElement);
    }
  }

  $: {
    if (htmlCode) {
      highlightCode();
    }
  }

  onMount(() => {
    highlightCode();
  });

  afterUpdate(() => {
    console.log(htmlCode);
    highlightCode();
  });
</script>

<div class="block">
  <div class="pane content">
    <pre class="language-html"><code></code></pre>
  </div>
</div>

<style>
  .content {
    text-align: left;
    width: 850px;
  }
</style>
