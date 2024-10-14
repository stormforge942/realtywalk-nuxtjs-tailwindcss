export const usePropertyMap = () =>
    useState<google.maps.Map>('property_map', undefined)

export const initPropertyMap = async (map_html: HTMLElement): Promise<void> => {
    const homeStore = useHomeStore();
    const map = new google.maps.Map(map_html as HTMLElement, {
        center: new google.maps.LatLng(homeStore.map.center.lat, homeStore.map.center.lng),
        zoom: homeStore.map.zoom,
        maxZoom: 18,
        minZoom: 8,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
        panControl: true,
        mapId: '2'
    });
    console.log(map)
    usePropertyMap().value = map;
}