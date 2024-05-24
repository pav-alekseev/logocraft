<script lang="ts">
  import { createEventDispatcher } from "svelte";
  //@ts-ignore
  import CodeMirror from "svelte-codemirror-editor";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { css } from "@codemirror/lang-css";

  let styles: string = "";
  let editor: CodeMirror.Editor;
  const dispatch = createEventDispatcher<{ change: { styles: string } }>();

  function submitStyles() {
    dispatch("change", { styles });
  }
</script>

<div>
  <CodeMirror
    on:change={submitStyles}
    bind:value={styles}
    class="pane"
    lang={css()}
    theme={oneDark}
    placeholder={"Введите стили"}
    useTab={true}
  ></CodeMirror>
  <!-- <textarea placeholder="Введите дополнительные стили"></textarea> -->
  <!-- <button on:click={submitStyles}>Применить стили</button> -->
</div>
