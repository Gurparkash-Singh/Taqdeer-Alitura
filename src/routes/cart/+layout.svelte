<script>
	import { page } from '$app/state';

    let {children} = $props();
</script>

<main>
    <div id="image-holder">
        <a href="/" aria-label="Link to Home">
            <img src="Logo.svg" alt="Taqdeer Alitura Logo" id="Logo" />
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
                <a href="/cart/delivery" aria-label="delivery page">
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
                <a href="/cart/review" aria-label="review page">
                    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 22L22 4C23.5913 4 25.1174 4.63214 26.2426 5.75736C27.3679 6.88258 28 8.4087 28 10V18H39.32C39.8998 17.9934 40.4741 18.113 41.0031 18.3504C41.5322 18.5879 42.0032 18.9375 42.3837 19.375C42.7642 19.8126 43.045 20.3276 43.2067 20.8845C43.3683 21.4414 43.407 22.0267 43.32 22.6L40.56 40.6C40.4154 41.5538 39.9309 42.4232 39.1958 43.048C38.4608 43.6728 37.5247 44.0109 36.56 44H14M14 22V44M14 22H8C6.93913 22 5.92172 22.4214 5.17157 23.1716C4.42143 23.9217 4 24.9391 4 26V40C4 41.0609 4.42143 42.0783 5.17157 42.8284C5.92172 43.5786 6.93913 44 8 44H14" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
                        class:selected-icon={page.url.pathname === "/cart/review"}
                        />
                    </svg>
                </a>
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