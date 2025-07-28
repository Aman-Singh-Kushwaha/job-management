"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, ChevronDown, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { createJobSchema, type CreateJobFormData } from "@/lib/validations"
import { useCreateJob } from "@/hooks/use-jobs"

interface JobCreationFormProps {
  onSuccess: () => void
}

export function JobCreationForm({ onSuccess }: JobCreationFormProps) {
  const { createJob, saveDraft, loading, error } = useCreateJob()
  const [submitType, setSubmitType] = useState<"publish" | "draft">("publish")

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    mode: "onChange",
  })

  const applicationDeadline = watch("applicationDeadline")

  const onSubmit = async (data: CreateJobFormData) => {
    try {
      if (submitType === "draft") {
        await saveDraft(data)
        alert("Draft saved successfully!")
      } else {
        await createJob(data)
        alert("Job posted successfully!")
        onSuccess()
      }
    } catch (err) {
      // Error is handled by the hook
    }
  }

  const handleSaveDraft = () => {
    setSubmitType("draft")
    handleSubmit(onSubmit)()
  }

  const handlePublish = () => {
    setSubmitType("publish")
    handleSubmit(onSubmit)()
  }

  return (
    <Card>
      <CardContent>
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <form className="space-y-6">
          {/* Job Title & Company Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-sm font-medium">
                Job Title *
              </Label>
              <Input
                id="jobTitle"
                {...register("jobTitle")}
                placeholder="e.g. Full Stack Developer"
                className="border-[#ccc2c2] focus:border-[#a797fd] rounded-lg"
              />
              {errors.jobTitle && <p className="text-sm text-red-600">{errors.jobTitle.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-medium">
                Company Name *
              </Label>
              <Input
                id="companyName"
                {...register("companyName")}
                placeholder="e.g. Amazon, Microsoft, Swiggy"
                className="border-[#ccc2c2] focus:border-[#a797fd] rounded-lg"
              />
              {errors.companyName && <p className="text-sm text-red-600">{errors.companyName.message}</p>}
            </div>
          </div>

          {/* Location & Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Location *
              </Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="e.g. Bangalore, Remote, Hybrid"
                className="border-[#ccc2c2] focus:border-[#a797fd] rounded-lg"
              />
              {errors.location && <p className="text-sm text-red-600">{errors.location.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Job Type *</Label>
              <Select onValueChange={(value) => setValue("jobType", value as any)}>
                <SelectTrigger className="border-[#ccc2c2] focus:border-[#a797fd] rounded-lg">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time" defaultChecked>Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              {errors.jobType && <p className="text-sm text-red-600">{errors.jobType.message}</p>}
            </div>
          </div>

          {/* Salary Range & Application Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salaryMin" className="text-sm font-medium">
                Salary Range
              </Label>
              <div className="flex space-x-1   ">
                <Input
                  id="salaryMin"
                  type="number"
                  {...register("salaryMin")}
                  placeholder="0"
                  className="border-[#ccc2c2] focus:border-[#a797fd] rounded-lg"
                />
                {errors.salaryMin && <p className="text-sm text-red-600">{errors.salaryMin.message}</p>}
              
                <Input
                  id="salaryMax"
                  type="number"
                  {...register("salaryMax")}
                  placeholder="1200000"
                  className="border-[#ccc2c2] focus:border-[#a797fd] rounded-lg"
                />
                {errors.salaryMax && <p className="text-sm text-red-600">{errors.salaryMax.message}</p>}
              </div>
            </div>
          
            <div className="space-y-2">
              <Label className="text-sm font-medium">Application Deadline *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-[#ccc2c2] focus:border-[#a797fd] rounded-lg",
                      !applicationDeadline && "text-[#bab7cc]",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#686868]" />
                    {applicationDeadline ? format(applicationDeadline, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={applicationDeadline}
                    onSelect={(date) => setValue("applicationDeadline", date!)}
                    disabled={(date) => date < new Date()}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.applicationDeadline && (
                <p className="text-sm text-red-600">{errors.applicationDeadline.message}</p>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="jobDescription" className="text-sm font-medium">
              Job Description *
            </Label>
            <Textarea
              id="jobDescription"
              {...register("jobDescription")}
              placeholder="Provide a detailed description of the job role, what the candidate will be doing, and what makes this opportunity exciting..."
              className="border-[#ccc2c2] focus:border-[#a797fd] rounded-lg min-h-[120px]"
            />
            {errors.jobDescription && <p className="text-sm text-red-600">{errors.jobDescription.message}</p>}
          </div>

          

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={loading}
              className="px-8 py-2 border-[#ccc2c2] text-[#333333] hover:bg-[#f0f0f1] rounded-lg bg-transparent"
            >
              {loading && submitType === "draft" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Draft
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>

            <Button
              type="button"
              onClick={handlePublish}
              disabled={loading || !isValid}
              className="px-8 py-2 bg-[#00aaff] hover:bg-[#0099ee] text-white rounded-lg"
            >
              {loading && submitType === "publish" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publish Job
              <span className="ml-2">»</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
