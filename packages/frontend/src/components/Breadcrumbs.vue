<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const home = {
	icon: 'pi pi-home',
	route: '/'
};
</script>

<template>
	<div v-if="route.meta.breadcrumbs" class="card flex justify-center">
		<Breadcrumb :home="home" :model="route.meta.breadcrumbs">
			<template #item="{ item, props }">
				<router-link v-slot="{ href, navigate }" :to="item.route" custom>
					<a :href="href" v-bind="props.action" @click="navigate">
						<span :class="[item.icon, 'text-color']" />
						<span class="text-primary font-semibold">{{ item.label }}</span>
					</a>
				</router-link>
			</template>
		</Breadcrumb>
	</div>
</template>

<style scoped>

</style>