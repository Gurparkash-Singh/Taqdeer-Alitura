<script>
	let { name, link } = $props();
</script>

<section id="back">
	<a href={link}>
		<svg
			width="15"
			height="15"
			viewBox="0 0 17 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="back-arrow"
		>
			<path
				d="M0.585786 13.5858C-0.195262 14.3668 -0.195262 15.6332 0.585786 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768152 14.0948 0.0768152 13.3137 0.857864L0.585786 13.5858ZM5.5 13L2 13L2 17L5.5 17L5.5 13Z"
				fill="#1E1E1E"
			/>
		</svg>
		<svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M16 12H42M16 24H42M16 36H42M6 12H6.02M6 24H6.02M6 36H6.02"
				stroke="#1E1E1E"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		{name}
	</a>
</section>

<style>
	#back {
		margin: 40px 0;
	}

	#back a {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #d9d9d9;
		border: none;
		text-decoration: none;
		text-align: center;
		padding: 15px 30px;
		position: relative;
	}

	.back-arrow {
		position: absolute;
		left: 10px;
		top: calc(50% - 7.5px);
	}
</style>
