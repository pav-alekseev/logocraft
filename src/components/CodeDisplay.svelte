<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import SvelteMarkdown from "svelte-markdown";
  import Prism from 'prismjs';
  import 'prismjs/components/prism-markup';
  import 'prismjs/components/prism-css';

  export let htmlCode: string = '';

  function typeText(element: HTMLElement, text: string) {
    element.innerText = text;
    Prism.highlightAll();
  }

  function startTyping() {
    const htmlElement = document.querySelector('.language-html') as HTMLElement;

    if (htmlElement) {
      htmlElement.innerHTML = '';
      typeText(htmlElement, htmlCode);
    }
  }

  $: {
    if (htmlCode) {
      startTyping();
    }
  }

  onMount(() => {
    startTyping();
  });

  afterUpdate(() => {
    Prism.highlightAll();
  });
</script>

<div class="block">
  <div class="pane content language-html">
<!--    <SvelteMarkdown source={htmlCode} />-->
  </div>
</div>

<style>
  .content {
    text-align: left;
  }
</style>
