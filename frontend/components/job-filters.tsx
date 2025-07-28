'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import type { JobFilters } from '@/types/job'
import { Briefcase, MapPin, Search, X } from 'lucide-react'

interface JobFiltersProps {
  filters: Partial<JobFilters>
  onFiltersChange: (filters: Partial<JobFilters>) => void
  onClearFilters: () => void
}

export function JobFiltersComponent({ filters, onFiltersChange, onClearFilters }: JobFiltersProps) {
  const handleSalaryChange = (value: [number, number]) => {
    onFiltersChange({ ...filters, salaryMin: value[0], salaryMax: value[1] })
  }

  const formatSalary = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(0)}L`
    }
    return `₹${(value / 1000).toFixed(0)}k`
  }

  const salaryValue: [number, number] = [filters.salaryMin || 0, filters.salaryMax || 200000]

  return (
    <div className="bg-white p-4 rounded-lg border-b mb-8">
      <div className="flex items-center gap-4">
        {/* Job Title Search */}
        <div className="flex items-center gap-2 flex-1 group">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
          <Input
            id="jobTitle"
            placeholder="Search by job title..."
            value={filters.jobTitle || ''}
            onChange={(e) => onFiltersChange({ ...filters, jobTitle: e.target.value })}
            className="w-full bg-transparent border-none focus:ring-0 text-base placeholder:text-gray-400"
          />
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Location */}
        <div className="flex items-center gap-2 flex-1 group">
          <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
          <Input
            id="location"
            placeholder="Location"
            value={filters.location || ''}
            onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
            className="w-full bg-transparent border-none focus:ring-0 text-base placeholder:text-gray-400"
          />
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Job Type */}
        <div className="flex items-center gap-2 flex-1 group">
          <Briefcase className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
          <Select
            value={filters.jobType || 'All Types'}
            onValueChange={(value) => onFiltersChange({ ...filters, jobType: value === 'All Types' ? undefined : value })}
          >
            <SelectTrigger className="w-full bg-transparent border-none focus:ring-0 text-base data-[placeholder]:text-gray-400">
              <SelectValue placeholder="Job Type" />
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

        <Separator orientation="vertical" className="h-6" />

        {/* Salary Range */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Salary per month</span>
            <span className="text-sm font-semibold text-black">{formatSalary(salaryValue[0])} - {formatSalary(salaryValue[1])}</span>
          </div>
          <Slider
            value={salaryValue}
            onValueChange={handleSalaryChange}
            max={200000}
            min={0}
            step={5000}
            className="w-full"
          />
        </div>

        <Button onClick={onClearFilters} variant="ghost" size="icon" className="h-10 w-10">
          <X className="w-5 h-5 text-gray-500" />
        </Button>
      </div>
    </div>
  )
}