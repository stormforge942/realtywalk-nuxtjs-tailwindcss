import { DEFAULT_MAP } from "~/composables/googleMap";

interface HomeStore {
    API_ENDPOINT: string,

    isMapView: boolean,
    level: 0 | 1 | 2,
    showUnselected: boolean,

    showFloodZones: boolean,
    showBikeTrails: boolean,
    showSchoolZones: boolean,

    activeSchoolZone: 'elementary' | 'middleschool' | 'highschool',

    show100Year: boolean,
    show100YearBFE: boolean,
    show100YearShallow: boolean,
    show100YearSheetFlow: boolean,
    show100YearStormWaves: boolean,
    show500Year: boolean,

    showResult: boolean,
    showSearch: boolean,
    isListView: boolean,

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
    hasElevator: boolean,

    map: {
        center: {
            lat: number,
            lng: number
        },
        zoom: number
    },
    bikeLayer: any,
    polygonLabel: any,

    floodPlaneIds: Set<string>,
    schoolZoneIds: Set<string>,
    popupDisplayed: boolean,
    polygonTrunks: any[][],
    selectedPolygons: string[],
    selectedParents: string[],
    ancestorPolygons: string[],
    floodZoneLegends: Object,
    schoolZoneLegends: Object,
    lastZoomUpdate: number,
    existingPolygonIds: string[],
    l3Confirmed: boolean,
    zoomOnPolyClick: boolean,

    property: {
        displaying: "map",
        map: {
            center: {
                lat: number,
                lng: number,
            },
            zoom: number,
            selectedPolygons: string[],
        },
        list: {
            sortToggles: {
                price_from: boolean,
                address: boolean,
                neighborhood: boolean,
            },
        }
    }
}

export const useHomeStore = defineStore('home', {
    state: (): HomeStore => ({
        API_ENDPOINT: '',

        isMapView: true,
        level: 1,
        showUnselected: false,

        showFloodZones: false,
        showBikeTrails: false,
        showSchoolZones: false,

        activeSchoolZone: 'elementary',

        show100Year: true,
        show100YearBFE: true,
        show100YearShallow: true,
        show100YearSheetFlow: true,
        show100YearStormWaves: true,
        show500Year: true,

        showResult: false,
        showSearch: false,
        isListView: false,

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
        hasElevator: false,


        map: DEFAULT_MAP,
        bikeLayer: null,
        polygonLabel: null,

        floodPlaneIds: new Set(),
        schoolZoneIds: new Set(),
        popupDisplayed: false,
        polygonTrunks: [[], [], []],
        selectedPolygons: [],
        selectedParents: [],
        ancestorPolygons: [],
        floodZoneLegends: {},
        schoolZoneLegends: {},
        lastZoomUpdate: DEFAULT_MAP.zoom,
        existingPolygonIds: [],
        l3Confirmed: false,
        zoomOnPolyClick: true,

        property: {
            displaying: "map",
            map: {
                ...DEFAULT_MAP,
                selectedPolygons: [],
            },
            list: {
                sortToggles: {
                    price_from: false,
                    address: false,
                    neighborhood: false,
                },
            }
        }
    }),

    getters: {
        floodZones() {
            const zones = [];
            if (this.show100Year) zones.push('A')
            if (this.show100YearBFE) zones.push('AE')
            if (this.show100YearShallow) zones.push('AH')
            if (this.show100YearSheetFlow) zones.push('AO')
            if (this.show100YearStormWaves) zones.push('VE')
            if (this.show500Year) zones.push('X')
            return zones;
        }
    },

    actions: {
        setMapViewMode(val: boolean) {
            this.isMapView = val;
        },
        setLevel(level: 0 | 1 | 2) {
            this.level = level
            console.log(level)
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
        },


        async fetchFloodData(url = "", bounds = [], zoom = 10, exclude = [], init = false) {

        },


        async fetchFloodZoneLegends() {
            const data = await $fetch(`${this.API_ENDPOINT}/api/flood-zones/legends`)
            this.floodZoneLegends = data as Object
        },
        async fetchSchoolZoneLegends() {
            const data = await $fetch(`${this.API_ENDPOINT}/api/school-zones/legends`)
            this.schoolZoneLegends = data as Object
        }
    }
})