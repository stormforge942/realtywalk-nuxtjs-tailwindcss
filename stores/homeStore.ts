export const useHomeStore = defineStore('home', {
    state: () => ({
        isMapView: true
    }),
    actions: {
        setMapViewMode(val: boolean) {
            this.isMapView = val;
        }
    }
})