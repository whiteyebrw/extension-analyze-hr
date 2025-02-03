import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
	@Prop({ required: true })
	platform: string;

	@Prop({ required: true })
	title: string;

	@Prop()
	description: string;

	@Prop()
	companyName: string;

	@Prop()
	location: string;

	@Prop([String])
	requirements: string[];

	@Prop({ type: Object }) // Для специфичных данных платформ
	customData: Record<string, any>;

	@Prop({ default: Date.now })
	createdAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
