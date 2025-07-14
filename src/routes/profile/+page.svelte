<script>
    import { modal } from "$lib/shared_state/shared.svelte";

    let { data } = $props();

    if (data.verified) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == data.wait) {
                inMessages = true;
            }
        }

        if (!inMessages && data.verified) 
        {
            modal.messages.push({
                heading: "SUCCESS",
                paragraph: "verification complete"
            });
            data.verified = false;
        }
    }
</script>

<section id="menu">
    {#if data.admin} 
        <a href="/admin/settings">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 12H42M16 24H42M16 36H42M6 12H6.02M6 24H6.02M6 36H6.02" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Admin Panel
        </a>
    {/if}
    <a href="/profile/orders">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 12H42M16 24H42M16 36H42M6 12H6.02M6 24H6.02M6 36H6.02" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Order History
    </a>
    <a href="/profile/edit">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 7.99996H8C6.93913 7.99996 5.92172 8.42139 5.17157 9.17154C4.42143 9.92168 4 10.9391 4 12V40C4 41.0608 4.42143 42.0782 5.17157 42.8284C5.92172 43.5785 6.93913 44 8 44H36C37.0609 44 38.0783 43.5785 38.8284 42.8284C39.5786 42.0782 40 41.0608 40 40V26M37 4.99996C37.7956 4.20432 38.8748 3.75732 40 3.75732C41.1252 3.75732 42.2044 4.20432 43 4.99996C43.7956 5.79561 44.2426 6.87475 44.2426 7.99996C44.2426 9.12518 43.7956 10.2043 43 11L24 30L16 32L18 24L37 4.99996Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Edit Profile
    </a>
    <a href="/profile/cards">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 20H46M6 8H42C44.2091 8 46 9.79086 46 12V36C46 38.2091 44.2091 40 42 40H6C3.79086 40 2 38.2091 2 36V12C2 9.79086 3.79086 8 6 8Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Payment Methods
    </a>
    <a href="/profile/addresses">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 14C24 11.8783 23.1571 9.84344 21.6569 8.34315C20.1566 6.84285 18.1217 6 16 6H4V36H18C19.5913 36 21.1174 36.6321 22.2426 37.7574C23.3679 38.8826 24 40.4087 24 42M24 14V42M24 14C24 11.8783 24.8429 9.84344 26.3431 8.34315C27.8434 6.84285 29.8783 6 32 6H44V36H30C28.4087 36 26.8826 36.6321 25.7574 37.7574C24.6321 38.8826 24 40.4087 24 42" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>            
        Address Book
    </a>
</section>

<section id="profile-details">
    {#if data.user}
        <dl>
            <dt>
                Email
            </dt>
            <dd>
                {#if data.user.email}
                    {data.user.email}
                    {#if !data.user.verified_email}
                        <a href="/verify?email=true">verify</a>
                    {/if}
                {/if}
            </dd>
            <dt>Name</dt>
            <dd>{data.user.name}</dd>
            <dt>
                Phone
            </dt>
            <dd>
                {#if data.user.phone}
                    {data.user.phone}
                    {#if !data.user.verified_phone}
                        <a href="/verify?phone=true">verify</a>
                    {/if}
                {:else}
                    <a href="/profile/edit/phone" class="alt-link">update</a>
                {/if}
            </dd>
            <dt>Date of Birth</dt>
            <dd>
                {#if data.user.date_of_birth}
                    {data.user.date_of_birth}
                {:else}
                    <a href="/profile/edit" class="alt-link">update</a>
                {/if}
            </dd>
            
        </dl>
    {/if}
</section>
<a href="/profile/logout">Logout</a>

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

    #profile-details {
        margin: 50px 0;
    }

    #profile-details dt {
        padding: 5px 40px;
        margin-bottom: 13px;
        border-bottom: 1px solid #D9D9D9;
        font-weight: bold;
    }

    #profile-details dd {
        margin-bottom: 40px;
    }

    dd {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .alt-link {
        padding: 0;
    }

    dd a {
        text-align: center;
        padding: 5px 30px;
    }

    a[href="/admin/settings"] {
        grid-column: 1 / span 2;
    }

</style>