<script>
    let { product, images } = $props();

    let displayImage = $state("");

    images.forEach(element => {
        if (element.product_id == product.product_id) {
            displayImage = element;
        }
    });
</script>

<div>
    {#if displayImage}
        <img src={`${displayImage.image_link}`} alt={displayImage.alt_desc} />
    {:else}
        No Image
    {/if}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    img {
        width: 115px;
        height: 173px;
        object-fit: cover;
    }

    @media screen and (width < 406px) {
        img {
            width: 90px;
            height: 135px;
            object-fit: cover;
        }
    }

    @media screen and (width < 350px) {
        img {
            width: 65px;
            height: 98px;
            object-fit: cover;
        }
    }
</style>