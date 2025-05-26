<script>
    import { page } from "$app/state";

    let { children } = $props();

    let order_regex = /\/profile\/orders\/[0-9]*/

    let order = page.url.pathname === "/profile/orders"
    || page.url.pathname.match(order_regex);
</script>

<section id="menu">
    {#if order}
        <a href="./">
            <svg 
                width="15" 
                height="15" 
                viewBox="0 0 17 30" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                class="back-arrow"
            >
                <path d="M0.585786 13.5858C-0.195262 14.3668 -0.195262 15.6332 0.585786 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768152 14.0948 0.0768152 13.3137 0.857864L0.585786 13.5858ZM5.5 13L2 13L2 17L5.5 17L5.5 13Z" fill="#1E1E1E"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 12H42M16 24H42M16 36H42M6 12H6.02M6 24H6.02M6 36H6.02" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Order History
        </a>
    {/if}
    {#if page.url.pathname === "/profile/edit"}
        <a href="/profile">
            <svg 
                width="15" 
                height="15" 
                viewBox="0 0 17 30" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                class="back-arrow"
            >
                <path d="M0.585786 13.5858C-0.195262 14.3668 -0.195262 15.6332 0.585786 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768152 14.0948 0.0768152 13.3137 0.857864L0.585786 13.5858ZM5.5 13L2 13L2 17L5.5 17L5.5 13Z" fill="#1E1E1E"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 7.99996H8C6.93913 7.99996 5.92172 8.42139 5.17157 9.17154C4.42143 9.92168 4 10.9391 4 12V40C4 41.0608 4.42143 42.0782 5.17157 42.8284C5.92172 43.5785 6.93913 44 8 44H36C37.0609 44 38.0783 43.5785 38.8284 42.8284C39.5786 42.0782 40 41.0608 40 40V26M37 4.99996C37.7956 4.20432 38.8748 3.75732 40 3.75732C41.1252 3.75732 42.2044 4.20432 43 4.99996C43.7956 5.79561 44.2426 6.87475 44.2426 7.99996C44.2426 9.12518 43.7956 10.2043 43 11L24 30L16 32L18 24L37 4.99996Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Edit Profile
        </a>
    {/if}

    {#if page.url.pathname === "/profile/edit/password"}
        <a href="/profile/edit">
            <svg 
                width="15" 
                height="15" 
                viewBox="0 0 17 30" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                class="back-arrow"
            >
                <path d="M0.585786 13.5858C-0.195262 14.3668 -0.195262 15.6332 0.585786 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768152 14.0948 0.0768152 13.3137 0.857864L0.585786 13.5858ZM5.5 13L2 13L2 17L5.5 17L5.5 13Z" fill="#1E1E1E"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 7.99996H8C6.93913 7.99996 5.92172 8.42139 5.17157 9.17154C4.42143 9.92168 4 10.9391 4 12V40C4 41.0608 4.42143 42.0782 5.17157 42.8284C5.92172 43.5785 6.93913 44 8 44H36C37.0609 44 38.0783 43.5785 38.8284 42.8284C39.5786 42.0782 40 41.0608 40 40V26M37 4.99996C37.7956 4.20432 38.8748 3.75732 40 3.75732C41.1252 3.75732 42.2044 4.20432 43 4.99996C43.7956 5.79561 44.2426 6.87475 44.2426 7.99996C44.2426 9.12518 43.7956 10.2043 43 11L24 30L16 32L18 24L37 4.99996Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Change Password
        </a>
    {/if}

    {#if page.url.pathname === "/profile/edit/phone"}
        <a href="/profile/edit">
            <svg 
                width="15" 
                height="15" 
                viewBox="0 0 17 30" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                class="back-arrow"
            >
                <path d="M0.585786 13.5858C-0.195262 14.3668 -0.195262 15.6332 0.585786 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768152 14.0948 0.0768152 13.3137 0.857864L0.585786 13.5858ZM5.5 13L2 13L2 17L5.5 17L5.5 13Z" fill="#1E1E1E"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 7.99996H8C6.93913 7.99996 5.92172 8.42139 5.17157 9.17154C4.42143 9.92168 4 10.9391 4 12V40C4 41.0608 4.42143 42.0782 5.17157 42.8284C5.92172 43.5785 6.93913 44 8 44H36C37.0609 44 38.0783 43.5785 38.8284 42.8284C39.5786 42.0782 40 41.0608 40 40V26M37 4.99996C37.7956 4.20432 38.8748 3.75732 40 3.75732C41.1252 3.75732 42.2044 4.20432 43 4.99996C43.7956 5.79561 44.2426 6.87475 44.2426 7.99996C44.2426 9.12518 43.7956 10.2043 43 11L24 30L16 32L18 24L37 4.99996Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Update Phone
        </a>
    {/if}

    {#if page.url.pathname === "/profile/cards"}
        <a href="/profile">
            <svg 
                width="15" 
                height="15" 
                viewBox="0 0 17 30" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                class="back-arrow"
            >
                <path d="M0.585786 13.5858C-0.195262 14.3668 -0.195262 15.6332 0.585786 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768152 14.0948 0.0768152 13.3137 0.857864L0.585786 13.5858ZM5.5 13L2 13L2 17L5.5 17L5.5 13Z" fill="#1E1E1E"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 20H46M6 8H42C44.2091 8 46 9.79086 46 12V36C46 38.2091 44.2091 40 42 40H6C3.79086 40 2 38.2091 2 36V12C2 9.79086 3.79086 8 6 8Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Payment Methods
        </a>
    {/if}

    {#if page.url.pathname === "/profile/addresses"}
        <a href="/profile">
            <svg 
                width="15" 
                height="15" 
                viewBox="0 0 17 30" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                class="back-arrow"
            >
                <path d="M0.585786 13.5858C-0.195262 14.3668 -0.195262 15.6332 0.585786 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768152 14.0948 0.0768152 13.3137 0.857864L0.585786 13.5858ZM5.5 13L2 13L2 17L5.5 17L5.5 13Z" fill="#1E1E1E"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 14C24 11.8783 23.1571 9.84344 21.6569 8.34315C20.1566 6.84285 18.1217 6 16 6H4V36H18C19.5913 36 21.1174 36.6321 22.2426 37.7574C23.3679 38.8826 24 40.4087 24 42M24 14V42M24 14C24 11.8783 24.8429 9.84344 26.3431 8.34315C27.8434 6.84285 29.8783 6 32 6H44V36H30C28.4087 36 26.8826 36.6321 25.7574 37.7574C24.6321 38.8826 24 40.4087 24 42" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>            
            Address Book
        </a>
    {/if}
</section>

{@render children()}

<style>
    #menu {
        margin: 40px 0;
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
        position: relative;
    }

    .back-arrow {
        position: absolute;
        left: 10px;
        top: calc(50% - 7.5px);
    }
</style>