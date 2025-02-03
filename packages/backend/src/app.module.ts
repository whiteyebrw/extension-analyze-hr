import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModule } from './jobs/jobs.module';

@Module({
	imports: [MongooseModule.forRoot('mongodb://localhost:27017/jobsdb'), JobsModule],
	controllers: [],
	providers: [],
})
export class AppModule {
}
