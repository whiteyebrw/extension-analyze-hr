import { Body, Controller, Get, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './schemas/job.schema';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { Vacancy } from './schemas/vacancy.schema';

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
	}

	@Get()
	async findAll(): Promise<Job[]> {
		return this.jobsService.findAll();
	}
}
