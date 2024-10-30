import { sortBy } from "lodash-es"

interface BuilderState {
    API_ENDPOINT: string,

    items: BuilderItem[]
    search: string
    curPage: number
    isLoading: boolean
    totalPage: number
    isInputing: boolean
    sortOrderActive: 'price_from' | 'address' | 'neighborhood' | ''
    sortByActive: '' | 'asc' | 'desc'
    sortOrderPast: 'price_from' | 'address' | 'neighborhood' | ''
    sortByPast: '' | 'asc' | 'desc'
    isActiveGrid: boolean
    isPastGrid: boolean
    curBuilder: {
        item: Builder | null
        activeListings: PropertyItem[]
        pastListings: PropertyItem[]
        communities: Community[]
        totalActivePage: number
        curActivePage: number
        totalPastPage: number
        curPastPage: number
        loadingActive: boolean
        loadingPast: boolean
    }
}

export const useBuilderStore = defineStore('builder', {
    state: (): BuilderState => ({
        API_ENDPOINT: '',
        items: [],
        curPage: 1,
        totalPage: 1,
        search: '',
        sortOrderActive: '',
        sortByActive: '',
        sortOrderPast: '',
        sortByPast: '',
        isLoading: false,
        isInputing: false,
        isActiveGrid: true,
        isPastGrid: true,
        curBuilder: {
            item: null,
            activeListings: [],
            communities: [],
            pastListings: [],
            curActivePage: 1,
            curPastPage: 1,
            totalActivePage: 1,
            totalPastPage: 1,
            loadingActive: false,
            loadingPast: false
        }
    }),

    actions: {
        async fetchBuilders() {
            this.isLoading = true
            let endpoint = 'api/builders/list'
            if (this.search === '#') {
                endpoint = 'api/builders/search/numeric'
            } else if (this.search.trim()) {
                if (this.isInputing) {
                    endpoint = `api/builders/searchText/${this.search}`
                } else {
                    endpoint = `api/builders/search/${this.search}`
                }
            }
            $fetch<{
                data: BuilderItem[],
                last_page: number
            }>(`${this.API_ENDPOINT}/${endpoint}?page=${this.curPage}`)
                .then(data => {
                    this.items = data.data
                    this.totalPage = data.last_page
                })
                .finally(() => this.isLoading = false)
        },

        async fetchBuilderProperty(id: number, page: number) {
            return await $fetch<{
                properties: PropertyItem[]
            }>(`${this.API_ENDPOINT}/api/builder/${id}/properties?page=${page}`)
        },

        async fetchSingleBuilderItem(id: string) {
            try {
                this.isLoading = true

                const data = await $fetch<Builder>(`${this.API_ENDPOINT}/api/builder/${id}`)

                this.curBuilder.item = data

                if (data) {
                    const [result1, result2, result3] = await Promise.all([
                        new Promise<{
                            last_page: number
                            data: PropertyItem[]
                        } | null>((resolve) => $fetch<{
                            last_page: number
                            data: PropertyItem[]
                        }>(`${this.API_ENDPOINT}/api/properties/active-filter/${data.id}?page=${this.curBuilder.curActivePage}&sortBy=${this.sortOrderActive}&orderBy=${this.sortByActive}`)
                            .then(data => resolve(data))
                            .catch(() => resolve(null))),
                        new Promise<{
                            last_page: number
                            data: PropertyItem[]
                        } | null>((resolve) => $fetch<{
                            last_page: number
                            data: PropertyItem[]
                        }>(`${this.API_ENDPOINT}/api/properties/past-filter/${data.id}?page=${this.curBuilder.curPastPage}&sortBy=${this.sortOrderPast}&orderBy=${this.sortByPast}`)
                            .then(data => resolve(data))
                            .catch(() => resolve(null))),
                        new Promise<Community[]>((resolve) =>
                            $fetch<{
                                polygons: {
                                    last_page: number
                                    data: Community[]
                                }
                            }>(`${this.API_ENDPOINT}/api/properties/list-communities-built-in/${data.id}`)
                                .then(data => resolve(data.polygons.data))
                                .catch(() => resolve([])))
                    ])

                    if (result1) {
                        this.curBuilder.activeListings = result1.data
                        this.curBuilder.totalActivePage = result1.last_page
                    }

                    if (result2) {
                        this.curBuilder.pastListings = result2.data
                        this.curBuilder.totalPastPage = result2.last_page
                    }

                    if (result3) {
                        this.curBuilder.communities = sortBy(result3, 'title')
                    }
                }
            } catch {

            } finally {
                this.isLoading = false
            }
        },

        async fetchActiveListing() {
            this.curBuilder.loadingActive = true
            $fetch<{
                last_page: number
                data: PropertyItem[]
            }>(`${this.API_ENDPOINT}/api/properties/active-filter/${this.curBuilder.item?.id}?page=${this.curBuilder.curActivePage}&sortBy=${this.sortOrderActive}&orderBy=${this.sortByActive}`)
                .then(result => {
                    this.curBuilder.activeListings = result.data
                    this.curBuilder.totalActivePage = result.last_page
                })
                .finally(() => this.curBuilder.loadingActive = false)
        },

        async fetchPastListing() {
            this.curBuilder.loadingPast = true
            $fetch<{
                last_page: number
                data: PropertyItem[]
            }>(`${this.API_ENDPOINT}/api/properties/past-filter/${this.curBuilder.item?.id}?page=${this.curBuilder.curPastPage}&sortBy=${this.sortOrderPast}&orderBy=${this.sortByPast}`)
                .then(result => {
                    this.curBuilder.pastListings = result.data
                    this.curBuilder.totalPastPage = result.last_page
                })
                .finally(() => this.curBuilder.loadingPast = false)
        }
    }
})