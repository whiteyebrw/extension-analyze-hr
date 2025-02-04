<script setup lang="ts">
import ButtonParseVacancy from '@/app/appHeader/ButtonParseVacancy.vue';
import ButtonParseResume from '@/app/appHeader/ButtonParseResume.vue';
</script>

<template>
	<Menubar>
		<template #start>
			<ButtonParseVacancy/>
			<ButtonParseResume/>
		</template>
	</Menubar>
</template>

<style scoped>

</style>