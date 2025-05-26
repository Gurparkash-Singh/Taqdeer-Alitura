<script>
    import OrderDetails from "$lib/components/OrderDetails.svelte";

    let { data } = $props();
</script>

<section id="order-ref">
    <dl>
        <dt>Order number:</dt>
        <dd>{data.order.tap_receipt}</dd>
        <dd class="reference-link">
            <button>Order again</button>
        </dd>
        <dt>Tracking number:</dt>
        <dd>{data.order.tracking_number}</dd>
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

<style>
    #order-ref {
        width: 100%;
        border-bottom: 2px solid #D9D9D9;
        margin: -40px 0 0 0;
        padding: 10px 0 10px 0;
    }

    #order-ref dl {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        row-gap: 20px;
        margin: 0;
    }

    .reference-link {
        justify-self: end;
    }

    #order-ref dl button {
        padding: 0;
        border: none;
        background: transparent;
        text-decoration: underline;
        cursor: pointer;
    }
</style>