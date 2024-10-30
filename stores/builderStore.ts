interface BuilderState {
    API_ENDPOINT: string,

    items: BuilderItem[]
    search: string
    curPage: number
    isLoading: boolean
    totalPage: number
    isInputing: boolean
}

export const useBuilderStore = defineStore('builder', {
    state: (): BuilderState => ({
        API_ENDPOINT: '',
        items: [],
        curPage: 1,
        totalPage: 1,
        search: '',
        isLoading: false,
        isInputing: false
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
        }
    }
})