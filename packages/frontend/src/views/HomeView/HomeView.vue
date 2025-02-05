<script setup lang="ts">
const items = [
	{
		label: 'Анализы вакансий',
		icon: 'pi pi-briefcase',
		route: '/jobs'
	},
];
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
