interface AuthStore {
    authenticated: boolean
}


export const useAuthStore = defineStore('auth', {
    state: (): AuthStore => ({
        authenticated: false
    })
})