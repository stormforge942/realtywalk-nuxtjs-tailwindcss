interface HomeStore {
    isMapView: boolean,
    level: 1 | 2 | 3,
    showUnselected: boolean,

    showFloodZones: boolean,
    showBikeTrails: boolean,
    showSchoolZones: boolean,

    showElementarySchool: boolean,
    showHighSchool: boolean,
    showMiddleSchool: boolean,

    show100Year: boolean,
    show100YearBFE: boolean,
    show100YearShallow: boolean,
    show100YearSheetFlow: boolean,
    show100YearStormWaves: boolean,
    show500Year: boolean,

    showResult: boolean,

    minPrice: number,
    maxPrice: number,
    listingStatus: LISTING_STATUS_VALUE,
    propertyType: PROPERTY_TYPE_VALUE[],
    bedroomCount: number,
    halfBathRoomCount: number,
    fullBathRoomCount: number,
    minSquareFeetCount: number,
    maxSquareFeetCount: number,
    garageCapacity: number,
    minStory: number,
    maxStory: number,
    hasPool: boolean,
    hasElevator: boolean
}

export const useHomeStore = defineStore('home', {
    state: (): HomeStore => ({
        isMapView: true,
        level: 1,
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
        show500Year: true,

        showResult: false,

        minPrice: MIN_VALUE,
        maxPrice: MAX_VALUE,
        listingStatus: 'any',
        propertyType: ['any'],
        bedroomCount: MIN_VALUE,
        halfBathRoomCount: MIN_VALUE,
        fullBathRoomCount: MIN_VALUE,
        minSquareFeetCount: MIN_VALUE,
        maxSquareFeetCount: MAX_VALUE,
        garageCapacity: MIN_VALUE,
        minStory: MIN_VALUE,
        maxStory: MAX_VALUE,
        hasPool: false,
        hasElevator: false
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