import { useApi } from './index.ts';

export const createOrUpdateVacancy = (body: any) => {
	return useApi('/jobs/vacancy').post(body)
}

export const createOrUpdateResume = (body: any) => {
	return useApi('/jobs/resume').post(body)
}