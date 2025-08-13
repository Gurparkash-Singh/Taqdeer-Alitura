<script>
	let { children, data } = $props();
</script>

<h1>Welcome, Admin</h1>

{@render children()}

<style>
	h1 {
		color: #bf1e2e;
	}
</style>
