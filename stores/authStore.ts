interface AuthStore {
    API_ENDPOINT: string,

    authenticated: boolean,
    recaptchaToken: string,
    isValid: boolean
    errMsg: string
    isLoading: boolean,

    user: User | null,
    token: string | null,
    searchList: SearchItem[],
    favItems: PropertyItem[]
}


export const useAuthStore = defineStore('auth', {
    state: (): AuthStore => ({
        API_ENDPOINT: '',

        authenticated: false,
        recaptchaToken: '',
        isValid: false,
        errMsg: '',
        isLoading: false,

        user: null,
        token: null,
        searchList: [],
        favItems: []
    }),
    actions: {
        async sendMagicLoginLink(email: string) {
            this.isLoading = true;

            return $fetch(`${this.API_ENDPOINT}/api/user/send-magic-login`, {
                method: 'POST',
                body: {
                    email,
                    'g-recaptcha-response': this.recaptchaToken
                }
            })
                .finally(() => {
                    this.isLoading = false
                })
        },
        async attemptMagicLogin(token: string): Promise<{
            user: User,
            token: string
        } | null> {
            return new Promise((resolve) => {
                this.isLoading = true
                $fetch<{
                    user: User,
                    token: string
                }>(`${this.API_ENDPOINT}/api/user/magic-login/${token}`, {
                    method: 'POST'
                }).then(data => {
                    this.user = data.user
                    this.token = data.token
                    this.authenticated = true
                    resolve(data)
                }).catch(err => {
                    resolve(null)
                }).finally(() => {
                    this.isLoading = false
                })
            })
        },
        async resetPassword(email: string): Promise<boolean> {
            this.isLoading = true
            return new Promise((resolve) => {
                $fetch(`${this.API_ENDPOINT}/api/user/password/send-reset-link`, {
                    method: 'POST',
                    body: {
                        email,
                        'g-recaptcha-response': this.recaptchaToken
                    }
                }).then(() => resolve(true))
                    .catch(() => resolve(false))
                    .finally(() => this.isLoading = false)
            })
        },
        async signInUsingPassword(data: {
            email: string,
            password: string
        }): Promise<{
            user: User,
            token: string
        } | null> {
            this.isLoading = true;
            return new Promise((resolve) => {
                $fetch<{
                    user: User,
                    token: string
                }>(`${this.API_ENDPOINT}/api/user/signin`, {
                    method: 'POST',
                    body: {
                        ...data,
                        'g-recaptcha-response': this.recaptchaToken
                    }
                }).then(data => {
                    this.user = data.user
                    this.token = data.token
                    this.authenticated = true
                    resolve(data)
                })
                    .catch(err => {
                        resolve(null)
                    })
                    .finally(() => {
                        this.isLoading = false
                    })
            })
        },
        async attemptActivateAccount(token: string) {
            this.isLoading = true;
            return $fetch(`${this.API_ENDPOINT}/api/user/activate/${token}`, {
                method: 'POST'
            }).finally(() => {
                this.isLoading = false
            })
        },
        async createUser(data: {
            password: string,
            email: string,
            name: string
        }) {
            this.isLoading = true;
            return new Promise((resolve) => {
                $fetch(`${this.API_ENDPOINT}/api/user/create`, {
                    method: 'POST',
                    body: {
                        ...data,
                        cpassword: data.password,
                        'g-recaptcha-response': this.recaptchaToken
                    }
                }).then(data => {
                    resolve(data)
                })
                    .catch(err => {
                        resolve(null)
                    })
                    .finally(() => {
                        this.isLoading = false
                    })
            })
        },
        async updatePassword(data: {
            currentPassword: string,
            confirmPassword: string,
            newPassword: string
        }): Promise<boolean> {
            this.isLoading = true;
            return new Promise((resolve) => {
                $fetch(`${this.API_ENDPOINT}/api/user/update-password`, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'authorization': `Bearer ${this.token}`
                    }
                })
                    .then(() => {
                        resolve(true)
                    })
                    .catch(() => {
                        resolve(false)
                    })
                    .finally(() => {
                        this.isLoading = false
                    })
            })
        },
        async updateProfile(data: {
            name: string,
            picture?: any
        }) {
            return new Promise((resolve) => {
                this.isLoading = true
                $fetch<{
                    message: string,
                    user: User
                }>(`${this.API_ENDPOINT}/api/user/update-profile`, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'authorization': `Bearer ${this.token}`
                    }
                }).then((data) => {
                    this.user = data.user
                    resolve(true)
                }).catch(() => {
                    resolve(false)
                }).finally(() => {
                    this.isLoading = false
                })
            })
        },
        getSearchInfo(): SearchCriteria {
            const propertyStore = usePropertyStore()
            const homeStore = useHomeStore()

            return {
                activeSchoolZone: homeStore.activeSchoolZone,
                bedroomCount: propertyStore.bedroomCount,
                fullBathRoomCount: propertyStore.fullBathRoomCount,
                garageCapacity: propertyStore.garageCapacity,
                halfBathRoomCount: propertyStore.halfBathRoomCount,
                hasElevator: propertyStore.hasElevator,
                hasPool: propertyStore.hasPool,
                isListView: homeStore.isListView,
                isMapView: homeStore.isMapView,
                level: homeStore.level,
                listingStatus: propertyStore.listingStatus,
                map: homeStore.map,
                maxPrice: propertyStore.maxPrice,
                maxSquareFeetCount: propertyStore.maxSquareFeetCount,
                maxStory: propertyStore.maxStory,
                minPrice: propertyStore.minPrice,
                minSquareFeetCount: propertyStore.minSquareFeetCount,
                minStory: propertyStore.minPrice,
                propertyType: propertyStore.propertyType,
                saveSearch: homeStore.saveSearch,
                show100Year: homeStore.show100Year,
                show100YearBFE: homeStore.show100YearBFE,
                show100YearShallow: homeStore.show100YearShallow,
                show100YearSheetFlow: homeStore.show100YearSheetFlow,
                show100YearStormWaves: homeStore.show100YearStormWaves,
                show500Year: homeStore.show500Year,
                showBikeTrails: homeStore.showBikeTrails,
                showFloodZones: homeStore.showFloodZones,
                showInstruction: homeStore.showInstruction,
                showResult: homeStore.showResult,
                showSchoolZones: homeStore.showSchoolZones,
                showSearch: homeStore.showSearch,
                showUnselected: homeStore.showUnselected,
                sortBy: propertyStore.sortBy,
                sortOrder: propertyStore.sortOrder
            } as SearchCriteria
        },
        async saveSearch(text: string) {
            this.isLoading = true
            $fetch(`${this.API_ENDPOINT}/api/user-searches`, {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${this.token}`
                },
                body: {
                    search_name: text,
                    user_id: this.user?.id,
                    search_string_criteria: JSON.stringify(this.getSearchInfo())
                }
            })
                .finally(() => {
                    this.fetchSearchList()
                })
        },
        async fetchSearchList() {
            $fetch<SearchItem[]>(`${this.API_ENDPOINT}/api/user-searches/list/${this.user?.id}`, {
                headers: {
                    'authorization': `Bearer ${this.token}`
                }
            }).then(data => {
                this.searchList = data;
            })
        },
        async deleteSearchItem(id: number) {
            $fetch(`${this.API_ENDPOINT}/api/user-searches/${id}`, {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${this.token}`
                }
            }).then(() => {
                this.searchList = this.searchList.filter(item => item.id !== id);
            })
        },
        async passwordReset(data: {
            email: string,
            password: string,
            cpassword: string,
            resetToken: string
        }) {
            this.isLoading = true
            return new Promise((resolve) => {
                $fetch(`${this.API_ENDPOINT}/api/user/password-reset`, {
                    method: 'POST',
                    body: data
                })
                    .then(() => resolve(true))
                    .catch(() => resolve(false))
                    .finally(() => this.isLoading = false)
            })
        },
        async confirmResetToken(token: string) {
            this.isLoading = true
            return new Promise<{
                token: string,
                email: string
            } | null>((resolve) => {
                $fetch<{
                    token: string,
                    email: string
                }>(`${this.API_ENDPOINT}/api/user/password/confirm-token/${token}`)
                    .then(data => resolve(data))
                    .catch(() => resolve(null))
                    .finally(() => this.isLoading = false)
            })
        },
        logout() {
            const homeStore = useHomeStore()

            this.authenticated = false
            this.user = null
            this.token = null
            homeStore.saveSearch = false
        },
        async fetchFavoriteData() {
            this.isLoading = true
            $fetch<PropertyItem[]>(`${this.API_ENDPOINT}/api/user/favorites`, {
                headers: {
                    'authorization': `Bearer ${this.token}`
                }
            })
                .then(data => this.favItems = data)
                .finally(() => this.isLoading = false)
        },
        async toggleFavorite(id: number, isExist: boolean) {
            if (!this.authenticated) {
                eventBus.emit(OPEN_LOGIN_NOTIFY)
                return
            }

            return new Promise((resolve) => {
                $fetch<{
                    favorites: number[]
                }>(`${this.API_ENDPOINT}/api/user/${isExist ? 'unfavorite' : 'favorite'}/${id}`, {
                    method: 'POST',
                    headers: {
                        'authorization': `Bearer ${this.token}`
                    }
                })
                    .then(data => {
                        this.fetchFavoriteData()
                        resolve(true)
                    })
                    .catch(() => resolve(false))
            })
        }
    }
})