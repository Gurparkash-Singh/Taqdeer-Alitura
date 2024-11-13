<script>
	import Header from '$lib/components/Header.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import Logo from '$lib/images/Logo.png?enhanced';

	const arr = [];

	for (let i = 0; i < 20; i++) {
		arr.push(i);
	}
</script>

<Header current="shop"/>
<main>
	<div id="image-holder">
		<enhanced:img src={Logo} alt="Taqdeer Alitura Logo" id="Logo" />
	</div>

	<section id="shop">
		<header>
			<div>
                <button id="category-select">
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
                <ul>
                    <li>
                        Shop All
                    </li>
                    <li>
                        Tops
                    </li>
                    <li>
                        Bottoms
                    </li>
                    <li>

                        Outerwear
                    </li>
                </ul>
            </div>
			<div>
                <button id="sort">
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
                <ul>
                    <li>
                        Price Low to High
                    </li>
                    <li>
                        Price High to Low
                    </li>
                </ul>
            </div>
			<div>
                <button id="collection">
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
                <ul>
                    <li>
                        Spring
                    </li>
                    <li>
                        Summer
                    </li>
                    <li>
                        Fall
                    </li>
                    <li>
                        Winter
                    </li>
                </ul>
            </div>
		</header>
		{#each arr as product}
			<ProductCard />
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
	}

    div {
        position: relative;
    }

    div ul {
        list-style: none;
        padding: 0 10px;
        background-color: rgba(255, 255, 255, 0.85);
        position: absolute;
        top: 15px;
        left: 0;
        width: 100%;
        display: none;
    }

    div ul li {
        padding: 15px 2px;
        border-bottom: 1px solid #d9d9d9;
    }

    div ul li:last-child {
        border-bottom: none;
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
</style>
