"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Building } from "lucide-react"
import type { Job } from "@/types/job"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const getCompanyInitial = (companyName: string) => {
    return companyName.charAt(0).toUpperCase()
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const jobDate = new Date(date); // Ensure date is a Date object
    const diffTime = Math.abs(now.getTime() - jobDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  return (
    <div className="bg-[#ffffff] rounded-2xl p-6 border border-[#eaeaea] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">{getCompanyInitial(job.companyName)}</span>
        </div>
        <span className="text-[#686868] text-sm">{formatDate(job.createdAt)}</span>
      </div>

      <h3 className="font-semibold text-[#222222] mb-2 text-lg">{job.jobTitle}</h3>

      <div className="flex items-center text-sm text-[#686868] mb-3">
        <Building className="w-4 h-4 mr-1" />
        <span>{job.companyName}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="text-xs">
          <MapPin className="w-3 h-3 mr-1" />
          {job.location}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          <Clock className="w-3 h-3 mr-1" />
          {job.jobType}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          <DollarSign className="w-3 h-3 mr-1" />
          {job.salaryMax}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-[#686868]">
          Apply by: {new Date(job.applicationDeadline).toLocaleDateString()}
        </span>
        <Button className="bg-[#00aaff] hover:bg-[#0099ee] text-white rounded-lg px-6">Apply Now</Button>
      </div>
    </div>
  )
}
