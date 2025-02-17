<script>
    import AdminBackButton from "$lib/components/AdminBackButton.svelte";
    import { modal } from "$lib/shared_state/shared.svelte";

    let { data, form } = $props();

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
                heading: "SUCCESS",
                paragraph: form.message
            });
        }
    }
</script>

<AdminBackButton 
    link={`./`} 
    name={`${data.product.name} Panel`}
/>

<section>
    <ul>
        <li>Should be able to add and remove images</li>
    </ul>
</section>