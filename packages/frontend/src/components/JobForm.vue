<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useApi } from '@/app/api';
import { useRouter } from 'vue-router';

const MAX_LENGTH_RESUME = 5;

const normalizeHHUrl = (url: string): string => {
	const parsedUrl = new URL(url);
	parsedUrl.hostname = 'hh.ru';

	return parsedUrl.origin + parsedUrl.pathname;
};

interface Props {
	vacancyUrl?: string;
	resumeUrls?: string[];
	result?: string;
}

const props = defineProps<Props>();
const router = useRouter();

const isLoading = ref(false);
const state = reactive({
	vacancyUrl: props.vacancyUrl ?? '',
	resumeUrls: props.resumeUrls ?? Array.from({ length: MAX_LENGTH_RESUME }, () => '')
});

const onFormSubmit = async () => {
	isLoading.value = true;
	try {
		const body = {
			vacancyUrl: normalizeHHUrl(state.vacancyUrl),
			resumeUrls: state.resumeUrls.filter(url => url !== '').map(normalizeHHUrl)
		};
		const { data } = await useApi('/jobs').post(body).json();

		router.push(`/jobs/${data.value._id}`);
	} catch (e) {
		console.log(e);
	} finally {
		isLoading.value = false;
	}
};
</script>

<template>
	<form @submit.prevent="onFormSubmit" class="flex flex-col gap-2.5">
		<InputText v-model="state.vacancyUrl" name="vacancy" type="text" placeholder="Vacancy" fluid/>
		<InputText v-for="(_, idx) in state.resumeUrls" :key="idx" v-model="state.resumeUrls[idx]"
							 :name="`resume${idx+1}`"
							 type="text"
							 :placeholder="`Resume ${idx+1}`" fluid/>
		<Button :loading="isLoading" type="submit" severity="secondary" label="Submit"/>
	</form>
</template>
