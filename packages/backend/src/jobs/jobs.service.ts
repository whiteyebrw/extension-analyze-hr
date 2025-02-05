import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { Vacancy, VacancyDocument } from './schemas/vacancy.schema';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { CreateResumeDto } from './dto/resume.dto';
import { CreateJobDto } from './dto/job.dto';
import { LlmService } from './llm.service';

@Injectable()
export class JobsService {
	constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>,
							@InjectModel(Vacancy.name) private vacancyModel: Model<VacancyDocument>,
							@InjectModel(Resume.name) private resumeModel: Model<ResumeDocument>,
							private readonly llmService: LlmService) {
	}

	async createJob(createJobDto: CreateJobDto): Promise<Job> {
		const { vacancyUrl, resumeUrls } = createJobDto;

		const vacancy = await this.vacancyModel.findOne({ url: vacancyUrl });
		if (!vacancy) {
			throw new NotFoundException(`Вакансия с URL ${vacancyUrl} не найдена`);
		}

		const resumes = await this.resumeModel.find({ url: { $in: resumeUrls } }).exec();
		const foundResumeUrls = resumes.map(resume => resume.url);
		const missingResumes = resumeUrls.filter(url => !foundResumeUrls.includes(url));

		if (missingResumes.length > 0) {
			throw new NotFoundException(`Не найдены следующие резюме: ${missingResumes.join(', ')}`);
		}

		const prompt = this.generatePrompt(vacancy, resumes);
		const resultAnalyze = await this.llmService.generateText(prompt)

		const job = new this.jobModel({
			vacancy: vacancy._id,
			resumes: resumes.map(resume => resume._id),
			result: resultAnalyze.content,
		});

		await job.save();
		return job;
	}

	async createOrUpdateVacancy(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
		const { url } = createVacancyDto;
		const updatedVacancy = await this.vacancyModel.findOneAndUpdate({ url }, createVacancyDto, { new: true });

		if (updatedVacancy) {
			return updatedVacancy;
		}

		const newVacancy = new this.vacancyModel(createVacancyDto);
		return newVacancy.save();
	}

	async findAllVacancy(): Promise<Vacancy[]> {
		return this.vacancyModel.find().exec();
	}

	async createOrUpdateResume(createResumeDto: CreateResumeDto): Promise<Resume> {
		const { url } = createResumeDto;
		const updatedResume = await this.resumeModel.findOneAndUpdate({ url }, createResumeDto, { new: true });

		if (updatedResume) {
			return updatedResume;
		}

		const newResume = new this.resumeModel(createResumeDto);
		return newResume.save();
	}

	async findAllResume(): Promise<Resume[]> {
		return this.resumeModel.find().exec();
	}

	async findAllIds(): Promise<{ id: string }[]> {
		const jobs = await this.jobModel.find().select('_id').exec();
		return jobs.map(job => ({ id: job._id.toString() }));
	}

	async findById(id: string) {
		const job = await this.jobModel
			.findById(id)
			.populate('vacancy', 'url')
			.populate('resumes', 'url')
			.exec();

		if (!job) {
			throw new NotFoundException(`Job с ID "${id}" не найден`);
		}

		return {
			id: job._id.toString(),
			vacancyUrl: job.vacancy.url,
			resumeUrls: job.resumes.map(resume => resume.url),
			result: job.result
		};
	}

	private generatePrompt(vacancy: Vacancy, candidates: Resume[]): string {
		return `
Ты — аналитик по подбору персонала. Твоя задача — проанализировать, какие из предложенных кандидатов наиболее соответствуют вакансии.

### **Вакансия:**
- **Заголовок:** ${vacancy.title}
- **Зарплата:** ${vacancy.salary ?? 'Не указано'}
- **Опыт:** ${vacancy.experience ?? 'Не указано'}
- **Описание:** ${vacancy.description}
- **Навыки:** ${vacancy.skills.join(', ')}
- **Адрес:** ${vacancy.address ?? 'Не указан'}

### **Кандидаты:**
${candidates.map((candidate, index) => `
#### **Кандидат ${index + 1}:**
- **ФИО:** ${candidate.url}
- **Пол:** ${candidate.gender ?? 'Не указан'}
- **Возраст:** ${candidate.age ?? 'Не указан'}
- **Должность:** ${candidate.position}
- **Желаемая зарплата:** ${candidate.salary ?? 'Не указана'}
- **Навыки:** ${candidate.skills.join(', ')}
- **Опыт работы:**
  ${candidate.experience.map(exp => `• ${exp.position} в ${exp.companyName} (${exp.duration})`).join('\n  ')}
- **Образование:** 
  ${candidate.education.map(ed => `• ${ed.name}, ${ed.organization} (${ed.graduationYear})`).join('\n  ')}
`).join('\n')}

### **Задача:**
1. Сравни требования вакансии с данными кандидатов.
2. Оцени соответствие каждого кандидата:
   - Опыт (релевантность, продолжительность)
   - Навыки (соответствие требованиям)
   - Образование (релевантность)
   - Зарплатные ожидания (совпадают ли)
   - Локация (насколько совпадает)
3. Отсортируй кандидатов по уровню соответствия.
4. Дай развернутый анализ каждого кандидата: сильные и слабые стороны.
5. Выведи итоговый рейтинг (от самого подходящего до наименее подходящего).
    `;
	}
}
