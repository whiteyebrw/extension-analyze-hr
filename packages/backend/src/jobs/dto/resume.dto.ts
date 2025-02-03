import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ExperienceDto {
	@IsOptional()
	@IsString()
	duration?: string;

	@IsOptional()
	@IsString()
	companyName?: string;

	@IsOptional()
	@IsString()
	position?: string;

	@IsOptional()
	@IsString()
	description?: string;
}

class EducationDto {
	@IsOptional()
	@IsString()
	graduationYear?: string;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	organization?: string;
}

export class CreateResumeDto {
	@IsString()
	url: string;

	@IsOptional()
	@IsString()
	gender?: string;

	@IsOptional()
	@IsString()
	age?: string;

	@IsString()
	position: string;

	@IsOptional()
	@IsString()
	salary?: string;

	@IsOptional()
	@IsString()
	address?: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ExperienceDto)
	experience: ExperienceDto[];

	@IsArray()
	@IsString({ each: true })
	skills: string[];

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => EducationDto)
	education: EducationDto[];

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => EducationDto)
	additionalEducation: EducationDto[];
}
