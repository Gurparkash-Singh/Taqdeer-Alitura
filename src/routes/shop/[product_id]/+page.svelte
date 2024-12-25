<script>
    import Header from '$lib/components/Header.svelte';
    import Logo from '$lib/images/Logo.png?enhanced';
    import WhiteShirt from '$lib/images/white-shirt.png';

    let { data } = $props();
</script>

<Header />

<main>
    <div id="image-holder">
		<enhanced:img src={Logo} alt="Taqdeer Alitura Logo" id="Logo" />
	</div>

    <section id="product">
        <div id="image-carousel">
            <!-- 
                Add Arrows and multiple images (create an image carousel)
            -->
            <img src={WhiteShirt} alt="White Shirt" />
        </div>

        <h1 id="product_name">{data.product[0].name}</h1>

        <section>
            <!-- Add Buttons for different sizes -->
             <!-- Add to cart button needs to be added -->
        </section>

        <section>
            <!-- Add area for product info -->
            <!-- Add area for size charts -->
            <!-- Add area for return policy -->
        </section>
    </section>
</main>

<style>
	main {
		max-width: 500px;
		margin: auto;
	}

    #product_name {
        text-align: center;
        width: 100%;
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

    #image-carousel {
        display: flex;
		justify-content: center;
		width: 100%;
        padding-top: calc(50% - 170px);
    }

    #image-carousel img {
        width: 170px;
		height: 170px;
    }
</style>
