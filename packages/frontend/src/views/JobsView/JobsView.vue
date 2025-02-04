<script setup lang="ts">
import { ref } from 'vue';
import { useApi } from '@/app/api';

const { data } = await useApi('/jobs').json();

const items = ref([
	{
		label: 'Создать новый анализ',
		icon: 'pi pi-palette',
		route: '/jobs/create'
	},
	...data.value.map(({ id }) => ({ label: id, icon: 'pi pi-palette', route: `/jobs/${id}` }))
]);
</script>

<template>
	<Menu :model="items">
		<template #item="{ item, props }">
			<router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
				<a :href="href" v-bind="props.action" @click="navigate">
					<span :class="item.icon"/>
					<span>{{ item.label }}</span>
				</a>
			</router-link>
		</template>
	</Menu>
</template>

<style scoped>

</style>