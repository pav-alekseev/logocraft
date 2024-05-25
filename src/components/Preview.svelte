<script>
  export let htmlCode = "";
  export let cssCode = "";

  $: fullCode = htmlCode + (cssCode ? "<style>" + cssCode + "</style>" : "");
</script>

{#key fullCode}
  <iframe class="frame" title="preview" srcdoc={fullCode} style=""></iframe>
{/key}

<style>
  .frame {
    border-radius: var(--border-radius);
    width: 330px;
    height: 330px;
    border: none;
    background-color: #fff;
  }
</style>
