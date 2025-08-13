<script>
	import Logo from '$lib/images/Logo.png?enhanced';
	import { modal } from '$lib/shared_state/shared.svelte';
	import OrderProduct from '$lib/components/OrderProduct.svelte';
	import { numberFormat } from '$lib/shared_state/shared.svelte';

	let { order, address, delivery_amount, order_invoice_items, order_items } = $props();

	let deliveryNum = delivery_amount;
	let floatSubtotal = $derived.by(() => {
		let tempSubtotal = 0;
		order_invoice_items.forEach((item) => {
			tempSubtotal += item.amount * numberFormat.conversion_rate;
		});
		return tempSubtotal;
	});
	let floatDelivery = $derived.by(() => {
		if (floatSubtotal > 0) {
			return deliveryNum * numberFormat.conversion_rate;
		} else {
			return 0;
		}
	});
	let floatTotal = $derived(floatSubtotal + floatDelivery);

	let subtotal = $derived(floatSubtotal.toLocaleString(numberFormat.area, numberFormat.style));

	let delivery = $derived(floatDelivery.toLocaleString(numberFormat.area, numberFormat.style));

	let total = $derived(floatTotal.toLocaleString(numberFormat.area, numberFormat.style));
</script>

<article>
	<section id="order-price">
		<article id="product-container">
			{#each order_items as item}
				<OrderProduct product={item} />
			{/each}
		</article>
		<div></div>
		<section id="price-details">
			<dl>
				<dt>Subtotal</dt>
				<dd>{subtotal}</dd>
				<dt>Delivery</dt>
				<dd>{delivery}</dd>
				<dt>Total</dt>
				<dd>{total}</dd>
			</dl>
		</section>
	</section>

	<section id="order-details">
		<section id="address-details">
			<p>
				Street:
				<span>
					{address?.address_line1}
				</span>
			</p>
			<div></div>
			<p>
				City:
				<span>
					{address?.city}
				</span>
			</p>
			<p>
				State/Province:
				<span>
					{address?.province}
				</span>
			</p>
			<div></div>
			<p>
				Postal Code:
				<span>
					{address?.postal_code}
				</span>
			</p>
		</section>
		<section id="customer-info">
			<p>
				Name:
				<span>
					{order.name}
				</span>
			</p>
			<div></div>
			<p>
				Email:
				<span>
					{order.user_email}
				</span>
			</p>
			<p>
				Country Code:
				<span>
					{order.country}
				</span>
			</p>
			<div></div>
			<p>
				Phone Number:
				<span>
					{order.telephone}
				</span>
			</p>
		</section>
	</section>
</article>

<style>
	#order-price {
		display: grid;
		grid-template-columns: 1fr 2px 1fr;
		column-gap: 10px;
		padding: 30px 0;
		border-bottom: 2px solid #d9d9d9;
	}

	#order-price div {
		width: 2px;
		height: 100%;
		background-color: #d9d9d9;
	}

	#product-container {
		max-height: 300px;
		overflow-y: scroll;
		width: 100%;
		scrollbar-width: thin;
	}

	#price-details {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	#price-details dl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		row-gap: 10px;
	}

	#order-details {
		padding: 30px 0;
	}

	#order-details section {
		display: grid;
		grid-template-columns: 1fr 2px 1fr;
		align-items: center;
		column-gap: 10px;
	}

	#order-details p {
		display: flex;
		flex-direction: column;
	}

	@media screen and (width < 550px) {
		#order-price {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 10px 0;
		}

		#product-container {
			width: min-content;
		}

		#order-price div {
			width: 100%;
			height: 2px;
			background-color: #d9d9d9;
			margin: 10px;
		}

		#order-details section {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		#order-details p {
			min-width: 225px;
			width: min-content;
		}
	}
</style>
