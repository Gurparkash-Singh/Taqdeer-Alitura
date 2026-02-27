<script>
	import AdminBackButton from '$lib/components/AdminBackButton.svelte';

	let { data, form } = $props();
</script>

<AdminBackButton link={`./`} name={`${data.product.name} Panel`} />

<section>
	<form action="?/submit" method="POST"></form>
</section>
