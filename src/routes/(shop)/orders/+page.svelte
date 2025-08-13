<script>
	import { modal } from '$lib/shared_state/shared.svelte';
	import OrderProduct from '$lib/components/OrderProduct.svelte';
	import { numberFormat } from '$lib/shared_state/shared.svelte';
	import OrderDetails from '$lib/components/OrderDetails.svelte';

	let { data } = $props();

	if (data.error) {
		let inMessages = false;
		for (let i = 0; i < modal.messages.length; i++) {
			if (modal.messages[i].paragraph == data.error) {
				inMessages = true;
			}
		}

		if (!inMessages) {
			modal.messages.push({
				heading: 'ERROR',
				paragraph: data.error
			});
		}
	}
</script>

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
			<a
				href={`https://www.aramex.com/us/en/track/results?source=aramex&ShipmentNumber=${data.order.tracking_id}`}
			>
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
	header h1 {
		color: #bf1e2e;
		text-align: center;
	}

	header p {
		text-align: center;
	}

	header {
		border-bottom: 2px solid #d9d9d9;
	}

	#order-ref {
		width: 100%;
		border-bottom: 2px solid #d9d9d9;
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
