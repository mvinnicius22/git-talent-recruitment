<template>
    <v-dialog
        persistent
        v-model="modal"
        width="500"
    >
        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                Create an issue
            </v-card-title>

            <v-card-text class="pt-4">
                <v-text-field 
                    v-model="titleIssue"
                    label="Title"
                />
                <v-text-field 
                    v-model="bodyIssue"
                    label="Body content"
                />
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="$emit('cancel')"
                >
                    Cancel
                </v-btn>

                <v-btn
                    text
                    color="primary"
                    @click="createIssue()"
                >
                    Create
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        repo: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            modal: true,
            titleIssue: '',
            bodyIssue: '',
        }
    },

    computed: {
        hasToken() {
            return this.$store.getters['hasToken'];
        },
    },

    methods: {
        async createIssue(item) {
            await this.axios.post(`repos/${this.repo.owner.login}/${this.repo.name}/issues`, {
                // owner: item.owner.login,
                // repo: item.name,
                title: this.titleIssue,
                body: this.bodyIssue,
                // labels: [
                //     'bug'
                // ]
            })
            this.$emit('created');
        }
    },
}

</script>