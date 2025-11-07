import { NextRequest, NextResponse } from 'next/server'

type TrialResponse = {
  success: boolean
  data: {
    product?: string
    env: string
    trialDays: number
    source?: string
  }
}

// No caching: always fetch upstream

async function fetchWithTimeout(resource: string, options: RequestInit = {}, timeoutMs = 5000): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const resp = await fetch(resource, { ...options, signal: controller.signal })
    return resp
  } finally {
    clearTimeout(id)
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const envParam = url.searchParams.get('env') || process.env.NEXT_PUBLIC_RUNTIME_ENV || 'dev'

  const upstream = `https://blogs.axonichealth.com/api/trials/axonmd/${encodeURIComponent(envParam)}`
  try {
    const resp = await fetchWithTimeout(upstream, { method: 'GET', headers: { 'Accept': 'application/json' }, cache: 'no-store' }, 5000)
    if (!resp.ok) {
      throw new Error(`upstream status ${resp.status}`)
    }
    const json = (await resp.json()) as Partial<TrialResponse> | any
    const trialDays = Number(json?.data?.trialDays)
    const safeTrialDays = Number.isFinite(trialDays) && trialDays > 0 ? trialDays : 90

    return NextResponse.json({ success: true, data: { env: envParam, trialDays: safeTrialDays } } as TrialResponse)
  } catch (e) {
    // Fallback on error
    return NextResponse.json({ success: true, data: { env: envParam, trialDays: 90 } } as TrialResponse)
  }
}


