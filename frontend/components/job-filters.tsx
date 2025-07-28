"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, X } from "lucide-react"
import type { JobFilters } from "@/types/job"

interface JobFiltersProps {
  filters: Partial<JobFilters>
  onFiltersChange: (filters: Partial<JobFilters>) => void
  onClearFilters: () => void
}

export function JobFiltersComponent({ filters, onFiltersChange, onClearFilters }: JobFiltersProps) {
  const [salaryRange, setSalaryRange] = useState<[number, number]>(filters.salaryRange || [0, 200000])

  const handleSalaryChange = (value: [number, number]) => {
    setSalaryRange(value)
    onFiltersChange({ ...filters, salaryRange: value })
  }

  const formatSalary = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(0)}L`
    }
    return `₹${(value / 1000).toFixed(0)}k`
  }

  return (
    <Card className="w-full rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-[#686868] hover:text-[#333333]">
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Title Search */}
        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="text-sm font-medium">
            Job Title
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#686868]" />
            <Input
              id="jobTitle"
              placeholder="Search by job title..."
              value={filters.jobTitle || ""}
              onChange={(e) => onFiltersChange({ ...filters, jobTitle: e.target.value })}
              className="pl-10 border-[#ccc2c2] focus:border-[#a797fd] rounded-lg"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Location
          </Label>
          <Input
            id="location"
            placeholder="Enter location..."
            value={filters.location || ""}
            onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
            className="border-[#ccc2c2] focus:border-[#a797fd] rounded-lg"
          />
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Job Type</Label>
          <Select
            value={filters.jobType || "All Types"}
            onValueChange={(value) => onFiltersChange({ ...filters, jobType: value })}
          >
            <SelectTrigger className="border-[#ccc2c2] focus:border-[#a797fd] rounded-lg">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Salary Range</Label>
          <div className="px-2">
            <Slider
              value={salaryRange}
              onValueChange={handleSalaryChange}
              max={200000}
              min={0}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-[#686868] mt-2">
              <span>{formatSalary(salaryRange[0])}</span>
              <span>{formatSalary(salaryRange[1])}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
