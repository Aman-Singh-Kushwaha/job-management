const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

// Generic API call function
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API call failed:", error)
    throw error
  }
}

// Jobs API
export const jobsApi = {
  // Get all jobs with optional filters
  getJobs: async (filters = {}) => {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(","))
        } else {
          queryParams.append(key, value.toString())
        }
      }
    })

    const endpoint = `/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return apiCall(endpoint)
  },

  // Get single job by ID
  getJobById: async (id) => {
    return apiCall(`/jobs/${id}`)
  },

  // Create new job
  createJob: async (jobData) => {
    return apiCall("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    })
  },

  // Update existing job
  updateJob: async (id, jobData) => {
    return apiCall(`/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify(jobData),
    })
  },

  // Delete job
  deleteJob: async (id) => {
    return apiCall(`/jobs/${id}`, {
      method: "DELETE",
    })
  },

  // Save job as draft
  saveDraft: async (jobData) => {
    return apiCall("/jobs/draft", {
      method: "POST",
      body: JSON.stringify(jobData),
    })
  },
}


