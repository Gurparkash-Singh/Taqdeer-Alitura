<script>
	import AdminBackButton from "$lib/components/AdminBackButton.svelte";

    let { data } = $props();
</script>

<AdminBackButton link={`./`} name={`${data.product.name} Panel`} />

<section id="menu">
    <a href={`./sizing/components`}>
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16 12H42M16 24H42M16 36H42M6 12H6.02M6 24H6.02M6 36H6.02"
                stroke="#1E1E1E"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
        Update Size Components
    </a>
    <a href={`./sizing/info`}>
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16 12H42M16 24H42M16 36H42M6 12H6.02M6 24H6.02M6 36H6.02"
                stroke="#1E1E1E"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
        Update Size Chart
    </a>
</section>

<style>
	#menu {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		margin: 40px 0;
		row-gap: 10px;
		column-gap: 10px;
	}

	#menu a {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #d9d9d9;
		border: none;
		text-decoration: none;
		text-align: center;
		padding: 15px 30px;
	}

	#menu a svg {
		width: 20px;
		height: 20px;
	}
</style>