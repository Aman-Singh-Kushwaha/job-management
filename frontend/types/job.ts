export interface Job {
  id: string
  jobTitle: string
  companyName: string
  location: string
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship"
  salaryMin?: number
  salaryMax?: number
  jobDescription: string
  applicationDeadline: Date
  createdAt: Date
  updatedAt: Date
}

export interface JobFilters {
  jobTitle?: string
  location?: string
  jobType?: string
  salaryMin?: number
  salaryMax?: number
}

export interface CreateJobData {
  jobTitle: string
  companyName: string
  location: string
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship"
  salaryMin?: number
  salaryMax?: number
  jobDescription: string
  applicationDeadline: Date
}