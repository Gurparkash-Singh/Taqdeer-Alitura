<script>

    let { 
        display, 
        closeDisplay,
        confirm,
        question
    } = $props();

    let thisModal;
</script>

<svelte:window 
    onclick={(e) => {
        if (event.target == thisModal) {
            closeDisplay();
        }
    }}
/>

<div class:display bind:this={thisModal}>
    <section>
        <button
            id="close-button"
            aria-label="close modal"
            onclick={closeDisplay}
        >
            <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48 2L2 48M2 2L48 48" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        
        <h3>{question}</h3>
        <form>
            <button onclick={() => {confirm()}}>Yes</button>
            <button onclick={() => {closeDisplay()}}>No</button>
        </form>
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
        background-color: #1E1E1E80;
        color: white;
        align-items: center;
        justify-content: center;
    }
 
    .display {
        display: flex;
    }

    section {
        background-color: #CB2D2D;
        width: min(300px, 80%);
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

    form {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button {
        background-color: #D9D9D9;
        border: none;
        padding: 10px;
        margin: 10px;
        cursor: pointer;
    }
 </style>