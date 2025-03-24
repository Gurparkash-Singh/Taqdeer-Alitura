<script>
    import CartProduct from '$lib/components/CartProduct.svelte';
    import { numberFormat } from '$lib/shared_state/shared.svelte';

    const payment_images = import.meta.glob(
		'$lib/images/payment_logos/*.png',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	);

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

    
<section id="cart">
    <section 
        id="cart-items-holder"
        class:no-product={data.cart_items.length == 0}
    >
        <header>
            <ul>
                <li>Item name</li>
                <li>Size</li>
                <li>Quantity</li>
                <li>Cost</li>
            </ul>
        </header>
        {#each data.cart_items as cart_item}
            <CartProduct product={cart_item}/>
        {/each}
        {#if data.cart_items.length > 0}
            <form action="?/clear" method="POST" id="clear-button">
                <button  
                    formaction="?/clear" 
                    formmethod="POST"
                    type="submit"
                >
                    clear cart
                </button>
            </form>
        {/if}
    </section>
    <section id="price-info">
        <p>Subtotal</p>
        <p>{subtotal}</p>
    </section>
    <section id="checkout-form">
        <a 
            href="/cart/info"
            class:disable-submit={data.cart_items.length == 0}
        >
            Checkout
            <svg width="15" height="15" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.0607 13.0607C13.6464 12.4749 13.6464 11.5251 13.0607 10.9393L3.51472 1.3934C2.92893 0.807611 1.97919 0.807611 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L9.87868 12L1.3934 20.4853C0.807611 21.0711 0.807611 22.0208 1.3934 22.6066C1.97919 23.1924 2.92893 23.1924 3.51472 22.6066L13.0607 13.0607ZM10 13.5H12V10.5H10V13.5Z" fill="white"/>
            </svg>
        </a>
        <ul>
            {#each Object.entries(payment_images) as [_path, module]}
                <li>
                    <enhanced:img 
                        src={module.default} 
                        alt="payment options"
                        class="payment-logos"
                    />
                </li>
            {/each}
        </ul>
    </section>
    <section id="checkout-area">
        <section id="extra-info">
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
                <p>
                    Buy now and pay in four zero interest  installments billed monthly with tabby.
                </p>
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
                <p>
                    Enter coupon code, or view discounts associated with your account. This will be applied to the subtotal
                </p>
                <form action="?/addDiscount" method="POST">
                    <p>
                        <label for="discount">Discount code:</label>
                        <input type="text" name="discount" id="discount-input"/>
                    </p>
                </form>
            </section>
        </section>
    </section>
</section>

<style>
    #cart {
        display: flex;
        flex-direction: column;
        margin-bottom: 200px;
    }

    #cart header ul {
        list-style-type: none;
        display: grid;
        justify-items: center;
        grid-template-columns: 90px 1fr 1fr 1fr;
        border-bottom: 1px solid grey;
        padding: 10px 0 10px 10px;
        align-items: center;
    }

    #cart header ul li:first-child {
        justify-self: start;
    }

    #clear-button {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    #clear-button button{
        background: none;
        border: none;
        text-decoration: underline;
        text-align: end;
        cursor: pointer;
    }

    #checkout-form {
        margin-top: 14px;
    }

    #checkout-form a.disable-submit {
        background-color: #D9D9D9;
        color: #1E1E1E80;
    }

    #checkout-form ul {
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
    }

    #checkout-form li{
        margin: 10px;
    }

    .payment-logos {
        width: 50px;
        height: auto;
    }

    .disable-submit svg path {
        fill: #1E1E1E80;
    }

    #checkout-form a {
        background-color: #bf1e2e;
        color: white;
        border: none;
        padding: 10px 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        text-decoration: none;
    }

    #checkout-form a svg {
        margin-left: 10px;
    }

    #cart-items-holder {
        margin-bottom: 20px;
        padding: 10px 0;
        border-bottom: 1px solid grey;
    }

    #cart-items-holder.no-product {
        border: none;
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

    #checkout-area {
        display: grid;
        grid-template-columns: 1fr;
    }

    #price-info {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    form p {
        display: flex;
        flex-direction: column;
    }

    form label {
        margin-bottom: 5px;
    }

    form p input {
        background-color: #D9D9D9;
        border: none;
        padding: 10px;
    }

    @media screen and (width < 400px) {
        .payment-logos {
            width: 40px;
            height: auto;
        }
    }
</style>
