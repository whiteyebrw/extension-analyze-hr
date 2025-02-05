<script setup lang="ts">
import ButtonParseVacancy from '@/app/appHeader/ButtonParseVacancy.vue';
import ButtonParseResume from '@/app/appHeader/ButtonParseResume.vue';
</script>

<template>
	<Menubar>
		<template #start>
			<div class="flex gap-1">
				<ButtonParseVacancy/>
				<ButtonParseResume/>
			</div>
		</template>
	</Menubar>
</template>

<style scoped>

</style>