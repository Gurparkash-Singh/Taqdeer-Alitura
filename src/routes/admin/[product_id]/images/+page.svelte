<script>
	import { invalidateAll } from "$app/navigation";
    import AdminBackButton from "$lib/components/AdminBackButton.svelte";
    import { modal } from "$lib/shared_state/shared.svelte";

    let { data, form } = $props();

    let selected_images = $state([]);

    let enableSubmit = $derived(selected_images.length == 1);
    let enableDelete = $derived(selected_images.length > 0);

    function onSelectFiles() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.click();

        input.onchange = async () => {
            const files = input.files;
            if (!files || files.length === 0) return;

            for (let i = 0; i < files.length; i++) {
                uploadFile(files[i]);
            }
        };

        input.remove();
    }

    async function uploadFile(file) {
        const ext = file.name.split(".")[1];
        const res = await fetch(
            `/upload/${data.product.product_id}x${ext}`, 
            {
                method: 'POST',
                body: file
            }
        );

        let message;
        let invalid = false;
        if (res.ok){
            message = "Uploaded Successfully";
            invalidateAll();
        }
        else {
            message = 'Failed to upload file';
            invalid = true;
        }

        let inMessages = false;
        for (let i = 0; i < modal.messages.length; i++) {
            if (modal.messages[i].paragraph == message) {
                inMessages = true;
            }
        }

        if (!inMessages && invalid) 
        {
            modal.messages.push({
                heading: "ERROR",
                paragraph: message
            });
        }else if (!inMessages) {
            modal.messages.push({
                heading: "SUCCESS",
                paragraph: message
            });
        }
    }

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

<AdminBackButton 
    link={`./`} 
    name={`${data.product.name} Panel`}
/>

<section>
    {#each data.images as image}
        <button
            onclick={() => {
                const index = selected_images.indexOf(image.image_id);
                if (index == -1) {
                    selected_images.push(image.image_id);
                }
                else {
                    selected_images.splice(index, 1);
                }
            }}
            class:selected={selected_images.indexOf(image.image_id) != -1}
            class="product-links"

        >
            <img 
                src={`/products/${image.image_link}`} 
                alt={image.alt_desc} 
            />
        </button>
    {/each}

    <button 
        aria-label="Add Product"
        class="product-links"
        id="add-button"
        onclick={onSelectFiles}
    >
        <svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 455 455" xml:space="preserve">
            <polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 
        455,242.5 "/>
        </svg>
    </button>

</section>

<form 
    action="?/delete" 
    method="POST"
    id="update-form"
>
    <input type="hidden" name="images" bind:value={selected_images}>
    {#if selected_images.length > 1}
        <input type="hidden" name="multiple-selected" value="multiple">
    {/if}
    <button 
        type="submit"
        class:disable-submit={!enableSubmit}
        disabled={!enableSubmit}
        formaction="?/submit"
    >
        Set Main Image
        <svg width="10" height="10" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0607 13.0607C13.6464 12.4749 13.6464 11.5251 13.0607 10.9393L3.51472 1.3934C2.92893 0.807611 1.97919 0.807611 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L9.87868 12L1.3934 20.4853C0.807611 21.0711 0.807611 22.0208 1.3934 22.6066C1.97919 23.1924 2.92893 23.1924 3.51472 22.6066L13.0607 13.0607ZM10 13.5H12V10.5H10V13.5Z" fill="white"/>
        </svg>
    </button>

    <button 
        type="submit"
        class:disable-submit={!enableDelete}
        disabled={!enableDelete}
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
	}

    .product-links {
        height: 115px;
        width: 115px;
        padding: 0;
        margin: 10px;
        background-color: #D9D9D9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: none;
    }

    .selected {
        opacity: 0.6;
    }

    img {
        max-width: 90px;
        height: 90px;
        object-fit: contain;
    }

     #add-button svg {
        width: 30px;
        height: 30px;
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

    #update-form .disable-submit {
        background-color: #D9D9D9;
        color: #1E1E1E80;
    }

    #update-form .disable-submit svg path {
        fill: #1E1E1E80;
    }

    @media screen and (width < 530px) {
        .product-links {
            height: 90px;
            width: 90px;
            margin: calc((100vw - 320px) / 6) 0;
        }

        img {
            max-width: 65px;
            height: 65px;
        }
    }

    @media screen and (width < 375px) {
        .product-links {
            width: 90px;
            height: 90px;
            margin: calc((100vw - 290px) / 6) 0;
        }
    }
</style>