import { z } from "zod"

export const createJobSchema = z
  .object({
    jobTitle: z
      .string()
      .min(3, "Job title must be at least 3 characters")
      .max(100, "Job title must be less than 100 characters"),

    companyName: z
      .string()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name must be less than 100 characters"),

    location: z
      .string()
      .min(2, "Location must be at least 2 characters")
      .max(100, "Location must be less than 100 characters"),

    jobType: z.enum(["Full-time", "Part-time", "Contract", "Internship"], {
      required_error: "Please select a job type",
    }),

    salaryMin: z.coerce.number().min(0, "Minimum salary must be a positive number"),
    salaryMax: z.coerce.number().min(0, "Maximum salary must be a positive number"),

    jobDescription: z
      .string()
      .min(50, "Job description must be at least 50 characters")
      .max(2000, "Job description must be less than 2000 characters"),


    applicationDeadline: z.date().min(new Date(), "Application deadline must be in the future"),
  })
  .refine((data) => data.salaryMax > data.salaryMin, {
    message: "Maximum salary must be greater than minimum salary",
    path: ["salaryMax"],
  })

export const jobFiltersSchema = z.object({
  jobTitle: z.string().optional(),
  location: z.string().optional(),
  jobType: z.string().optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
})

export type CreateJobFormData = z.infer<typeof createJobSchema>
export type JobFiltersFormData = z.infer<typeof jobFiltersSchema>