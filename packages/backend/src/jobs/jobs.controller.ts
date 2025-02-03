import { Body, Controller, Get, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './schemas/job.schema';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { Vacancy } from './schemas/vacancy.schema';
import { CreateResumeDto } from './dto/resume.dto';
import { Resume } from './schemas/resume.schema';

@Controller('jobs')
export class JobsController {
	constructor(private readonly jobsService: JobsService) {}

	@Post('vacancy')
	async createOrUpdateVacancy(@Body() createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
		return this.jobsService.createOrUpdateVacancy(createVacancyDto);
	}

	@Get('vacancy')
	async findAllVacancy(): Promise<Vacancy[]> {
		return this.jobsService.findAllVacancy();
	}Ò

	@Post('resume')
	async createOrUpdateResume(@Body() createResumeDto: CreateResumeDto): Promise<Resume> {
		return this.jobsService.createOrUpdateResume(createResumeDto);
	}

	@Get('resume')
	async findAllResume(): Promise<Resume[]> {
		return this.jobsService.findAllResume();
	}

	@Get()
	async findAll(): Promise<Job[]> {
		return this.jobsService.findAll();
	}
}
