<script>
	import AdminBackButton from '$lib/components/AdminBackButton.svelte';
	import { modal } from '$lib/shared_state/shared.svelte';

	let { data, form } = $props();

	let above_text = $state(data.product.size_chart_above_text);
	let below_text = $state(data.product.size_chart_below_text);

	let size_chart_values = $state({});

	let newVal = $state('Hello, World!');

	for (let i = 0; i < data.product_variation_options.length; i++) {
		for (let j = 0; j < data.size_chart_components.length; j++) {
			let option_id = data.product_variation_options[i].option_id;
			let component_id = data.size_chart_components[j].component_id;

			if (!size_chart_values[option_id]) {
				size_chart_values[option_id] = {};
			}

			let value = 0;

			if (data.size_chart_values[option_id]) {
				if (data.size_chart_values[component_id]) {
					value = data.size_chart_values[option_id][component_id].value;
				}
			}

			size_chart_values[option_id][component_id] = value;
		}
	}

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
	<form action="?/submit" method="post">
		<input type="hidden" name="size_chart" value={JSON.stringify(size_chart_values)} />
		<p>
			<textarea
				name="above_text"
				id="above_text"
				rows="3"
				cols="20"
				placeholder="Text Above Size Chart"
				bind:value={above_text}
			></textarea>
		</p>
		<table>
			<thead>
				<tr>
					<th>Size</th>
					{#each data.size_chart_components as component}
						<th>{component.name}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data.product_variation_options as option}
					<tr>
						<th>{option.value}</th>
						{#each data.size_chart_components as component}
							<td>
								<input
									type="text"
									size="4"
									bind:value={size_chart_values[option.option_id][component.component_id]}
								/>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
		<p>
			<textarea
				name="below_text"
				id="below_text"
				rows="3"
				cols="20"
				placeholder="Text Below Size Chart"
				bind:value={below_text}
			></textarea>
		</p>
		<button type="submit">
			Continue
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
	textarea {
		width: 100%;
		font-size: 14px;
		resize: vertical;
	}

	table {
		width: 100%;
		text-align: left;
	}

	tr {
		width: 100%;
	}

	form button {
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
</style>
