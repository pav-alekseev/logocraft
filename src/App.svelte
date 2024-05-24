<script lang="ts">
  import OpenAI from 'openai';

  import Logo from './components/Logo.svelte';
  import ChatInput from './components/ChatInput.svelte';
  import StyleInput from './components/StyleInput.svelte';
  import CodeDisplay from './components/CodeDisplay.svelte';
  import Reference from './components/Reference.svelte';
  import Preview from './components/Preview.svelte';

  type ChatGptResponse = {
    html: string;
    cleanHtmlCode: string;
  };

  const SYSTEM_PROMPT = `
  Тебе нужно сформировать валидный html-код, содержащий CSS, Javascript, SVG и ничего больше.
  `;

  let chatGptResponse: ChatGptResponse = { html: '', cleanHtmlCode: '' };
  let customStyles: string = '';
  let htmlCode: string = '';
  let cssCode: string = '';
  let loading: boolean = false;

  async function handleChatSubmit(event: CustomEvent<{ prompt: string }>) {
    const { prompt } = event.detail;
    // Пожалуйста, не забирайте наш ключик :).
    const apiKey = 'sk-proj-FWcuDCeUKrnWZ5RwtMNWT3BlbkFJ17HiEJocE0Cu6SwkGxbL';
    loading = true;

    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    chatGptResponse = {
      html: '',
      cleanHtmlCode:''
    };

    try {
      const stream = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: SYSTEM_PROMPT + prompt }],
        stream: true,
      });

      for await (const chunk of stream) {
        chatGptResponse = {
          html: chatGptResponse.html + chunk.choices[0]?.delta?.content || '',
          cleanHtmlCode: '',
        };
      }

      // ```html

      //   const generatedText = data.choices[0].message.content;
      //
      // const cssMatch = generatedText.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      // const cssContent = cssMatch ? cssMatch[1].trim() : '';
      //
      // const htmlMatch = generatedText.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      // const htmlContent = htmlMatch ? htmlMatch[1].replace(/<style[^>]*>[\s\S]*?<\/style>/i, '').trim() : '';
      //
      // chatGptResponse = {
      //   html: htmlContent,
      //   css: cssContent,
      // };
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
  $: cssCode = customStyles;
</script>

<main>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

  <Logo />

  <div class="layout">
    <div class="column main">
      <div>
        <div class="block">
          <div class="title">Запрос к нейросети:</div>
          <ChatInput on:submit={handleChatSubmit} />
        </div>

        <div class="block">
          <div class="title">Дополнительный CSS:</div>
          <StyleInput on:change={handleStyleSubmit}/>
        </div>
      </div>

      <div class="paragraph">
        <div class="title fancy">Модель сгенерировала:</div>
        <CodeDisplay {htmlCode} />
      </div>
    </div>

    <div class="column">
      <div class="sticky">
        <div class="block">
          <div class="title">Эталон:</div>
          <Reference/>
        </div>

        <div class="block">
          <div class="title">Результат:</div>
          <Preview {htmlCode} {cssCode} />
        </div>
      </div>
    </div>
  </div>


</main>

<style>
  .layout {
    display: flex;
    justify-content: space-between;
  }

  .column.main {
    flex-grow: 1;
  }

  .column + .column {
    margin-left: 64px;
  }

  .sticky {
    position: sticky;
    top: 16px;
  }
</style>
