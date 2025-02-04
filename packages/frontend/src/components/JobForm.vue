<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useApi } from '@/app/api';
import { normalizeHHUrl } from '@/utils/normalizeHHUrl.ts';
import { useRouter } from 'vue-router';

const MAX_LENGTH_RESUME = 5;

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
	<div>
		<form @submit.prevent="onFormSubmit">
			<div>
				<InputText v-model="state.vacancyUrl" name="vacancy" type="text" placeholder="Vacancy" fluid/>
			</div>
			<div>
				<InputText v-for="(_, idx) in state.resumeUrls" :key="idx" v-model="state.resumeUrls[idx]"
									 :name="`resume${idx}`"
									 type="text"
									 :placeholder="`Resume ${idx}`" fluid/>
			</div>
			<Button :loading="isLoading" type="submit" severity="secondary" label="Submit"/>
		</form>
	</div>
</template>
