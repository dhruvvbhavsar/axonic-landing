export function getExternalApiBase(): string {
  return 'https://ocipmsqa.axonichealth.com'
}

export const ExternalApiEndpoints = {
  checkEmail: '/api/v01/cheackedExternalDoctorEmail',
  saveDoctor: '/api/v01/saveExternalDoctorFromAI',
  updateDoctor: '/api/v01/updateExternalDoctorFromAI',
}

export function buildExternalUrl(path: string): string {
  const base = getExternalApiBase().replace(/\/$/, '')
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}


