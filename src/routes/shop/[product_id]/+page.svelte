<script>
    import Logo from '$lib/images/Logo.png?enhanced';
    import { modal } from '$lib/shared_state/shared.svelte';

    let { data, form } = $props();

    class Product {
		#size = $state(-1);
		#quantity = $state(0);
        #size_index = $state(-1);

		constructor(quantity) {
			this.#quantity = quantity;
		}

		get size() {
			return this.#size;
		}

		get quantity() {
			return this.#quantity;
		}

		set size(value) {
			for (let i = 0; i < data.sizes.length; i++)
            {
                if (data.sizes[i].size_id == value) {
                    this.#size = value;
                    this.#size_index = i;
                }
            }
            this.quantity = 1;
		}

		set quantity(value) {
            let max_quantity = data.sizes[this.#size_index].quantity;
            max_quantity = Math.min(5, max_quantity);
			this.#quantity = Math.max(1, Math.min(max_quantity, value));
            console.log(max_quantity);
		}
	}

    const selection = new Product(0);

    if (form) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == form.message) {
                inMessages = true;
            }
        }

        if (!inMessages && form.invalid) 
        {
            modal.messages.push({
                heading: "Error!",
                paragraph: form.message
            });
        }else if (!inMessages && form.success) {
            modal.messages.push({
                heading: "Success!",
                paragraph: form.message
            });
        }
    }
</script>

<main>
    <div id="image-holder">
		<a href="/" aria-label="Link to Home">
            <enhanced:img src={Logo} alt="Taqdeer Alitura Logo" id="Logo" />
        </a>
	</div>

    <section id="product">
        <div id="image-carousel">
            <!-- 
                Add Arrows and multiple images (create an image carousel)
            -->
            {#each data.images as image}
                {#if image.main_image == 1}
                    {#await import(`$lib/images/product_images/${image.image_link}.png`) then { default: src }}
                        <img {src} alt={image.alt_desc} />
                    {/await}
                {/if}
            {/each}
        </div>

        <h1 id="product_name">{data.product[0].name}</h1>

        <section id="product-modifier">
            <div id="quantity-slider">
                <button 
                    onclick={() => {
                        selection.quantity = selection.quantity + 1;
                    }}
                    id="quantity-up"
                    aria-label="increase quantity"
                >
                    <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0607 0.93934C12.4749 0.353553 11.5251 0.353553 10.9393 0.93934L1.3934 10.4853C0.807611 11.0711 0.807611 12.0208 1.3934 12.6066C1.97919 13.1924 2.92893 13.1924 3.51472 12.6066L12 4.12132L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.93934ZM13.5 3V2L10.5 2V3L13.5 3Z" fill="#D9D9D9"/>
                    </svg>
                </button>
                <p id="quantity-displayer">{selection.quantity}</p>
                <button 
                    onclick={() => {
                        selection.quantity -= 1;
                    }}
                    id="quantity-down"
                    aria-label="decrease quantity"
                >
                    <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9393 13.0607C11.5251 13.6464 12.4749 13.6464 13.0607 13.0607L22.6066 3.51472C23.1924 2.92893 23.1924 1.97918 22.6066 1.3934C22.0208 0.807612 21.0711 0.807612 20.4853 1.3934L12 9.87868L3.51472 1.3934C2.92893 0.807612 1.97918 0.807612 1.3934 1.3934C0.807612 1.97918 0.807612 2.92893 1.3934 3.51472L10.9393 13.0607ZM10.5 10V12H13.5V10H10.5Z" fill="#D9D9D9"/>
                    </svg> 
                </button>
            </div>
            <div id="size-selector">
                {#each data.sizes as size}
                    {#if size.quantity == 0}
                        <button class="disabled">{size.size_abbreviation}</button>
                    {:else}
                        <button
                            class:selected={selection.size === size.size_id}
                            onclick={() => {
                                selection.size = size.size_id
                            }}
                        >
                            {size.size_abbreviation}
                        </button>
                    {/if}
                {/each}
            </div>
            <form method="POST" action="?/add" id="cart-button">
                <input type="hidden" name="quantity" value={selection.quantity}/>
                <input type="hidden" name="size" value={selection.size}/>
                <input type="hidden" name="product" value={data.product[0].product_id} />
                <button>Add to cart</button>
            </form>
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

    #product {
        display: flex;
        flex-direction: column;
        justify-content: center;
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

    #product_name {
        text-align: center;
    }

    #product-modifier {
        display: flex;
        flex-direction: row;
        justify-content: center;
        row-gap: 10px;
        align-items: center;
        flex-wrap: wrap;
    }

    #product-modifier button {
        background-color: #D9D9D9;
        border: none;
        margin: 0 10px;
        padding: 16px 20px;
        cursor: pointer;
    }

    #size-selector .selected {
        color: white;
        background-color: #BF1E2E;
    }

    #size-selector .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    #cart-button button {
        color: white;
        background-color: #BF1E2E;
    }

    #quantity-slider {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #quantity-slider button {
        background-color: transparent;
        border: none;
    }

    #quantity-slider p {
        background-color: #D9D9D9;
        padding: 16px;
        text-align: center;
        margin: 0 10px;
    }

    @media screen and (width < 450px) {
        #cart-button {
            margin-top: 20px;
        }
    }

    @media screen and (width < 252px) {
        #size-selector {
            display: flex;
            flex-direction: column;
        }
    }
</style>
