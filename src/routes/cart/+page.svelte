<script>
    import Logo from '$lib/images/Logo.png?enhanced';
    import CartProduct from '$lib/components/CartProduct.svelte';
    import { numberFormat } from '$lib/shared_state/shared.svelte';

    let { data, form } = $props();

    let deliveryNum = 20;
    let floatSubtotal = $derived.by(() => {
        let tempSubtotal = 0
        data.cart_items.forEach(item => {
            tempSubtotal += item.price * item.quantity * numberFormat.conversion_rate;
        });
        return tempSubtotal;
    });
    let floatDelivery = $derived.by(() => {
        if (floatSubtotal > 0) {
            return deliveryNum * numberFormat.conversion_rate
        }
        else {
            return 0;
        }
    });
    let floatTotal = $derived(floatSubtotal + floatDelivery);

    let subtotal = $derived(floatSubtotal.toLocaleString(
        numberFormat.area,
        numberFormat.style,
    ));

    let delivery = $derived(floatDelivery.toLocaleString(
        numberFormat.area,
        numberFormat.style,
    ));

    let total = $derived(floatTotal.toLocaleString(
        numberFormat.area, 
        numberFormat.style
    ));

    let discounts = 0;

    let openInstallments = $state(false);
    let openCoupons = $state(false);
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
                Pay
            </button>
            <section 
                class="collapsable"
                class:open-section={openInstallments}
            >
                <form action="?/checkout" method="POST">
                    <button type="submit">Checkout</button>
                </form>
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
        width: 100%;
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
        width: 100%;
    }

    .section-button::before {
        content: url("/arrow.svg");
        font-size: 20px;
        position: relative;
        top: 2px;
        margin-right: 10px;
        padding: 0 0 0 10px;
    }

    .open-section {
        display: flex;
    }

    .open-button {
        border-bottom: 1px solid grey;
    }

    #cart {
        display: grid;
        grid-template-columns: 1fr;
        margin-bottom: 200px;
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
