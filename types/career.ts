// types/career.ts
export interface CareerMeta {
  id: string
  slug: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
  postedDate: string
  status: 'active' | 'inactive' | 'closed'
}

export interface Career extends CareerMeta {
  content: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  seoTitle?: string
  seoDescription?: string
}

export interface CareerResponse {
  success: boolean
  data: CareerMeta[] | Career | { jobs: CareerMeta[], total: number, page: number, limit: number }
  total?: number
  message?: string
  error?: string
}

export interface JobApplication {
  jobId: string
  applicantName: string
  applicantEmail: string
  applicantPhone?: string
  coverLetter?: string
  resumeKey?: string
  yearsOfExperience?: number
  currentLocation?: string
  currentCTC?: number
  expectedCTC?: number
  noticePeriod?: string
}

export interface ApplicationResponse {
  success: boolean
  data?: {
    id: string
    message: string
  }
  error?: string
}

export interface ResumeUploadRequest {
  filename: string
  contentType: string
  fileSize: number
}

export interface ResumeUploadResponse {
  success: boolean
  data?: {
    uploadUrl: string
    key: string
  }
  error?: string
} 