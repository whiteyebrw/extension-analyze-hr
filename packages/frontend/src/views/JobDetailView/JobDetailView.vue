<script setup lang="ts">
import { useApi } from '@/app/api';
import { useRoute } from 'vue-router';

const route = useRoute();

const { data, } = await useApi(`/jobs/${route.params.id}`, {
	afterFetch(ctx) {
		ctx.data.matchedResumes = ctx.data.matchedResumes.reduce((acc, item) => {
			acc[item.id] = item.match_percentage;
			return acc;
		}, {});

		return ctx;
	},
}).json();
</script>

<template>
	<Card>
		<template #title>Вакансия</template>
		<template #content>
			<p class="break-all">{{ data.vacancyUrl }}</p>
		</template>
	</Card>
	<Card v-for="(resumeUrl, idx) in data.resumeUrls" :key="resumeUrl">
		<template #title>Кандидат {{ idx + 1 }}</template>
		<template #content>
			<p class="break-all">{{ resumeUrl }}</p>
			<p class="break-all">Процент совпадения:
				{{ data.matchedResumes[resumeUrl] !== undefined ? data.matchedResumes[resumeUrl] : '-' }} </p>
		</template>
	</Card>
</template>

<style scoped>

</style>