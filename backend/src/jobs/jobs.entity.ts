import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum JobType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
}

@Entity({ name: 'jobs' })
@Index('idx_jobs_title', ['jobTitle'])
export class Job {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'job_title', type: 'varchar', length: 100 })
  jobTitle: string;

  @Column({ name: 'company_name', type: 'varchar', length: 100 })
  companyName: string;

  @Column({ type: 'text' })
  location: string;

  @Column({ name: 'job_type', type: 'enum', enum: JobType })
  jobType: JobType;

  @Column({ name: 'job_description', type: 'text' })
  jobDescription: string;

  @Column({ name: 'salary_min', type: 'int', nullable: true })
  salaryMin: number;

  @Column({ name: 'salary_max', type: 'int', nullable: true })
  salaryMax: number;

  @Column({ name: 'application_deadline', type: 'date' })
  applicationDeadline: Date;

  @Column({ name: 'company_logo', type: 'text', nullable: true })
  companyLogo: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}