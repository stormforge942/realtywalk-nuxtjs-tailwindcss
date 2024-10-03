export const useHomeStore = defineStore('home', {
    state: () => ({
        isMapView: true,
        level: 1 | 2 | 3,
        showUnselected: false,

        showFloodZones: false,
        showBikeTrails: false,
        showSchoolZones: false,

        showElementarySchool: true,
        showHighSchool: false,
        showMiddleSchool: false,

        show100Year: true,
        show100YearBFE: true,
        show100YearShallow: true,
        show100YearSheetFlow: true,
        show100YearStormWaves: true,
        show500Year: true
    }),

    actions: {
        setMapViewMode(val: boolean) {
            this.isMapView = val;
        },
        setLevel(level: 1 | 2 | 3) {
            this.level = level
        },
        toggleShowUnselected() {
            this.showUnselected = !this.showUnselected
        },
        toggleShowFloodZones() {
            this.showFloodZones = !this.showFloodZones;
            if (this.showFloodZones) {
                this.showSchoolZones = false;
                this.showBikeTrails = false;
            }
        },
        toggleShowBikeTrails() {
            this.showBikeTrails = !this.showBikeTrails;
            if (this.showBikeTrails) {
                this.showSchoolZones = false;
                this.showFloodZones = false;
            }
        },
        toggleShowSchoolZones() {
            this.showSchoolZones = !this.showSchoolZones;
            if (this.showSchoolZones) {
                this.showBikeTrails = false;
                this.showFloodZones = false;
            }
        }
    }
})