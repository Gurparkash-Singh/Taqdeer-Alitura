<script>
    import AdminBackButton from "$lib/components/AdminBackButton.svelte";

    let { data } = $props();
</script>

<AdminBackButton 
    link="/admin/settings/products/update" 
    name="Products List" 
/>

<section id="menu">
    {#if data.productsAllowance.products}
        <a href={`./${data.product_id}/product-info`}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 7.99996H8C6.93913 7.99996 5.92172 8.42139 5.17157 9.17154C4.42143 9.92168 4 10.9391 4 12V40C4 41.0608 4.42143 42.0782 5.17157 42.8284C5.92172 43.5785 6.93913 44 8 44H36C37.0609 44 38.0783 43.5785 38.8284 42.8284C39.5786 42.0782 40 41.0608 40 40V26M37 4.99996C37.7956 4.20432 38.8748 3.75732 40 3.75732C41.1252 3.75732 42.2044 4.20432 43 4.99996C43.7956 5.79561 44.2426 6.87475 44.2426 7.99996C44.2426 9.12518 43.7956 10.2043 43 11L24 30L16 32L18 24L37 4.99996Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Update Product Info
        </a>
    {/if}
    {#if data.productsAllowance.images}
        <a href={`./${data.product_id}/images`}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 7.99996H8C6.93913 7.99996 5.92172 8.42139 5.17157 9.17154C4.42143 9.92168 4 10.9391 4 12V40C4 41.0608 4.42143 42.0782 5.17157 42.8284C5.92172 43.5785 6.93913 44 8 44H36C37.0609 44 38.0783 43.5785 38.8284 42.8284C39.5786 42.0782 40 41.0608 40 40V26M37 4.99996C37.7956 4.20432 38.8748 3.75732 40 3.75732C41.1252 3.75732 42.2044 4.20432 43 4.99996C43.7956 5.79561 44.2426 6.87475 44.2426 7.99996C44.2426 9.12518 43.7956 10.2043 43 11L24 30L16 32L18 24L37 4.99996Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Update Images
        </a>
    {/if}
   {#if data.productsAllowance.components || data.productsAllowance.properties}
    <a href={`./${data.product_id}/components`}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 12H42M16 24H42M16 36H42M6 12H6.02M6 24H6.02M6 36H6.02" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Update Components
    </a>
   {/if}
</section>

<style>
    #menu {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        margin: 40px 0;
        row-gap: 10px;
        column-gap: 10px;
    }

    #menu a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #d9d9d9;
        border: none;
        text-decoration: none;
        text-align: center;
        padding: 15px 30px;
    }

    #menu a svg {
        width: 20px;
        height: 20px;
    }

</style>