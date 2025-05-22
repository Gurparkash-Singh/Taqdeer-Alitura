<script>
    let { product, images } = $props();

    let displayImage = $state("");

    images.forEach(element => {
        if (element.product_id == product.product_id) {
            displayImage = element;
        }
    });

    let id = $state(2);

    if (product.product_id == 1)
    {
        id = 1
    }
</script>

<div>
    {#if displayImage}
        {#await import(`$lib/images/product_images/${displayImage.image_link}.png`)}
            Loading...
        {:then { default: src }}
            <img {src} alt={displayImage.alt_desc} />
        {:catch}
            Image Not Found
        {/await}
    {:else}
        No Image
    {/if}
</div>

<style>
    div {
        height: 115px;
        width: 115px;
        background-color: #D9D9D9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    img {
        max-width: 90px;
        height: 90px;
        object-fit: contain;
    }

    @media screen and (width < 406px) {
        div {
            height: 90px;
            width: 90px;
        }

        img {
            max-width: 65px;
            height: 65px;
        }
    }
</style>