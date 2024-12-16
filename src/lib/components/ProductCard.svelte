<script>
	import WhiteShirt from '$lib/images/white-shirt.png';
</script>

<div>
    <img src={WhiteShirt} alt="White Shirt" />
</div>

<style>
    div {
        width: 90px;
        height: 90px;
        background-color: #D9D9D9;
        margin: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    img {
        max-width: 50px;
    }
</style>