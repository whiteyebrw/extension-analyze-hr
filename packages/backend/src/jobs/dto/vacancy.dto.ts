import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateVacancyDto {
	@IsString()
	url: string;

	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	salary?: string;

	@IsOptional()
	@IsString()
	experience?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsArray()
	skills: string[];

	@IsOptional()
	@IsString()
	address?: string;
}
