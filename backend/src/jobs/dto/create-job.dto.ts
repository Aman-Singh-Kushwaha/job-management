import { IsString, IsNotEmpty, IsEnum, IsNumber, IsDate, Min, Max, IsOptional } from 'class-validator';
import { JobType } from '../jobs.entity';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(JobType)
  @IsNotEmpty()
  jobType: JobType;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;

  @IsString()
  @IsNotEmpty()
  responsibilities: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  salaryMin?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  salaryMax?: number;

  @IsDate()
  @IsNotEmpty()
  applicationDeadline: Date;

  @IsString()
  @IsOptional()
  companyLogo?: string;
}
