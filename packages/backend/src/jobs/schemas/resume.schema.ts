import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;

class Experience {
	@Prop()
	duration: string;

	@Prop()
	companyName: string;

	@Prop()
	position: string;

	@Prop()
	description: string;
}

class Education {
	@Prop()
	graduationYear: string;

	@Prop()
	name: string;

	@Prop()
	organization: string;
}

@Schema()
export class Resume {
	@Prop({ required: true })
	url: string;

	@Prop()
	gender: string;

	@Prop()
	age: string;

	@Prop({ required: true })
	position: string;

	@Prop()
	salary: string;

	@Prop()
	address: string;

	@Prop({ type: [Experience], default: [] })
	experience: Experience[];

	@Prop({ type: [String], default: [] })
	skills: string[];

	@Prop({ type: [Education], default: [] })
	education: Education[];

	@Prop({ type: [Education], default: [] })
	additionalEducation: Education[];

	@Prop({ default: Date.now })
	createdAt: Date;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
