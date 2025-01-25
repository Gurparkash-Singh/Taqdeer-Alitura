<script>
    import { modal } from "$lib/shared_state/shared.svelte";

    let { children }= $props();

    let thisModal;

    let display = $derived(modal.messages.length > 0);

    function closeModal() {
        modal.messages.shift();
    }
</script>

<svelte:window 
    onclick={(e) => {
        if (event.target == thisModal) {
            closeModal();
        }
    }}
/>

<div class:display bind:this={thisModal}>
   <section>
        <button
            id="close-button"
            aria-label="close modal"
            onclick={closeModal}
        >
            <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48 2L2 48M2 2L48 48" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        {#if modal.messages.length > 0}
            <h1>{modal.messages[0].heading}</h1>
            <p>{modal.messages[0].paragraph}</p>
        {/if}
   </section>
</div>

<style>
    div {
        top: 0;
        left: 0;
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 10;
        display: none;
        background-color: #1E1E1E22;
        color: white;
        align-items: center;
        justify-content: center;
    }

    .display {
        display: flex;
    }

    section {
        background-color: #CB2D2D;
        max-width: 500px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 30px;
        color: white;
        min-width: 250px;
    }

    #close-button {
        background-color: #CB2D2D;
        color: white;
        border: none;
        position: absolute;
        top: 20px;
        left: 20px;
    }
</style>