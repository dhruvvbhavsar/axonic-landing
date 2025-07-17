"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitJobApplication, uploadResume, uploadFileToS3 } from '@/lib/careers-api'
import { JobApplication } from '@/types/career'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'

interface ApplicationFormProps {
  jobId: string
  jobTitle: string
  onSuccess?: () => void
}

export function ApplicationForm({ jobId, jobTitle, onSuccess }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    coverLetter: '',
    yearsOfExperience: undefined as number | undefined,
    currentLocation: '',
    currentCTC: undefined as number | undefined,
    expectedCTC: undefined as number | undefined,
    noticePeriod: ''
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'number' ? (value === '' ? undefined : Number(value)) : value
    })
    setError(null)
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    })
    setError(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF, DOC, or DOCX file')
      return
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setError('File size must be less than 5MB')
      return
    }

    setResumeFile(file)
    setError(null)
  }

  const uploadResumeFile = async (file: File): Promise<string | null> => {
    try {
      setUploadingResume(true)
      
      // Step 1: Get presigned URL
      const uploadResponse = await uploadResume({
        filename: file.name,
        contentType: file.type,
        fileSize: file.size
      })

      if (!uploadResponse.success || !uploadResponse.data) {
        throw new Error(uploadResponse.error || 'Failed to get upload URL')
      }

      // Step 2: Upload file to S3
      const { uploadUrl, key } = uploadResponse.data
      const uploadSuccess = await uploadFileToS3(uploadUrl, file)

      if (!uploadSuccess) {
        throw new Error('Failed to upload file')
      }

      return key
    } catch (error) {
      console.error('Error uploading resume:', error)
      throw error
    } finally {
      setUploadingResume(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      let resumeKey: string | undefined

      // Upload resume if provided
      if (resumeFile) {
        resumeKey = await uploadResumeFile(resumeFile) || undefined
      }

      // Submit application
      const applicationData: JobApplication = {
        jobId,
        ...formData,
        resumeKey
      }

      const response = await submitJobApplication(applicationData)

      if (response.success) {
        setSubmitted(true)
        onSuccess?.()
      } else {
        setError(response.error || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      setError('Failed to submit application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="application-success text-center py-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
        <p className="text-gray-600 leading-relaxed">
          Thank you for applying to <strong>{jobTitle}</strong>. We'll review your application and get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="application-form space-y-6">
     

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="applicantName" className="text-sm font-medium text-gray-700">
            Full Name *
          </Label>
          <Input
            type="text"
            id="applicantName"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleInputChange}
            required
            className="mt-1"
            placeholder="Your full name"
          />
        </div>

        <div>
          <Label htmlFor="applicantEmail" className="text-sm font-medium text-gray-700">
            Email Address *
          </Label>
          <Input
            type="email"
            id="applicantEmail"
            name="applicantEmail"
            value={formData.applicantEmail}
            onChange={handleInputChange}
            required
            className="mt-1"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="applicantPhone" className="text-sm font-medium text-gray-700">
          Phone Number
        </Label>
        <Input
          type="tel"
          id="applicantPhone"
          name="applicantPhone"
          value={formData.applicantPhone}
          onChange={handleInputChange}
          className="mt-1"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="yearsOfExperience" className="text-sm font-medium text-gray-700">
            Years of Experience
          </Label>
          <Input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience || ''}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="e.g. 5"
            min="0"
            max="50"
          />
        </div>

        <div>
          <Label htmlFor="currentLocation" className="text-sm font-medium text-gray-700">
            Current Location
          </Label>
          <Input
            type="text"
            id="currentLocation"
            name="currentLocation"
            value={formData.currentLocation}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="e.g. New York, NY"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="currentCTC" className="text-sm font-medium text-gray-700">
            Current CTC (in LPA)
          </Label>
          <Input
            type="number"
            id="currentCTC"
            name="currentCTC"
            value={formData.currentCTC || ''}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="e.g. 8.5"
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <Label htmlFor="expectedCTC" className="text-sm font-medium text-gray-700">
            Expected CTC (in LPA)
          </Label>
          <Input
            type="number"
            id="expectedCTC"
            name="expectedCTC"
            value={formData.expectedCTC || ''}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="e.g. 12.0"
            min="0"
            step="0.1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="noticePeriod" className="text-sm font-medium text-gray-700">
          Notice Period
        </Label>
        <Select onValueChange={(value) => handleSelectChange('noticePeriod', value)} value={formData.noticePeriod}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select your notice period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">Immediate</SelectItem>
            <SelectItem value="15-days">15 Days</SelectItem>
            <SelectItem value="1-month">1 Month</SelectItem>
            <SelectItem value="2-months">2 Months</SelectItem>
            <SelectItem value="3-months">3 Months</SelectItem>
            <SelectItem value="negotiable">Negotiable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="resume" className="text-sm font-medium text-gray-700">
          Resume (PDF, DOC, DOCX - Max 5MB)
        </Label>
        <div className="mt-1">
          <label
            htmlFor="resume"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {resumeFile ? (
                <>
                  <FileText className="w-8 h-8 mb-2 text-green-500" />
                  <p className="text-sm text-gray-700 font-medium">{resumeFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX (max 5MB)</p>
                </>
              )}
            </div>
            <input
              id="resume"
              name="resume"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              disabled={uploadingResume || submitting}
            />
          </label>
        </div>
      </div>

      <div>
        <Label htmlFor="coverLetter" className="text-sm font-medium text-gray-700">
          Cover Letter
        </Label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleInputChange}
          rows={6}
          className="mt-1"
          placeholder="Tell us why you're interested in this role and what makes you a great fit..."
        />
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={submitting || uploadingResume || !formData.applicantName || !formData.applicantEmail}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          {submitting || uploadingResume ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {uploadingResume ? 'Uploading Resume...' : 'Submitting Application...'}
            </div>
          ) : (
            'Submit Application'
          )}
        </Button>
      </div>

      <p className="text-sm text-gray-500 text-center">
        By submitting this application, you agree to our{' '}
        <a href="/privacy-policy" className="text-yellow-600 hover:text-yellow-700 underline">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="/terms-conditions" className="text-yellow-600 hover:text-yellow-700 underline">
          Terms & Conditions
        </a>
        .
      </p>
    </form>
  )
} 