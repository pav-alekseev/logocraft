<script lang="ts">
  export let size: string = '12px';
</script>

<div class="loader" style="width: {size}; height: {size};"></div>

<style>
  .loader {
    display: inline-block;

    border: 4px solid var(--accent-color);
    border-top: 4px solid transparent;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
