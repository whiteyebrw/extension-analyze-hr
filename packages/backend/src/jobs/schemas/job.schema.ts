import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Resume } from './resume.schema';
import { Vacancy } from './vacancy.schema';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
	@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vacancy', required: true })
	vacancy: Vacancy;

	@Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Resume' }], required: true })
	resumes: Resume[];

	@Prop({ required: true })
	result: string;

	@Prop({ default: Date.now })
	createdAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
