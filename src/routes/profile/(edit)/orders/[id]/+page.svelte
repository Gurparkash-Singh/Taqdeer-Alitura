<script>
    import OrderDetails from "$lib/components/OrderDetails.svelte";

    let { data } = $props();
</script>

<OrderDetails 
    order={data.order}
    address={data.address}
    delivery_amount={data.delivery.amount}
    order_invoice_items={data.order_invoice_items}
    order_items={data.order_items}
    tracking_number={data.order.tracking_number}
    order_number={data.order.tap_order_id}
/>