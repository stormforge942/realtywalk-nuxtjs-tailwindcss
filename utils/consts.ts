const { t } = useI18n();

type MIN = 0;
type MAX = 10000000000;

export const MIN_VALUE: MIN = 0;
export const MAX_VALUE: MAX = 10000000000;

export interface SelectOption<T> {
    label: string;
    value: T | MIN | MAX;
}

const PRICE_OPTION: SelectOption<number>[] = [
    { label: '$25000', value: 25000 },
    { label: '$50000', value: 50000 },
    { label: '$75000', value: 75000 },
    { label: '$10000', value: 10000 },
    { label: '$125000', value: 125000 },
    { label: '$150000', value: 150000 },
    { label: '$175000', value: 175000 },
    { label: '$200000', value: 200000 },
    { label: '$225000', value: 225000 },
    { label: '$250000', value: 250000 },
    { label: '$275000', value: 275000 },
    { label: '$300000', value: 300000 },
    { label: '$325000', value: 325000 },
    { label: '$350000', value: 350000 },
    { label: '$375000', value: 375000 },
    { label: '$400000', value: 400000 },
    { label: '$425000', value: 425000 },
    { label: '$450000', value: 450000 },
    { label: '$475000', value: 475000 },
    { label: '$500000', value: 500000 },
    { label: '$525000', value: 525000 },
    { label: '$550000', value: 550000 },
    { label: '$575000', value: 575000 },
    { label: '$600000', value: 600000 },
    { label: '$625000', value: 625000 },
    { label: '$650000', value: 650000 },
    { label: '$675000', value: 675000 },
    { label: '$700000', value: 700000 },
    { label: '$725000', value: 725000 },
    { label: '$750000', value: 750000 },
    { label: '$775000', value: 775000 },
    { label: '$800000', value: 800000 },
    { label: '$825000', value: 825000 },
    { label: '$850000', value: 850000 },
    { label: '$875000', value: 875000 },
    { label: '$900000', value: 900000 },
    { label: '$925000', value: 925000 },
    { label: '$950000', value: 950000 },
    { label: '$975000', value: 975000 },
    { label: '$1000000', value: 1000000 },
    { label: '$1250000', value: 1250000 },
    { label: '$1500000', value: 1500000 },
    { label: '$1750000', value: 1750000 },
    { label: '$2000000', value: 2000000 },
    { label: '$2250000', value: 2250000 },
    { label: '$2500000', value: 2500000 },
]

export const MIN_PRICE_OPTION: SelectOption<number>[] = [
    { label: t('home.filter.minimum_price'), value: MIN_VALUE },
    ...PRICE_OPTION
]

export const MAX_PRICE_OPTION: SelectOption<number>[] = [
    { label: t('home.filter.maximum_price'), value: MAX_VALUE },
    ...PRICE_OPTION,
]

export type LISTING_STATUS_VALUE = 'any' | 'active' | 'pending' | 'pending_continue' | 'option_pending' | 'completed' | 'tobe_completed' | 'under_construction'

export const LISTING_STATUS: SelectOption<LISTING_STATUS_VALUE>[] = [
    { label: t('home.filter.criteria.listing_status.options.any'), value: 'any' },
    { label: t('home.filter.criteria.listing_status.options.active'), value: 'active' },
    { label: t('home.filter.criteria.listing_status.options.pending'), value: 'pending' },
    { label: t('home.filter.criteria.listing_status.options.pending_continue'), value: 'pending_continue' },
    { label: t('home.filter.criteria.listing_status.options.option_pending'), value: 'option_pending' },
    { label: t('home.filter.criteria.listing_status.options.completed'), value: 'completed' },
    { label: t('home.filter.criteria.listing_status.options.tobe_completed'), value: 'tobe_completed' },
    { label: t('home.filter.criteria.listing_status.options.under_construction'), value: 'under_construction' },
]

