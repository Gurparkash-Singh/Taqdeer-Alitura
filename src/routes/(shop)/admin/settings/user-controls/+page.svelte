<script>
	import AdminBackButton from '$lib/components/AdminBackButton.svelte';
	import { modal } from '$lib/shared_state/shared.svelte';

	let { data, form } = $props();

	let early_access = $state(data.early_access);
	let subs = $state(data.subscribed_emails);

	let add_early_access = $state([]);
	let remove_early_access = $state([]);

	let email = $state('');

	let enableNewSubmit = $derived(email ? true : false);

	let enableSubmit = $derived.by(() => {
		if (add_early_access.length > 0) {
			return true;
		}

		if (remove_early_access.length > 0) {
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

<AdminBackButton link="/admin/settings" name="Admin Panel" />

<section>
	<form method="post" action="?/add">
		<p>
			<label for="email">Email:</label>
			<input type="text" name="email" id="email" bind:value={email} />
		</p>
		<button type="submit" class:disable-submit={!enableNewSubmit} disabled={!enableNewSubmit}>
			Enter
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

<section>
	<form action="?/submit" method="post">
		<input type="hidden" name="add-list" value={JSON.stringify(add_early_access)} />
		<input type="hidden" name="remove-list" value={JSON.stringify(remove_early_access)} />
		<fieldset>
			<h1>Early Access</h1>
			{#each early_access as user (user.email)}
				<p>
					<input
						type="checkbox"
						checked="true"
						onclick={(e) => {
							const sub_index = add_early_access.indexOf(user);
							if (sub_index === -1) {
								remove_early_access.push(user);
							} else {
								add_early_access.splice(sub_index, 1);
								subs.push(user);
							}
							const index = early_access.indexOf(user);
							early_access.splice(index, 1);
						}}
					/>
					{user.email}
				</p>
			{/each}
		</fieldset>
		<fieldset>
			<h1>Waitlist</h1>
			{#each subs as user (user.email)}
				<p>
					<input
						type="checkbox"
						checked={false}
						onclick={(e) => {
							early_access.push(user);
							add_early_access.push(user);
							const index = subs.indexOf(user);
							subs.splice(index, 1);
						}}
					/>
					{user.email}
				</p>
			{/each}
		</fieldset>
		<fieldset>
			<h1>Remove from Early Access</h1>
			{#each remove_early_access as user (user.email)}
				<p>
					<input
						type="checkbox"
						checked={false}
						onclick={(e) => {
							early_access.push(user);
							const index = remove_early_access.indexOf(user);
							remove_early_access.splice(index, 1);
						}}
					/>
					{user.email}
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

	form label {
		margin-bottom: 5px;
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
