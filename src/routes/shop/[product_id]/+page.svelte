<script>
    import Logo from '$lib/images/Logo.png?enhanced';
    import { modal } from '$lib/shared_state/shared.svelte';

    let { data, form } = $props();

    let openInfo = $state(false);
    let openSize = $state(false);
    let openReturn = $state(false);

    let images = [];

    for (let i = 0; i < data.images.length; i++) {
        images.push(data.images[i].image_id);
    }

    let currentImage = $state(0);
    let showImage = $state(data.images[0].image_id);

    function nextImage() {
        currentImage = (currentImage + 1) % images.length;
        showImage = images[currentImage];
    }

    function prevImage() {
        currentImage = (currentImage - 1);
        if (currentImage == -1) {
            currentImage = images.length - 1;
        }
        showImage = images[currentImage];
    }

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
                heading: "ERROR",
                paragraph: form.message
            });
        }else if (!inMessages && form.success) {
            modal.messages.push({
                heading: "SUCCESS",
                paragraph: form.message
            });
        }
    }

    let numberFormat = {
        area: "en-SA",
        style: {
            style: "currency",
            currency: "SAR",
        }
    };

    let floatPrice = parseFloat(data.product[0].price);

    let price = floatPrice.toLocaleString(
        numberFormat.area,
        numberFormat.style,
    );
</script>

<main>
    <div id="image-holder">
		<a href="/" aria-label="Link to Home">
            <enhanced:img src={Logo} alt="Taqdeer Alitura Logo" id="Logo" />
        </a>
	</div>

    <section id="product">
        <div id="image-carousel">
            {#each data.images as image}
                <div 
                    class="carousel-holder"
                    class:showImage={image.image_id == showImage}
                >
                    {#await import(`$lib/images/product_images/${image.image_link}.png`) then { default: src }}
                        <img {src} alt={image.alt_desc} />
                    {/await}
                </div>
            {/each}
        </div>

        <div id="product-name-holder">
            <button 
                aria-label="previous image"
                onclick={prevImage}
            >
                <svg width="20" height="30" viewBox="0 0 34 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.17157 27.1716C-0.390524 28.7337 -0.390524 31.2663 1.17157 32.8284L26.6274 58.2843C28.1895 59.8464 30.7222 59.8464 32.2843 58.2843C33.8464 56.7222 33.8464 54.1895 32.2843 52.6274L9.65685 30L32.2843 7.37258C33.8464 5.81049 33.8464 3.27783 32.2843 1.71573C30.7222 0.153632 28.1895 0.153632 26.6274 1.71573L1.17157 27.1716ZM7 26H4L4 34H7L7 26Z" fill="#1E1E1E"/>
                </svg>
            </button>
            <h1 id="product_name">{data.product[0].name}</h1>
            <p id="product-price">{price}</p>
            <button 
                aria-label="next image"
                onclick={nextImage}
            >
                <svg width="20" height="30" viewBox="0 0 34 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.8284 32.8284C34.3905 31.2663 34.3905 28.7337 32.8284 27.1716L7.37258 1.71573C5.81049 0.153631 3.27783 0.153631 1.71573 1.71573C0.153631 3.27783 0.153631 5.81049 1.71573 7.37258L24.3431 30L1.71573 52.6274C0.153631 54.1895 0.153631 56.7222 1.71573 58.2843C3.27783 59.8464 5.81049 59.8464 7.37258 58.2843L32.8284 32.8284ZM26 34H30V26H26V34Z" fill="#1E1E1E"/>
                </svg>
            </button>
        </div>

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
                <button>
                    Add to cart
                </button>
            </form>
        </section>

        <button 
            aria-label="toggle section"
            class="section-button"
            class:open-button={!openInfo}
            id="info-button"
            onclick={() => {
                openInfo = !openInfo;
            }}
        >
            Product Info
        </button>
        <section 
            class="collapsable" 
            id="info"
            class:open-section={openInfo}
        >
            {#if data.components.length == 1}
                {#each data.properties as property}
                    {#if property.property_value}
                        <p>
                            {property.property_name}: {property.property_value}
                        </p>
                    {:else}
                        <p>{property.property_name}</p>
                    {/if}
                {/each}
            {:else}
                {#each data.components as component}
                    <h3>{component.component_name}</h3>
                    {#each data.properties as property}
                        {#if property.component_id == component.component_id}
                            {#if property.property_value}
                                <p>
                                    {property.property_name}: {property.property_value}
                                </p>
                            {:else}
                                <p>{property.property_name}</p>
                            {/if}
                        {/if}
                    {/each}
                {/each}
            {/if}
        </section>

        <button 
            aria-label="toggle section"
            class="section-button"
            class:open-button={!openSize}
            onclick={() => {
                openSize = !openSize;
            }}
        >
            Sizing Information
        </button>
        <section 
            class="collapsable"
            id="size"
            class:open-section={openSize}
        >
            <p>This will contain the sizing info for the model</p>
        </section>

        <button 
            aria-label="toggle section" 
            class="section-button"
            class:open-return-button={!openReturn}
            onclick={() => {
                openReturn = !openReturn;
            }}
        >
            Return Policy
        </button>
        <section 
            class="collapsable"
            id="return"
            class:open-section={openReturn}
        >
            <p>This should be recieved from Tap Payments</p>
        </section>
    </section>
</main>

<style>
	main {
		width: 500px;
		margin: auto;
        max-width: 80%;
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
        position: relative;
        height: 400px;
        flex-direction: row;
    }

    .carousel-holder {
        display: none;
        justify-content: center;
        max-width: 400px;
    }

    .carousel-holder img {
        width: 100%;
        object-fit: cover;
        max-height: 100%;
    }

    .showImage {
        display: flex;
    }

    #product-name-holder {
        position: relative;
    }

    #product-name-holder button {
        background-color: transparent;
        border: none;
        top: calc(50% - 14px);
        position: absolute;
    }

    button[aria-label="previous image"] {
        left: 0%;
    }

    button[aria-label="next image"] {
        right: 0%;
    }

    #product_name {
        text-align: center;
    }

    #product-price {
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
        display: inline-flex;
        background-color: #D9D9D9;
        border: none;
        margin: 0 10px;
        padding: 16px 20px;
        cursor: pointer;
        width: 50px;
        justify-content: center;
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
        width: 110px;
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

    .collapsable {
        font-size: 14px;
        padding: 0 30px;
        display: none;
        flex-direction: column;
        border-bottom: 1px solid grey;
    }

    .section-button {
        background-color: transparent;
        border: none;
        font-size: 1.2em;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0;
        margin-top: 20px;
    }

    .section-button::before {
        content: url("/arrow.svg");
        font-size: 20px;
        position: relative;
        top: 2px;
        margin-right: 10px;
    }

    #info-button {
        margin-top: 50px;
    }

    #info h3 {
        font-weight: normal;
    }

    #return {
        margin-bottom: 100px;
    }

    .open-section {
        display: flex;
    }

    .open-button {
        border-bottom: 1px solid grey;
    }

    .open-return-button {
        margin-bottom: 100px;
        border-bottom: 1px solid grey;
    }

    @media screen and (width < 450px) {
        #size-selector {
            display: flex;
            flex-basis: 100%;
            justify-content: center;
            align-items: center;
            margin: 0 0 30px 0;
        }
    }
</style>
