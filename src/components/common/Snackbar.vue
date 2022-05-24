<template>
    <div class="text-center ma-2">
        <v-snackbar
            v-model="snackbar"
            :color="color"
            :timeout="3000"
            right
        >
            {{ message }}

            <template v-slot:action="{ attrs }">
                <v-btn
                    text
                    color="white"
                    v-bind="attrs"
                    @click="$emit('destroy')"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true,
            default: false
        },

        message: {
            type: String,
            required: true,
        },

        color: {
            type: String,
            default: 'success',
        },
    },

    computed: {
        snackbar() {
            return this.show;
        }
    }
}
</script>