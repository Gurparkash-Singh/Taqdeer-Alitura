<script>
    import { modal } from "$lib/shared_state/shared.svelte";

    let {data} = $props();

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
</script>

<pre>
    {JSON.stringify(data.order, null, 8)}
</pre>

<form action="?/checkout" method="post">
    <button type="submit">Checkout</button>
</form>