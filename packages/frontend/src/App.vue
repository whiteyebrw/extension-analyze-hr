<script setup lang="ts">
import AppHeader from '@/app/appHeader/AppHeader.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
</script>

<template>
	<div class="flex flex-col gap-2.5 p-2.5">
		<AppHeader/>
		<Breadcrumbs/>
		<Suspense>
			<RouterView/>
		</Suspense>
	</div>
</template>

<style scoped>
</style>
