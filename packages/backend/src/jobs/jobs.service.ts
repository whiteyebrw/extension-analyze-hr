import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { Vacancy, VacancyDocument } from './schemas/vacancy.schema';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { CreateResumeDto } from './dto/resume.dto';
import { CreateJobDto } from './dto/job.dto';

@Injectable()
export class JobsService {
	constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>,
							@InjectModel(Vacancy.name) private vacancyModel: Model<VacancyDocument>,
							@InjectModel(Resume.name) private resumeModel: Model<ResumeDocument>) {
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

		const matchedResumes = await this.analyzeResumes(vacancy, resumes);

		const job = new this.jobModel({
			vacancy: vacancy._id,
			resumes: resumes.map(resume => resume._id),
			matchedResumes
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
			matchedResumes: job.matchedResumes
		};
	}

	private async analyzeResumes(vacancy: Vacancy, resumes: Resume[]) {
		const body = {
			vacancy: {
				description: vacancy.description,
				skills: vacancy.skills,
			},
			candidates: resumes.map(resume => ({
				id: resume.url,
				description: resume.experience.map(experience => experience.description).join(' '),
				skills: resume.skills,
			}))
		};

		const response = await fetch('http://127.0.0.1:8000/match_candidates/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		const data = await response.json();

		return data.matched_candidates;
	}
}
