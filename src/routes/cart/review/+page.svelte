<script>
    import { modal } from "$lib/shared_state/shared.svelte";
    import OrderProduct from "$lib/components/OrderProduct.svelte";
    import { numberFormat } from '$lib/shared_state/shared.svelte';

    let {data, form} = $props();

    if (data.infoUpdated) {
        let inMessages = false;
        let paragraph = "updated order information";
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == paragraph) {
                inMessages = true;
            }
        }

        if (!inMessages) {
            modal.messages.push({
                heading: "Success",
                paragraph: paragraph
            });
        }
    }

    if (form) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == form.message) {
                inMessages = true;
            }
        }

        if (!inMessages && form.invalid) 
        {
            modal.messages.push({
                heading: "ERROR",
                paragraph: form.message
            });
        }else if (!inMessages && form.success) {
            modal.messages.push({
                heading: "Success",
                paragraph: form.message
            });
        }
    }

    if (data.declined) {
        let inMessages = false;
        let paragraph = "payment unsuccessfull";
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == paragraph) {
                inMessages = true;
            }
        }

        if (!inMessages) {
            modal.messages.push({
                heading: "ERROR",
                paragraph: paragraph
            });
        }
    }

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

    let selected_card = $state("save");
</script>

<section>

    <section id="order-price">
        <article id="product-container">
            {#each data.order_items as item}
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

    <form action="?/checkout" method="post">
        <input 
            type="hidden" 
            name="currency"
            value={numberFormat.style.currency}
        >
        {#if !data.user}
            <a href="/profile">login to access cards</a>
        {:else}
            <select 
                name="selected_card" 
                id="selected_card"
                bind:value={selected_card}
            >
                {#each data.cards as card}
                    <option value={card}>
                        &bull;&bull;&bull;&bull; {card.last_four_digits}
                    </option>
                {/each}
                <option value="save" selected>enter and save a card</option>
                <option value="add">enter card without saving</option>
                <option value="add">other payment option</option>
            </select>

            {#if selected_card == "save"}
                <input 
                    type="hidden" 
                    name="save_card"
                    value="true"
                >
            {:else if selected_card == "add"}
                <input type="hidden" name="add" value="true">
            {:else if selected_card}
                <input 
                    type="hidden" 
                    name="card"
                    value={selected_card.card_id}
                >
            {/if}
        {/if}
        <button type="submit">
            Checkout
            <svg width="10" height="10" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.0607 13.0607C13.6464 12.4749 13.6464 11.5251 13.0607 10.9393L3.51472 1.3934C2.92893 0.807611 1.97919 0.807611 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L9.87868 12L1.3934 20.4853C0.807611 21.0711 0.807611 22.0208 1.3934 22.6066C1.97919 23.1924 2.92893 23.1924 3.51472 22.6066L13.0607 13.0607ZM10 13.5H12V10.5H10V13.5Z" fill="white"/>
            </svg>
        </button>
    </form>

    <section id="order-details">
        <section id="address-details">
            <p>
                Street: 
                <span>
                    {data.address.address_line1}
                </span>
            </p>
            <div></div>
            <p>
                City: 
                <span>
                    {data.address.city}
                </span>
            </p>
            <p>
                State/Province: 
                <span>
                    {data.address.province}
                </span>
            </p>
            <div></div>
            <p>
                Postal Code: 
                <span>
                    {data.address.postal_code}
                </span>
            </p>
        </section>
        <section id="customer-info">
            <p>
                Name: 
                <span>
                    {data.order.name}
                </span>
            </p>
            <div></div>
            <p>
                Email: 
                <span>
                    {data.order.user_email}
                </span>
            </p>
            <p>
                Country Code: 
                <span>
                    {data.order.country}
                </span>
            </p>
            <div></div>
            <p>
                Phone Number: 
                <span>
                    {data.order.telephone}
                </span>
            </p>
        </section>
    </section>
</section>

<style>
    #order-price {
        display: grid;
        grid-template-columns: 1fr 2px 1fr;
        column-gap: 10px;
        padding: 30px 0;
        border-bottom: 2px solid #D9D9D9;
    }

    #order-price div {
        width: 2px;
        height: 100%;
        background-color: #D9D9D9;
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

    form {
        width: 100%;
    }

    form select {
        background-color: #D9D9D9;
        border: none;
        padding: 10px;
        width: 100%;
        text-align: center;
    }

    form button {
        margin: 20px 0;
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
            background-color: #D9D9D9;
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