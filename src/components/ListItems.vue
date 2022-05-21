<template>
    <div>
        <v-layout row justify-center>
            <v-flex xs8>
                <v-layout row>
                    <v-col lg="10" sm="9" xs="8">
                        <v-text-field
                            :label="'Find your ' + (hasUserInput ? 'talent' : 'repo')"
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
                                @click="typeSearch = 'user'"
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
                                @click="typeSearch = 'other'"
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

            <template v-slot:[`item.actions`] = "{ item }">
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
        </v-data-table>
    </div>
</template>

<script>
import _debounce from 'lodash/debounce'

import ListItems from './ListItems'
export default {
	components: {
		ListItems,
	},

	data() {
		return {
            items: [],
			headers: [
                { text: 'ID', value: 'id', width: '17.5%' },
				{ text: 'Photo', value: 'photo', width: '12.5%' },
				{ text: 'Type', value: 'type', width: '15%' },
				{ text: 'Profile URL', value: 'html_url', width: '27.5%' },
				{ text: 'Owner', value: 'login', width: '12.5%' },
				{ text: 'Actions', value: 'actions', width: '15%' },
			],

            typeSearch: 'user',
		}
	},

    computed: {
        hasUserInput() {
            return this.typeSearch == 'user';
        }
    },

	methods: {
		debounceInput: _debounce(function (e) {
			this.getItems(e);
		}, 500),

        getItems(search) {
            this.axios.get('search/users?q=' + search, {
                transformRequest: (data, headers) => { delete headers.common['Authorization']},
            }).then(response => {
                this.items = response.data.items;
            })
        },
	},
}
</script>
