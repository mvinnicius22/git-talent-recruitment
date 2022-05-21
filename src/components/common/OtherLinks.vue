<template>
    <v-row class="text-center">
        <v-col
            class="mb-5"
            cols="12"
        >
            <h2 class="headline font-weight-bold mb-3">
                Didn't find what you were looking for?
            </h2>

            <v-row justify="center">
                <a
                    v-for="(next, i) in whatsNext"
                    :key="i"
                    :href="next.href"
                    class="subheading mx-3 pt-2"
                    target="_blank"
                >
                    {{ next.text }}
                </a>
            </v-row>
        </v-col>

        <v-col
            class="mb-5"
            cols="12"
        >
            <h2 class="headline font-weight-bold mb-3">
                This might help you
            </h2>

            <v-row justify="center">
                <a
                    v-for="(link, i) in roadmapGuides"
                    :key="i"
                    :href="'https://roadmap.sh/' + link"
                    class="subheading mx-3 pt-2"
                    target="_blank"
                >
                    {{ link }}
                </a>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
export default {
	data() {
		return {
			roadmapGuides: ['backend', 'frontend', 'devops'],

			whatsNext: [
				{
					text: 'Linkedin',
					href: 'https://www.linkedin.com/',
				},
				{
					text: 'Glassdoor',
					href: 'https://www.glassdoor.com/',
				},
				{
					text: 'Indeed',
					href: 'https://www.indeed.com/',
				},
			],
		}
	},
}
</script>
