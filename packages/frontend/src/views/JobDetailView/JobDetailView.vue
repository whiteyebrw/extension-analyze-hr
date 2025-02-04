<script setup lang="ts">
import { useApi } from '@/app/api';
import { useRoute } from 'vue-router';

const route = useRoute();

const { data } = await useApi(`/jobs/${route.params.id}`).json();
</script>

<template>
	<Card>
		<template #title>{{ data.vacancyUrl }}</template>
	</Card>
	<Card v-for="resumeUrl in data.resumeUrls" :key="resumeUrl">
		<template #title>{{ resumeUrl }}</template>
	</Card>
	<Fieldset legend="Result">
		<p>{{ data.result }}</p>
	</Fieldset>
</template>

<style scoped>

</style>