"use client"

import { useState, useEffect, useCallback } from "react"
import { jobsApi } from "@/lib/api"
import type { Job, JobFilters } from "@/types/job"
import { useDebounce } from "@/hooks/use-debounce"

export function useJobs(initialFilters: Partial<JobFilters> = {}) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<Partial<JobFilters>>(initialFilters)

  const debouncedJobTitle = useDebounce(filters.jobTitle, 500)
  const debouncedLocation = useDebounce(filters.location, 500)
  const debouncedSalaryMin = useDebounce(filters.salaryMin, 500)
  const debouncedSalaryMax = useDebounce(filters.salaryMax, 500)
  const fetchJobs = useCallback(async (currentFilters: Partial<JobFilters>) => {
    try {
      setLoading(true)
      setError(null)
      const response = await jobsApi.getJobs(currentFilters)
      setJobs(response.data || response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch jobs")
      setJobs([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const currentFilters : JobFilters = {
      jobTitle: debouncedJobTitle,
      location: debouncedLocation,
      salaryMin: debouncedSalaryMin,
      salaryMax: debouncedSalaryMax,
      ...filters.jobType
    }
    fetchJobs(currentFilters)
  }, [debouncedJobTitle, debouncedLocation, filters.jobType, debouncedSalaryMin, debouncedSalaryMax, fetchJobs])

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  return {
    jobs,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refetch: () => fetchJobs(filters),
  }
}

export function useCreateJob() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createJob = async (jobData: any) => {
    try {
      setLoading(true)
      setError(null)
      const response = await jobsApi.createJob(jobData)
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create job"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const saveDraft = async (jobData: any) => {
    try {
      setLoading(true)
      setError(null)
      const response = await jobsApi.saveDraft(jobData)
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to save draft"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    createJob,
    saveDraft,
    loading,
    error,
  }
}
