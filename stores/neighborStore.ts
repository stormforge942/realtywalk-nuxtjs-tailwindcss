interface NeighborHoodState {
    API_ENDPOINT: string,

    items: NeighborHoodItem[]
    search: string
    curPage: number
    isLoading: boolean
    totalPage: number
}

export const useNeighborStore = defineStore('neighborhood', {
    state: (): NeighborHoodState => ({
        API_ENDPOINT: '',
        items: [],
        curPage: 1,
        totalPage: 1,
        search: '',
        isLoading: false
    }),

    actions: {
        async fetchNeigbhorItems() {
            this.isLoading = true
            let endpoint = 'api/neighbors/list'
            if (this.search === '#') {
                endpoint = 'api/neighborhood/search/numeric'
            } else if (this.search.trim()) {
                endpoint = `api/neighborhood/search/${this.search}`
            }
            $fetch<{
                data: NeighborHoodItem[],
                last_page: number
            }>(`${this.API_ENDPOINT}/${endpoint}?page=${this.curPage}`)
                .then(data => {
                    this.items = data.data
                    this.totalPage = data.last_page
                })
                .finally(() => this.isLoading = false)
        }
    }
})