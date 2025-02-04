<script setup lang="ts">
import { createOrUpdateResume } from '@/app/api/http.ts';
import { ref } from 'vue';

const isLoading = ref(false);

const handleParse = async () => {
	isLoading.value = true;
	try {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

		if (tab.id === undefined) {
			throw Error();
		}

		const { parsedInfo } = await chrome.tabs.sendMessage(tab.id, {
			action: 'parseResumeHh',
		});

		const { data } = await createOrUpdateResume(parsedInfo);
		console.log(data);
	} catch (e) {
		console.log(e);
	} finally {
		isLoading.value = false;
	}
};
</script>

<template>
	<Button label="Parse resume" @click="handleParse"/>
</template>

<style scoped>

</style>