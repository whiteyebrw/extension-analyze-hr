import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job, JobSchema } from './schemas/job.schema';
import { Vacancy, VacancySchema } from './schemas/vacancy.schema';
import { Resume, ResumeSchema } from './schemas/resume.schema';
import { LlmService } from './llm.service';

@Module({
	imports: [MongooseModule.forFeature([
		{
			name: Job.name,
			schema: JobSchema
		},
		{
			name: Vacancy.name,
			schema: VacancySchema
		},
		{
			name: Resume.name,
			schema: ResumeSchema
		}
	])],
	controllers: [JobsController],
	providers: [JobsService, LlmService],
})
export class JobsModule {
}
