import type { RouteRecordRaw } from 'vue-router';

const HomeView = () => import('@/views/HomeView/HomeView.vue');
const JobsView = () => import('@/views/JobsView/JobsView.vue');
const JobCreateView = () => import('@/views/JobCreateView/JobCreateView.vue');
const JobDetailView = () => import('@/views/JobDetailView/JobDetailView.vue');

export const routes:  Readonly<RouteRecordRaw[]> = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/jobs',
		name: 'jobs',
		component: JobsView,
		meta: {
			breadcrumbs: [
				{ label: 'Анализ Вакансий', route: '' },
			]
		}
	},
	{
		path: '/jobs/create',
		name: 'jobs-create',
		component: JobCreateView,
		meta: {
			breadcrumbs: [
				{ label: 'Анализ Вакансий', route: '/jobs' },
				{ label: 'Создание анализа', route: '' },
			]
		}
	},
	{
		path: '/jobs/:id',
		name: 'jobs-detail',
		component: JobDetailView,
		meta: {
			breadcrumbs: [
				{ label: 'Анализ Вакансий', route: '/jobs' },
				{ label: 'Анализ Вакансии', route: '' },
			]
		}
	},
];