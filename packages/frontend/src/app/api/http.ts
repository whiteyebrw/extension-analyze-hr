import { api } from './index.ts';

export const createOrUpdateVacancy = (body: any) => {
	return api.post('/jobs/vacancy', body)
}