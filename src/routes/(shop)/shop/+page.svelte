<script>
	import ProductCard from '$lib/components/ProductCard.svelte';

	let { data } = $props();
    let { categories, products, collections } = data;

    let filteredProducts = $state(products);

    let selected_category = $state(0);
    let selected_price = $state(0);
    let selected_collection = $state(0);

	let open_shop_menu = $state(false);
	let open_sort_menu = $state(false);
	let open_collections_menu = $state(false);

	function toggle_shop_menu(e) {
		open_shop_menu = !open_shop_menu;
		open_sort_menu = false;
		open_collections_menu = false;
	}

	function toggle_sort_menu(e) {
		open_shop_menu = false;
		open_sort_menu = !open_sort_menu;
		open_collections_menu = false;
	}

	function toggle_collections_menu(e) {
		open_shop_menu = false;
		open_sort_menu = false;
		open_collections_menu = !open_collections_menu;
	}

    function sortProductsByPrice()
    {
        if (selected_price == 0) {
            filteredProducts.sort((a, b) => a.default_price - b.default_price);
        }
        else {
            filteredProducts.sort((a, b) => b.default_price - a.default_price);
        }
    }

    function filterProducts()
    {
        filteredProducts = products;
        if (selected_category != 0)
        {
            filteredProducts = filteredProducts.filter((products) => {
                return products.category_id == selected_category;
            });
        }

        if (selected_collection != 0)
        {
            filteredProducts = filteredProducts.filter((products) => {
                return products.collection_id == selected_collection;
            });
        }

        sortProductsByPrice();
    }
</script>

