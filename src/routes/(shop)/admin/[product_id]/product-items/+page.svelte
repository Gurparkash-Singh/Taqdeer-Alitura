<script>
    import AdminBackButton from "$lib/components/AdminBackButton.svelte";

    let {data} = $props();
</script>

<AdminBackButton 
    link={`./`} 
    name={`${data.product.name} Panel`}
/>

<h1>Under Construction</h1>
<p>
    This area is still under construction.
</p>