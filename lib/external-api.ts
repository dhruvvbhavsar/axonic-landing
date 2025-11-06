export function getExternalApiBase(): string {
  // return 'https://ocipmsqa.axonichealth.com'
  // return 'https://ocicliniqpp.cliniq.in'
  return 'https://axonmd.axonichealth.co.in'
}

export const ExternalApiEndpoints = {
  checkEmail: '/api/v01/cheackedExternalDoctorEmail',
  saveDoctor: '/api/v01/saveExternalDoctorFromAI',
  updateDoctor: '/api/v01/updateExternalDoctorFromAI',
  addressData: '/api/v01/addressDataWithId',
  zones: '/api/v01/getAllZones',
  checkEmailExists: '/api/v01/getAlreadyExistsEmailIds',
  checkRegistrationExists: '/api/v01/getAlreadyExistsGMCNumber',
}

export function buildExternalUrl(path: string): string {
  const base = getExternalApiBase().replace(/\/$/, '')
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}


