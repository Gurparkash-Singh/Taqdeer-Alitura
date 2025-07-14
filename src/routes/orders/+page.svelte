<script>
    import { modal } from "$lib/shared_state/shared.svelte";
    import OrderProduct from "$lib/components/OrderProduct.svelte";
    import { numberFormat } from '$lib/shared_state/shared.svelte';
    import OrderDetails from '$lib/components/OrderDetails.svelte';

    let {data} = $props();
</script>

<main>
    <div id="image-holder">
        <a href="/" aria-label="Link to Home">
            <img src="/Logo.svg" alt="Taqdeer Alitura Logo" id="Logo" />
        </a>
    </div>

    <header>
        <h1>thank you, {data.order.name}</h1>
        <p>
            Check 
            <a href="/profile/orders">order history</a> 
            or email for order details
        </p>
    </header>

    <section id="order-ref">
        <dl>
            <dt>Order number:</dt>
            <dd>{data.order.tap_receipt}</dd>
            <dd class="reference-link">
                <a href="/profile/orders">Order history</a>
            </dd>
            <dt>Tracking number:</dt>
            <dd>{data.order.tracking_id}</dd>
            <dd class="reference-link">
                <a href="https://www.aramex.com/us/en/track/shipments">
                    Track order
                </a>
            </dd>
        </dl>
    </section>

    <OrderDetails 
        order={data.order}
        address={data.address}
        delivery_amount={data.delivery.amount}
        order_invoice_items={data.order_invoice_items}
        order_items={data.order_items}
    />
</main>

<style>
    main {
        max-width: 700px;
		margin: auto;
        width: 80%;
    }

    main > header h1 {
        color: #bf1e2e;
        text-align: center;
    }

    main > header p {
        text-align: center;
    }

    main > header {
        border-bottom: 2px solid #D9D9D9;
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

    #order-ref {
        width: 100%;
        border-bottom: 2px solid #D9D9D9;
        padding: 20px 0;
    }

    #order-ref dl {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        row-gap: 20px;
    }

    .reference-link {
        justify-self: end;
    }
</style>