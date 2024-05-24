<script>
  export let htmlCode = '';
  export let cssCode = '';

  $: fullCode = `
    <style>
      ${cssCode}
    </style>
    ${htmlCode}
  `;
</script>

<iframe title="preview" srcdoc={fullCode} style="width:100%; height:100%; border:none;"></iframe>
