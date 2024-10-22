interface ExploreState {
    API_ENDPOINT: string

    isLoading: boolean
    page: number
    lastPage: number
    polygons: any[]
}
export const useExploreStore = defineStore('explore', {
    state: (): ExploreState => ({
        API_ENDPOINT: '',
        isLoading: true,
        page: 1,
        lastPage: -1,
        polygons: []
    }),
    actions: {
        async loadPolygons(nextPage: boolean = false, infiniteState: any = null) {
            try {
                let page = nextPage ? this.page + 1 : 1;

                if (!nextPage) {
                    this.isLoading = true;
                    this.polygons = [];
                }

                $fetch(`${this.API_ENDPOINT}/api/home-grid/list?page=${page}&per_page=16`)
                    .then((data: any) => {
                        if (nextPage) {
                            data.data.forEach((item: any) => this.polygons.push(item));
                            this.page += 1;

                            if (this.page >= data.last_page) {
                                this.page = data.last_page;
                                infiniteState.complete();
                            } else {
                                infiniteState.loaded();
                            }
                        } else {
                            this.polygons = data.data;
                        }

                        this.lastPage = data.last_page;
                        this.isLoading = false;
                    });
            } catch (err) {
                console.error(err);
                //this.errorMsg = getErrorMessage(err);
                this.isLoading = false;
            }

            if (!nextPage) this.page = 1;
        },
        async goToMap(polygonId: string, title: string = '') {
            const homeStore = useHomeStore()
            const propertyStore = usePropertyStore()

            let IDs = polygonId ? [polygonId] : [];
            let map;

            if (polygonId) {
                const data = await $fetch<any>(`${this.API_ENDPOINT}/api/polygon/trunk/` + polygonId);
                const coordinates = await $fetch<any>(`${this.API_ENDPOINT}/api/polygon/coordinates/` + polygonId);
                const { min_lat, min_lng, max_lat, max_lng } = coordinates || {};

                if (min_lat && min_lng && max_lat && max_lng) {
                    map = {
                        center: {
                            lat: ((+min_lat) + (+max_lat)) / 2,
                            lng: ((+min_lng) + (+max_lng)) / 2,
                        },
                        zoom: 13,
                    };
                }
                IDs = data.ids.filter((value: string, index: number, self: any) => self.indexOf(value) === index);
            }

            //localStorage.setItem('selectedPolygons', JSON.stringify(IDs));
            propertyStore.polygons = IDs;

            if (map) {
                homeStore.isMapView = true
                homeStore.showResult = !!polygonId
                homeStore.showSearch = !!polygonId
                homeStore.showInstruction = !!polygonId
                homeStore.map = map
                homeStore.activeNeighborhood = title
            }
        }
    }
})