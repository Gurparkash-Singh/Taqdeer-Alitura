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
    {#await import(`$lib/images/product_images/${displayImage.image_link}.png`) then { default: src }}
        <img {src} alt={displayImage.alt_desc} />
    {/await}
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
        max-width: 60px;
    }
</style>