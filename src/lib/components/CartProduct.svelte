<script>
    let {product} = $props();
</script>

<article class="product-card">
    <form action="?/remove" method="POST">
        <input type="hidden" name="product_id" value={product.product_id}>
        <input type="hidden" name="size_id" value={product.size_id}>
        <button class="remove-button" aria-label="Remove Item">
            <svg width="20" height="20" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M55.5 18.5L18.5 55.5M18.5 18.5L55.5 55.5" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </form>
    <h3>{product.name} - {product.size_name}</h3>
    {#await import(`$lib/images/product_images/${product.image_link}.png`) then { default: src }}
        <a href="/shop/{product.product_id}">
            <img {src} alt={product.alt_desc} />
        </a>
    {/await}
    <p>{product.description}</p>
    <p>${product.price}</p>
    <p>
        Quantity: {product.quantity}
    </p>
</article>

<style>
    form {
        margin-bottom: 0.5rem;
        margin-right: 5rem;
        align-self: flex-end;
    }

    .product-card {
        display: inline-flex;
        align-items: center;
        padding-block-start: 3rem;
        padding-block-end: 3rem;
        padding-inline: 3rem;
        flex-direction: column;
        inline-size: 32rem;
        border-radius: 15px;
    }

    .product-card img {
        inline-size: 12rem;
        border-radius: 15px;
    }

    .product-card p:nth-of-type(2) {
        margin-block-end: 1rem;
    }

    button {
        background-color: transparent;
        border: none;
    }

    .remove-button:hover {
        scale: 120%;
    }

    @media screen and (width >= 750px) {
        .product-card img {
            inline-size: 16rem;
        }
    }
</style>