export type PROPERTY_TYPE_VALUE = 'any' | 'single_family' | 'townhouse_condo' | 'multifamily' | 'country_homes' | 'mid_hi_rise_codo' | 'neue_wave' | 'rental' | 'lots';

export const PROPERTY_TYPE: SelectOption<PROPERTY_TYPE_VALUE>[] = [
    { label: t('home.filter.criteria.property_type.any'), value: 'any' },
    { label: t('home.filter.criteria.property_type.single_family'), value: 'single_family' },
    { label: t('home.filter.criteria.property_type.townhouse_condo'), value: 'townhouse_condo' },
    { label: t('home.filter.criteria.property_type.multifamily'), value: 'multifamily' },
    { label: t('home.filter.criteria.property_type.country_homes'), value: 'country_homes' },
    { label: t('home.filter.criteria.property_type.mid_hi_rise_codo'), value: 'mid_hi_rise_codo' },
    { label: t('home.filter.criteria.property_type.neue_wave'), value: 'neue_wave' },
    { label: t('home.filter.criteria.property_type.rental'), value: 'rental' },
    { label: t('home.filter.criteria.property_type.lots'), value: 'lots' },
]

export const BEDROOM: SelectOption<number>[] = [
    { label: t('home.filter.criteria.bedrooms.options.any_min'), value: MIN_VALUE },
    ...Array(9).fill(0).map((_, id) => (
        { label: t('home.filter.criteria.bedrooms.options.bed', { n: id + 1 }), value: id + 1 }))
]

export const FULL_BATHROOM: SelectOption<number>[] = [
    { label: t('home.filter.criteria.bathrooms.options.any_full'), value: MIN_VALUE },
    ...Array(5).fill(0).map((_, id) => (
        { label: t('home.filter.criteria.bathrooms.options.full_bathroom', { n: id + 1 }), value: id + 1 }))
]

export const HALF_BATHROOM: SelectOption<number>[] = [
    { label: t('home.filter.criteria.bathrooms.options.any_half'), value: 0 },
    ...Array(5).fill(0).map((_, id) => (
        { label: t('home.filter.criteria.bathrooms.options.half_bathroom', { n: id + 1 }), value: id + 1 }))
]

const SQUARE_FEET: SelectOption<number>[] = [
    { label: '500', value: 500 },
    { label: '700', value: 750 },
    { label: '1,000', value: 1000 },
    { label: '1,250', value: 1250 },
    { label: '1,500', value: 1500 },
    { label: '1,750', value: 1750 },
    { label: '2,000', value: 2000 },
    { label: '2,250', value: 2250 },
    { label: '2,500', value: 2500 },
    { label: '2,750', value: 2750 },
    { label: '3,000', value: 3000 },
    { label: '3,500', value: 3500 },
    { label: '4,000', value: 4000 },
    { label: '5,000', value: 5000 },
    { label: '7,500', value: 7500 },
]

export const MIN_SQUARE_FEET: SelectOption<number>[] = [
    { label: t('home.filter.criteria.square_feet.options.any_min'), value: MIN_VALUE },
    ...SQUARE_FEET
]

export const MAX_SQUARE_FEET: SelectOption<number>[] = [
    { label: t('home.filter.criteria.square_feet.options.any_max'), value: MAX_VALUE },
    ...SQUARE_FEET
]

export const GARAGE_CAPACITY: SelectOption<number>[] = [
    { label: t('home.filter.criteria.garage_capacity.options.any'), value: MIN_VALUE },
    { label: '1+', value: 1 },
    { label: '2+', value: 2 },
    { label: '3+', value: 3 },
    { label: '4+', value: 4 },
]

export const MIN_STORIES: SelectOption<number>[] = [
    { label: t('home.filter.criteria.stories.options.any_min'), value: MIN_VALUE },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
]

export const MAX_STORIES: SelectOption<number>[] = [
    { label: t('home.filter.criteria.stories.options.any_max'), value: MAX_VALUE },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
]






