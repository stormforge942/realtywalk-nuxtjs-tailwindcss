interface AuthStore {
    API_ENDPOINT: string,

    authenticated: boolean
}


export const useAuthStore = defineStore('auth', {
    state: (): AuthStore => ({
        API_ENDPOINT: '',

        authenticated: false
    }),
    actions: {
        async signIn(email: string, recaptcha: string) {
            return $fetch(`${this.API_ENDPOINT}/api/user/send-magic-login`, {
                method: 'POST',
                body: {
                    email,
                    'g-recaptcha-response': recaptcha
                }
            })
        }
    }
})