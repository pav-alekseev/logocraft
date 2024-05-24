<script lang="ts">
  import ChatInput from './components/ChatInput.svelte';
  import StyleInput from './components/StyleInput.svelte';
  import CodeDisplay from './components/CodeDisplay.svelte';
  import Preview from './components/Preview.svelte';
  import Loader from './components/Loader.svelte';

  type ChatGptResponse = {
    html: string;
    css: string;
  };

  let chatGptResponse: ChatGptResponse = { html: '', css: '' };
  let customStyles: string = '';
  let htmlCode: string = '';
  let cssCode: string = '';
  let loading: boolean = false;

  async function handleChatSubmit(event: CustomEvent<{ prompt: string }>) {
    const { prompt } = event.detail;
    const apiKey = 'sk-proj-FWcuDCeUKrnWZ5RwtMNWT3BlbkFJ17HiEJocE0Cu6SwkGxbL';
    loading = true;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 4000,
        }),
      });

      const data = await response.json();
      const generatedText = data.choices[0].message.content;

      const cssMatch = generatedText.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      const cssContent = cssMatch ? cssMatch[1].trim() : '';

      const htmlMatch = generatedText.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const htmlContent = htmlMatch ? htmlMatch[1].replace(/<style[^>]*>[\s\S]*?<\/style>/i, '').trim() : '';

      chatGptResponse = {
        html: htmlContent,
        css: cssContent,
      };
    } catch (error) {
      console.error('Error fetching response from server:', error);
    } finally {
      loading = false;
    }
  }

  function handleStyleSubmit(event: CustomEvent<{ styles: string }>) {
    const { styles } = event.detail;
    customStyles = styles;
  }

  $: htmlCode = chatGptResponse.html || '';
  $: cssCode = chatGptResponse.css + customStyles;
</script>

<main>
  <ChatInput on:submit={handleChatSubmit} />
  <StyleInput on:submit={handleStyleSubmit} />
  {#if loading}
    <Loader />
  {:else}
    <CodeDisplay {htmlCode} {cssCode} />
    <Preview {htmlCode} {cssCode} />
  {/if}
</main>

<style>
  main {
    /* display: flex; */
    flex-direction: column;
    align-items: center;
    gap: 1em;
    width: 100%;
  }
</style>
