<template>
    <v-app-bar
        app
        color="#8800EA"
        dark
    >
        <div class="d-flex align-center">
            <v-img
                class="shrink mt-1 hidden-sm-and-down"
                contain
                min-width="100"
                src="https://programathor.com.br/blog/wp-content/uploads/2018/04/github-logo-e1522860474698.png"
                width="100"
            />
        </div>

        <v-spacer></v-spacer>

        <v-btn
            @click="checkLogin()"
            target="_blank"
            text
        >
            <span class="mr-2">
                {{ hasToken ? 'Exit' : 'Login' }}
            </span>
            <v-icon>mdi-open-in-new</v-icon>
        </v-btn>

        <v-dialog 
            v-model="showLogin"
            width="500"
        >
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Authentication
                </v-card-title>

                <v-card-text class="pt-4">
                    <v-text-field 
                        v-model="clientId"
                        label="Client ID"
                    />
                    <v-text-field 
                        v-model="clientSecret"
                        label="Client Secret"
                    />
                    <v-text-field 
                        v-model="personalAccessToken"
                        type="password"
                        label="Personal Access Token"
                    />
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        text
                        color="primary"
                        @click="login()"
                    >
                        Authenticate
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app-bar>
</template>

<script>

export default {
	data() {
		return {
            showLogin: false,
            clientId: '',
            clientSecret: '',
            personalAccessToken: '',
        }
    },

    computed: {
        hasToken() {
            return this.$store.getters['hasToken'];
        },
    },

    methods: {
        checkLogin() {
            ! this.hasToken ? this.showLogin = true : this.logout();
        },

        login() {
            let options = {
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                personalAccessToken: this.personalAccessToken,
            }

            this.$store.dispatch('login', options);
            this.setCookies(options);
            this.setStorage(options);

            this.showLogin = false;
        },

        logout() {
            localStorage.clear();
            this.$store.dispatch('logout');
        },

        setCookies(cookies) {
            this.$cookies.set('options', cookies);
            this.$cookies.config('30d');
        },

        setStorage(storage) {
            localStorage.clear();
            localStorage.setItem('clientId', storage.clientId);
            localStorage.setItem('clientSecret', storage.clientSecret);
            localStorage.setItem('personalAccessToken', storage.personalAccessToken);
        }
    },

    mounted() {
        if (this.$cookies.isKey('options')) {
            this.clientId = this.$cookies.get('options').clientId
            this.clientSecret = this.$cookies.get('options').clientSecret
            this.personalAccessToken = this.$cookies.get('options').personalAccessToken
        }
    }
}
</script>