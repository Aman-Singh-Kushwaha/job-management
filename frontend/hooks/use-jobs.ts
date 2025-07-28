"use client"

import { useState, useEffect } from "react"
import { jobsApi } from "@/lib/api"
import type { Job, JobFilters } from "@/types/job"

export function useJobs(initialFilters: Partial<JobFilters> = {}) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<Partial<JobFilters>>(initialFilters)

  const fetchJobs = async (currentFilters = filters) => {
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
  }

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    fetchJobs(updatedFilters)
  }

  const clearFilters = () => {
    setFilters({})
    fetchJobs({})
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return {
    jobs,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refetch: fetchJobs,
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
