<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import Prism from 'prismjs';
  import 'prismjs/components/prism-markup';
  import 'prismjs/components/prism-css';

  export let htmlCode: string = '';
  export let cssCode: string = '';

  function typeText(element: Element, text: string) {
    let index = 0;

    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        Prism.highlightAll();
      } else {
        clearInterval(interval);
      }
    }, 10);
  }

  function startTyping() {
    const htmlElement = document.querySelector('.language-html');
    const cssElement = document.querySelector('.language-css');

    if (htmlElement) {
      htmlElement.innerHTML = '';
      typeText(htmlElement, htmlCode);
    }

    if (cssElement) {
      cssElement.innerHTML = '';
      typeText(cssElement, cssCode);
    }
  }

  $: {
    if (htmlCode || cssCode) {
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

<div>
  <h3>HTML Code</h3>
  <pre>
    <code class="language-html"></code>
  </pre>
</div>
<div>
  <h3>CSS Code</h3>
  <pre>
    <code class="language-css"></code>
  </pre>
</div>

<style>
  pre {
    background: #f5f5f5;
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;
  }

  code {
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
