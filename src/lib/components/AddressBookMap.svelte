<script>
    import { onMount } from 'svelte';
    import { PUBLIC_GOOGLE_MAPS_KEY } from '$env/static/public';
    import * as googlemaps from "@googlemaps/js-api-loader";

    const {setValue} = $props();

    const { Loader } = googlemaps;

    let map;
    let marker
    let mapElement;
    let addressSearchHolder;
    let infoWindow;

    let street_number = $state("");
    let route = $state("");
    let enable = $state(false);
    let formalAddress = $state("");
    let addressComponents = $state("");

    onMount(async function () {
        const loader = new Loader({
            apiKey: PUBLIC_GOOGLE_MAPS_KEY,
            version: 'weekly'
        });

        const center = { lat: 21.4237, lng: 39.8254 };

        const Maps = await loader.importLibrary("maps");
        const { AdvancedMarkerElement } = await loader.importLibrary("marker");
        const places = await loader.importLibrary('places');

        const {Map} = Maps;

        map = new Map(mapElement, {
            center,
            zoom: 13,
            mapId: '4504f8b37365c3d0',
            mapTypeControl: false,
        });

        const placeAutocomplete = new places.PlaceAutocompleteElement();
        placeAutocomplete.id = 'place-autocomplete-input';
        addressSearchHolder.appendChild(placeAutocomplete);

        map.controls[2].push(addressSearchHolder);
        marker = new AdvancedMarkerElement({
            map
        });
        infoWindow = new Maps.InfoWindow({});

        placeAutocomplete.addEventListener('gmp-select', async ({ placePrediction }) => {
            const place = placePrediction.toPlace();
            enable = true;
            await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location', "addressComponents"] });
            // If the place has a geometry, then present it on a map.
            if (place.viewport) {
                map.fitBounds(place.viewport);
            }
            else {
                map.setCenter(place.location);
                map.setZoom(17);
            }

            // 
            // update Info
            // let content = '<div id="infowindow-content">' +
            //     '<span id="place-displayname" class="title">' + place.displayName + '</span><br />' +
            //     '<span id="place-address">' + place.formattedAddress + '</span>' +
            //     '</div>';
            // infoWindow.setContent(content);
            // infoWindow.setPosition(center);
            // infoWindow.open({
            //     map,
            //     anchor: marker,
            //     shouldFocus: false,
            // });
            //


            marker.position = place.location;

            formalAddress = place.formattedAddress;

            addressComponents = place.addressComponents;

            addressComponents.forEach(addressComponent => {
                addressComponent.Eg.forEach(type => {
                    if (type == "administrative_area_level_1") {
                        setValue(type, addressComponent.Gg);
                    }
                    else if (type == "street_number"){
                        street_number = addressComponent.Fg;
                    }
                    else if (type == "route") {
                        route = addressComponent.Fg;
                    }
                    else if (type == "country") {
                        setValue(type, addressComponent.Gg);
                    }
                    else {
                        setValue(type, addressComponent.Fg);
                    }
                })
            });

            if (street_number || route) {
                setValue("a1", `${street_number} ${route}`);
            }
        });
    });
</script>

<section>
    <div 
        bind:this={mapElement} 
        id="map"
    ></div>

    <div bind:this={addressSearchHolder} id="addressSearchHolder"></div>
</section>

<style>
    #map {
        height: 200px;
        width: 100%;
    }

    #addressSearchHolder {
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        margin: 10px;
        padding: 5px;
    }

</style>


