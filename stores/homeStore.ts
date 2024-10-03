export const useHomeStore = defineStore('home', {
    state: () => ({
        isMapView: true,
        level: 1 | 2 | 3,
        showUnselected: false,
    }),

    actions: {
        setMapViewMode(val: boolean) {
            this.isMapView = val;
        },
        setLevel(level: 1 | 2 | 3) {
            this.level = level
        }
    }
})