<section id="shop">
    <header>
        <div>
            <button id="category-select" onclick={toggle_shop_menu}>
                SHOP
                <svg
                    width="24"
                    height="14"
                    viewBox="0 0 24 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.9393 13.0607C11.5251 13.6464 12.4749 13.6464 13.0607 13.0607L22.6066 3.51472C23.1924 2.92893 23.1924 1.97918 22.6066 1.3934C22.0208 0.807612 21.0711 0.807612 20.4853 1.3934L12 9.87868L3.51472 1.3934C2.92893 0.807612 1.97918 0.807612 1.3934 1.3934C0.807612 1.97918 0.807612 2.92893 1.3934 3.51472L10.9393 13.0607ZM10.5 11V12H13.5V11H10.5Z"
                        fill="#1E1E1E"
                    />
                </svg>
            </button>
            <ul class:open_menu={open_shop_menu}>
                {#each categories as category}
                <li
                    class:selected={selected_category == category.category_id}
                    class:lastListElement={category === categories[categories.length - 1]}
                >
                    <button 
                        onclick={() => {
                            selected_category = category.category_id;
                            filterProducts();
                            toggle_shop_menu();
                        }}
                    >
                        {category.category_name}
                        {#if category !== categories[categories.length - 1]}
                            <svg width="85" height="1" viewBox="0 0 103 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="4.37114e-08" y1="0.5" x2="103" y2="0.500009" stroke="#D9D9D9"/>
                            </svg>
                        {/if}
                    </button>
                </li>
                {/each}
            </ul>
        </div>
        <div>
            <button id="sort" onclick={toggle_sort_menu}>
                sort price
                <svg
                    width="24"
                    height="14"
                    viewBox="0 0 24 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.9393 13.0607C11.5251 13.6464 12.4749 13.6464 13.0607 13.0607L22.6066 3.51472C23.1924 2.92893 23.1924 1.97918 22.6066 1.3934C22.0208 0.807611 21.0711 0.807611 20.4853 1.3934L12 9.87868L3.51472 1.3934C2.92893 0.807612 1.97918 0.807612 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L10.9393 13.0607ZM10.5 10L10.5 12L13.5 12L13.5 10L10.5 10Z"
                        fill="#1E1E1E"
                    />
                </svg>
            </button>
            <ul class:open_menu={open_sort_menu} id="sort-menu">
                <li class:selected={selected_price == 0}>
                    <button
                        onclick={() => {
                            selected_price = 0;
                            sortProductsByPrice();
                            toggle_sort_menu();
                        }}
                    >
                        Ascending

                        <svg width="85" height="1" viewBox="0 0 103 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="4.37114e-08" y1="0.5" x2="103" y2="0.500009" stroke="#D9D9D9"/>
                        </svg>
                    </button>
                </li>
                <li 
                    class:selected={selected_price == 1}
                    class="lastListElement"
                >
                    <button
                        onclick={() => {
                            selected_price = 1;
                            sortProductsByPrice();
                            toggle_sort_menu();
                        }}
                    >
                        Descending
                    </button>
                </li>
            </ul>
        </div>
        <div>
            <button id="collection" onclick={toggle_collections_menu}>
                collection
                <svg
                    width="24"
                    height="14"
                    viewBox="0 0 24 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.9393 13.0607C11.5251 13.6464 12.4749 13.6464 13.0607 13.0607L22.6066 3.51472C23.1924 2.92893 23.1924 1.97918 22.6066 1.3934C22.0208 0.807611 21.0711 0.807611 20.4853 1.3934L12 9.87868L3.51472 1.3934C2.92893 0.807612 1.97918 0.807612 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L10.9393 13.0607ZM10.5 10L10.5 12L13.5 12L13.5 10L10.5 10Z"
                        fill="#1E1E1E"
                    />
                </svg>
            </button>
            <ul class:open_menu={open_collections_menu}>
                {#each collections as collection}
                    <li
                        class:selected={
                            selected_collection == collection.collection_id
                        }
                        class:lastListElement={
                            collection === collections[collections.length - 1]
                        }
                    >
                        <button
                            onclick={() => {
                                selected_collection = collection.collection_id;
                                filterProducts();
                                toggle_collections_menu();
                            }}
                        >
                            {collection.collection_name}
                            {#if collection !== collections[collections.length - 1]}
                                <svg width="85" height="1" viewBox="0 0 103 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="4.37114e-08" y1="0.5" x2="103" y2="0.500009" stroke="#D9D9D9"/>
                                </svg>
                            {/if}
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    </header>
    {#each filteredProducts as product (product.product_id)}
        <a href="/shop/{product.product_id}" class="product-links">
            <ProductCard product={product} images={data.images}/>
        </a>
    {/each}
</section>

<style>
	#shop {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin: auto;
        max-width: 405px;
	}

	#shop header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-basis: 100%;
		width: 100%;
		margin-bottom: 20px;
        flex-wrap: wrap;
        row-gap: 10px;
        align-items: center;
	}

	div {
		position: relative;
	}

	.open_menu {
		display: inline;
	}

	.selected {
		color: #bf1e2ed9;
		cursor: not-allowed;
	}

    .selected:hover {
        background-color: #bf1e2e77;
    }


    div ul button svg {
        width: 80px;
    }

	div ul {
		list-style: none;
		padding: 0;
		background-color: rgba(255, 255, 255, 0.85);
		position: absolute;
		top: 20px;
		left: 0;
		display: none;
        z-index: 2;
        width: 105px;
        margin: 16px 10px;
	}

	div ul li button {
		padding: 15px 2px 0px 10px;
	}

    .lastListElement {
        padding-bottom: 15px;
    }

	div ul li:hover {
		background-color: #bf1e2ed9;
	}

    div ul li:hover svg {
        visibility: hidden;
    }

	div ul li:last-child {
		border-bottom: none;
	}

    li button {
        width: 100%;
        background: transparent;
        border: none;
        text-align: left;
        color: inherit;
    }

	#category-select {
		color: #bf1e2e;
        display: flex;
		flex-direction: row;
		align-items: center;
		width: 115px;
		justify-content: space-between;
		border: none;
		background: none;
		font-size: 26pt;
		padding: 0;
		margin: 0 10px;
	}

	button {
		cursor: pointer;
	}


	#sort,
	#collection{
		background-color: #d9d9d9;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 115px;
		justify-content: space-between;
		border: none;
		padding: 10px 5px;
		margin: 0 10px;
	}

	#sort svg,
	#collection svg,
	#category-select svg {
		width: 10px;
		height: 8px;
	}

    .product-links {
        width: 115px;
        height: 173px;
        padding: 0;
        margin: 10px;
    }

    @media screen and (width < 406px) {
        #shop {
            padding: 0 30px;
            justify-items: center;
            align-items: center;
        }

        #shop header{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-column-start: 1;
            grid-column-end: 4;
            justify-items: center;
            align-items: center;
        }

        #category-select {
            width: 90px;
            font-size: 20pt;
            padding: 0;
            margin: 0;
        }

        #sort,
        #collection{
            width:90px;
            margin: 0;
        }

        #shop {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
        }

        .product-links {
            width: 90px;
            height: 135px;
            margin: calc((100vw - 320px) / 6) 0;
        }

        div ul button svg 
        {
            width: 65px;
        }

        div ul {
            width: 90px;
            margin: 16px 0;
        }
    }

    @media screen and (width < 350px) {
        #shop {
            padding: 0 10px;
        }

        .product-links {
            width: 65px;
            height: 98px;
            margin: calc((100vw - 290px) / 6) 0;
        }
    }

</style>
