<script>
    let previewIndex = 1;

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);

    const paramName = 'image';
    if (params.has(paramName)) {
        previewIndex = params.get(paramName);
    }
</script>

<style>
    .reference {
        border-radius: var(--border-radius);

        width:330px;
        height:330px;

        background-color: #fff;
        background-size: contain;
    }

    .image-1 {
        background-image: url('../assets/1.png');
    }

    .image-2 {
        background-image: url('../assets/2.png');
    }

    .image-3 {
        background-image: url('../assets/3.png');
    }

    .image-4 {
        background-image: url('../assets/4.png');
    }

    .image-5 {
        background-image: url('../assets/5.png');
    }

    .image-6 {
        background-image: url('../assets/6.png');
    }
</style>

<div class="reference image-{previewIndex}"/>
