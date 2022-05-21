<template>
  	<v-container>
		<slot name="header" />

		<list-items />

		<slot name="footer" />
  </v-container>
</template>

<script>
import _debounce from 'lodash/debounce'

import ListItems from './ListItems'
export default {
	components: {
		ListItems,
	},
}
</script>
