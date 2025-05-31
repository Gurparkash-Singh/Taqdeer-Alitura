<script>
    import { modal } from "$lib/shared_state/shared.svelte";

    let {data, form} = $props();

    let selected_cards = $state([]);

    let enableSubmit = $derived(selected_cards.length > 0)

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
                heading: "Success",
                paragraph: form.message
            });
        }
    }
</script>

<section>
    {#each data.cards as card}
        <article>
            <button 
                onclick={() => {
                    const index = selected_cards.indexOf(card.card_id);
                    if (index == -1) {
                        selected_cards.push(card.card_id);
                    }
                    else {
                        selected_cards.splice(index, 1);
                    }
                }}
                class:selected={selected_cards.indexOf(card.card_id) != -1}
            >
                <p>{card.brand}</p>
                <p>&bull;&bull;&bull;&bull; {card.last_four_digits}</p>
            </button>
        </article>
    {/each}
    <article>
        <a 
            href="./cards/add" 
            aria-label="add card"
            id="add-button"
        >
            <svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 455 455" xml:space="preserve">
                <polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 
            455,242.5 "/>
            </svg>
        </a>
    </article>
</section>

<form 
    action="?/delete" 
    method="POST"
    id="update-form"
>
    <input type="hidden" name="cards" bind:value={selected_cards}>
    {#if selected_cards.length > 1}
        <input type="hidden" name="multiple-selected" value="multiple">
    {/if}

    <button 
        type="submit"
        class:disable-submit={!enableSubmit}
        disabled={!enableSubmit}
    >
        Delete
        <svg width="10" height="10" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0607 13.0607C13.6464 12.4749 13.6464 11.5251 13.0607 10.9393L3.51472 1.3934C2.92893 0.807611 1.97919 0.807611 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L9.87868 12L1.3934 20.4853C0.807611 21.0711 0.807611 22.0208 1.3934 22.6066C1.97919 23.1924 2.92893 23.1924 3.51472 22.6066L13.0607 13.0607ZM10 13.5H12V10.5H10V13.5Z" fill="white"/>
        </svg>
    </button>
</form>

<style>
    section {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
        justify-items: center;
        align-items: center;
        column-gap: 10px;
        row-gap: 10px;
	}

    article {
        background-color: #d9d9d9;
        text-align: center;
        width: 150px;
        height: 100px;
        justify-self: start;
    }

    article button, article a {
        background-color: transparent;
        border: none;
        cursor: pointer;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .selected {
        opacity: 0.6;
    }

    #update-form {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    #update-form button {
        margin: 20px 0;
        background-color: #bf1e2e;
        color: white;
        border: none;
        padding: 10px 10px;
        width: 150px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    #add-button svg {
        width: 25px;
        height: 25px;
    }

    #update-form .disable-submit {
        background-color: #D9D9D9;
        color: #1E1E1E80;
    }

    #update-form .disable-submit svg path {
        fill: #1E1E1E80;
    }

    @media screen and (width >= 600px) {
        section article:nth-child(3n - 1) {
            justify-self: center;
        }

        section article:nth-child(3n) {
            justify-self: end;
        }
    }

    @media screen and (width < 600px) {
        section {
            grid-template-columns: 1fr 1fr;
        }

        section article:nth-child(2n) {
            justify-self: end;
        }
    }

    @media screen and (width < 400px) {
        section {
            grid-template-columns: 1fr;
        }

        article {
            width: 100%;
        }
    }
</style>