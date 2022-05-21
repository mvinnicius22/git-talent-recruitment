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
            href="https://github.com/"
            target="_blank"
            text
        >
            <span class="mr-2">Login</span>
            <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
    </v-app-bar>
</template>