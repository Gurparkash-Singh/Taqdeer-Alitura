<script>
	let { children, data } = $props();
</script>

<h1>Welcome, {data.user.name}</h1>

{@render children()}

<style>
	h1 {
		color: #bf1e2e;
	}
</style>
