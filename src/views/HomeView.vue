<template>
	<find-page>
		<template #header>
			<welcome />
		</template>
		
		<template #footer>
			<other-links />
		</template>
	</find-page>
</template>

<script>
import Welcome from '../components/common/Welcome'
import OtherLinks from '../components/common/OtherLinks'
import FindPage from '../components/FindPage'

export default {
	name: 'Home',

	components: {
		Welcome,
		OtherLinks,
		FindPage,
	},
}
</script>
