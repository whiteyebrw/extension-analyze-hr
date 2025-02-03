import { IsNotEmpty, IsArray, ArrayMaxSize, IsUrl, ArrayMinSize, ArrayUnique } from 'class-validator';

export class CreateJobDto {
	@IsNotEmpty()
	@IsUrl()
	vacancyUrl: string;

	@IsArray()
	@ArrayUnique()
	@ArrayMinSize(3)
	@ArrayMaxSize(5)
	@IsUrl(undefined, { each: true })
	resumeUrls: string[];
}
