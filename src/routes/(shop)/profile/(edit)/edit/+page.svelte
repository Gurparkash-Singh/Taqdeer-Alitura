<script>
    import { modal } from '$lib/shared_state/shared.svelte';

    let { data, form } = $props();

    let name = $state(data.user.name);
    let email = $state(data.user.email);
    let oldpassword = $state("");
    let password = $state("");
    let confirmPassword = $state("");

    let date_of_birth = $state(data.user.date_of_birth);

    let enableSubmit = $derived.by(() => {
        if(name && email) {
            if (name != data.user.name || email != data.user.email) {
                return true;
            }
            else if (date_of_birth && date_of_birth != data.user.date_of_birth) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (date_of_birth && date_of_birth != data.user.date_of_birth) {
                return true;
            }
        }
    });

    if (form) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == form.message) {
                inMessages = true;
            }
        }

        if (form.invalid) {
            email = form.email;
            name = form.name;
            date_of_birth = form.date_of_birth;
        }else {
            date_of_birth = data.user.date_of_birth;
        }

        if (!inMessages && form.invalid) 
        {
            modal.messages.push({
                heading: "ERROR",
                paragraph: form.message
            });
        }else if (!inMessages && form.success) {
            modal.messages.push({
                heading: "SUCCESS",
                paragraph: form.message
            });
        }
    }
</script>

<section>
    <form action="?/submit" method="POST">
        <p>
            <label for="name">full name:</label>
            <input 
                type="text" 
                name="name" 
                id="name"
                bind:value={name}
            />
        </p>
        <p>
            <label for="email">email:</label>
            <input 
                type="text" 
                name="email" 
                id="email"
                bind:value={email}
            />
        </p>
        <p>
            <label for="date_of_birth">date of birth:</label>
            <input 
                type="date"
                name="date_of_birth"
                id="date_of_birth"
                bind:value={date_of_birth}
            />
        </p>
        <button 
            type="submit"
            class:disable-submit={!enableSubmit}
            disabled={!enableSubmit}
        >
            Continue
            <svg width="10" height="10" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.0607 13.0607C13.6464 12.4749 13.6464 11.5251 13.0607 10.9393L3.51472 1.3934C2.92893 0.807611 1.97919 0.807611 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L9.87868 12L1.3934 20.4853C0.807611 21.0711 0.807611 22.0208 1.3934 22.6066C1.97919 23.1924 2.92893 23.1924 3.51472 22.6066L13.0607 13.0607ZM10 13.5H12V10.5H10V13.5Z" fill="white"/>
            </svg>
        </button>
        <div>
            <a href="/profile/edit/password">change password</a>
            <a href="/profile/edit/phone">
                {#if data.user.phone}
                    update phone
                {:else}
                    add phone
                {/if}
            </a>
        </div>
    </form>
</section>

<style>
    section {
        max-width: 80%;
        margin: auto;
    }

    form p {
        display: flex;
        flex-direction: column;
    }

    form label {
        margin-bottom: 5px;
    }

    form p input {
        background-color: #D9D9D9;
        border: none;
        padding: 10px;
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

    .disable-submit {
        background-color: #D9D9D9;
        color: #1E1E1E80;
    }

    .disable-submit svg path {
        fill: #1E1E1E80;
    }

    div {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 20px 0;
    }
</style>