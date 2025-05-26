<script>
    import Logo from '$lib/images/Logo.png?enhanced';
    import { modal } from "$lib/shared_state/shared.svelte";
    import OrderProduct from "$lib/components/OrderProduct.svelte";
    import { numberFormat } from '$lib/shared_state/shared.svelte';
    import OrderDetails from '$lib/components/OrderDetails.svelte';

    let {data} = $props();

    let deliveryNum = data.delivery.amount;
    let floatSubtotal = $derived.by(() => {
        let tempSubtotal = 0
        data.order_invoice_items.forEach(item => {
            tempSubtotal += item.amount * numberFormat.conversion_rate;
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
</script>

<main>
    <div id="image-holder">
        <a href="/" aria-label="Link to Home">
            <enhanced:img src={Logo} alt="Taqdeer Alitura Logo" id="Logo" />
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

    <OrderDetails 
        order={data.order}
        address={data.address}
        delivery_amount={data.delivery.amount}
        order_invoice_items={data.order_invoice_items}
        order_items={data.order_items}
        tracking_number="1231278936"
        order_number="DG324132"
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
    
</style>