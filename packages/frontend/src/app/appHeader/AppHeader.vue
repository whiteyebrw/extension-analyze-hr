<script setup lang="ts">
import { createOrUpdateResume, createOrUpdateVacancy } from '../api/http.ts';

const onClickHH = async () => {
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	if (tab.id === undefined) {
		throw Error();
	}

	const { parsedInfo } = await chrome.tabs.sendMessage(tab.id, {
		action: 'parseVacancyHh',
	});

	try {
		const { data } = await createOrUpdateVacancy(parsedInfo);
		console.log(data);
	} catch (e) {
		console.log(e);
	}
};

const onClickResumeHH = async () => {
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	if (tab.id === undefined) {
		throw Error();
	}

	const { parsedInfo } = await chrome.tabs.sendMessage(tab.id, {
		action: 'parseResumeHh',
	});

	try {
		const { data } = await createOrUpdateResume(parsedInfo);
		console.log(data);
	} catch (e) {
		console.log(e);
	}
};
</script>

<template>

</template>

<style scoped>

</style>