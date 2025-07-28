import { IsString, IsNotEmpty, IsEnum, IsNumber, IsDate, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
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

  @IsNumber()
  @IsOptional()
  @Min(0)
  salaryMin?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  salaryMax?: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  applicationDeadline: Date;

  @IsString()
  @IsOptional()
  companyLogo?: string;
}
