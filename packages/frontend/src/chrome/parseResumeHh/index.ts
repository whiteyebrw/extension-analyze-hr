export const parseResumeHh = () => {
	const resumeInfo: any = {
		skills: [],
		experience: [],
		education: [],
		additionalEducation: []
	};
	resumeInfo.gender = (document.querySelector('[data-qa="resume-personal-gender"]') as HTMLElement)?.innerText ?? '';
	resumeInfo.age = (document.querySelector('[data-qa="resume-personal-age"]') as HTMLElement)?.innerText ?? '';
	resumeInfo.position = (document.querySelector('[data-qa="resume-block-title-position"]') as HTMLElement)?.innerText ?? '';
	resumeInfo.salary = (document.querySelector('[data-qa="resume-block-salary"]') as HTMLElement)?.innerText ?? '';
	resumeInfo.address = (document.querySelector('[data-qa="resume-personal-address"]') as HTMLElement)?.innerText ?? '';

	const experienceElements = document.querySelectorAll('[data-qa="resume-block-experience"] > .resume-block-item-gap .resume-block-item-gap') as NodeListOf<HTMLElement>;
	experienceElements.forEach((experienceElement) => {
		const experience: any = {};
		const [experienceTimeElement, experienceInfoElement] = experienceElement.querySelectorAll('.bloko-column') as NodeListOf<HTMLElement>;

		experience.duration = (experienceTimeElement.querySelector('.bloko-text') as HTMLElement)?.innerText ?? '';
		experience.companyName = (experienceInfoElement.querySelector('.bloko-text') as HTMLElement)?.innerText ?? '';
		experience.position = (experienceInfoElement.querySelector('[data-qa="resume-block-experience-position"]') as HTMLElement)?.innerText ?? '';
		experience.description = (experienceInfoElement.querySelector('[data-qa="resume-block-experience-description"]') as HTMLElement)?.innerText ?? '';

		resumeInfo.experience.push(experience);
	});

	const skillsElements = document.querySelectorAll('[data-qa="skills-table"] .bloko-tag-list [data-qa="bloko-tag__text"]') as NodeListOf<HTMLElement>;
	skillsElements.forEach((skillElement) => {
		const skill = skillElement.innerText;
		resumeInfo.skills.push(skill);
	});

	const educationElements = document.querySelectorAll('[data-qa="resume-block-education"] > .resume-block-item-gap') as NodeListOf<HTMLElement>;
	educationElements.forEach((educationElement) => {
		const education: any = {};
		const [educationTimeElement, educationInfoElement] = educationElement.querySelectorAll('.bloko-column') as NodeListOf<HTMLElement>;

		education.graduationYear = educationTimeElement?.innerText ?? '';
		education.name = (educationInfoElement.querySelector('[data-qa="resume-block-education-name"]') as HTMLElement)?.innerText ?? '';
		education.organization = (educationInfoElement.querySelector('[data-qa="resume-block-education-organization"]') as HTMLElement)?.innerText ?? '';

		resumeInfo.education.push(education);
	});

	const additionalEducationElements = document.querySelectorAll('[data-qa="resume-block-additional-education"] > .resume-block-item-gap') as NodeListOf<HTMLElement>;
	additionalEducationElements.forEach((additionalEducationElement) => {
		const education: any = {};
		const [educationTimeElement, educationInfoElement] = additionalEducationElement.querySelectorAll('.bloko-column') as NodeListOf<HTMLElement>;

		education.graduationYear = educationTimeElement?.innerText ?? '';
		education.name = (educationInfoElement.querySelector('[data-qa="resume-block-education-name"]') as HTMLElement)?.innerText ?? '';
		education.organization = (educationInfoElement.querySelector('[data-qa="resume-block-education-organization"]') as HTMLElement)?.innerText ?? '';

		resumeInfo.additionalEducation.push(education);
	});

	return resumeInfo;
};