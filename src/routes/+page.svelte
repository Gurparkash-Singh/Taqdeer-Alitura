<script>
	import Header from '$lib/components/Header.svelte';
	import Logo from '$lib/images/Logo.png';
	import BackgroundImage from '$lib/images/homepage.jpg';
</script>

<div id="image-holder">
</div>

<Header current="home"/>
<main>
	<section id="logo">
		<img src={Logo} alt="Taqdeer Alitura Logo" />
		<h1>TAQDEER</h1>
		<h1>ALITURA</h1>
	</section>
</main>

<footer>
    <a href="/about" aria-label="about page">
        <svg width="20" height="20" viewBox="0 0 74 42" fill="none" xmlns="http://www.w3.org/2000/svg" id="scroll-arrow" bind:this={arrow}>
            <path
                d="M33.4645 40.5355C35.4171 42.4882 38.5829 42.4882 40.5355 40.5355L72.3553 8.71573C74.308 6.76311 74.308 3.59728 72.3553 1.64466C70.4027 -0.307962 67.2369 -0.307962 65.2843 1.64466L37 29.9289L8.71573 1.64466C6.76311 -0.307959 3.59728 -0.307959 1.64466 1.64466C-0.307962 3.59728 -0.307962 6.76311 1.64466 8.71573L33.4645 40.5355ZM32 35L32 37L42 37L42 35L32 35Z"
                fill="white"
            />
        </svg>
    </a>
</footer>

<style>
	main {
		margin: auto;
		max-width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 2;
		color: white;
	}

	#image-holder {
		padding: 20px;
		width: 100vw;
		height: 100vh;
		position: fixed;
		background-image: url('$lib/images/homepage.jpg');
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		z-index: -1;
	}

	#logo {
		display: flex;
		height: 100vh;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
	}

	#logo h1 {
		margin: 0;
		font-size: 16px;
		position: relative;
		top: 7px;
	}

	#logo img {
		width: 100px;
		position: absolute;
	}

    footer {
        position: fixed;
        bottom: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

	@media screen and( width >= 1000px) {
		#logo h1 {
			font-size: 20px;
			top: 7px;
		}

		#logo img {
			width: 100px;
		}
	}
</style>
