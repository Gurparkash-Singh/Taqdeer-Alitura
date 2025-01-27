<script>
    import { page } from "$app/state";
    import Modal from "$lib/components/Modal.svelte";
    import { modal } from "$lib/shared_state/shared.svelte";

    let { data, children } = $props();

    let body;

    let stopScroll = $derived(modal.messages.length > 0);

    $effect(() => {
        if (stopScroll) {
            body.style.overflow = "hidden";
        }
        else {
            body.style.overflow = "auto";
        }
    })

    modal.messages = data.messages;
</script>

<svelte:body bind:this={body}/>

<Modal></Modal>

<div id="change-language">
	<button aria-label="change language">
		<svg width="22" height="22" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M42 22C42 33.0457 33.0457 42 22 42M42 22C42 10.9543 33.0457 2 22 2M42 22H2M22 42C10.9543 42 2 33.0457 2 22M22 42C27.0026 36.5233 29.8455 29.4159 30 22C29.8455 14.5841 27.0026 7.47671 22 2M22 42C16.9974 36.5233 14.1545 29.4159 14 22C14.1545 14.5841 16.9974 7.47671 22 2M2 22C2 10.9543 10.9543 2 22 2"
				stroke="#1E1E1E"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
</div>

<div id="shop">
	<a href="/shop" aria-label="shop">
		<svg width="20" height="22" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M2 10L8 2H32L38 10M2 10V38C2 39.0609 2.42143 40.0783 3.17157 40.8284C3.92172 41.5786 4.93913 42 6 42H34C35.0609 42 36.0783 41.5786 36.8284 40.8284C37.5786 40.0783 38 39.0609 38 38V10M2 10H38M28 18C28 20.1217 27.1571 22.1566 25.6569 23.6569C24.1566 25.1571 22.1217 26 20 26C17.8783 26 15.8434 25.1571 14.3431 23.6569C12.8429 22.1566 12 20.1217 12 18"
				stroke={page.url.pathname === "/shop" ? "#900B09" : "#1E1E1E"}
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</a>
</div>

<div id="profile">
	<a href="/profile" aria-label="profile">
		<svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M16 16C13.8 16 11.9167 15.2167 10.35 13.65C8.78333 12.0833 8 10.2 8 8C8 5.8 8.78333 3.91667 10.35 2.35C11.9167 0.783333 13.8 0 16 0C18.2 0 20.0833 0.783333 21.65 2.35C23.2167 3.91667 24 5.8 24 8C24 10.2 23.2167 12.0833 21.65 13.65C20.0833 15.2167 18.2 16 16 16ZM0 32V26.4C0 25.2667 0.291667 24.225 0.875 23.275C1.45833 22.325 2.23333 21.6 3.2 21.1C5.26667 20.0667 7.36667 19.2917 9.5 18.775C11.6333 18.2583 13.8 18 16 18C18.2 18 20.3667 18.2583 22.5 18.775C24.6333 19.2917 26.7333 20.0667 28.8 21.1C29.7667 21.6 30.5417 22.325 31.125 23.275C31.7083 24.225 32 25.2667 32 26.4V32H0ZM4 28H28V26.4C28 26.0333 27.9083 25.7 27.725 25.4C27.5417 25.1 27.3 24.8667 27 24.7C25.2 23.8 23.3833 23.125 21.55 22.675C19.7167 22.225 17.8667 22 16 22C14.1333 22 12.2833 22.225 10.45 22.675C8.61667 23.125 6.8 23.8 5 24.7C4.7 24.8667 4.45833 25.1 4.275 25.4C4.09167 25.7 4 26.0333 4 26.4V28ZM16 12C17.1 12 18.0417 11.6083 18.825 10.825C19.6083 10.0417 20 9.1 20 8C20 6.9 19.6083 5.95833 18.825 5.175C18.0417 4.39167 17.1 4 16 4C14.9 4 13.9583 4.39167 13.175 5.175C12.3917 5.95833 12 6.9 12 8C12 9.1 12.3917 10.0417 13.175 10.825C13.9583 11.6083 14.9 12 16 12Z"
                fill={page.url.pathname === "/profile" ? "#900B09" : "#1E1E1E"}
			/>
		</svg>
	</a>
</div>

<div id="home">
	<a href="/" aria-label="home page">
		<svg width="20" height="22" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M14 42V22H26V42M2 16L20 2L38 16V38C38 39.0609 37.5786 40.0783 36.8284 40.8284C36.0783 41.5786 35.0609 42 34 42H6C4.93913 42 3.92172 41.5786 3.17157 40.8284C2.42143 40.0783 2 39.0609 2 38V16Z"
				stroke={page.url.pathname === "/" ? "#900B09" : "#1E1E1E"}
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</a>
</div>

<div id="cart">
    {#if data.num_items > 0}
        <p
            class:home={page.url.pathname === "/"}
        >
        {data.num_items}
        </p>
    {/if}
	<a href="/cart" id="cart-link" aria-label="cart">
		<svg width="26" height="24" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M2 2H10L15.36 28.78C15.5429 29.7008 16.0438 30.5279 16.7751 31.1166C17.5064 31.7053 18.4214 32.018 19.36 32H38.8C39.7386 32.018 40.6536 31.7053 41.3849 31.1166C42.1162 30.5279 42.6171 29.7008 42.8 28.78L46 12H12M20 42C20 43.1046 19.1046 44 18 44C16.8954 44 16 43.1046 16 42C16 40.8954 16.8954 40 18 40C19.1046 40 20 40.8954 20 42ZM42 42C42 43.1046 41.1046 44 40 44C38.8954 44 38 43.1046 38 42C38 40.8954 38.8954 40 40 40C41.1046 40 42 40.8954 42 42Z"
				stroke={page.url.pathname === "/cart" ? "#900B09" : "#1E1E1E"}
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</a>
</div>

{@render children()}

<style>
	div {
		position: fixed;
		background-color: #d9d9d9;
		width: 35px;
		height: 35px;
		border-radius: 100px;
		z-index: 3;
	}

	div a,
	div button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 35px;
		height: 35px;
		border-radius: 100px;
	}

	#change-language {
		top: 10px;
		left: 10px;
	}

	#change-language button {
		border: none;
	}

	#shop {
		top: 10px;
		right: 10px;
	}

	#profile {
		top: 50px;
		right: 10px;
	}

	#home {
		top: 90px;
		right: 10px;
	}

	#cart {
		bottom: 10px;
		right: 10px;
	}

    #cart p {
        position: absolute;
        top: -17px;
        left: 0;
        font-size: 12px;
    }

	#cart-link {
		justify-content: flex-start;
	}

	#cart-link svg {
		padding-left: 5px;
	}

    .home {
        color: white;
    }

	@media screen and (width >=600px) {
		#change-language {
			top: 20px;
			left: 20px;
		}

		#shop {
			top: 20px;
			right: 20px;
		}

		#profile {
			top: 60px;
			right: 20px;
		}

		#home {
			top: 100px;
			right: 20px;
		}

		#cart {
			bottom: 20px;
			right: 20px;
		}
	}

	@media screen and (width >= 1000px) {
		#change-language {
			top: 40px;
			left: 40px;
		}

		#shop {
			top: 40px;
			right: 40px;
		}

		#profile {
			top: 90px;
			right: 40px;
		}

		#home {
			top: 140px;
			right: 40px;
		}

		#cart {
			bottom: 40px;
			right: 40px;
		}
	}
</style>
