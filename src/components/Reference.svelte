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

<style>
    .reference {
        border-radius: var(--border-radius);

        width:330px;
        height:330px;

        background-color: #fff;
    }
</style>

<div class="reference"/>
