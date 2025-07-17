// lib/careers-api.ts
import { CareerMeta, Career, CareerResponse, JobApplication, ApplicationResponse, ResumeUploadRequest, ResumeUploadResponse } from '@/types/career'

const API_BASE_URL = process.env.NEXT_PUBLIC_CAREERS_API_URL || 'https://blogs.axonichealth.com'

// Server-side functions (with caching)
export async function getAllCareers(): Promise<CareerMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/careers?status=active`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch careers')
    }
    
    const data: CareerResponse = await response.json()
    
    if (data.success) {
      // Handle both array format and paginated format
      if (Array.isArray(data.data)) {
        return data.data as CareerMeta[]
      } else if (data.data && typeof data.data === 'object' && 'jobs' in data.data) {
        return (data.data as { jobs: CareerMeta[] }).jobs
      }
    }
    return []
  } catch (error) {
    console.error('Error fetching careers:', error)
    return []
  }
}

export async function getRecentCareers(limit: number = 5): Promise<CareerMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/careers?status=active&limit=${limit}`, {
      cache: 'no-store',
    })
    
    const data: CareerResponse = await response.json()
    
    if (data.success) {
      if (Array.isArray(data.data)) {
        return data.data as CareerMeta[]
      } else if (data.data && typeof data.data === 'object' && 'jobs' in data.data) {
        return (data.data as { jobs: CareerMeta[] }).jobs
      }
    }
    return []
  } catch (error) {
    console.error('Error fetching recent careers:', error)
    return []
  }
}

export async function getCareerBySlug(slug: string): Promise<Career | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/careers/slug/${slug}`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      return null
    }
    
    const data: CareerResponse = await response.json()
    return data.success ? data.data as Career : null
  } catch (error) {
    console.error('Error fetching career:', error)
    return null
  }
}

export async function getCareersByDepartment(department: string): Promise<CareerMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/careers?status=active&department=${encodeURIComponent(department)}`, {
      cache: 'no-store',
    })
    
    const data: CareerResponse = await response.json()
    
    if (data.success) {
      if (Array.isArray(data.data)) {
        return data.data as CareerMeta[]
      } else if (data.data && typeof data.data === 'object' && 'jobs' in data.data) {
        return (data.data as { jobs: CareerMeta[] }).jobs
      }
    }
    return []
  } catch (error) {
    console.error('Error fetching careers by department:', error)
    return []
  }
}

export async function searchCareers(query: string): Promise<CareerMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/careers?status=active&search=${encodeURIComponent(query)}`, {
      cache: 'no-store',
    })
    
    const data: CareerResponse = await response.json()
    
    if (data.success) {
      if (Array.isArray(data.data)) {
        return data.data as CareerMeta[]
      } else if (data.data && typeof data.data === 'object' && 'jobs' in data.data) {
        return (data.data as { jobs: CareerMeta[] }).jobs
      }
    }
    return []
  } catch (error) {
    console.error('Error searching careers:', error)
    return []
  }
}

// Client-side functions (for use in client components)
export async function getAllCareersClient(): Promise<CareerMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/careers?status=active`)
    const data: CareerResponse = await response.json()
    
    if (data.success) {
      if (Array.isArray(data.data)) {
        return data.data as CareerMeta[]
      } else if (data.data && typeof data.data === 'object' && 'jobs' in data.data) {
        return (data.data as { jobs: CareerMeta[] }).jobs
      }
    }
    return []
  } catch (error) {
    console.error('Error fetching careers:', error)
    return []
  }
}

export async function getCareerBySlugClient(slug: string): Promise<Career | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/careers/slug/${slug}`)
    const data: CareerResponse = await response.json()
    return data.success ? data.data as Career : null
  } catch (error) {
    console.error('Error fetching career:', error)
    return null
  }
}

export async function getRecentCareersClient(limit: number = 5): Promise<CareerMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/careers?status=active&limit=${limit}`)
    const data: CareerResponse = await response.json()
    
    if (data.success) {
      if (Array.isArray(data.data)) {
        return data.data as CareerMeta[]
      } else if (data.data && typeof data.data === 'object' && 'jobs' in data.data) {
        return (data.data as { jobs: CareerMeta[] }).jobs
      }
    }
    return []
  } catch (error) {
    console.error('Error fetching recent careers:', error)
    return []
  }
}

export async function searchCareersClient(query: string): Promise<CareerMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/careers?status=active&search=${encodeURIComponent(query)}`)
    const data: CareerResponse = await response.json()
    
    if (data.success) {
      if (Array.isArray(data.data)) {
        return data.data as CareerMeta[]
      } else if (data.data && typeof data.data === 'object' && 'jobs' in data.data) {
        return (data.data as { jobs: CareerMeta[] }).jobs
      }
    }
    return []
  } catch (error) {
    console.error('Error searching careers:', error)
    return []
  }
}

export async function getCareersByDepartmentClient(department: string): Promise<CareerMeta[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/careers?status=active&department=${encodeURIComponent(department)}`)
    const data: CareerResponse = await response.json()
    
    if (data.success) {
      if (Array.isArray(data.data)) {
        return data.data as CareerMeta[]
      } else if (data.data && typeof data.data === 'object' && 'jobs' in data.data) {
        return (data.data as { jobs: CareerMeta[] }).jobs
      }
    }
    return []
  } catch (error) {
    console.error('Error fetching careers by department:', error)
    return []
  }
}

// Application submission functions
export async function submitJobApplication(application: JobApplication): Promise<ApplicationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(application),
    })
    
    const data: ApplicationResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error submitting application:', error)
    return {
      success: false,
      error: 'Failed to submit application. Please try again.',
    }
  }
}

// Resume upload functions
export async function uploadResume(resumeRequest: ResumeUploadRequest): Promise<ResumeUploadResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/upload/resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeRequest),
    })
    
    const data: ResumeUploadResponse = await response.json()
    console.log('Resume upload response:', data)
    return data
  } catch (error) {
    console.error('Error uploading resume:', error)
    return {
      success: false,
      error: 'Failed to upload resume. Please try again.',
    }
  }
}

export async function uploadFileToS3(uploadUrl: string, file: File): Promise<boolean> {
  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    })
    
    return response.ok
  } catch (error) {
    console.error('Error uploading file to S3:', error)
    return false
  }
}

// Utility function to get unique departments
export async function getUniqueDepartments(): Promise<string[]> {
  try {
    const careers = await getAllCareersClient()
    const departments = careers.map(career => career.department)
    return [...new Set(departments)].sort()
  } catch (error) {
    console.error('Error fetching departments:', error)
    return []
  }
} 