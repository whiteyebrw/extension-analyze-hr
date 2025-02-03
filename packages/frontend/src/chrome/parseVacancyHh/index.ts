import { getUrlForEntity } from '../../utils/getUrlForEntity.ts';
import { normalizeHHUrl } from '../../utils/normalizeHHUrl.ts';

export const parseVacancyHh = () => {
	// todo мб данные о частичной занятость и тд
	const vacancyInfo: any = {
		skills: [],
	};
	vacancyInfo.url = normalizeHHUrl(getUrlForEntity());
	vacancyInfo.title = (document.querySelector('[data-qa="vacancy-title"]') as HTMLElement)?.innerText ?? '';
	vacancyInfo.salary = (document.querySelector('[data-qa="vacancy-salary"]') as HTMLElement)?.innerText ?? '';
	vacancyInfo.experience = (document.querySelector('[data-qa="vacancy-experience"]') as HTMLElement)?.innerText ?? '';
	vacancyInfo.description = (document.querySelector('.vacancy-description') as HTMLElement)?.innerText ?? ''

	const skillsElements = document.querySelectorAll('[data-qa="skills-element"]') as NodeListOf<HTMLElement>;
	skillsElements.forEach((skillElement) => {
		const skill = skillElement.innerText;
		vacancyInfo.skills.push(skill);
	});

	vacancyInfo.address = (document.querySelector('[data-qa="vacancy-view-raw-address"]') as HTMLElement)?.innerText ?? '';

	return vacancyInfo;
};