<script>
    let {data} = $props();
</script>

{#if !data.orders}
    <p>you can view your previous orders here</p>
{/if}

<section>
    {#each data.orders as order}
        <article>
            <a href={`/profile/orders/${order.id}`}>
                <p>Order Date:</p>
                {#if order.created_at}
                    {new Date(order.created_at).toISOString().split("T")[0]}
                {:else}
                    unable to get date
                {/if}
            </a>
        </article>
    {/each}
</section>

<style>
    section {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
        justify-items: center;
        align-items: center;
        column-gap: 10px;
        row-gap: 10px;
        margin: 0 0 100px 0;
	}

    article {
        background-color: #d9d9d9;
        text-align: center;
        min-width: 150px;
        min-height: 100px;
        justify-self: start;
        padding: 10px 15px;
    }

    article a {
        background-color: transparent;
        border: none;
        cursor: pointer;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }

    article p:nth-child(2) {
        font-size: 12px;
    }

    @media screen and (width >= 600px) {
        section article:nth-child(3n - 1) {
            justify-self: center;
        }

        section article:nth-child(3n) {
            justify-self: end;
        }
    }

    @media screen and (width < 600px) {
        section {
            grid-template-columns: 1fr 1fr;
        }

        section article:nth-child(2n) {
            justify-self: end;
        }
    }

    @media screen and (width < 400px) {
        section {
            grid-template-columns: 1fr;
        }

        article {
            width: 100%;
        }
    }
</style>