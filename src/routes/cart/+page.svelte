<script>
    import Logo from '$lib/images/Logo.png?enhanced';
    import CartProduct from '$lib/components/CartProduct.svelte';

    let { data, form } = $props();

    let numberFormat = {
        area: "en-SA",
        style: {
            style: "currency",
            currency: "SAR",
        },
    };

    let subtotal = $state(0);
    let deliveryNum = 20;
    let delivery = $state(10);
    let total = $state(0);
    let discounts = 0;

    let openInstallments = $state(false);
    let openCoupons = $state(false);

    function calculateValues()
    {
        subtotal = 0;
        data.cart_items.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        total = subtotal + deliveryNum

        if (subtotal == 0)
        {
            total = 0;
        }
    }

    function formatString()
    {
        subtotal = subtotal.toLocaleString(
            numberFormat.area,
            numberFormat.style,
        );

        if (total == 0) {
            delivery = subtotal;
        }
        else {
            delivery = deliveryNum.toLocaleString(
                numberFormat.area,
                numberFormat.style,
            );
        }
        
        total = total.toLocaleString(numberFormat.area, numberFormat.style);
    }
    calculateValues();
    formatString();
</script>

<main>
    <div id="image-holder">
		<a href="/" aria-label="Link to Home">
            <enhanced:img src={Logo} alt="Taqdeer Alitura Logo" id="Logo" />
        </a>
	</div>
    
    <section id="cart">
        <section>
            <header>
                <ul>
                    <li>Item name</li>
                    <li>Quantity</li>
                    <li>Cost</li>
                </ul>
            </header>
            {#each data.cart_items as cart_item}
                <CartProduct product={cart_item}/>
            {/each}
        </section>
        <section id="checkout-area">
            <header>
                <ul>
                    <li>Delivery</li>
                    <li>Discounts</li>
                    <li>Total</li>
                </ul>
            </header>
            <ul id="order-summary">
                <li>{delivery}</li>
                <li>{discounts}%</li>
                <li>{total}</li>
            </ul>
            <button 
                aria-label="toggle section"
                class="section-button"
                class:open-button={!openInstallments}
                onclick={() => {
                    openInstallments = !openInstallments;
                }}
            >
                Pay in installments
            </button>
            <section 
                class="collapsable"
                class:open-section={openInstallments}
            >
                <p>This will contain a checkout link to pay in installments.</p>
            </section>

            <button 
                aria-label="toggle section"
                class="section-button"
                class:open-button={!openCoupons}
                onclick={() => {
                    openCoupons = !openCoupons;
                }}
            >
                Coupons
            </button>
            <section 
                class="collapsable"
                class:open-section={openCoupons}
            >
                <p>This will contain coupons.</p>
            </section>
        </section>
    </section>
</main>

<style>
	main {
		max-width: 700px;
		margin: auto;
        width: 80%;
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

    .collapsable {
        font-size: 14px;
        padding: 0 30px;
        display: none;
        flex-direction: column;
        border-bottom: 1px solid grey;
        width: calc(100% - 10px);
        margin-left: 10px;
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
        width: calc(100% - 10px);
        margin-left: 10px;
    }

    .section-button::before {
        content: url("/arrow.svg");
        font-size: 20px;
        position: relative;
        top: 2px;
        margin-right: 10px;
    }

    .open-section {
        display: flex;
    }

    .open-button {
        border-bottom: 1px solid grey;
    }

    #cart {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    #cart header ul {
        list-style-type: none;
        display: grid;
        justify-items: center;
        grid-template-columns: 1fr 1fr 1fr;
        border-bottom: 1px solid grey;
        padding: 10px 0 10px 10px;
        align-items: center;
    }

    #cart header ul li:first-child {
        justify-self: start;
    }

    #order-summary {
        list-style-type: none;
        display: grid;
        justify-items: center;
        grid-template-columns: 1fr 1fr 1fr;
        margin: 0;
        padding: 0 0 0 10px;
        align-items: center;
    }

    #order-summary li:first-child {
        justify-self: start;
    }

    @media screen and (width < 550px) {

    }
</style>
