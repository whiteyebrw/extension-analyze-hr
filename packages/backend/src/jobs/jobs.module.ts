import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job, JobSchema } from './schemas/job.schema';
import { Vacancy, VacancySchema } from './schemas/vacancy.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }, {
		name: Vacancy.name,
		schema: VacancySchema
	}])],
	controllers: [JobsController],
	providers: [JobsService],
})
export class JobsModule {
}
