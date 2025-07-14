<script>
    import { onMount } from 'svelte';
    import { PUBLIC_GOOGLE_MAPS_KEY } from '$env/static/public';
    import * as googlemaps from "@googlemaps/js-api-loader";

    const {setValue, manualEntry} = $props();

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

            marker.position = place.location;

            formalAddress = place.formattedAddress;

            addressComponents = place.addressComponents;

            addressComponents.forEach(addressComponent => {
                addressComponent.Dg.forEach(type => {
                    if (type == "administrative_area_level_1") {
                        setValue(type, addressComponent.Fg);
                    }
                    else if (type == "street_number"){
                        street_number = addressComponent.Eg;
                    }
                    else if (type == "route") {
                        route = addressComponent.Eg;
                    }
                    else if (type == "country") {
                        setValue(type, addressComponent.Fg);
                    }
                    else {
                        setValue(type, addressComponent.Eg);
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

    <div id="delivery-controls">
        <button onclick={() => {
            manualEntry();
        }}>enter manually</button>
        <button 
            class:enable-submit={enable}
            class:disable-submit={!enable}
            onclick={() => {
                setValue("formalAddress", formalAddress);
                addressComponents.forEach(addressComponent => {
                    addressComponent.Dg.forEach(type => {
                        if (type == "administrative_area_level_1") {
                            setValue(type, addressComponent.Fg);
                        }
                        else if (type == "street_number"){
                            street_number = addressComponent.Eg;
                        }
                        else if (type == "route") {
                            route = addressComponent.Eg;
                        }
                        else if (type == "country") {
                            setValue(type, addressComponent.Fg);
                        }
                        else {
                            setValue(type, addressComponent.Eg);
                        }
                    })
                });

                if (street_number || route) {
                    setValue("a1", `${street_number} ${route}`);
                }
            }}
        >confirm location</button>
    </div>
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

    #delivery-controls {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 1fr;
        column-gap: 10px;
        margin: 10px 0;
    }

    #delivery-controls button {
        padding: 5px;
        border: none;
        background-color: #D9D9D9;
        cursor: pointer;
    }

    #delivery-controls button.disable-submit {
        background-color: #D9D9D9;
        color: #1E1E1E80;
    }

    #delivery-controls button.enable-submit {
        background-color: #bf1e2e;
        color: white;
    }

</style>


