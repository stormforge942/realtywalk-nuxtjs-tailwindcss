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