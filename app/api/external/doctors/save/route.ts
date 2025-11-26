import { NextRequest, NextResponse } from 'next/server'
import { buildExternalUrlFromRequest, ExternalApiEndpoints } from '@/lib/external-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const url = buildExternalUrlFromRequest(request, ExternalApiEndpoints.saveDoctor)
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    })
    const json = await resp.json().catch(() => ({}))

    return NextResponse.json(json, { status: resp.status })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to save doctor' }, { status: 500 })
  }
}


