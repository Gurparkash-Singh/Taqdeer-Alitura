<script>
	import { page } from '$app/state';
    import Logo from '$lib/images/Logo.png?enhanced';

    let {children} = $props();
</script>

<main>
    <div id="image-holder">
        <a href="/" aria-label="Link to Home">
            <enhanced:img src={Logo} alt="Taqdeer Alitura Logo" id="Logo" />
        </a>
    </div>

    <section id="navigation-icons">
        <ul>
            <li>
                <a href="/cart" aria-label="cart page">
                    <svg 
                        width="30" 
                        height="30" 
                        viewBox="0 0 48 48" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M2 2H10L15.36 28.78C15.5429 29.7008 16.0438 30.5279 16.7751 31.1166C17.5064 31.7053 18.4214 32.018 19.36 32H38.8C39.7386 32.018 40.6536 31.7053 41.3849 31.1166C42.1162 30.5279 42.6171 29.7008 42.8 28.78L46 12H12M20 42C20 43.1046 19.1046 44 18 44C16.8954 44 16 43.1046 16 42C16 40.8954 16.8954 40 18 40C19.1046 40 20 40.8954 20 42ZM42 42C42 43.1046 41.1046 44 40 44C38.8954 44 38 43.1046 38 42C38 40.8954 38.8954 40 40 40C41.1046 40 42 40.8954 42 42Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
                        class:selected-icon={page.url.pathname === "/cart"}
                        />
                    </svg>
                </a>
            </li>
            <li>
                <svg 
                    width="50" 
                    height="1" 
                    viewBox="0 0 98 1" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    class="nav-stroke"
                >
                    <line y1="0.5" x2="98" y2="0.5" stroke="#D9D9D9"/>
                </svg>
            </li>
            <li>
                <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 16C13.8 16 11.9167 15.2167 10.35 13.65C8.78333 12.0833 8 10.2 8 8C8 5.8 8.78333 3.91667 10.35 2.35C11.9167 0.783333 13.8 0 16 0C18.2 0 20.0833 0.783333 21.65 2.35C23.2167 3.91667 24 5.8 24 8C24 10.2 23.2167 12.0833 21.65 13.65C20.0833 15.2167 18.2 16 16 16ZM0 32V26.4C0 25.2667 0.291667 24.225 0.875 23.275C1.45833 22.325 2.23333 21.6 3.2 21.1C5.26667 20.0667 7.36667 19.2917 9.5 18.775C11.6333 18.2583 13.8 18 16 18C18.2 18 20.3667 18.2583 22.5 18.775C24.6333 19.2917 26.7333 20.0667 28.8 21.1C29.7667 21.6 30.5417 22.325 31.125 23.275C31.7083 24.225 32 25.2667 32 26.4V32H0ZM4 28H28V26.4C28 26.0333 27.9083 25.7 27.725 25.4C27.5417 25.1 27.3 24.8667 27 24.7C25.2 23.8 23.3833 23.125 21.55 22.675C19.7167 22.225 17.8667 22 16 22C14.1333 22 12.2833 22.225 10.45 22.675C8.61667 23.125 6.8 23.8 5 24.7C4.7 24.8667 4.45833 25.1 4.275 25.4C4.09167 25.7 4 26.0333 4 26.4V28ZM16 12C17.1 12 18.0417 11.6083 18.825 10.825C19.6083 10.0417 20 9.1 20 8C20 6.9 19.6083 5.95833 18.825 5.175C18.0417 4.39167 17.1 4 16 4C14.9 4 13.9583 4.39167 13.175 5.175C12.3917 5.95833 12 6.9 12 8C12 9.1 12.3917 10.0417 13.175 10.825C13.9583 11.6083 14.9 12 16 12Z"
                        fill={page.url.pathname === "/cart/info" ? "#900B09" : "#1E1E1E"}
                    />
                </svg>
            </li>
            <li>
                <svg 
                    width="50" 
                    height="1" 
                    viewBox="0 0 98 1" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    class="nav-stroke"
                >
                    <line y1="0.5" x2="98" y2="0.5" stroke="#D9D9D9"/>
                </svg>
            </li>
            <li>
                <svg
                    width="30" 
                    height="30" 
                    viewBox="0 0 48 48" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M42 20C42 34 24 46 24 46C24 46 6 34 6 20C6 15.2261 7.89642 10.6477 11.2721 7.27208C14.6477 3.89642 19.2261 2 24 2C28.7739 2 33.3523 3.89642 36.7279 7.27208C40.1036 10.6477 42 15.2261 42 20Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
                    class:selected-icon={page.url.pathname === "/cart/delivery"}
                    />
                    <path d="M24 26C27.3137 26 30 23.3137 30 20C30 16.6863 27.3137 14 24 14C20.6863 14 18 16.6863 18 20C18 23.3137 20.6863 26 24 26Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
                    class:selected-icon={page.url.pathname === "/cart/delivery"}
                    />
                </svg>
            </li>
        </ul>
    </section>

    {@render children()}
</main>

<style>
    main {
		max-width: 700px;
		margin: auto;
        width: 80%;
	}

    #image-holder {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: -28px;
	}

	#Logo {
		width: 170px;
		height: 170px;
	}

    #navigation-icons ul {
        list-style-type: none;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        padding: 0;
    }

    .nav-stroke {
        margin: 10px;
    }

    #navigation-icons .selected-icon {
        stroke: #900B09;
    }
</style>