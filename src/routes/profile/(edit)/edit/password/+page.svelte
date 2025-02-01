<script>
    import { modal } from '$lib/shared_state/shared.svelte';

    let { form } = $props();

    let oldPassword = $state("");
    let password = $state("");
    let confirmPassword = $state("");
    let showMessage = $state(false);

    let has8 = $derived(password.length >= 8);
    let hasUpperLetter = $derived(/[A-Z]/g.test(password));
    let hasLowerLetter = $derived(/[a-z]/g.test(password));
    let hasNumber = $derived(/[\d]/g.test(password));

    let passwordValid = $derived(has8 && hasUpperLetter && hasNumber && hasLowerLetter);
    let enableSubmit = $derived(oldPassword && password && confirmPassword && passwordValid && (password == confirmPassword));

    if (form) {
        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == form.message) {
                inMessages = true;
            }
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
            <label for="old-password">old password:</label>
            <input 
                type="password" 
                name="old-password" 
                id="old-password"
                bind:value={oldPassword}
            />
        </p>
        <p>
            <label for="password">password:</label>
            <input 
                type="password" 
                name="password" 
                id="password"
                title="Must contain at least one number and one letter, and at least 8 characters"
                bind:value={password}
                oninput={() => {
                    showMessage = true;
                    if (has8 && hasUpperLetter && hasNumber && hasLowerLetter) {
                        showMessage = false;
                    }
                }}
            />
        </p>
        <div id="message" class:showMessage={showMessage}>
            <h3>Password must contain the following:</h3>
            <p
                class:invalid={!hasUpperLetter}
                class:valid={hasUpperLetter}
            >
                uppercase letter
            </p>

            <p
                class:invalid={!hasLowerLetter}
                class:valid={hasLowerLetter}
            >
                lowercase letter
            </p>
            <p
                class:invalid={!hasNumber}
                class:valid={hasNumber}
            >
                number
            </p>
            <p 
                class:invalid={!has8}
                class:valid={has8}
            >
                eight characters
            </p>
        </div>
        <p>
            <label for="confirm-password">confirm password:</label>
            <input 
                type="password" 
                name="confirm-password" 
                id="confirm-password"
                bind:value={confirmPassword}
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

    .valid {
        color: rgb(29, 76, 22);
    }

    .invalid {
        color: #bf1e2e;
    }

    #message {
        display:none;
        background: #f1f1f1;
        position: relative;
        padding: 20px;
        margin-top: 10px;
    }

    #message h3 {
        font-weight: normal;
        font-size: 14px;
    }

    #message.showMessage {
        display: block;
    }
</style>