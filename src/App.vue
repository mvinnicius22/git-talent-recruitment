<template>
	<v-app>
		<app-bar />
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script>
import AppBar from './components/common/AppBar'
export default {
	components: {
		AppBar,
	},
}
</script>
