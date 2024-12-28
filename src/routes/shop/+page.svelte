<script>
	import Header from '$lib/components/Header.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import Logo from '$lib/images/Logo.png?enhanced';

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
    }
</script>

<Header current="shop" />
<main>
	<div id="image-holder">
		<enhanced:img src={Logo} alt="Taqdeer Alitura Logo" id="Logo" />
	</div>

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
                    <li>
                        <button 
                            class:selected={selected_category == category.category_id}
                            onclick={() => {
                                selected_category = category.category_id;
                                filterProducts();
                                toggle_shop_menu();
                            }}
                        >
                            {category.category_name}
                        </button>
                    </li>
					{/each}
				</ul>
			</div>
			<div>
				<button id="sort" onclick={toggle_sort_menu}>
					sort
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
				<ul class:open_menu={open_sort_menu}>
					<li>
                        <button
                            class:selected={selected_price == 0}
                            onclick={() => {
                                filteredProducts.sort((a, b) => a.price - b.price);
                                selected_price = 0;
                                toggle_sort_menu();
                            }}
                        >
                            Price Low to High
                        </button>
                    </li>
					<li>
                        <button
                            class:selected={selected_price == 1}
                            onclick={() => {
                                filteredProducts.sort((a, b) => b.price - a.price);
                                selected_price = 1;
                                toggle_sort_menu();
                            }}
                        >
                            Price High to Low
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
                        <li>
                            <button
                                class:selected={
                                    selected_collection == collection.collection_id
                                }
                                onclick={() => {
                                    selected_collection = collection.collection_id;
                                    filterProducts();
                                    toggle_collections_menu();
                                }}
                            >
                                {collection.collection_name}
                            </button>
                        </li>
                    {/each}
				</ul>
			</div>
		</header>
		{#each filteredProducts as product}
			<a href="/shop/{product.product_id}" id={`product_${product.product_id}`}>
                <ProductCard product={product} images={data.images}/>
            </a>
		{/each}
	</section>
</main>

<style>
	main {
		max-width: 500px;
		margin: auto;
	}

	#image-holder {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: -28px;
	}

	#Logo {
		width: 170px;
		height: 170px;
	}

	#shop {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 25px;
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
	}

	div {
		position: relative;
	}

	.open_menu {
		display: inline;
	}

	.selected {
		background-color: rgba(255, 255, 255, 0.85);
		color: #bf1e2ed9;
		cursor: not-allowed;
	}

	div ul {
		list-style: none;
		padding: 0;
		background-color: rgba(255, 255, 255, 0.85);
		position: absolute;
		top: 15px;
		left: 0;
		width: 100%;
		display: none;
        z-index: 2;
	}

	div ul li button {
		padding: 15px 2px 15px 10px;
	}

    div ul li {
        border-bottom: 1px solid #d9d9d9;
    }

	div ul li:hover {
		background-color: #bf1e2ed9;
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
		border: none;
		background: none;
		font-size: 20pt;
		padding: 0 10px;
	}

	button {
		cursor: pointer;
	}

	#sort,
	#collection {
		background-color: #d9d9d9;
		display: flex;
		flex-direction: row;
		align-items: baseline;
		width: 115px;
		justify-content: space-between;
		border: none;
		padding: 10px 5px;
		margin-right: 10px;
	}

	#sort svg,
	#collection svg,
	#category-select svg {
		width: 10px;
		height: 8px;
	}

    @media screen and (width < 450px) 
    {
        #shop header {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        div ul {
            background-color: rgba(255, 255, 255, 0.95);
        }
    }
</style>
