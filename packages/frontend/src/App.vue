<script setup lang="ts">
import AppHeader from '@/app/appHeader/AppHeader.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
</script>

<template>
	<AppHeader/>
	<Breadcrumbs />
	<Suspense>
		<RouterView/>
	</Suspense>
</template>

<style scoped>
</style>
