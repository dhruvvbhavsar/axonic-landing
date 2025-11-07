import { NextRequest } from 'next/server'

export type ExternalApiAlias = 'axonmd' | 'ocipmsqa' | 'ocicliniqpp' | 'staging' | 'hotfix'

const EXTERNAL_BASES: Record<ExternalApiAlias, string> = {
  axonmd: 'https://axonmd.axonichealth.co.in',
  ocipmsqa: 'https://ocipmsqa.axonichealth.com',
  ocicliniqpp: 'https://ocicliniqpp.cliniq.in',
  staging: 'https://pmstest.axonichealth.co.in',
  hotfix: 'https://ocipmsqahf.axonichealth.com',
}

function isDevLikeEnv(): boolean {
  const runtimeEnv = process.env.NEXT_PUBLIC_RUNTIME_ENV
  return runtimeEnv === 'dev' || runtimeEnv === 'local'
}

export function getExternalApiBaseFromRequest(req: NextRequest): string {
  // In production, always use axonmd
  if (!isDevLikeEnv()) {
    return EXTERNAL_BASES.axonmd
  }
  
  // In dev/local, check for header override
  const alias = (req.headers.get('x-external-api') || '').toLowerCase() as ExternalApiAlias
  if (alias && alias !== 'axonmd' && EXTERNAL_BASES[alias]) {
    return EXTERNAL_BASES[alias]
  }
  
  // Default to OCIPMS QA in dev/local
  return EXTERNAL_BASES.ocipmsqa
}

export const ExternalApiEndpoints = {
  saveDoctor: '/api/v01/saveExternalDoctorFromAI',
  updateDoctor: '/api/v01/updateExternalDoctorFromAI',
  addressData: '/api/v01/addressDataWithId',
  zones: '/api/v01/getAllZones',
  checkEmailExists: '/api/v01/getAlreadyExistsEmailIds',
  checkRegistrationExists: '/api/v01/getAlreadyExistsGMCNumber',
  // Partial registration endpoints
  saveDoctorPartial: '/api/v01/saveDoctorPartialRegData',
  getDoctorPartial: '/api/v01/getDoctorPartialRegData',
}

export function buildExternalUrlFromRequest(req: NextRequest, path: string): string {
  const base = getExternalApiBaseFromRequest(req).replace(/\/$/, '')
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}


