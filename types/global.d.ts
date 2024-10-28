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

interface Polygon {
    area: string,
    code: string,
    color: any,
    description: string | null,
    display_as_background: any,
    extId: any,
    featured_image_url: string | null,
    id: number,
    link_list: string[],
    links: any,
    max_lat: string,
    max_lng: string,
    media: any[],
    min_lat: string,
    min_lng: string,
    page_url: string,
    parent_id: number,
    path_url: string,
    slug: string,
    title: string,
    updated_at: Date,
    zone_id: number,
    zoom: number,
    _lft: number,
    _rgt: number,
    seourl: {
        entity_id: number,
        entity_type: string,
        id: number,
        path: string,
        created_at: Date,
        updated_at: Date
    },
    ancestors: any[]
}

interface PropertyItem {
    acres: number
    address_number: number | string
    address_street: string
    address_street_dir_prefix: string
    address_street_dir_suffix: string
    address_street_suffix: string
    agent: string
    agent_id: string
    agent_website: any
    alt_path_url: string
    batch_id: string | null
    bathrooms_full: number
    bathrooms_half: number
    bedrooms: number
    broker: any
    broker_id: string | null
    builder: any
    builderPrimaryLogo: string | null
    builder_id: string | null
    builder_name: string
    category: {
        created_at: Date,
        id: number
        name: string
        updated_at: Date
    },
    category_id: number,
    created_at: Date,
    created_day: number,
    created_month: number,
    created_year: number,
    descr: string
    elevator_type: string
    finance_type: string
    full_address: string
    full_address_with_zip: string
    garage_capacity: number
    has_pool: boolean
    hoa_annual_fee: any,
    id: number,
    image_urls: any
    lat: number,
    levels: number,
    lng: number,
    lot_back_dimension: any,
    lot_front_dimension: any,
    lot_left_dimension: any,
    lot_right_dimension: any,
    lot_size: number,
    map_data: {
        fa: string,
        lat: number,
        lng: number,
        pf: number,
        pfi: number,
        pt: any,
        pu: any
    },
    matrix_modified_dt: Date,
    media: any[],
    mls_number: number,
    new_construction: boolean,
    not_for_sale: boolean,
    office_id: number | null,
    office_name: string | null,
    office_website: any,
    page_url: string,
    path_url: string | null,
    polygon: Polygon,
    polygon_id: number,
    price_format_id: number,
    price_from: number | null,
    price_to: number | null,
    property_type: string,
    request_status: string,
    school_zone_id: string | null,
    sqft: number,
    status: string,
    stories: number,
    title: string,
    type: number,
    unit_number: string,
    updated_at: Date,
    updated_day: number,
    updated_month: number,
    updated_year: number,
    video_embed: string,
    year_built: number,
    zipcode: string,
    neighborhood: string,
    neighborhood_slug: string
    neighborhood_path: string
    subdivision: string
    subdivision_slug: string
    subdivision_path: string
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

interface MapProperty {
    fa: string
    lat: number
    lng: number
    pf: number
    pfi: number
    pt: number
    pu: string
}

interface Statistics {
    created_at: Date,
    descr: string
    format: string
    id: number
    name: string
    value: any
}

interface Neighborhood {
    _rgt: number
    _lft: number
    zoom: number
    zone_id: number
    zone: {
        code: string
        id: number
        lat: number
        lng: number
        name: string
        parent_id: number
        type: string
        _lft: number
        _rgt: number
    }
    updated_at: Date
    title: string
    statistics: any[]
    statisticTypes: {
        created_at: Date,
        descr: string
        format: string
        id: number
        name: string
        updated_at: Date,
        statistics: Statistics[]
    }[]
    slug: string
    seourl: string
    path_url: string
    parent_id: number
    page_url: string
    min_lng: number
    min_lat: number
    max_lng: number
    max_lat: number
    media: any[]
    links: boolean
    link_list: {
        description: string
        image: string
        label: string
        status: string
        title: string
        url: boolean
    }[]
    id: number
    geometry: string
    featured_image_url: string
    extId: string
    display_as_background: number
    description: string
    descendants: NeighborhoodTreeItem[]
    color: string
    code: string
    area: string
    all_links: {
        description: string
        image: string
        label: string
        status: string
        title: string
        url: string
    }[]
    ancestors: any[]
}

interface School {
    address: string
    ap_ind: number
    before_and_after_school_prog_ind: number
    bilingual_education_ind: number
    bilingual_schools_assoc_ind: number
    catholic_school_type: string
    charter_ind: number
    created_at: null | Date
    district_name: string
    ee_ind: number
    elementary_school_ind: number
    enroll_am: number
    enroll_am_pct: number
    enroll_asian: number
    enroll_black: number
    enroll_female: number
    enroll_hisp: number
    enroll_male: number
    enroll_multiple_races: number
    enroll_pacific: number
    enroll_white: number
    enrollment: number
    enrollment_change_cnt: number
    extId: string
    gifted_and_talented_prog_ind: number
    grade_high: number
    grade_low: string
    high_school_ind: number
    id: number
    instructional_level: string
    kg_full_day_ind: number
    kg_half_day_ind: number
    kg_ind: number
    latitude: number
    longitude: number
    magnet_ind: number
    middle_school_ind: number
    name: string
    phone_number: string
    pk_ind: number
    polygon_id: number
    private_school_orientation: string
    school_district_id: string
    school_rating: string
    school_type: string
    school_url: string
    school_zone_id: string
    state_school_id: number
    student_teacher_ratio: number
    title_i_schoolwide_program_eligible_ind: string
    updated_at: null | Date
    virtual_school_ind: number
}

interface SchoolDistrict {
    charter_school_cnt: number
    district_name: string
    enrollment: number
    ext_id: string
    grade_high: number
    grade_low: string
    magnet_school_cnt: number
    per_pupil_exp_instr_pct: number
    pop_age_5_17_below_poverty_level_pct: number
    school_cnt: number
    school_district_rating: string
    school_url: string
    total_expenditure_amt: number
    total_per_pupil_expenditure_amt: number
    urban_centric_community_type: string
    urban_centric_locale_type: string
}

interface NeighborhoodTreeItem {
    children: NeighborhoodTreeItem[]
    featured_image_url: string | null
    id: number
    link_list: string[]
    media: any[]
    page_url: string
    parent_id: number
    path_url: string
    slug: string
    text: string
    _lft: number
    _rgt: number
    seourl: {
        created_at: Date
        updated_at: Date
        entity_id: number
        entity_type: string
        id: number
        path: string
    }
}

interface NeighborHoodItem {
    descendants: NeighborhoodTreeItem[]
    featured_image_url: string | null
    id: number
    link_list: any[]
    media: any[]
    page_url: string
    path_url: string
    properties_pagination: {
        total: number
        page: 1
    }
    properties: PropertyItem[]
    zoom: number
    title: string
    slug: string
    seourl: {
        created_at: Date
        updated_at: Date
        path: string
        id: number
        entity_id: number
        entity_type: string
    }
}