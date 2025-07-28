"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { JobCard } from "@/components/job-card"
import { JobCreationForm } from "@/components/job-creation-form"
import { JobFiltersComponent } from "@/components/job-filters"
import { useJobs } from "@/hooks/use-jobs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function JobListPage() {
  const { jobs, loading, error, filters, updateFilters, clearFilters, refetch } = useJobs()
  const [isCreateJobOpen, setCreateJobOpen] = useState(false)

  const handleJobCreated = () => {
    setCreateJobOpen(false)
    refetch()
  }

  return (
    <Dialog open={isCreateJobOpen} onOpenChange={setCreateJobOpen}>
      <div className="min-h-screen bg-[#fbfbff]">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-8">
          {error ? (
            <Alert className="max-w-md mx-auto">
              <AlertDescription>{error}. Please try again later.</AlertDescription>
            </Alert>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-80 flex-shrink-0">
                <JobFiltersComponent
                  filters={filters}
                  onFiltersChange={updateFilters}
                  onClearFilters={clearFilters}
                />
              </div>

              {/* Job Listings */}
              <div className="flex-1">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-[#222222] mb-2">Job Opportunities</h1>
                  <p className="text-[#686868]">{loading ? "Loading..." : `${jobs.length} jobs found`}</p>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="bg-white rounded-2xl p-6 border border-[#eaeaea]">
                        <div className="flex items-center justify-between mb-4">
                          <Skeleton className="w-12 h-12 rounded-full" />
                          <Skeleton className="w-16 h-4" />
                        </div>
                        <Skeleton className="w-3/4 h-6 mb-2" />
                        <Skeleton className="w-1/2 h-4 mb-4" />
                        <div className="space-y-2 mb-4">
                          <Skeleton className="w-full h-4" />
                          <Skeleton className="w-full h-4" />
                          <Skeleton className="w-2/3 h-4" />
                        </div>
                        <Skeleton className="w-full h-10" />
                      </div>
                    ))}
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-[#686868] text-lg">No jobs found matching your criteria.</p>
                    <p className="text-[#686868] text-sm mt-2">Try adjusting your filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create Job Opening</DialogTitle>
          </DialogHeader>
          <JobCreationForm onSuccess={handleJobCreated} />
        </DialogContent>
      </div>
    </Dialog>
  )
}