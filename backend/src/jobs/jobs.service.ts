import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Brackets } from "typeorm";
import { Job } from "./jobs.entity";
import { CreateJobDto } from "./dto/create-job.dto";

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const newJob = this.jobsRepository.create(createJobDto);
    return this.jobsRepository.save(newJob);
  }

  async findAll(filters: any): Promise<Job[]> {
    const query = this.jobsRepository.createQueryBuilder("job");

    if (filters.jobTitle) {
      query.andWhere("job.jobTitle ILIKE :jobTitle", { jobTitle: `%${filters.jobTitle}%` });
    }

    if (filters.location) {
      query.andWhere("job.location ILIKE :location", { location: `%${filters.location}%` });
    }

    if (filters.jobType) {
      query.andWhere("job.jobType = :jobType", { jobType: filters.jobType });
    }

    if (filters.salaryMin) {
      query.andWhere("job.salaryMin >= :salaryMin", { salaryMin: filters.salaryMin });
    }

    if (filters.salaryMax) {
      query.andWhere("job.salaryMax <= :salaryMax", { salaryMax: filters.salaryMax });
    }

    return query.getMany();
  }
}
