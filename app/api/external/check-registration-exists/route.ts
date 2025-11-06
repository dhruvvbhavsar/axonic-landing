import { NextRequest, NextResponse } from 'next/server'
import { buildExternalUrl, ExternalApiEndpoints } from '@/lib/external-api'

export async function POST(request: NextRequest) {
  try {
    const { registrationNumber } = await request.json()
    if (!registrationNumber || typeof registrationNumber !== 'string') {
      return NextResponse.json({ error: 'registrationNumber is required' }, { status: 400 })
    }
    const url = buildExternalUrl(ExternalApiEndpoints.checkRegistrationExists)
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationNumber }),
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}

