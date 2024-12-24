<script>
	import WhiteShirt from '$lib/images/white-shirt.png';

    let { product } = $props();
</script>

<div>
    <img src={WhiteShirt} alt="White Shirt" />
</div>

<style>
    div {
        height: 115px;
        width: 115px;
        background-color: #D9D9D9;
        margin: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    img {
        max-width: 60px;
    }
</style>