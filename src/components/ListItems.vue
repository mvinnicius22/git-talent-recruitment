<template>
    <div>
        <v-layout row justify-center>
            <v-flex xs8>
                <v-layout row>
                    <v-col lg="10" sm="9" xs="8">
                        <v-text-field
                            :label="'Find your ' + (hasUserInput ? 'talent' : 'repo')"
                            v-model="search"
                            v-on:input="debounceInput"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="2" sm="3" xs="4">
                        <v-row class="pt-8">
                            <v-btn
                                class="mx-2"
                                dark
                                small
                                :color="hasUserInput ? 'primary' : 'grey'"
                                @click="changeSearch('users')"
                            >
                                <v-icon dark>
                                    mdi-account
                                </v-icon>
                            </v-btn>
                            <v-btn
                                class="mx-2"
                                dark
                                small
                                :color="!hasUserInput ? 'purple' : 'grey'"
                                @click="changeSearch('repositories')"
                            >
                                <v-icon dark>
                                    mdi-book
                                </v-icon>
                        </v-btn>
                        </v-row>
                    </v-col>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-data-table
            v-if="!loading"
            :items="items"
            :headers="headers"
            class="my-4"
        >
            <template v-slot:[`item.photo`] = "{ item }">
                <v-img :src="item.avatar_url" max-width="30" style="cursor:pointer" @onclick="console.log('nothing yet...')"/>
            </template>

            <template v-slot:[`item.html_url`] = "{ item }">
                <a :href="item.html_url">
                    {{ item.html_url }}
                </a>
            </template>

            <template v-slot:[`item.type`] = "{ item }">
                <v-chip v-if="item.type === 'User'" color="green" dark> {{ item.type }} </v-chip>
                <v-chip v-else color="purple" dark> {{ item.type }} </v-chip>
            </template>

            <template v-slot:[`item.owner_login`] = "{ item }">
                {{ item.owner.login }}
            </template>

            <template v-slot:[`item.user_actions`] = "{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-on="on"
                            v-bind="attrs"
                            color="primary"
                            @click="console.log('nothing yet...')"
                            icon
                        >
                            <v-icon dark>
                                mdi-account-star-outline
                            </v-icon>
                        </v-btn>
                    </template>
                    Favorite
                </v-tooltip>
            </template>

            <template v-slot:[`item.repo_actions`] = "{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-if="hasToken"
                            v-on="on"
                            v-bind="attrs"
                            color="primary"
                            @click="createIssue(item)"
                            icon
                        >
                            <v-icon dark>
                                mdi-notebook-edit-outline
                            </v-icon>
                        </v-btn>
                    </template>
                    Favorite
                </v-tooltip>
            </template>
        </v-data-table>

        <modal-issue 
            v-if="showIssueModal"
            :repo="repoObject"
            @cancel="cancelIssue()"
            @created="cancelIssue()"
        />
    </div>
</template>

<script>

const headersUsers = [
    { text: 'ID', value: 'id', width: '17.5%' },
    { text: 'Photo', value: 'photo', width: '12.5%' },
    { text: 'Type', value: 'type', width: '15%' },
    { text: 'Profile URL', value: 'html_url', width: '27.5%' },
    { text: 'Owner', value: 'login', width: '17.5%' },
    { text: 'Actions', value: 'user_actions', width: '10%' },
];
const headersRepositories = [
    { text: 'ID', value: 'id', width: '10%' },
    { text: 'Name', value: 'name', width: '10%' },
    { text: 'Language', value: 'language', width: '10%' },
    { text: 'Description', value: 'description', width: '35%' },
    { text: 'Watchers', value: 'watchers_count', width: '5%' },
    { text: 'Forks', value: 'forks_count', width: '5%' },
    { text: 'Stars', value: 'stargazers_count', width: '5%' },
    { text: 'Owner', value: 'owner_login', width: '10%' },
    { text: 'Actions', value: 'repo_actions', width: '10%' },
]

import _debounce from 'lodash/debounce'
import ListItems from './ListItems'
import ModalIssue from './ModalIssue'

export default {
	components: {
		ListItems,
        ModalIssue,
	},

	data() {
		return {
            loading: false,
            items: [],
			headers: headersUsers,
            search: '',
            typeSearch: 'users',
            showIssueModal: false,
		}
	},

    computed: {
        hasUserInput() {
            return this.typeSearch == 'users';
        },

        hasToken() {
            return this.$store.getters['hasToken'];
        },

        credentials() {
            return this.$store.getters['getCredentials'];
        },

        clientParams() {
            return this.hasToken ?
                `&client_id=${this.credentials.clientId}&client_secret=${this.credentials.clientSecret}`
                : '';
        },
    },

    watch: {
        hasToken() {
            this.handleAuthorization();
        },
    },

	methods: {
		debounceInput: _debounce(function () {
			this.getItems();
		}, 500),

        async getItems() {
            this.loading = true;
            if (this.search) {
                this.items = [];
                const items = await this.axios.get(`search/${this.typeSearch}?q=` + this.search + this.clientParams);
                this.items = items.data.items;
            }
            this.loading = false;
        },

        changeSearch(type) {
            this.typeSearch = type;
            if (type == 'repositories') this.headers = headersRepositories
            else this.headers = headersUsers;

            this.getItems();
        },

        handleAuthorization() {
            console.log('checking...');
            if (! this.hasToken) {
                delete this.axios.defaults.headers.common['Authorization'];
            } else {
                console.log('authorized!');
                this.axios.defaults.headers.common['Authorization'] = 'token ' + this.$store.state.personalAccessToken;
            }
        },

        createIssue(repo) {
            this.repoObject = repo;
            this.showIssueModal = true;
        },

        cancelIssue() {
            this.repoObject = {};
            this.showIssueModal = false;
        },
	},

    async mounted() {
        this.handleAuthorization();
    },
}
</script>
