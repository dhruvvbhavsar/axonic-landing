import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const careersDirectory = path.join(process.cwd(), 'careers')

export interface Career {
  slug: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  salary?: string
  description: string
  postedDate: string
  applicationDeadline?: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  content: string
}

export interface CareerMeta {
  slug: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  salary?: string
  description: string
  postedDate: string
  applicationDeadline?: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
}

export function getAllCareerSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(careersDirectory)
    return fileNames
      .filter(name => name.endsWith('.mdx'))
      .map(name => name.replace(/\.mdx$/, ''))
  } catch (error) {
    console.warn('Careers directory not found or empty')
    return []
  }
}

export function getCareerBySlug(slug: string): Career | null {
  try {
    const fullPath = path.join(careersDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || 'Untitled Position',
      department: data.department || 'General',
      location: data.location || 'Remote',
      type: data.type || 'Full-time',
      experience: data.experience || 'Entry Level',
      salary: data.salary,
      description: data.description || '',
      postedDate: data.postedDate || new Date().toISOString(),
      applicationDeadline: data.applicationDeadline,
      requirements: data.requirements || [],
      responsibilities: data.responsibilities || [],
      benefits: data.benefits || [],
      content,
    }
  } catch (error) {
    console.error(`Error reading career post ${slug}:`, error)
    return null
  }
}

export function getAllCareers(): CareerMeta[] {
  const slugs = getAllCareerSlugs()
  const careers = slugs
    .map(slug => {
      const career = getCareerBySlug(slug)
      if (!career) return null
      
      // Return only metadata, not content
      const { content, ...meta } = career
      return meta
    })
    .filter((career): career is CareerMeta => career !== null)
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())

  return careers
}

export function getCareersByDepartment(department: string): CareerMeta[] {
  const allCareers = getAllCareers()
  return allCareers.filter(career => 
    career.department.toLowerCase() === department.toLowerCase()
  )
}

export function getRecentCareers(limit: number = 5): CareerMeta[] {
  const allCareers = getAllCareers()
  return allCareers.slice(0, limit)
}

export function getUniqueDepartments(): string[] {
  const allCareers = getAllCareers()
  const departments = allCareers.map(career => career.department)
  return [...new Set(departments)].sort()
} 