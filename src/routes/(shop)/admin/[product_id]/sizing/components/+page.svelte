<script>
	import AdminBackButton from "$lib/components/AdminBackButton.svelte";
	import { modal } from "$lib/shared_state/shared.svelte.js";

    let { data, form } = $props();

    let product_components = $state(data.size_chart_components);
    let all_components = $state(data.all_components);

    let add_list = $state([]);
    let remove_list = $state([]);

    let enableSubmit = $derived.by(() => {
		if (add_list.length > 0) {
			return true;
		}

		if (remove_list.length > 0) {
			return true;
		}

		return false;
	});

    if (form) {
		let inMessages = false;
		for (let i = 0; i < modal.messages.length; i++) {
			if (modal.messages[i].paragraph == form.message) {
				inMessages = true;
			}
		}

		if (!inMessages && form.invalid) {
			modal.messages.push({
				heading: 'ERROR',
				paragraph: form.message
			});
		} else if (!inMessages && form.success) {
			modal.messages.push({
				heading: 'SUCCESS',
				paragraph: form.message
			});
		}
	}
</script>

<AdminBackButton link={`./`} name={`${data.product.name} Panel`} />

<section>
    <form action="?/submit" method="POST">
        <input type="hidden" name="add-list" value={JSON.stringify(add_list)} />
		<input type="hidden" name="remove-list" value={JSON.stringify(remove_list)} />
        <fieldset>
            <h1>Product Components</h1>
			{#each product_components as component (component.component_id)}
				<p>
					<input
						type="checkbox"
						checked={true}
						onclick={(e) => {
							const add_list_index = add_list.indexOf(component);
							if (add_list_index === -1) {
								remove_list.push(component);
							} else {
								add_list.splice(add_list_index, 1);
								all_components.push(component);
							}
							const index = product_components.indexOf(component);
							product_components.splice(index, 1);
						}}
					/>
                    {component.name}
				</p>
			{/each}
        </fieldset>
        <fieldset>
            <h1>Available Components</h1>
			{#each all_components as component (component.component_id)}
				<p>
					<input
						type="checkbox"
						checked={false}
						onclick={(e) => {
                            product_components.push(component);
                            add_list.push(component);
                            const index = all_components.indexOf(component);
                            all_components.splice(index, 1);
						}}
					/>
					{component.name}
				</p>
			{/each}
        </fieldset>
        <fieldset>
            <h1>Removed Components</h1>
			{#each remove_list as component (component.component_id)}
				<p>
					<input
						type="checkbox"
						checked={false}
						onclick={(e) => {
                            product_components.push(component);
                            const index = remove_list.indexOf(component);
                            remove_list.splice(index, 1);
						}}
					/>
					{component.name}
				</p>
			{/each}
        </fieldset>
        <button type="submit" class:disable-submit={!enableSubmit} disabled={!enableSubmit}>
            Save
            <svg
                width="10"
                height="10"
                viewBox="0 0 14 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13.0607 13.0607C13.6464 12.4749 13.6464 11.5251 13.0607 10.9393L3.51472 1.3934C2.92893 0.807611 1.97919 0.807611 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L9.87868 12L1.3934 20.4853C0.807611 21.0711 0.807611 22.0208 1.3934 22.6066C1.97919 23.1924 2.92893 23.1924 3.51472 22.6066L13.0607 13.0607ZM10 13.5H12V10.5H10V13.5Z"
                    fill="white"
                />
            </svg>
        </button>
    </form>
</section>

<style>
	button {
		margin: 20px 0;
		background-color: #bf1e2e;
		color: white;
		border: none;
		padding: 10px 10px;
		width: 100px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}

	.disable-submit {
		background-color: #d9d9d9;
		color: #1e1e1e80;
	}

	.disable-submit svg path {
		fill: #1e1e1e80;
	}

	form p {
		display: flex;
		flex-direction: column;
	}

	form p input {
		background-color: #d9d9d9;
		border: none;
		padding: 10px;
	}

	form fieldset p {
		flex-direction: row;
	}

	fieldset {
		border: none;
		margin: 0;
		padding: 0;
	}
</style>