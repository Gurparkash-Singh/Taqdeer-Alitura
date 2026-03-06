<script>
	import AdminBackButton from '$lib/components/AdminBackButton.svelte';
	import OrderDetails from '$lib/components/OrderDetails.svelte';
	import { modal } from '$lib/shared_state/shared.svelte';

	let { data, form } = $props();

    let invoice_printer;

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

    async function printInvoice(e) {
        e.preventDefault();

        const response = await fetch(
            `/admin/settings/orders/${data.order.id}/print-invoice`, 
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        const res = await response.json();

        invoice_printer.contentWindow.document.write(res.invoice);
        invoice_printer.contentWindow.print();
    }
</script>

<AdminBackButton link="./" name="All Orders" />

<section id="order-ref">
	<dl>
		<dt>Order number:</dt>
		<dd>{data.order.tap_receipt}</dd>
		<dd class="reference-link">
			<button onclick={printInvoice}>Print Invoice</button>
		</dd>
        <dt>Date:</dt>
        <dd>{new Date(data.order.created_at).toISOString().split('T')[0]}</dd>
        <dd class="reference-link">
            <a href={data.label} target="_blank">Print Label</a>
        </dd>
		<dt>Tracking number:</dt>
		<dd>{data.order.tracking_id}</dd>
		<dd class="reference-link">
			<a href="https://www.aramex.com/us/en/track/shipments"> Track order </a>
		</dd>
	</dl>
</section>

<OrderDetails
	order={data.order}
	address={data.address}
	delivery_amount={data.delivery ? data.delivery.amount : 0}
	order_invoice_items={data.order_invoice_items}
	order_items={data.order_items}
/>

<iframe 
    title="invoice" 
    bind:this={invoice_printer}
></iframe>

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

    iframe {
        display: none;
    }
</style>
