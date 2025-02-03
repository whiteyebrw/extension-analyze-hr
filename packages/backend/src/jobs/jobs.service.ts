import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { Vacancy, VacancyDocument } from './schemas/vacancy.schema';

@Injectable()
export class JobsService {
	constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>,
							@InjectModel(Vacancy.name) private vacancyModel: Model<VacancyDocument>) {
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

	async findAll(): Promise<Job[]> {
		return this.jobModel.find().exec();
	}
}
