<script>
	import AdminBackButton from '$lib/components/AdminBackButton.svelte';

	let { data } = $props();
</script>

<AdminBackButton link="/admin/settings" name="Admin Panel" />

<section>
	{#each data.orders as order}
		<article>
			<a href={`./orders/${order.id}`}>
				<header>
					<p>{new Date(order.created_at).toISOString().split('T')[0]}</p>
					<p>{order.tap_receipt}</p>
				</header>
				<p>{order.user_email}</p>
				<h1>{order.name}</h1>
				<p>{order.status}</p>
			</a>
		</article>
	{/each}
</section>

<style>
	article {
		background-color: #d9d9d9;
		text-align: center;
		min-width: 150px;
		min-height: 100px;
		justify-self: start;
		padding: 10px 15px;
		margin-bottom: 20px;
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

	article a header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin: 0 135px;
		padding: 0 25px;
		font-size: 10pt;
		align-items: center;
	}

	article a h1 {
		font-size: 14pt;
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
