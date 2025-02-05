<script setup lang="ts">
import { useApi } from '@/app/api';
import { useRoute } from 'vue-router';
import VueMarkdown from 'vue-markdown-render';

const route = useRoute();

const { data } = await useApi(`/jobs/${route.params.id}`).json();
</script>

<template>
	<Card>
		<template #content>
			<p class="break-all">{{ data.vacancyUrl }}</p>
		</template>
	</Card>
	<Card v-for="resumeUrl in data.resumeUrls" :key="resumeUrl">
		<template #content>
			<p class="break-all">{{ resumeUrl }}</p>
		</template>
	</Card>
	<Card>
		<template #title>Результат</template>
		<template #content>
			<ScrollPanel style="height: 450px">
				<vue-markdown :source="data.result "/>
			</ScrollPanel>
		</template>
	</Card>
</template>

<style scoped>

</style>