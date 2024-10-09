import mitt from 'mitt'
export const eventBus = mitt()

export const REPORT_MODAL = 'open report bug modal'
export const DEMO_MODAL = 'open demo modal'
export const ADDRESS_LOOKUP = 'home address look up'
export const SEARCH_PANEL = 'open search panel'
export const SHOW_POPUP_L3ALERT = 'show popup l3 alert'
export const CLEAR_ALL_FILTERS = 'clear all filters'
export const SEARCH_CRITERIA = 'search criteria'
export const SAVE_SEARCH = 'save search'
export const RESULTS_COUNT = 'results count'
export const APPLY_SAVED_SEARCH = 'apply saved search'
