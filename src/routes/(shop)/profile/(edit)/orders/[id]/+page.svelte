<script>
	import OrderDetails from '$lib/components/OrderDetails.svelte';
	import { modal } from '$lib/shared_state/shared.svelte';

	let { data, form } = $props();

	if (form) {
		let inMessages = false;
		for (let i = 0; i < modal.messages.length; i++) {
			if (modal.messages[i].paragraph == form.message) {
				inMessages = true;
			}
		}

		if (!inMessages && form.invalid) {
			modal.messages.push({
				heading: 'ERROR',
				paragraph: form.message
			});
		} else if (!inMessages && form.success) {
			modal.messages.push({
				heading: 'Success',
				paragraph: form.message
			});
		}
	}
</script>

<section id="order-ref">
	<dl>
		<dt>Order number:</dt>
		<dd>{data.order.tap_receipt}</dd>
		<dd class="reference-link">
			<form action="?/submit" method="POST">
				<input type="hidden" name="order-id" value={data.order.id} />
				<button type="submit">Order again</button>
			</form>
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
	#order-ref {
		width: 100%;
		border-bottom: 2px solid #d9d9d9;
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
