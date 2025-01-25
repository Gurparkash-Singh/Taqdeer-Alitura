<script>
    import Logo from '$lib/images/Logo.png?enhanced';
    import CartProduct from '$lib/components/CartProduct.svelte';

    let { data, form } = $props();

    let numberFormat = {
        area: "en-ca",
        style: {
            style: "currency",
            currency: "CAD",
        },
    };

    let subtotal = $state(0);
    let deliveryNum = 20;
    let delivery = $state(10);
    let total = $state(0);

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
		<enhanced:img src={Logo} alt="Taqdeer Alitura Logo" id="Logo" />
	</div>

    <section id="products">
        {#each data.cart_items as cart_item}
            <CartProduct product={cart_item}/>
        {/each}
        {#if data.cart_items.length === 0}
            <h1>No Items in Cart</h1>    
        {/if}
    </section>

    <section id="order-summary">
        <h2>Order Summary</h2>
        <dl>
            <div>
                <dt>Subtotal</dt>
                <dd>{subtotal}</dd>
            </div>
            <div>
                <dt>Delivery</dt>
                <dd>{delivery}</dd>
            </div>
            <div>
                <dt>Total</dt>
                <dd>{total}</dd>
            </div>
        </dl>
        <button id="cart-button">Checkout</button>
        <p>* Tax will be calculated during checkout</p>
        <p>** Total excludes tax</p>
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

    #products {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    h1 {
        text-align: center;
    }

    #order-summary {
        border-radius: 15px;
        display: inline-flex;
        align-items: center;
        padding-block: 3rem;
        padding-inline: 3rem;
        flex-direction: column;
        width: 100%;
    }

    dl div {
        display: flex;
        justify-content: space-between;
    }

    dl {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        margin-block-end: 2.5rem;
    }

    #cart-button {
        color: white;
        background-color: #BF1E2E;
        border: none;
        margin: 0 10px;
        padding: 16px;
        cursor: pointer;
    }
</style>
