import { DEFAULT_MAP } from "~/composables/homeMap";
import { MarkerWithLabel } from '@googlemaps/markerwithlabel';

export interface HomeStore {
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

    showInstruction: boolean,
    saveSearch: boolean,


    map: {
        center: {
            lat: number,
            lng: number
        },
        zoom: number
    },
    bikeLayer: any,
    polygonLabel: MarkerWithLabel | null,

    floodPlaneIds: Set<string>,
    schoolZoneIds: Set<string>,
    popupDisplayed: boolean,
    polygonTrunks: [any[], any[], any[]],
    selectedPolygons: string[],
    selectedParents: string[],
    ancestorPolygons: string[],
    floodZoneLegends: {
        A: string,
        AE: string,
        AH: string,
        AO: string,
        VE: string,
        X: string
    },
    schoolZoneLegends: {
        elementary: string,
        middleschool: string,
        highschool: string
    },
    lastZoomUpdate: number,
    existingPolygonIds: string[],
    l3Confirmed: boolean,
    zoomOnPolyClick: boolean,
    isLoading: boolean,
    activeNeighborhood: string,

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

        showInstruction: false,
        saveSearch: false,


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
        floodZoneLegends: {
            A: '#8d5a99',
            AE: '#ff9e17',
            AH: '#85b66f',
            AO: '#e77148',
            VE: '#b7484b',
            X: '#987db7'
        },
        schoolZoneLegends: {
            elementary: '#8d5a99',
            highschool: '#ff9e17',
            middleschool: '#85b66f'
        },
        lastZoomUpdate: DEFAULT_MAP.zoom,
        existingPolygonIds: [],
        l3Confirmed: false,
        zoomOnPolyClick: true,
        isLoading: true,
        activeNeighborhood: '',

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

        async fetchFloodZoneLegends() {
            const data = await $fetch(`${this.API_ENDPOINT}/api/flood-zones/legends`)
            this.floodZoneLegends = data as any
        },
        async fetchSchoolZoneLegends() {
            const data = await $fetch(`${this.API_ENDPOINT}/api/school-zones/legends`)
            this.schoolZoneLegends = data as any
        }
    }
})