<script>
    let previewIndex = 1;

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);
    const numberOfImages = 9;

    if (params.has('image')) {
        previewIndex = +(params.get('image') || 1);
    } else {
        previewIndex = Math.floor(Math.random() *  numberOfImages) + 1;
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
        background-image: url('../assets/1.svg');
    }

    .image-2 {
        background-image: url('../assets/2.svg');
    }

    .image-3 {
        background-image: url('../assets/3.svg');
    }

    .image-4 {
        background-image: url('../assets/4.svg');
    }

    .image-5 {
        background-image: url('../assets/5.svg');
    }

    .image-6 {
        background-image: url('../assets/6.svg');
    }

    .image-7 {
        background-image: url('../assets/7.svg');
    }

    .image-8 {
        background-image: url('../assets/8.svg');
    }

    .image-9 {
        background-image: url('../assets/9.svg');
    }
</style>

<div class="reference image-{previewIndex}" />
