<script>
    let { data, selectImage, display } = $props();

    let images = [];

    let modalCurrentImage = $state(selectImage);
    let showImage = $derived.by(() => {
        if (data.images[modalCurrentImage]){
            return data.images[modalCurrentImage].image_id;
        }
        else if (data.images[0]) {
            return data.images[0].image_id;
        }
        else {
            return -1;
        }
    });

    let touchStartX = $state(0);
    let touchEndX = $state(0);

    for (let i = 0; i < data.images.length; i++) {
        images.push(data.images[i].image_id);
    }

    function nextImage() {
        modalCurrentImage = (modalCurrentImage + 1) % images.length;
    }

    function prevImage() {
        modalCurrentImage = (modalCurrentImage - 1);
        if (modalCurrentImage == -1) {
            modalCurrentImage = images.length - 1;
        }
    }

    $effect(() => {
        if (!display) {
            modalCurrentImage = selectImage;
        }
    })

    function removeFromImages(image) {
        let index = data.images.indexOf(image);
        if (index > -1) { 
            data.images.splice(index, 1);
        }

        return "";
    }
</script>

<div 
    id="image-carousel"
    ontouchstart={(e) => {
        touchStartX = e.changedTouches[0].screenX;
    }}
    ontouchend={(e) => {
        touchEndX = event.changedTouches[0].screenX;
        if (touchEndX < touchStartX) {
            console.log('Swiped Left');
            nextImage();
        }
        if(touchEndX > touchStartX) {
            console.log('Swiped Right');
            prevImage();
        }
    }}
>
    <button 
        aria-label="previous image"
        onclick={prevImage}
        class:oneImage={data.images.length <= 1}
    >
        <svg width="20" height="30" viewBox="0 0 34 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.17157 27.1716C-0.390524 28.7337 -0.390524 31.2663 1.17157 32.8284L26.6274 58.2843C28.1895 59.8464 30.7222 59.8464 32.2843 58.2843C33.8464 56.7222 33.8464 54.1895 32.2843 52.6274L9.65685 30L32.2843 7.37258C33.8464 5.81049 33.8464 3.27783 32.2843 1.71573C30.7222 0.153632 28.1895 0.153632 26.6274 1.71573L1.17157 27.1716ZM7 26H4L4 34H7L7 26Z" fill="#1E1E1E"/>
        </svg>
    </button>
    {#each data.images as image}
            <div 
                class="carousel-holder"
                class:showImage={image.image_id == showImage}
            >
                <img 
                    src={`${image.image_link}`} 
                    alt={image.alt_desc} 
                />
            </div>
    {/each}
    <button 
        aria-label="next image"
        onclick={nextImage}
        class:oneImage={data.images.length <= 1}
    >
        <svg width="20" height="30" viewBox="0 0 34 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.8284 32.8284C34.3905 31.2663 34.3905 28.7337 32.8284 27.1716L7.37258 1.71573C5.81049 0.153631 3.27783 0.153631 1.71573 1.71573C0.153631 3.27783 0.153631 5.81049 1.71573 7.37258L24.3431 30L1.71573 52.6274C0.153631 54.1895 0.153631 56.7222 1.71573 58.2843C3.27783 59.8464 5.81049 59.8464 7.37258 58.2843L32.8284 32.8284ZM26 34H30V26H26V34Z" fill="#1E1E1E"/>
        </svg>
    </button>
</div>

<style>
    #image-carousel {
        display: flex;
		justify-content: center;
        position: relative;
        height: 400px;
        flex-direction: row;
        width: 90vw;
    }

    .carousel-holder {
        display: none;
        justify-content: center;
        width: 100%;
    }

    .carousel-holder img {
        width: 100%;
        object-fit: contain;
        max-height: 100%;
    }

    .showImage {
        display: flex;
    }

    #image-carousel button {
        background-color: transparent;
        border: none;
        bottom: 0;
        position: absolute;
    }

    #image-carousel button svg path {
        fill: white;
    }

    .oneImage svg path{
        fill: #D9D9D9;
    }

    button[aria-label="previous image"] {
        left: 0;
    }

    button[aria-label="next image"] {
        right: 0;
    }

    @media screen and (width > 700px){
        button[aria-label="previous image"] {
            left: 25%;
        }

        button[aria-label="next image"] {
            right: 25%;
        }
    }
</style>