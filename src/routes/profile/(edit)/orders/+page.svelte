<script>
    let {data} = $props();
</script>

{#if !data.orders}
    <p>you can view your previous orders here</p>
{/if}

{#each data.orders as order}
    <article>
        <a href={`/profile/orders/${order.id}`}>
            <h2>Order number:</h2>
            <p>{order.tap_receipt ? order.tap_receipt : "no number"}</p>
        </a>
    </article>
{/each}

<style>
    article {
        background-color: #d9d9d9;
        padding: 10px 10px;
        margin: 20px 0;
        text-align: center;
    }

    article h2 {
        font-size: 1.2em;
    }
</style>