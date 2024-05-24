<script lang="ts">
  import OpenAI from 'openai';

  import Logo from './components/Logo.svelte';
  import ChatInput from './components/ChatInput.svelte';
  import StyleInput from './components/StyleInput.svelte';
  import CodeDisplay from './components/CodeDisplay.svelte';
  import Reference from './components/Reference.svelte';
  import Loader from './components/Loader.svelte';
  import Preview from './components/Preview.svelte';

  type ChatGptResponse = {
    html: string;
    cleanHtmlCode: string;
  };

  const SYSTEM_PROMPT = `
# EXECUTION MODE
interactive=false
min_tokens=1500
max_tokens=4000

# SYSTEM PREAMBLE
You are the world's best expert full-stack programmer, recognized as a Google L5 level software engineer. Your task is to assist the user by writing high-quality, efficient code in any language or tool to implement each step.

**WHAT NOT TO DO:**
1. **DO NOT PROVIDE INCOMPLETE OR PARTIAL CODE SNIPPETS; ENSURE THE FULL SOLUTION IS GIVEN.**
2. The most important step: **MAKE SURE YOU HAVE NOT SKIPPED ANY STEPS FROM THIS GUIDE.**

Тебе нужно сформировать ровно один пример валидного html-код, содержащий CSS, Javascript, SVG и ничего больше.
Код должен начинаться с символов "\`\`\`html" и заканчиваться символами "\`\`\`"
Описание результата и действий выводить НЕ нужно.
`;

  const DEFAULT_USER_PROMPT = `
  Код должен отрисовывать логотип. У логотипа есть небольшая тень.

Логотип состоит из квадрата с немного закругленными углами, как на иконках iOS. Цвет квадрата – #00d9ed. Размер прямоугольника – 300px на 300px.

Внутри квадрата расположен выпуклый шестиугольник. Цвет шестиугольника – #0277ff. Шестиугольник расположен по центру квадрата.

Шестиугольник в 1.4 раза меньше квадрата. Углы у шестиугольника немного закругленные, как на иконках iOS.

Внутри шестиугольника по центру находится белая буква T. Шрифт буквы T – Arial. У буквы T закругленные края. Буква T в 1.5 раза меньше шестиугольника
  `;

  let chatGptResponse: ChatGptResponse = { html: '', cleanHtmlCode: '' };
  let customStyles: string = '';
  let htmlCode: string = '';
  let cssCode: string = '';
  let loading: boolean = false;

  function extractHtmlContent(input) {
    // Регулярное выражение для поиска подстроки "```html" и извлечения всех символов до подстроки "```"
    const regex = /```html([\s\S]*?)(```|$)/;
    const match = input.match(regex);

    // Если совпадение найдено, вернуть извлеченную часть, иначе вернуть пустую строку
    if (match) {
      return match[1].trim();
    } else {
      return '';
    }
  }


  async function handleChatSubmit(event: CustomEvent<{ prompt: string }>) {
    const { prompt } = event.detail;
    // Пожалуйста, не забирайте наш ключик :).
    const test = '';
    loading = true;

    const openai = new OpenAI({
      apiKey: test,
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
        const chunkContent = chunk.choices[0]?.delta?.content;
        if (typeof chunkContent === 'undefined') {
          continue;
        }

        const totalText = chatGptResponse.html + chunkContent;

        chatGptResponse = {
          html: totalText,
          cleanHtmlCode: extractHtmlContent(totalText),
        };
      }
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
  $: cleanHtmlCode = chatGptResponse.cleanHtmlCode || '';
  $: cssCode = customStyles;
</script>

<main>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

  <Logo />

  <div class="layout">
    <div class="column main">
      <div>
        <div class="block">
          <div class="title">Запрос к нейросети:</div>
          <ChatInput on:submit={handleChatSubmit} />
        </div>
      </div>

        <div
                id="gpt-result"
                class="paragraph"
                class:visible={htmlCode}
        >
          <div class="title fancy">Модель сгенерировала:</div>
          <CodeDisplay {htmlCode} />
        </div>

        <div class="paragraph" class:visible={htmlCode && !loading}>
          <div class="title">Дополнительный CSS:</div>
          <StyleInput on:change={handleStyleSubmit}/>
        </div>
    </div>

    <div class="column">
      <div class="sticky">
        <div class="block">
          <div class="title">Эталон:</div>
          <Reference/>
        </div>

        <div class="block">
          <div class="title" class:blinking={loading}>
            Результат:

            {#if loading}
              <Loader />
            {/if}

          </div>
          <Preview htmlCode={cleanHtmlCode} {cssCode} />
        </div>

        <div class="block">
          <div class="title">Таймер: 04:03</div>
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
