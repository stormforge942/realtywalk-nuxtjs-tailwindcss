interface PropertyFilter {
    bathrooms: number | string
    bathroomsHalf: number | string
    bedroomsMin: number | string
    dontUpdateBuilderList: boolean
    garageOptions: string | number
    hasElevator: boolean
    hasPool: boolean
    listingStatus: string
    loadCount: number
    maximumPrice: number | null
    minimumPrice: number | null
    polygons: string[]
    propertyType: string
    selectedPropertyTypes: string[]
    sortBy: string
    sortOrder: string
    squareFeetMax: string | number
    squareFeetMin: string | number
    status: string
    storiesMax: string | number
    storiesMin: string | number
}

interface PropertyItem {
    bn: string
    bp: any
    dsc: string
    ecd: any
    fa: string,
    pf: number
    pfi: number
    pi: string
    pn: string
    pp: string
    pri: number
    pt: any
    pu: string
    s: string
    t: number
}

interface User {
    id: number | string
    name: string
    email: string
    email_verified_at: string
    activation_token: string | null
    picture: string | null
    picture_path: string | null
    last_login_at: string | null
    login_token: string | null
    login_token_created_at: string | null
    created_at: string
    updated_at: string
    builder_id: string | number | null
    role: string
    favorites: any[]
}

interface SearchItem {
    created_at: string
    id: number
    search_name: string
    search_string_criteria: string
    user_id: number
}

interface SearchCriteria {
    // Property Store
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

    // Home Store
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
}