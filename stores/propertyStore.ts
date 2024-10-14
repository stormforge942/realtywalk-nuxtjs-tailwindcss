interface PropertyStore {
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
    properties: any[],
    isPreLoading: boolean,
    isLoading: boolean,
    lastPropertyPage: number,
    totalProperties: number,
    errorMsg: string,

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

        async fetchProperty(nextPage: boolean = false, infiniteState: any) {
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
        }
    }
})