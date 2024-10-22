export interface PropertyStore {
    API_ENDPOINT: string,

    minPrice: number,
    maxPrice: number,
    listingStatus: LISTING_STATUS_VALUE,
    propertyType: PROPERTY_TYPE_VALUE[],
    bedroomCount: number | string,
    halfBathRoomCount: number | string,
    fullBathRoomCount: number | string,
    minSquareFeetCount: number | string,
    maxSquareFeetCount: number | string,
    garageCapacity: number | string,
    minStory: number | string,
    maxStory: number | string,
    hasPool: boolean,
    hasElevator: boolean,

    // Filters
    sortBy: 'price' | 'address' | 'neighborhood' | '',
    sortOrder: 'asc' | 'desc' | '',
    loadCount: number,
    status: string,
    proType: string,
    polygons: string[],
    page: number

    // Properties
    properties: PropertyItem[],
    isPreLoading: boolean,
    isLoading: boolean,
    lastPropertyPage: number,
    totalProperties: number,
    errorMsg: string,

    selectedProperty: PropertyItem | null,

    // Map Properties

    mapProperties: {
        data: any[],
        loading: boolean,
        reloading: boolean,
        componentLoaded: boolean,
        mapInfo: any
    }
}

export const usePropertyStore = defineStore('property', {
    state: (): PropertyStore => ({
        API_ENDPOINT: '',

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

        // Filters
        sortBy: '',
        sortOrder: '',
        loadCount: 1,
        page: 1,
        polygons: [],
        proType: '',
        status: '',

        selectedProperty: null,

        // Properties
        properties: [],
        isPreLoading: false,
        isLoading: false,
        lastPropertyPage: 0,
        totalProperties: 0,
        errorMsg: '',
        // Map properties
        mapProperties: {
            data: [],
            loading: false,
            reloading: false,
            componentLoaded: false,
            mapInfo: undefined
        }
    }),
    actions: {
        convertStateToFilterPayload(): PropertyFilter {
            return {
                bathrooms: this.fullBathRoomCount !== MIN_VALUE ? this.fullBathRoomCount : 'any',
                bathroomsHalf: this.halfBathRoomCount !== MIN_VALUE ? this.halfBathRoomCount : 'any',
                bedroomsMin: this.bedroomCount !== MIN_VALUE ? this.bedroomCount : 'any',
                garageOptions: this.garageCapacity !== MIN_VALUE ? this.garageCapacity : 'any',
                hasElevator: this.hasElevator,
                hasPool: this.hasPool,
                listingStatus: this.listingStatus,
                maximumPrice: this.maxPrice !== MAX_VALUE ? this.maxPrice : null,
                minimumPrice: this.minPrice !== MIN_VALUE ? this.minPrice : null,
                squareFeetMin: this.minSquareFeetCount !== MIN_VALUE ? this.minSquareFeetCount : 'any',
                squareFeetMax: this.maxSquareFeetCount !== MAX_VALUE ? this.maxSquareFeetCount : 'any',
                storiesMin: this.minStory !== MIN_VALUE ? this.minStory : 'any',
                storiesMax: this.maxStory !== MAX_VALUE ? this.maxPrice : 'any',
                selectedPropertyTypes: this.propertyType,
                dontUpdateBuilderList: false,

                status: this.status,
                propertyType: this.proType,
                polygons: this.polygons,
                loadCount: this.loadCount,
                sortBy: this.sortBy,
                sortOrder: this.sortOrder,
            }
        },

        async fetchProperty(nextPage: boolean = false, infiniteState: any, aborter: AbortController) {
            console.log("FETCH PROPERTY")
            let page = nextPage ? this.page + 1 : 1;
            if (nextPage) {
                this.isPreLoading = true;
            } else {
                this.isLoading = true;
                this.properties = [];
            }

            try {
                const result = await $fetch(`${this.API_ENDPOINT}/api/properties/filter?page=${page}&sortBy=${this.sortBy}&orderBy=${this.sortOrder}`, {
                    method: 'POST',
                    body: this.convertStateToFilterPayload(),
                    signal: aborter.signal
                })


                const data = JSON.parse(result as string)

                if (data) {
                    if (nextPage) {
                        data.data.forEach((item: any) => this.properties.push(item));
                        this.page += 1;

                        if (this.page >= data.last_page) {
                            this.page = data.last_page;
                            infiniteState.complete();
                        } else {
                            infiniteState.loaded();
                        }
                    } else {
                        this.properties = data.data;
                    }

                    this.totalProperties = data.total;
                    this.lastPropertyPage = data.last_page;
                }

                console.log("DATA: ", data, data['data'])
            } catch (err) {
                this.errorMsg = getErrorMessage(err);
            } finally {
                this.isLoading = false;
                this.isPreLoading = false;
            }

            console.log("DATA: ")

            if (!nextPage) {
                this.page = 1;
            }
        },

        async fetchMapProperties(init = false) {
            // if (this.mapProperties.loading && init) return;
            // if (!this.mapProperties.componentLoaded) return;
            // if (this.mapProperties.reloading) return;
            this.mapProperties.data = [];
            const map = usePropertyMap().value;

            if (init) {
                this.mapProperties.loading = true;
            } else {
                this.mapProperties.reloading = true;
            }
            const bounds = map?.getBounds()

            if (!bounds) {
                return;
            }

            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();

            const minLat = sw.lat();
            const maxLat = ne.lat();
            const minLng = ne.lng();
            const maxLng = sw.lng();

            const map_info = {
                zoom: map.getZoom(),
                bounds: {
                    max_lat: maxLat,
                    max_lng: minLng,
                    min_lat: minLat,
                    min_lng: maxLng,
                },
                init
            }

            try {
                // console.time("Properties fetch time")
                const filters = { ...this.convertStateToFilterPayload(), map_info };
                const data = await $fetch<any>(`${this.API_ENDPOINT}/api/properties/filter?formap=1`, {
                    method: 'POST',
                    body: filters
                })
                if (data?.length) {
                    this.mapProperties.data = data;
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.mapProperties.loading = false;
                this.mapProperties.reloading = false;
            }
        },

        clearSearchCriteria() {
            this.minPrice = MIN_VALUE;
            this.maxPrice = MAX_VALUE;
            this.listingStatus = 'any';
            this.propertyType = ['any'];
            this.bedroomCount = MIN_VALUE;
            this.halfBathRoomCount = MIN_VALUE;
            this.fullBathRoomCount = MIN_VALUE;
            this.minSquareFeetCount = MIN_VALUE;
            this.maxSquareFeetCount = MAX_VALUE;
            this.garageCapacity = MIN_VALUE;
            this.minStory = MIN_VALUE;
            this.maxStory = MAX_VALUE;
            this.hasPool = false;
            this.hasElevator = false;
        },

        async fetchAddressLookUp(search: string) {
            this.isLoading = true
            $fetch<any>(`${this.API_ENDPOINT}/api/properties/address-lookup?page=${this.page}&sortBy=${this.sortBy}&orderBy=${this.sortOrder}`, {
                method: 'POST',
                body: {
                    addressQuery: search,
                    showAll: true,
                    sortBy: this.sortBy,
                    sortOrder: this.sortOrder
                }
            })
                .then((result) => this.properties = result?.data as PropertyItem[])
                .finally(() => this.isLoading = false)
        },
        async fetchPropertyItem(id: string) {
            this.isLoading = true
            $fetch<PropertyItem>(`${this.API_ENDPOINT}/api/property/${id}`)
                .then(data => this.selectedProperty = data)
                .finally(() => this.isLoading = false)
        }
    }
})