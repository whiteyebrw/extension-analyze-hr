import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VacancyDocument = HydratedDocument<Vacancy>;

@Schema()
export class Vacancy {
	@Prop({ required: true })
	url: string;

	@Prop({ required: true })
	title: string;

	@Prop()
	salary: string;

	@Prop()
	experience: string;

	@Prop()
	description: string;

	@Prop([String])
	skills: string[];

	@Prop()
	address: string;

	@Prop({ default: Date.now })
	createdAt: Date;
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);
